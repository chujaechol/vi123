# 건축자재 포털

건축 프로젝트를 위한 자재 정보 웹사이트 (HTML / CSS / JavaScript)

## 페이지

| 파일 | 설명 |
|------|------|
| `index.html` | 홈 — 히어로, 카테고리, 추천 자재, **AI 챗봇** |
| `catalog.html` | 자재 카탈로그 — 검색, 필터, 상세 보기 |
| `about.html` | 서비스 소개 |
| `contact.html` | 문의 폼 |

## 실행

### 1. API 키 설정 (챗봇 사용 시)

```powershell
Copy-Item .env.example .env
```

`.env` 파일을 열어 OpenAI API 키를 입력합니다.

```
OPENAI_API_KEY=sk-여기에-본인-API-키
OPENAI_MODEL=gpt-4o-mini
```

키 발급: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### 2. 서버 실행

```powershell
Set-Location architectural-materials-web
py -m pip install -r requirements.txt
py server.py
```

브라우저에서 [http://127.0.0.1:5500/index.html](http://127.0.0.1:5500/index.html) 접속

> 챗봇은 **server.py**로 실행해야 동작합니다. `py -m http.server`만 사용하면 GPT API 연동이 되지 않습니다.

## AI 챗봇

- **위치:** `index.html` 우측 하단 「AI 상담」 버튼
- **기능:** 등록된 19종 자재 카탈로그 기반 GPT 상담 (자재 추천, 용도 설명)
- **보안:** API 키는 `.env`에만 저장되며 서버(`server.py`)에서만 사용됩니다.

## 자재 추가

1. `images/` 폴더에 이미지 추가
2. `materials.js`의 `MATERIALS` 배열에 항목 등록
