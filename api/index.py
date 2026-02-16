from fastapi import FastAPI  # type: ignore
from fastapi.responses import PlainTextResponse  # type: ignore
from openai import OpenAI  # type: ignore

app = FastAPI()

@app.get("/api", response_class=PlainTextResponse)
def idea():
    client = OpenAI()
    prompt = [{"role": "user", "content": "Write a short fantasy story, at most 20 lines long."}]
    response = client.chat.completions.create(model="gpt-5-nano", messages=prompt)
    return response.choices[0].message.content
