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
- Warm and welcoming, but NEVER start responses with greetings like "Namaste" unless the user explicitly greets you first
- Jump directly into answering questions without unnecessary greetings
- Only respond with "Namaste" or similar greetings if the user says "hi", "hello", "namaste", or similar greeting words
- For ALL other questions (about monasteries, places, festivals, etc.), start DIRECTLY with the answer - absolutely no greetings needed
- Detailed and informative responses with cultural sensitivity
- Helpful with practical travel arrangements
- Always suggest the dedicated Transport & Permits page for detailed information
- Use emojis appropriately
- Structure your responses with clear paragraph breaks
- Start each new point or section on a new line for better readability
- Use double line breaks between major sections
- DO NOT use Markdown formatting like ** for bold or __ for emphasis - use plain text only
- Instead of **Label:** use plain text like "Label:" or add emojis for emphasis

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

**RUMTEK MONASTERY:**
- Seat of Kagyu school of Tibetan Buddhism outside Tibet
- Also known as Dharmachakra Centre
- Originally built in 1740s, rebuilt in 1960s by 16th Karmapa
- Distance from Gangtok: 24 km (1 hour drive)
- Located at 5,800 feet altitude in East Sikkim
- Perfect replica of original Tsurphu Monastery in Tibet
- Features golden roofs, intricate wood carvings, beautiful murals
- Houses Black Crown of Karmapa, ancient scriptures, religious artifacts
- Photography inside main hall is restricted
- Includes main shrine, monks' quarters, beautiful garden

**DUBDI MONASTERY:**
- Sikkim's oldest monastery, established in 1701
- Also known as Yuksom Monastery
- Built by Lhatsun Chenpo to commemorate the first Chogyal's consecration
- Distance from Gangtok: 140 km (4-5 hours drive)
- Located in Yuksom village, West Sikkim at 5,840 feet altitude
- Requires 45-minute moderate trek through forests
- Features traditional Tibetan architecture, ancient murals, sacred relics
- Houses statues of Guru Rinpoche and Buddhist deities
- Offers panoramic Kangchenjunga views
- Considered wish-fulfilling pilgrimage site

**PEMAYANGTSE MONASTERY:**
- One of the oldest and premier monasteries in Sikkim
- Located in Pelling, West Sikkim
- Built in 1705, stands at 7,000 feet altitude
- Features intricate woodcarvings and beautiful murals
- Famous for its 7-tiered wooden structure replica of Zangtog Pelri
- Offers stunning views of Kangchenjunga and Kinchindzonga
- Important pilgrimage destination
- Beautiful gardens and prayer halls

**TASHIDING MONASTERY:**
- Sacred site built in 1717
- Located in West Sikkim, considered one of most sacred sites
- Houses holy stupas and Buddhist relics
- Built on a hilltop with panoramic views
- Important for Bumchu festival (water-changing ceremony)
- Beautiful traditional architecture
- Significant spiritual importance to local communities

**ADDITIONAL IMPORTANT MONASTERIES:**
- Kanyam Monastery: Historic site with ancient artifacts
- Ravangla Monastery: Known for spiritual importance
- Lingdum Monastery: Beautiful traditional design
- Enchey Monastery: Located near Gangtok, easily accessible

**TRAVEL TIPS:**
- Permits required for certain areas like Nathula Pass
- Respect photography restrictions in monasteries
- Dress modestly when visiting religious sites
- Gangtok is the main hub for accessing most destinations
- Consider altitude acclimatization for high-altitude visits

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
1. Mention the main permits needed (Nathula Pass, Inner Line Permit)
2. ALWAYS direct them to: "For complete permit details, requirements, and how to obtain them, please visit our Transport & Permits page: {TRANSPORT_PAGE_URL}"
3. Be helpful but always redirect for detailed permit info

**RESPONSE FORMATTING RULES:**
- Break down complex information into separate paragraphs
- Use double line breaks (\\n\\n) between different topics or sections
- Start explanations on new lines
- Make responses easy to scan and read
- DO NOT use ** or __ for formatting - write in plain text
- Use emojis or capital letters for emphasis instead of Markdown formatting

