"""Static file server + OpenAI chat proxy for 건축자재 포털."""

import json
import os
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass

ROOT = Path(__file__).resolve().parent
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini").strip()
PORT = int(os.getenv("PORT", "5500"))

SYSTEM_PROMPT = """당신은 '건축자재 포털' 웹사이트의 AI 상담 도우미입니다.
사용자의 건축·시공 프로젝트에 맞는 자재 선정, 용도 설명, 카테고리 안내를 돕습니다.

규칙:
- 항상 한국어로 답변합니다.
- 아래 제공된 자재 카탈로그 정보를 우선 참고합니다.
- 카탈로그에 없는 자재도 일반 건축 지식 범위에서 간략히 안내할 수 있습니다.
- 확실하지 않은 규격·법규·시공 기준은 전문가 확인을 권장합니다.
- 답변은 간결하고 실용적으로, 필요 시 카탈로그 페이지(catalog.html) 탐색을 안내합니다.
- 마크다운 대신 일반 텍스트로 답변합니다."""


class PortalHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        if self.path != "/api/chat":
            self.send_error(404, "Not Found")
            return
        self.handle_chat()

    def handle_chat(self):
        if not OPENAI_API_KEY:
            self.send_json(
                503,
                {
                    "error": "OPENAI_API_KEY가 설정되지 않았습니다. .env 파일에 API 키를 추가해 주세요.",
                },
            )
            return

        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length).decode("utf-8"))
        except (ValueError, json.JSONDecodeError):
            self.send_json(400, {"error": "잘못된 요청 형식입니다."})
            return

        messages = body.get("messages")
        materials_context = body.get("materialsContext", "")

        if not isinstance(messages, list) or not messages:
            self.send_json(400, {"error": "messages 배열이 필요합니다."})
            return

        openai_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        if materials_context:
            openai_messages.append(
                {
                    "role": "system",
                    "content": f"등록 자재 카탈로그:\n{materials_context}",
                }
            )

        for msg in messages[-20:]:
            role = msg.get("role")
            content = msg.get("content", "").strip()
            if role in ("user", "assistant") and content:
                openai_messages.append({"role": role, "content": content})

        payload = json.dumps(
            {
                "model": OPENAI_MODEL,
                "messages": openai_messages,
                "temperature": 0.7,
                "max_tokens": 800,
            }
        ).encode("utf-8")

        request = urllib.request.Request(
            "https://api.openai.com/v1/chat/completions",
            data=payload,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {OPENAI_API_KEY}",
            },
            method="POST",
        )

        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                data = json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            try:
                err_json = json.loads(detail)
                message = err_json.get("error", {}).get("message", detail)
            except json.JSONDecodeError:
                message = detail or str(exc)
            self.send_json(exc.code, {"error": message})
            return
        except urllib.error.URLError as exc:
            self.send_json(502, {"error": f"OpenAI API 연결 실패: {exc.reason}"})
            return

        try:
            reply = data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError):
            self.send_json(502, {"error": "OpenAI 응답을 처리할 수 없습니다."})
            return

        self.send_json(200, {"reply": reply})

    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        if args and "/api/chat" in str(args[0]):
            return
        super().log_message(format, *args)


def main():
    server = ThreadingHTTPServer(("127.0.0.1", PORT), PortalHandler)
    key_status = "설정됨" if OPENAI_API_KEY else "미설정 (.env 확인)"
    print(f"건축자재 포털 서버: http://127.0.0.1:{PORT}/index.html")
    print(f"OpenAI API 키: {key_status} | 모델: {OPENAI_MODEL}")
    print("종료: Ctrl+C")
    server.serve_forever()


if __name__ == "__main__":
    main()
