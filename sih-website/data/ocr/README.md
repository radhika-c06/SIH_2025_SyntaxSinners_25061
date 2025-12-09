# OCR Data Archive

This directory stores OCR (Optical Character Recognition) extracted text from monastery images.

## Structure

- `*.json` - OCR metadata and text records
- `images/` - Original images that were processed

## JSON Record Format

```json
{
  "id": 1234567890,
  "title": "Tashiding Monastery Board",
  "language": "Nepali",
  "capturedOn": "2025-01-04",
  "location": "West Sikkim",
  "monasteryName": "Tashiding Monastery",
  "description": "Information board at monastery entrance",
  "tags": ["monastery", "sikkim", "heritage", "buddhist"],
  "rawText": "Raw OCR output with potential errors",
  "cleanedText": "Cleaned and corrected text",
  "createdAt": "2025-01-04T10:30:00.000Z",
  "status": "pending"
}
```

## Features

- ✅ Multi-language OCR (English, Hindi, Nepali, Bengali, Tibetan)
- ✅ Automatic text cleaning
- ✅ Manual text correction
- ✅ Rich metadata capture
- ✅ Tag-based organization
- ✅ Image preservation

## Usage

OCR records are created via the Media Contributions page when users:
1. Upload monastery images
2. Extract text using OCR
3. Review and clean the text
4. Add metadata (location, date, tags, etc.)
5. Submit for archiving
