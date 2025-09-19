from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chatbot import SikkimMonasteryChatbot

app = FastAPI()

# Allow CORS for local dev and Vercel/Netlify
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bot = SikkimMonasteryChatbot()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    reply = bot.generate_response(req.message)
    return {"reply": reply}
