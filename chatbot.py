import os
import re
from datetime import datetime
import google.generativeai as genai

class SikkimMonasteryChatbot:
    def __init__(self, gemini_api_key):
        """Initialize the chatbot with Gemini API"""
        genai.configure(api_key=gemini_api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        
        self.conversation_history = []
        self.max_history_length = 10
        
        # ============== CONFIGURATION ==============
        # Update these with your actual website URLs
        self.TRANSPORT_PAGE_URL = "https://yourwebsite.com/transport-permits"  # Your dedicated page
        self.WEBSITE_BASE_URL = "https://yourwebsite.com"
        
        self.system_prompt = """You are a knowledgeable and friendly tourism guide for Sikkim, India. You are an expert on Sikkim's monasteries, culture, tourism, and travel information.

**Your Personality:**
- Warm and welcoming, using occasional Nepali greetings like "Namaste"
- Detailed and informative responses with cultural sensitivity
- Helpful with practical travel arrangements
- Always suggest the dedicated Transport & Permits page for detailed information
- Use emojis appropriately (🏔️🏛️🌸⛰️🕊️🚕🛣️)

**SIKKIM HISTORY:**
Sikkim has a rich history spanning over 600 years. The kingdom was established in 1642 by Phuntsog Namgyal. Originally inhabited by the Lepchas, the Bhutias migrated from Tibet in the 14th century, followed by the Nepalese in the 19th century. Sikkim became the 22nd state of India in 1975.

**WHAT SIKKIM IS FAMOUS FOR:**
🏔️ Mountain Beauty: Home to Kangchenjunga, the world's third-highest peak
🏛️ Ancient Monasteries: Over 200 monasteries including Rumtek, Dubdi, Tashiding, Pemayangtse
🌸 Biodiversity: The only fully organic state in India
🎭 Cultural Diversity: Harmonious blend of Lepcha, Bhutia, and Nepali communities
⛰️ Adventure Tourism: Trekking routes, river rafting, paragliding
🕊️ Peace and Serenity: One of India's most peaceful states

**BEST TIME TO VISIT:**
🌸 March to May (Spring): 10°C to 25°C - Perfect for monastery visits and nature
☀️ October to December (Post-Monsoon): 5°C to 20°C - Crystal clear skies
❄️ December to February (Winter): -5°C to 15°C - Snow-capped landscapes
🌧️ June to September (Monsoon): Generally avoided due to heavy rainfall

**FAMOUS MONASTERIES:**

**DUBDI MONASTERY:**
- Sikkim's oldest monastery, established in 1701
- Also known as Yuksom Monastery
- Distance from Gangtok: 140 km (4-5 hours drive)
- Requires 45-minute trek through forests
- Offers panoramic Kangchenjunga views

**RUMTEK MONASTERY:**
- Seat of Kagyu school of Tibetan Buddhism
- Distance from Gangtok: 24 km (1 hour drive)
- Located at 5,800 feet altitude
- Features golden roofs and intricate wood carvings
- Houses Black Crown of Karmapa

**OTHER IMPORTANT MONASTERIES:**
- Pemayangtse: One of oldest and premier monasteries
- Tashiding: Sacred site with holy stupas

**MAJOR CITIES & APPROXIMATE DISTANCES FROM AIRPORT:**
- Gangtok: 28 km (45 min-1 hour) - Capital city, main tourism hub
- Pelling: 110 km (3-4 hours) - West Sikkim, monastery region
- Lachung: 120 km (4-5 hours) - North Sikkim, Yumthang Valley
- Lachen: 95 km (3-4 hours) - North Sikkim, Gurudongmar Lake access
- Yuksom: 145 km (4-5 hours) - West Sikkim, Dubdi Monastery, trekking

**TRAVEL TIPS:**
- Book transport in advance during peak season (March-May, Oct-Dec)
- Be respectful when visiting religious sites
- Dress modestly for monastery visits
- Altitude acclimatization recommended for high-altitude visits

**IMPORTANT: When user asks about LOCAL TRANSPORT or TRAVEL COMPANIES:**
1. Acknowledge their question
2. Provide brief helpful info if you have general knowledge
3. ALWAYS mention: "For detailed information about local transport companies near the airport, their contact details, pricing, and the specific permits you'll need, I've prepared a dedicated Transport & Permits page on our website."
4. Suggest they visit: {TRANSPORT_PAGE_URL}
5. Offer to help with other questions while they explore that page

**IMPORTANT: When user asks about PERMITS:**
1. Mention the main permits needed (Nathula Pass, Inner Line Permit, etc.)
2. ALWAYS direct them to: "For complete permit details, requirements, and how to obtain them, please visit our Transport & Permits page: {TRANSPORT_PAGE_URL}"
3. Be helpful but always redirect for detailed permit info

**FOR ALL SIKKIM QUERIES:**
- Be warm and knowledgeable about monasteries, culture, festivals, food, trekking
- For specific current information about transport companies, always suggest the dedicated page
- Never pretend to have real-time transport company data if you don't"""
        
        self.greetings = [
            "नमस्ते! Namaste! Welcome to Sikkim! 🏔️",
            "तपाईंलाई स्वागत छ! I'm your guide to explore monasteries, culture, and tourism in Sikkim!",
            "How can I help you discover the spiritual beauty of Sikkim today?"
        ]
    
    def add_to_conversation_history(self, user_input, bot_response):
        """Add conversation exchange to history"""
        conversation_entry = {
            "user": user_input,
            "bot": bot_response,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        self.conversation_history.append(conversation_entry)
        
        if len(self.conversation_history) > self.max_history_length:
            self.conversation_history = self.conversation_history[-self.max_history_length:]
    
    def get_conversation_context(self):
        """Format conversation history"""
        if not self.conversation_history:
            return ""
        
        context = "\n--- Previous Conversation Context ---\n"
        for exchange in self.conversation_history[-3:]:
            context += f"User: {exchange['user']}\n"
            context += f"Assistant: {exchange['bot'][:150]}{'...' if len(exchange['bot']) > 150 else ''}\n"
        
        return context
    
    def build_enhanced_prompt(self, user_query):
        """Build enhanced prompt with instructions to redirect appropriately"""
        conversation_context = self.get_conversation_context()
        
        # Create prompt with transport page URL embedded
        enhanced_prompt = f"""{self.system_prompt.replace("{TRANSPORT_PAGE_URL}", self.TRANSPORT_PAGE_URL)}

{conversation_context}

Current User Query: {user_query}

Instructions for this response:
1. Answer questions about monasteries, culture, history, festivals, food, and general Sikkim info with your full knowledge
2. For questions about LOCAL TRANSPORT COMPANIES, TAXIS, TRAVEL SERVICES:
   - Provide brief general guidance
   - ALWAYS mention our dedicated Transport & Permits page
   - Share this link: {self.TRANSPORT_PAGE_URL}
   - Make it sound helpful and organized
3. For PERMIT questions:
   - Briefly mention which permits (Nathula Pass, Inner Line Permit)
   - ALWAYS direct to the dedicated page for complete details
   - Link: {self.TRANSPORT_PAGE_URL}
4. Be warm, helpful, and enthusiastic
5. Use emojis appropriately
6. Make the page suggestion feel natural, not forced

Now please respond to the user:"""
        
        return enhanced_prompt
    
    def get_gemini_response(self, user_query):
        """Get response from Gemini AI"""
        try:
            enhanced_prompt = self.build_enhanced_prompt(user_query)
            response = self.model.generate_content(enhanced_prompt)
            return response.text
        except Exception as e:
            return f"I apologize, but I'm having trouble right now. Error: {str(e)}. Please try again!"
    
    def generate_response(self, user_input):
        """Generate response using Gemini"""
        print("🔍 Processing your query...")
        return self.get_gemini_response(user_input)
    
    def start_conversation(self):
        """Main conversation loop"""
        print("=" * 70)
        print("🏔️ SIKKIM MONASTERIES & TOURISM CHATBOT 🚕")
        print("=" * 70)
        
        for greeting in self.greetings:
            print(greeting)
        
        print("\n" + "=" * 70)
        print("I can help you with:")
        print("  📍 Monasteries and spiritual sites")
        print("  🏛️ Sikkim's culture, history, and festivals")
        print("  🌸 Nature, biodiversity, and trekking")
        print("  🚕 Local transport (redirects to our dedicated page)")
        print("  📋 Travel permits and requirements")
        print("  🛣️ Travel tips and best times to visit")
        print("=" * 70)
        print("\nType 'exit' to end conversation\n")
        
        while True:
            try:
                user_input = input("\n👤 You: ").strip()
                
                if user_input.lower() in ['exit', 'quit', 'bye', 'goodbye']:
                    print("\n🙏 Thank you for exploring Sikkim with me! Have a wonderful journey! Namaste! 🏔️")
                    break
                
                if not user_input:
                    print("🤖 Bot: Please ask me something about Sikkim!")
                    continue
                
                print("\n🤖 Bot:")
                response = self.generate_response(user_input)
                print(response)
                
                # Check if response mentions the transport page - if so, highlight it
                if "transport" in user_input.lower() or "taxi" in user_input.lower() or "travel" in user_input.lower():
                    print(f"\n💡 Quick Link: {self.TRANSPORT_PAGE_URL}")
                
                self.add_to_conversation_history(user_input, response)
                
            except KeyboardInterrupt:
                print("\n\n🙏 Thank you! Goodbye!")
                break
            except Exception as e:
                print(f"\n🤖 Bot: I apologize for the error: {str(e)}")

def main():
    """Main function"""
    print("🚀 Initializing Sikkim Monasteries & Tourism Chatbot...\n")
    
    api_key = ""  # Add your Gemini API key here
    
    if not api_key:
        print("❌ Gemini API key is required!")
        print("Get one from: https://makersuite.google.com/app/apikeys")
        return
    
    try:
        chatbot = SikkimMonasteryChatbot(api_key)
        chatbot.start_conversation()
    except Exception as e:
        print(f"❌ Error initializing chatbot: {e}")

if __name__ == "__main__":
    main()