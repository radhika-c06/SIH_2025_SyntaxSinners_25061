import os
from datetime import datetime
from dotenv import load_dotenv
import google.generativeai as genai


class SikkimMonasteryChatbot:
    def __init__(self, api_key: str | None = None):
        
        # Load .env and pick up GEMINI_API_KEY
        from dotenv import load_dotenv
        load_dotenv()
        api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("Set GEMINI_API_KEY in .env")
        genai.configure(api_key=api_key)

        


        # Persona / system prompt
        self.system_prompt = (
            "You are a knowledgeable and friendly tourism guide for Sikkim, India. "
            "You are an expert on Sikkim's monasteries, culture, tourism, and travel information.\n\n"
            "**Your Personality:**\n"
            "- Warm and welcoming, using occasional Nepali greetings like 'Namaste' and 'तपाईंलाई स्वागत छ'\n"
            "- Detailed and informative responses with cultural sensitivity\n"
            "- Enthusiastic about sharing Sikkim's beauty and heritage\n"
            "- Respectful toward religious sites and traditions\n"
            "- Use emojis appropriately to make responses engaging (🏔️🏛️🌸⛰️🕊️)\n\n"
            # (Keep your long knowledge base here – trimmed for brevity)
        )

        # Use a widely available, fast model
        self.model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=self.system_prompt
        )

        self.conversation_history: list[dict] = []
        self.max_history_length = 10

        self.greetings = [
            "नमस्ते! Namaste! Welcome to the magical land of Sikkim! 🏔️",
            "तपाईंलाई स्वागत छ! I'm your guide to explore the beautiful monasteries and culture of Sikkim!",
            "How can I help you discover the spiritual and natural wonders of Sikkim today?"
        ]

    # ---------- history helpers ----------
    def add_to_conversation_history(self, user_input: str, bot_response: str) -> None:
        self.conversation_history.append({
            "user": user_input,
            "bot": bot_response,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        })
        self.conversation_history = self.conversation_history[-self.max_history_length:]

    def get_conversation_context(self) -> str:
        if not self.conversation_history:
            return ""
        lines = ["--- Previous Conversation Context ---"]
        for ex in self.conversation_history[-3:]:
            bot_snip = ex["bot"][:150] + ("..." if len(ex["bot"]) > 150 else "")
            lines += [f"User previously asked: {ex['user']}", f"You responded: {bot_snip}", "---"]
        return "\n".join(lines)

    # ---------- prompting ----------
    def build_prompt(self, user_query: str) -> str:
        context = self.get_conversation_context()
        return (
            f"{context}\n\n"
            f"Current User Query: {user_query}\n\n"
            "Instructions:\n"
            "1) Use the knowledge base above and your own knowledge about Sikkim.\n"
            "2) Be warm, detailed, and culturally respectful.\n"
            "3) Add practical travel info when relevant (distances, timings, permits).\n"
            "4) Use appropriate emojis sparingly.\n"
        )

    def get_gemini_response(self, user_query: str) -> str:
        try:
            prompt = self.build_prompt(user_query)
            # start a lightweight chat turn (system instruction already set on the model)
            chat = self.model.start_chat(history=[])
            resp = chat.send_message(prompt)
            return resp.text
        except Exception as e:
            return (
                "I’m having trouble right now. Please try again. "
                f"(Error: {e})"
            )

    def generate_response(self, user_input: str) -> str:
        return self.get_gemini_response(user_input)

    # ---------- CLI ----------
    def start_conversation(self) -> None:
        print("=" * 60)
        print("🏔️ SIKKIM MONASTERIES & TOURISM CHATBOT 🏛️")
        print("=" * 60)
        for g in self.greetings:
            print(g)
        print("\nType 'exit' to end. Ask about monasteries, places, festivals, food, travel tips, etc.\n")

        while True:
            try:
                user_input = input("\n👤 You: ").strip()
                if user_input.lower() in {"exit", "quit", "bye"}:
                    print("\n🙏 Thank you for exploring Sikkim with me! Namaste! 🏔️")
                    break
                if not user_input:
                    print("🤖 Bot: Please ask something about Sikkim 🙂")
                    continue

                reply = self.generate_response(user_input)
                print("\n🤖 Bot:", reply)
                self.add_to_conversation_history(user_input, reply)
            except KeyboardInterrupt:
                print("\n\n🙏 Goodbye!")
                break
            except Exception as e:
                print(f"\n🤖 Bot: Error: {e}")
                continue


if __name__ == "__main__":
    print("[DEBUG] starting chatbot.py")   # should appear immediately

    # (Optional) explicit load if you didn't do it in __init__
    from dotenv import load_dotenv
    load_dotenv()

    try:
        bot = SikkimMonasteryChatbot()     # reads GEMINI_API_KEY from .env
    except Exception as e:
        print(f"❌ {e}")
        print("Create a .env with GEMINI_API_KEY=YOUR_KEY and try again.")
        raise SystemExit(1)

    bot.start_conversation()