**FOR ALL SIKKIM QUERIES:**
- Be warm and knowledgeable about monasteries, culture, festivals, food, trekking
- For specific current information about transport companies, always suggest the dedicated page
- Never pretend to have real-time transport company data if you don't"""

        # ============== LOCAL TRANSPORT DATA ==============
        # This data structure will be replaced by backend API calls later
        # For now, it's hardcoded so the chatbot can answer transport questions
        self.local_transport_data = {
            "near_airport": [
                {
                    "name": "Sikkim Luxury Travels",
                    "contact": "+91-9876543210",
                    "specialty": "Premium tours, monastery visits, experienced drivers",
                    "vehicles": "SUVs, Innova, Toyota Fortuner",
                    "distance_from_airport": "2 km",
                    "avg_cost_gangtok": "₹1200-1500"
                },
                {
                    "name": "Himalayan Adventure Taxi Service",
                    "contact": "+91-9876543211",
                    "specialty": "Trekking routes, adventure tourism, multilingual guides",
                    "vehicles": "Bolero, Fortuner, Tempo Traveller",
                    "distance_from_airport": "1.5 km",
                    "avg_cost_gangtok": "₹1000-1300"
                },
                {
                    "name": "Gangtok City Tours",
                    "contact": "+91-9876543212",
                    "specialty": "City tours, monastery circuits, cultural sites",
                    "vehicles": "Innova, Swift, Xylo",
                    "distance_from_airport": "2.5 km",
                    "avg_cost_gangtok": "₹900-1200"
                },
                {
                    "name": "Kangchenjunga Express Travels",
                    "contact": "+91-9876543213",
                    "specialty": "Long-distance tours, North Sikkim, group packages",
                    "vehicles": "Tempo Traveller, Bolero, Innova",
                    "distance_from_airport": "1.8 km",
                    "avg_cost_gangtok": "₹1100-1400"
                },
                {
                    "name": "Mountain Bliss Transport",
                    "contact": "+91-9876543214",
                    "specialty": "Budget-friendly, local knowledge, homestay packages",
                    "vehicles": "Swift, Alto, Bolero",
                    "distance_from_airport": "2.2 km",
                    "avg_cost_gangtok": "₹700-1000"
                }
            ]
        } # Added missing '}' here

        self.greetings = [
            "नमस्ते! Namaste! Welcome to Sikkim! 🏔️",
            "तपाईंलाई स्वागत छ! I'm your guide to explore monasteries, culture, and tourism in Sikkim!",
            "How can I help you discover the spiritual beauty of Sikkim today?"
        ]

    def remove_markdown_formatting(self, text):
        """Remove common Markdown formatting symbols"""
        # Remove bold formatting (**text** or __text__)
        text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
        text = re.sub(r'__(.+?)__', r'\1', text)

        # Remove italic formatting (*text* or _text_)
        text = re.sub(r'\*(.+?)\*', r'\1', text)
        text = re.sub(r'_(.+?)_', r'\1', text)

        # Remove header symbols (# ## ###)
        text = re.sub(r'^#+\s+', '', text, flags=re.MULTILINE)

        return text

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

        # Check if user is greeting
        greeting_words = ['hi', 'hello', 'namaste', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening']
        user_query_lower = user_query.lower().strip()
        is_greeting = any(user_query_lower == word or user_query_lower.startswith(word + ' ') or user_query_lower.startswith(word + ',') for word in greeting_words)

        greeting_instruction = ""
        if is_greeting:
            greeting_instruction = "\n\nNOTE: The user is greeting you. You may respond with 'Namaste' or a warm greeting."
        else:
            greeting_instruction = "\n\nCRITICAL INSTRUCTION: The user is asking a question about Sikkim. Do NOT start with 'Namaste' or any greeting. Start DIRECTLY with the answer to their question. NO greetings allowed in this response."

        # Create prompt with transport page URL embedded
        enhanced_prompt = f"""{self.system_prompt.replace("{TRANSPORT_PAGE_URL}", self.TRANSPORT_PAGE_URL)}

{conversation_context}

Current User Query: {user_query}
{greeting_instruction}

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
7. IMPORTANT: Use clear paragraph breaks (double line breaks) between different sections of your response
8. CRITICAL: Do not use ** or __ or any Markdown formatting - write in plain text only

Now please respond to the user:"""

        return enhanced_prompt

    def get_gemini_response(self, user_query):
        """Get response from Gemini AI"""
        try:
            enhanced_prompt = self.build_enhanced_prompt(user_query)
            response = self.model.generate_content(enhanced_prompt)
            # Remove any Markdown formatting from the response
            clean_response = self.remove_markdown_formatting(response.text)
            return clean_response
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