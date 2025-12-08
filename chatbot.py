import os
import re
from datetime import datetime
import requests
import json

class SikkimMonasteryChatbot:
    def __init__(self, api_key, api_provider="groq"):
        """
        Initialize the chatbot with Llama API and comprehensive knowledge base
        
        Supported API providers:
        - "groq": Groq API (fastest, recommended)
        - "together": Together AI
        - "openrouter": OpenRouter
        - "replicate": Replicate
        """
        self.api_key = api_key
        self.api_provider = api_provider.lower()
        
        # Configure API endpoints and models based on provider
        self.api_config = {
            "groq": {
                "url": "https://api.groq.com/openai/v1/chat/completions",
                "model": "llama-3.3-70b-versatile",  # or "llama-3.1-70b-versatile"
                "headers": {
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                }
            },
            "together": {
                "url": "https://api.together.xyz/v1/chat/completions",
                "model": "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
                "headers": {
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                }
            },
            "openrouter": {
                "url": "https://openrouter.ai/api/v1/chat/completions",
                "model": "meta-llama/llama-3.1-70b-instruct",
                "headers": {
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                }
            },
            "replicate": {
                "url": "https://api.replicate.com/v1/predictions",
                "model": "meta/llama-2-70b-chat",
                "headers": {
                    "Authorization": f"Token {api_key}",
                    "Content-Type": "application/json"
                }
            }
        }
        
        # Initialize conversation history
        self.conversation_history = []
        self.max_history_length = 10
        
        # ============== MONASTERY PAGE LINKS ==============
        self.monastery_pages = {
            "rumtek": "https://yourwebsite.com/monstery/rumtek",
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
- Warm and welcoming, using occasional Nepali greetings like "Namaste" and "तपाईंलाई स्वागत छ" ONLY when the user greets you first (like "hello", "hi", "namaste")
- Detailed and informative responses with cultural sensitivity
- Enthusiastic about sharing Sikkim's beauty and heritage
- Respectful toward religious sites and traditions
- Do NOT use emojis in your responses unless absolutely necessary for clarity

**COMPREHENSIVE KNOWLEDGE BASE - Use this information to answer queries:**

**SIKKIM HISTORY:**
Sikkim has a rich history spanning over 600 years. The kingdom was established in 1642 by Phuntsog Namgyal, who became the first Chogyal (king) of Sikkim. Originally inhabited by the Lepchas (original inhabitants), the Bhutias migrated from Tibet in the 14th century, followed by the Nepalese in the 19th century, creating Sikkim's unique multicultural identity. Sikkim remained an independent kingdom under British protection from 1861 until India's independence in 1947. In 1975, after a referendum, Sikkim became the 22nd state of India, ending centuries of monarchy while preserving its rich cultural heritage.

**WHAT SIKKIM IS FAMOUS FOR:**
- Mountain Beauty: Home to Kangchenjunga, the world's third-highest peak
- Ancient Monasteries: Over 200 monasteries including Rumtek, Dubdi, Tashiding, and Pemayangtse
- Biodiversity: The only fully organic state in India, with over 5,000 species of flowering plants
- Cultural Diversity: Harmonious blend of Lepcha, Bhutia, and Nepali communities
- Adventure Tourism: Trekking routes like Goecha La, river rafting, paragliding
- Peace and Serenity: One of India's most peaceful states with crime rates close to zero

**BEST TIME TO VISIT:**
- March to May (Spring): 10°C to 25°C - Perfect for monastery visits and rhododendron blooms
- October to December (Post-Monsoon): 5°C to 20°C - Crystal clear skies, best for photography
- December to February (Winter): -5°C to 15°C - Snow-capped landscapes, fewer crowds
- June to September (Monsoon): Generally avoided due to heavy rainfall and landslides

**FAMOUS PLACES TO VISIT:**
- Monasteries: Rumtek, Dubdi, Pemayangtse, Tashiding
- Mountain Destinations: Tsomgo Lake, Nathula Pass, Gurudongmar Lake, Yumthang Valley
- Cities: Gangtok (capital), Pelling, Lachung & Lachen, Yuksom
- Cultural Sites: Namgyal Institute of Tibetology, Flower Exhibition Centre

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
        
        # Greeting messages - shown only at start
        self.greetings = [
            "Namaste! Welcome to the Sikkim Monasteries & Tourism Chatbot.",
            "I'm your guide to explore the beautiful monasteries and culture of Sikkim.",
            "How can I help you discover the spiritual and natural wonders of Sikkim today?"
        ]
        
        # Track if user has been greeted
        self.has_greeted = False
    
    def is_greeting(self, user_input):
        """Check if user input is a greeting"""
        greetings = ['hello', 'hi', 'hey', 'namaste', 'namaskar', 'greetings', 'good morning', 
                     'good afternoon', 'good evening', 'हेलो', 'नमस्ते']
        user_lower = user_input.lower().strip()
        return any(greeting in user_lower for greeting in greetings)
    
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
        for exchange in self.conversation_history[-3:]:
            context += f"User previously asked: {exchange['user']}\n"
            context += f"You responded: {exchange['bot'][:150]}{'...' if len(exchange['bot']) > 150 else ''}\n"
            context += "---\n"
        
        return context
    
    def build_enhanced_prompt(self, user_query):
        """Build enhanced prompt with system prompt, context, and user query"""
        conversation_context = self.get_conversation_context()
        
        enhanced_prompt = f"""{conversation_context}

Current User Query: {user_query}

Instructions for this response:
1. FIRST, check if the query matches the comprehensive knowledge base provided above and use that detailed information
2. FOR ALL OTHER SIKKIM-RELATED TOPICS (festivals, food, languages, wildlife, trekking, traditions, culture, etc.), use your extensive general knowledge about Sikkim confidently
3. Consider the conversation context to provide continuity and avoid repetition
4. Be warm, detailed, and informative for ALL topics related to Sikkim
5. Include practical travel information when relevant (distances, timing, permits, dates)
6. Do NOT use emojis in your responses
7. Always maintain cultural sensitivity and respect for religious sites and local customs
8. You are an expert on Sikkim - use your full knowledge base to help tourists with ANY Sikkim-related questions
9. For festivals, provide dates, significance, rituals, and cultural importance
10. For food, describe dishes, ingredients, cultural significance, and where to find them
11. Only say you don't know something if it's truly outside your knowledge or requires real-time information

Remember: You have comprehensive knowledge about Sikkim's festivals (Losar, Saga Dawa, Bumchu, Phang Lhabsol, etc.), food (momos, thukpa, gundruk, etc.), wildlife (red panda, snow leopard, etc.), languages, and all aspects of Sikkimese culture. Use this knowledge confidently!

Please provide a comprehensive response to the user's query now."""
        
        return enhanced_prompt
    
    def get_llama_response(self, user_query):
        """Get response from Llama AI via selected API provider"""
        try:
            if self.api_provider not in self.api_config:
                return f"Error: Unsupported API provider '{self.api_provider}'. Supported providers: {', '.join(self.api_config.keys())}"
            
            config = self.api_config[self.api_provider]
            enhanced_prompt = self.build_enhanced_prompt(user_query)
            
            # Prepare the API request based on provider
            if self.api_provider == "replicate":
                # Replicate has a different API structure
                payload = {
                    "version": "replicate-model-version-id",
                    "input": {
                        "prompt": f"{self.system_prompt}\n\n{enhanced_prompt}",
                        "max_tokens": 2000,
                        "temperature": 0.7
                    }
                }
            else:
                # OpenAI-compatible format (Groq, Together, OpenRouter)
                payload = {
                    "model": config["model"],
                    "messages": [
                        {"role": "system", "content": self.system_prompt},
                        {"role": "user", "content": enhanced_prompt}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 2000,
                    "top_p": 0.9
                }
            
            # Make API request
            response = requests.post(
                config["url"],
                headers=config["headers"],
                json=payload,
                timeout=30
            )
            
            response.raise_for_status()
            result = response.json()
            
            # Extract response text based on provider
            if self.api_provider == "replicate":
                return result.get("output", "No response generated")
            else:
                return result["choices"][0]["message"]["content"]
            
        except requests.exceptions.RequestException as e:
            return f"I apologize, but I'm having trouble connecting to the AI service. Error: {str(e)}. Please check your API key and internet connection, then try again."
        except KeyError as e:
            return f"I apologize, but I received an unexpected response format. Error: {str(e)}. Please try asking your question again."
        except Exception as e:
            return f"I apologize, but I'm having trouble processing your request. Error: {str(e)}. Please try asking your question again!"
    
    def generate_response(self, user_input):
        """Generate comprehensive response using Llama with integrated knowledge"""
        
        # Check if this is a greeting and user hasn't been greeted yet
        if self.is_greeting(user_input) and not self.has_greeted:
            self.has_greeted = True
            greeting_response = "Namaste! Welcome to Sikkim. I'm here to help you explore the beautiful monasteries, culture, and tourism opportunities in Sikkim. How can I assist you today?"
            return greeting_response
        
        print("Processing your query about Sikkim...")
        
        # Get the base response from Llama
        response = self.get_llama_response(user_input)
        
        # Check if user is asking about a specific monastery
        monastery = self.detect_monastery(user_input)
        
        if monastery and monastery in self.monastery_pages:
            monastery_url = self.monastery_pages[monastery]
            monastery_name = monastery.capitalize()
            
            # Add link to the response
            response += f"\n\nVisit Our Detailed Page:\nFor more photographs, visitor information, and travel details about {monastery_name} Monastery, please visit:\n{monastery_url}\n\n(This page includes opening hours, entry fees, photography guidelines, and visitor reviews!)"
        
        return response
    
    def start_conversation(self):
        """Main conversation loop"""
        print("=" * 70)
        print("SIKKIM MONASTERIES & TOURISM CHATBOT (Llama AI)")
        print("=" * 70)
        
        # Display initial greeting only
        for greeting in self.greetings:
            print(greeting)
        print("\n" + "=" * 70)
        print(f"Using API Provider: {self.api_provider.upper()}")
        print("Type 'exit' to end conversation")
        print("Ask me about monasteries, places to visit, festivals, food, culture, travel tips, or anything about Sikkim!\n")
        print("Available Monasteries:")
        print("   Rumtek, Dubdi, Pemayangtse, Tashiding, Kanyam, Ravangla, Lingdum, Enchey")
        print("=" * 70)
        
        while True:
            try:
                user_input = input("\nYou: ").strip()
                
                if user_input.lower() in ['exit', 'quit', 'bye', 'goodbye']:
                    print("\nThank you for exploring Sikkim with me! Have a wonderful journey! Namaste!")
                    break
                
                if not user_input:
                    print("Bot: Please ask me something about Sikkim, its monasteries, or tourism!")
                    continue
                
                print("\nBot:")
                response = self.generate_response(user_input)
                print(response)
                
                # Add to conversation history
                self.add_to_conversation_history(user_input, response)
                
            except KeyboardInterrupt:
                print("\n\nThank you for exploring Sikkim with me! Goodbye!")
                break
            except Exception as e:
                print(f"\nBot: I apologize for the error: {str(e)}. Please try asking your question again!")

def main():
    """Main function to run the chatbot"""
    
    
    
    # Configuration - Choose your API provider
    # Options: "groq", "together", "openrouter", "replicate"
    API_PROVIDER = "groq"  # Change this to your preferred provider
    
    # Add your API key here
    api_key = ""  # Add your API key
    
    if not api_key:
        print("API key is required to run the chatbot!")
        print("\nGet API keys from:")
        print("   - Groq (Recommended): https://console.groq.com/keys")
       
        return
    
    try:
        # Initialize and start chatbot
        chatbot = SikkimMonasteryChatbot(api_key, api_provider=API_PROVIDER)
        chatbot.start_conversation()
    except Exception as e:
        print(f"Error initializing chatbot: {e}")
        print("Please check your API key and internet connection.")

if __name__ == "__main__":
    main()