const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");

class OCRService {
  /**
   * Extract text from image using Tesseract OCR
   * Supports English, Nepali (nep), and Tibetan (tib) languages
   * @param {string} imagePath - Path to the image file
   * @returns {Promise<Object>} - Extracted text and confidence score
   */
  static async extractTextFromImage(imagePath) {
    try {
      if (!fs.existsSync(imagePath)) {
        throw new Error(`Image file not found: ${imagePath}`);
      }

      console.log(`Starting OCR on: ${imagePath}`);

      // Initialize Tesseract with multiple languages
      // Note: For Nepali and Tibetan support, ensure language data is available
      const result = await Tesseract.recognize(imagePath, ["eng", "nep"], {
        logger: (m) => console.log(`OCR Progress: ${m.status} ${m.progress * 100}%`),
      });

      const extractedText = result.data.text.trim();
      const confidence = result.data.confidence;

      console.log(`OCR Complete. Confidence: ${confidence}%`);

      return {
        success: true,
        extractedText,
        confidence: confidence / 100, // Convert to decimal
        rawData: result.data,
      };
    } catch (error) {
      console.error("OCR Error:", error.message);
      return {
        success: false,
        error: error.message,
        extractedText: "",
        confidence: 0,
      };
    }
  }

  /**
   * Extract monastery-related information from OCR text
   * Identifies keywords and patterns typical of monastery documentation
   * @param {string} text - Extracted text from OCR
   * @returns {Object} - Structured data with suggestions
   */
  static extractMonasteryInfo(text) {
    const monasteryKeywords = [
      "gompa",
      "monastery",
      "lhakhang",
      "chorten",
      "lama",
      "temple",
      "buddhist",
      "dharma",
      "sangha",
      "stupa",
      "pagoda",
    ];

    const locationKeywords = [
      "sikkim",
      "darjeeling",
      "west bengal",
      "himalayan",
      "mountain",
      "valley",
      "village",
      "district",
      "nepal",
      "bhutan",
      "tibet",
    ];

    const textLower = text.toLowerCase();
    let suggestedName = "";
    let suggestedLocation = "";
    let detectedKeywords = [];

    // Extract lines that might contain monastery name
    const lines = text.split("\n").filter((line) => line.trim().length > 0);

    // Find monastery name - usually first meaningful line with monastery keyword
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      const hasMonasteryKeyword = monasteryKeywords.some((kw) =>
        lowerLine.includes(kw)
      );

      if (hasMonasteryKeyword && suggestedName === "") {
        suggestedName = line.trim();
        break;
      }

      // Alternative: extract alphanumeric name from first line if no keyword found
      if (suggestedName === "" && line.match(/^[A-Za-z\s]+$/)) {
        suggestedName = line.trim();
      }
    }

    // Find location - look for location keywords in text
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      const hasLocationKeyword = locationKeywords.some((kw) =>
        lowerLine.includes(kw)
      );

      if (hasLocationKeyword && suggestedLocation === "") {
        suggestedLocation = line.trim();
        break;
      }
    }

    // Detect all monastery-related keywords
    for (const keyword of monasteryKeywords) {
      if (textLower.includes(keyword)) {
        detectedKeywords.push(keyword);
      }
    }

    return {
      suggestedName: suggestedName || "Unknown Monastery",
      suggestedLocation: suggestedLocation || "Location not identified",
      detectedKeywords: [...new Set(detectedKeywords)], // Remove duplicates
      fullText: text,
    };
  }

  /**
   * Find matching monastery in database
   * @param {string} name - Monastery name to search
   * @param {Object} mongooseModel - Monastery model reference
   * @returns {Promise<Array>} - Matching monastery records
   */
  static async findMatchingMonasteries(name, MonasteryModel) {
    try {
      if (!name || !MonasteryModel) {
        return [];
      }

      // Create regex pattern for flexible matching
      const searchPattern = new RegExp(name.replace(/\s+/g, ".*"), "i");

      const matches = await MonasteryModel.find({
        $or: [
          { name: searchPattern },
          { alternateNames: searchPattern },
          { keywords: name.toLowerCase() },
        ],
      }).limit(5);

      return matches.map((m) => ({
        id: m._id,
        name: m.name,
        location: m.location,
        district: m.district,
        matchScore: this.calculateMatchScore(name, m.name),
      }));
    } catch (error) {
      console.error("Database search error:", error.message);
      return [];
    }
  }

  /**
   * Calculate similarity score between search term and monastery name
   * @param {string} searchTerm - User input
   * @param {string} mongoName - Monastery name from DB
   * @returns {number} - Score between 0-100
   */
  static calculateMatchScore(searchTerm, mongoName) {
    const s1 = searchTerm.toLowerCase().trim();
    const s2 = mongoName.toLowerCase().trim();

    if (s1 === s2) return 100;
    if (s2.includes(s1)) return 80;
    if (s1.includes(s2)) return 75;

    // Levenshtein distance for partial matches
    const distance = this.levenshteinDistance(s1, s2);
    const maxLen = Math.max(s1.length, s2.length);
    return Math.max(0, 100 - (distance / maxLen) * 100);
  }

  /**
   * Calculate Levenshtein distance between two strings
   * @param {string} s1
   * @param {string} s2
   * @returns {number}
   */
  static levenshteinDistance(s1, s2) {
    const len1 = s1.length;
    const len2 = s2.length;
    const d = [];

    for (let i = 0; i <= len1; i++) {
      d[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
      d[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        d[i][j] = Math.min(
          d[i - 1][j] + 1,
          d[i][j - 1] + 1,
          d[i - 1][j - 1] + cost
        );
      }
    }

    return d[len1][len2];
  }
}

module.exports = OCRService;
