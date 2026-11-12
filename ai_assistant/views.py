import json
import os
import urllib.request

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "llama-3.3-70b-versatile"


class AnalyzeGrievanceView(APIView):
    permission_classes = [AllowAny]  # tighten later if time allows

    def post(self, request):
        subject = request.data.get("subject", "")
        description = request.data.get("description", "")
        api_key = os.environ.get("GROQ_API_KEY")

        if not api_key:
            return Response({"error": "GROQ_API_KEY is not set."}, status=500)
        if not (subject or description):
            return Response({"error": "Subject or description required."}, status=400)

        prompt = (
            "You analyse public grievances for a Kerala government portal. "
            "Reply ONLY with JSON having keys: suggested_department, "
            "suggested_category, priority (Low, Medium or High), summary "
            "(max 2 sentences).\n\n"
            f"Subject: {subject}\nDescription: {description}"
        )
        body = json.dumps({
            "model": GROQ_MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "response_format": {"type": "json_object"},
            "temperature": 0.2,
        }).encode("utf-8")

        req = urllib.request.Request(
            GROQ_URL,
            data=body,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            result = json.loads(data["choices"][0]["message"]["content"])
            return Response(result)
        except Exception as e:
            return Response({"error": f"AI analysis failed: {e}"}, status=502)
