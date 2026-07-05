"""Static file server + OpenAI chat proxy for 자재전시관."""

import json
import os
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

try:
    from dotenv import load_dotenv

    load_dotenv(Path(__file__).resolve().parent / ".env", override=True)
except ImportError:
    pass

ROOT = Path(__file__).resolve().parent
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini").strip()
PORT = int(os.getenv("PORT", "8080"))

SYSTEM_PROMPT = """당신은 '자재전시관' 대구 프리미엄 인테리어 자재 쇼룸의 AI 상담 도우미입니다.
사용자의 공간·용도·스타일에 맞는 마감재(타일, 목재, 바닥재, 벽지·도장, 석재) 추천과 방문 상담 안내를 돕습니다.

쇼룸 정보:
- 주소: 대구광역시 북구 동변로 75
- 전화: 053-321-5678
- 운영: 평일 10:00–19:00, 토요일 10:00–17:00, 일·공휴일 휴무
- 전시: 200여 종 실물 샘플, 12개 전시 존

규칙:
- 항상 한국어로 답변합니다.
- 아래 제공된 전시 자재 목록을 우선 참고합니다.
- 목록에 있는 자재는 이름과 특성을 구체적으로 안내합니다.
- 방문 예약이 필요하면 페이지 하단 '방문 상담 예약'(#contact)을 안내합니다.
- 확실하지 않은 시공·법규 사항은 현장 전문 상담을 권장합니다.
- 마크다운 대신 일반 텍스트로 답변합니다."""


class ShowroomHandler(SimpleHTTPRequestHandler):
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
                    "error": "OPENAI_API_KEY가 설정되지 않았습니다. showroom/.env 파일에 API 키를 추가해 주세요.",
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
                    "content": f"전시 자재 목록:\n{materials_context}",
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
    server = ThreadingHTTPServer(("127.0.0.1", PORT), ShowroomHandler)
    key_status = "설정됨" if OPENAI_API_KEY else "미설정 (.env 확인)"
    print(f"자재전시관 서버: http://127.0.0.1:{PORT}/index.html")
    print(f"OpenAI API 키: {key_status} | 모델: {OPENAI_MODEL}")
    print("종료: Ctrl+C")
    server.serve_forever()


if __name__ == "__main__":
    main()
