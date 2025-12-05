import os
import re
from datetime import datetime
import google.generativeai as genai

class SikkimMonasteryChatbot:
    def __init__(self, gemini_api_key):
        """Initialize the chatbot with Gemini API and comprehensive knowledge base"""
        # Configure Gemini
        genai.configure(api_key=gemini_api_key)
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Initialize conversation history
        self.conversation_history = []
        self.max_history_length = 10
        
        # ============== MONASTERY PAGE LINKS ==============
        # Map monastery names to their pages on your website
        self.monastery_pages = {
            "rumtek": "https://yourwebsite.com/monastery/rumtek",
            "dubdi": "https://yourwebsite.com/monastery/dubdi",
            "pemayangtse": "https://yourwebsite.com/monastery/pemayangtse",
            "tashiding": "https://yourwebsite.com/monastery/tashiding",
            "kanyam": "https://yourwebsite.com/monastery/kanyam",
            "ravangla": "https://yourwebsite.com/monastery/ravangla",
            "lingdum": "https://yourwebsite.com/monastery/lingdum",
            "enchey": "https://yourwebsite.com/monastery/enchey"
        }
        
        # ============== WEBSITE CONFIGURATION ==============
        self.WEBSITE_BASE_URL = "https://yourwebsite.com"
        self.TRANSPORT_PAGE_URL = "https://yourwebsite.com/transport-permits"
        
        self.system_prompt = """You are a knowledgeable and friendly tourism guide for Sikkim, India. You are an expert on Sikkim's monasteries, culture, tourism, and travel information.

**Your Personality:**
- Warm and welcoming, using occasional Nepali greetings like "Namaste" and "तपाईंलाई स्वागत छ"
- Detailed and informative responses with cultural sensitivity
- Enthusiastic about sharing Sikkim's beauty and heritage
- Respectful toward religious sites and traditions
- Use emojis appropriately to make responses engaging (🏔️🏛️🌸⛰️🕊️)

**COMPREHENSIVE KNOWLEDGE BASE - Use this information to answer queries:**

**SIKKIM HISTORY:**
Sikkim has a rich history spanning over 600 years. The kingdom was established in 1642 by Phuntsog Namgyal, who became the first Chogyal (king) of Sikkim. Originally inhabited by the Lepchas (original inhabitants), the Bhutias migrated from Tibet in the 14th century, followed by the Nepalese in the 19th century, creating Sikkim's unique multicultural identity. Sikkim remained an independent kingdom under British protection from 1861 until India's independence in 1947. In 1975, after a referendum, Sikkim became the 22nd state of India, ending centuries of monarchy while preserving its rich cultural heritage.

**WHAT SIKKIM IS FAMOUS FOR:**
🏔️ Mountain Beauty: Home to Kangchenjunga, the world's third-highest peak
🏛️ Ancient Monasteries: Over 200 monasteries including Rumtek, Dubdi, Tashiding, and Pemayangtse
🌸 Biodiversity: The only fully organic state in India, with over 5,000 species of flowering plants
🎭 Cultural Diversity: Harmonious blend of Lepcha, Bhutia, and Nepali communities
⛰️ Adventure Tourism: Trekking routes like Goecha La, river rafting, paragliding
🕊️ Peace and Serenity: One of India's most peaceful states with crime rates close to zero

**BEST TIME TO VISIT:**
🌸 March to May (Spring): 10°C to 25°C - Perfect for monastery visits and rhododendron blooms
☀️ October to December (Post-Monsoon): 5°C to 20°C - Crystal clear skies, best for photography
❄️ December to February (Winter): -5°C to 15°C - Snow-capped landscapes, fewer crowds
🌧️ June to September (Monsoon): Generally avoided due to heavy rainfall and landslides

**FAMOUS PLACES TO VISIT:**
🏛️ Monasteries: Rumtek, Dubdi, Pemayangtse, Tashiding
🏔️ Mountain Destinations: Tsomgo Lake, Nathula Pass, Gurudongmar Lake, Yumthang Valley
🌆 Cities: Gangtok (capital), Pelling, Lachung & Lachen, Yuksom
🎭 Cultural Sites: Namgyal Institute of Tibetology, Flower Exhibition Centre

**DETAILED MONASTERY INFORMATION:**

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

Always provide comprehensive, culturally sensitive responses using this knowledge base. Include practical travel information, distances, and cultural context in your answers."""
        
        # Greeting messages
        self.greetings = [
            "नमस्ते! Namaste! Welcome to the magical land of Sikkim! 🏔️",
            "तपाईंलाई स्वागत छ! I'm your guide to explore the beautiful monasteries and culture of Sikkim!",
            "How can I help you discover the spiritual and natural wonders of Sikkim today?"
        ]
    
    def detect_monastery(self, user_input):
        """Detect which monastery the user is asking about"""
        user_lower = user_input.lower()
        
        for monastery_key in self.monastery_pages.keys():
            if monastery_key in user_lower:
                return monastery_key
        
        return None
    
    def add_to_conversation_history(self, user_input, bot_response):
        """Add conversation exchange to history"""
        conversation_entry = {
            "user": user_input,
            "bot": bot_response,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        self.conversation_history.append(conversation_entry)
        
        # Keep only recent conversations to manage context length
        if len(self.conversation_history) > self.max_history_length:
            self.conversation_history = self.conversation_history[-self.max_history_length:]
    
    def get_conversation_context(self):
        """Format conversation history for inclusion in prompts"""
        if not self.conversation_history:
            return ""
        
        context = "\n--- Previous Conversation Context ---\n"
        for exchange in self.conversation_history[-3:]:  # Use last 3 exchanges for context
            context += f"User previously asked: {exchange['user']}\n"
            context += f"You responded: {exchange['bot'][:150]}{'...' if len(exchange['bot']) > 150 else ''}\n"
            context += "---\n"
        
        return context
    
    def build_enhanced_prompt(self, user_query):
        """Build enhanced prompt with system prompt, context, and user query"""
        conversation_context = self.get_conversation_context()
        
        enhanced_prompt = f"""{self.system_prompt}

{conversation_context}

Current User Query: {user_query}

Instructions for this response:
1. FIRST, check if the query matches the comprehensive knowledge base provided above and use that detailed information
2. FOR ALL OTHER SIKKIM-RELATED TOPICS (festivals, food, languages, wildlife, trekking, traditions, culture, etc.), use your extensive general knowledge about Sikkim confidently
3. Consider the conversation context to provide continuity and avoid repetition
4. Be warm, detailed, and informative for ALL topics related to Sikkim
5. Include practical travel information when relevant (distances, timing, permits, dates)
6. Use appropriate emojis to make the response engaging
7. Always maintain cultural sensitivity and respect for religious sites and local customs
8. You are an expert on Sikkim - use your full knowledge base to help tourists with ANY Sikkim-related questions
9. For festivals, provide dates, significance, rituals, and cultural importance
10. For food, describe dishes, ingredients, cultural significance, and where to find them
11. Only say you don't know something if it's truly outside your knowledge or requires real-time information

Remember: You have comprehensive knowledge about Sikkim's festivals (Losar, Saga Dawa, Bumchu, Phang Lhabsol, etc.), food (momos, thukpa, gundruk, etc.), wildlife (red panda, snow leopard, etc.), languages, and all aspects of Sikkimese culture. Use this knowledge confidently!

Please provide a comprehensive response to the user's query now."""
        
        return enhanced_prompt
    
    def get_gemini_response(self, user_query):
        """Get response from Gemini AI with enhanced context and knowledge base"""
        try:
            enhanced_prompt = self.build_enhanced_prompt(user_query)
            response = self.model.generate_content(enhanced_prompt)
            return response.text
        except Exception as e:
            return f"I apologize, but I'm having trouble accessing information right now. Error: {str(e)}. Please try asking your question again, and I'll do my best to help you with information about Sikkim's monasteries and tourism!"
    
    def generate_response(self, user_input):
        """Generate comprehensive response using Gemini with integrated knowledge"""
        print("🔍 Processing your query about Sikkim...")
        
        # Get the base response from Gemini
        response = self.get_gemini_response(user_input)
        
        # Check if user is asking about a specific monastery
        monastery = self.detect_monastery(user_input)
        
        if monastery and monastery in self.monastery_pages:
            monastery_url = self.monastery_pages[monastery]
            monastery_name = monastery.capitalize()
            
            # Add link to the response
            response += f"\n\n📍 **Visit Our Detailed Page:**\nFor more photographs, visitor information, and travel details about {monastery_name} Monastery, please visit:\n🔗 {monastery_url}\n\n(This page includes opening hours, entry fees, photography guidelines, and visitor reviews!)"
        
        return response
    
    def start_conversation(self):
        """Main conversation loop"""
        print("=" * 70)
        print("🏔️ SIKKIM MONASTERIES & TOURISM CHATBOT 🏛️")
        print("=" * 70)
        
        # Display greeting
        for greeting in self.greetings:
            print(greeting)
        print("\n" + "=" * 70)
        print("Type 'exit' to end conversation")
        print("Ask me about monasteries, places to visit, festivals, food, culture, travel tips, or anything about Sikkim!\n")
        print("💡 Available Monasteries:")
        print("   🏛️ Rumtek, Dubdi, Pemayangtse, Tashiding, Kanyam, Ravangla, Lingdum, Enchey")
        print("=" * 70)
        
        while True:
            try:
                user_input = input("\n👤 You: ").strip()
                
                if user_input.lower() in ['exit', 'quit', 'bye', 'goodbye']:
                    print("\n🙏 Thank you for exploring Sikkim with me! Have a wonderful journey! Namaste! 🏔️")
                    break
                
                if not user_input:
                    print("🤖 Bot: Please ask me something about Sikkim, its monasteries, or tourism!")
                    continue
                
                print("\n🤖 Bot:")
                response = self.generate_response(user_input)
                print(response)
                
                # Add to conversation history
                self.add_to_conversation_history(user_input, response)
                
            except KeyboardInterrupt:
                print("\n\n🙏 Thank you for exploring Sikkim with me! Goodbye!")
                break
            except Exception as e:
                print(f"\n🤖 Bot: I apologize for the error: {str(e)}. Please try asking your question again!")

def main():
    """Main function to run the chatbot"""
    print("🚀 Initializing Sikkim Monasteries Tourism Chatbot...")
    
    # Get Gemini API key
    api_key = ""  # Add your API key here
    
    if not api_key:
        print("❌ API key is required to run the chatbot!")
        print("Get one from: https://makersuite.google.com/app/apikeys")
        return
    
    try:
        # Initialize and start chatbot
        chatbot = SikkimMonasteryChatbot(api_key)
        chatbot.start_conversation()
    except Exception as e:
        print(f"❌ Error initializing chatbot: {e}")
        print("Please check your API key and internet connection.")

if __name__ == "__main__":
    main()