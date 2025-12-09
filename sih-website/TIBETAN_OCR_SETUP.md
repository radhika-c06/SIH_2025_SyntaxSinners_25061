# Tibetan OCR Verifier - Setup Guide

## Overview
The Tibetan OCR Verifier uses Claude AI (Anthropic) to verify the accuracy of Tesseract OCR results for Tibetan text.

## Prerequisites

You need an **Anthropic API Key** to use this feature.

## Step-by-Step Setup

### 1. Get Your API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **Create Key**
5. Copy your API key (it will look like: `sk-ant-...`)

### 2. Add to Environment Variables

1. Open `.env.local` file in the project root:
   ```
   sih-website/.env.local
   ```

2. Add your API key:
   ```
   NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your_actual_key_here
   ```

3. Save the file

### 3. Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Usage

1. Go to **Media Contribution** → **OCR Section**
2. Select **Tibetan** language
3. Upload an image with Tibetan text
4. Run OCR extraction (using Tesseract)
5. Click **"Verify Tibetan Text Accuracy"** button
6. The AI will:
   - Analyze the actual characters in the image
   - Compare with Tesseract output
   - Show accuracy percentage
   - List errors and corrections
   - Provide character-by-character breakdown

## Features

✅ **AI-Powered Verification** - Uses Claude AI for accurate analysis
✅ **Character Dataset** - Validates against Tibetan script reference
✅ **Accuracy Metrics** - Shows percentage correct
✅ **Error Detection** - Lists specific OCR errors
✅ **Auto-Correction** - Suggests corrected text
✅ **Detailed Analysis** - Position-by-position character comparison

## Troubleshooting

### Error: "API key not configured"
- Make sure `.env.local` has `NEXT_PUBLIC_ANTHROPIC_API_KEY`
- Restart the dev server
- Check that the key starts with `sk-ant-`

### Error: "Failed to fetch"
- Check your internet connection
- Verify API key is correct
- Check that API key has not expired
- Look at browser console for detailed error

### Error: "API Error"
- Verify API key is valid at https://console.anthropic.com/
- Check that you have API credits available
- Ensure rate limits haven't been exceeded

## API Pricing

Anthropic offers:
- **Free tier** with credits to get started
- **Pay-as-you-go** pricing based on token usage
- Claude 3.5 Sonnet is recommended for this feature

Check current pricing at: https://www.anthropic.com/pricing

## Environment File Example

```
# .env.local

MONGODB_URI=mongodb://localhost:27017/sih-database

# Anthropic API Key for Tibetan OCR Verification
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-v1-xxxxxxxxxxxx

# Node environment
NODE_ENV=development
```

## Support

For issues or questions:
1. Check the browser console (F12) for error details
2. Verify API key configuration
3. Test with a simple Tibetan text image first
4. Contact Anthropic support: https://support.anthropic.com/

---

**Last Updated:** December 9, 2025
