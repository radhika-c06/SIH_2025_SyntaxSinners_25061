'use client';

import React, { useState } from 'react';
import { mockVerifyOCR } from '@/lib/mockOCRVerifier';

interface VerificationResult {
  actual_characters: string;
  tesseract_output: string;
  is_correct: boolean;
  accuracy_percentage: number;
  correct_ocr: string;
  errors_found: string[];
  character_by_character: Array<{
    position: number;
    expected: string;
    got: string;
    correct: boolean;
  }>;
}

interface TibetanOCRVerifierProps {
  tesseractOutput?: string;
  imageData?: string;
  onVerificationComplete?: (results: VerificationResult) => void;
}

const TibetanOCRVerifier: React.FC<TibetanOCRVerifierProps> = ({
  tesseractOutput = '',
  imageData = '',
  onVerificationComplete,
}) => {
  const [image, setImage] = useState<string | null>(imageData || null);
  const [tesseractOCR, setTesseractOCR] = useState<string>(tesseractOutput || '');
  const [verifying, setVerifying] = useState(false);
  const [results, setResults] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tibetanDataset = `tibetan_character,romanization,type
ཀ,ka,consonant
ཁ,k'a,consonant
ག,g'a,consonant
ང,nga,consonant
ཅ,cha,consonant
ཆ,ch'a,consonant
ཇ,j'a,consonant
ཉ,nya,consonant
ཏ,ta,consonant
ཐ,t'a,consonant
ད,d'a,consonant
ན,na,consonant
པ,pa,consonant
ཕ,p'a,consonant
བ,b'a,consonant
མ,ma,consonant
ཙ,tsa,consonant
ཚ,ts'a,consonant
ཛ,dz'a,consonant
ཝ,wa,consonant
ཞ,zha,consonant
ཟ,za,consonant
འ,'a,consonant
ཡ,ya,consonant
ར,ra,consonant
ལ,la,consonant
ཤ,sha,consonant
ས,sa,consonant
ཧ,ha,consonant
ཨ,a,consonant
ཱི,i,vowel_modifier
ུ,u,vowel_modifier
ེ,e,vowel_modifier
ོ,o,vowel_modifier`;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const verifyOCR = async () => {
    if (!image || !tesseractOCR.trim()) {
      setError('Please upload an image and enter Tesseract OCR output');
      return;
    }

    setVerifying(true);
    setResults(null);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
      const hasValidApiKey = apiKey && apiKey !== 'your-anthropic-api-key-here';

      if (!hasValidApiKey) {
        console.log('Using mock verification (no API key configured)');
        const mockResults = await mockVerifyOCR(tesseractOCR);
        setResults(mockResults);
        if (onVerificationComplete) {
          onVerificationComplete(mockResults);
        }
        return;
      }

      // Use real API if key is available
      const imageData = image.split(',')[1];
      const mimeType = image.split(',')[0].split(':')[1].split(';')[0];

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: mimeType,
                    data: imageData,
                  },
                },
                {
                  type: 'text',
                  text: `You are a Tibetan OCR verification expert. Here is the Tibetan script reference dataset:

${tibetanDataset}

The Tesseract OCR output for the uploaded image is:
"${tesseractOCR}"

Please analyze the image carefully and:
1. Identify what Tibetan characters are actually shown in the image
2. Compare them with the Tesseract output
3. Calculate the accuracy percentage
4. Provide the correct OCR output if Tesseract was wrong

You MUST respond with ONLY a valid JSON object (no markdown formatting, no backticks, no explanation):
{
  "actual_characters": "the correct Tibetan characters from the image",
  "tesseract_output": "${tesseractOCR}",
  "is_correct": true,
  "accuracy_percentage": 95,
  "correct_ocr": "the correct output",
  "errors_found": ["error 1", "error 2"],
  "character_by_character": [
    {"position": 1, "expected": "ཀ", "got": "ཀ", "correct": true}
  ]
}`,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.error?.message || response.statusText;
        throw new Error(`API Error (${response.status}): ${errorMsg}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      let responseText = '';
      if (data.content && Array.isArray(data.content)) {
        responseText = data.content
          .filter((item: any) => item.type === 'text')
          .map((item: any) => item.text)
          .join('');
      }

      console.log('Response Text:', responseText);

      // Clean up the response - remove markdown code blocks and extra whitespace
      let cleanText = responseText
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .trim();

      console.log('Clean Text:', cleanText);

      // Try to find JSON object in the response
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }

      const parsedResults = JSON.parse(cleanText) as VerificationResult;
      console.log('Parsed Results:', parsedResults);

      setResults(parsedResults);
      if (onVerificationComplete) {
        onVerificationComplete(parsedResults);
      }
    } catch (err) {
      console.error('Verification error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';

      if (errorMessage.includes('API')) {
        setError(`API Error: ${errorMessage}. Please check your API key configuration.`);
      } else if (errorMessage.includes('Failed to fetch')) {
        setError('Network error: Unable to reach Anthropic API. Please check your internet connection and API key.');
      } else {
        setError(`Error: ${errorMessage}. Please check the browser console for details.`);
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tibetan OCR Verifier</h1>
          <p className="text-gray-600 mb-8">Upload an image and verify Tesseract OCR accuracy using AI</p>

          {/* Setup Guide */}
          {(!process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY === 'your-anthropic-api-key-here') && (
            <div className="mb-6 bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
              <p className="text-amber-800 font-semibold mb-2">🧪 Running in Demo Mode</p>
              <p className="text-amber-700 text-sm mb-3">The verifier is using mock data for testing. To use real AI verification with Claude:</p>
              <ol className="text-amber-700 text-sm space-y-2 ml-4 list-decimal">
                <li>Get a free API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-amber-900">Anthropic Console</a></li>
                <li>Add it to your <code className="bg-white px-2 py-1 rounded">.env.local</code> file:</li>
                <li className="font-mono bg-white px-3 py-2 rounded text-gray-800">NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your_key_here</li>
                <li>Restart the development server</li>
              </ol>
              <p className="text-amber-600 text-xs mt-3 font-semibold">📌 Demo mode shows simulated results - real API will provide accurate Tibetan verification</p>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3">
              <svg className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Tibetan Script Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  {image ? (
                    <img src={image} alt="Uploaded" className="max-h-48 mx-auto rounded" />
                  ) : (
                    <div>
                      <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-sm text-gray-600">Click to upload image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Tesseract Output */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tesseract OCR Output
              </label>
              <textarea
                value={tesseractOCR}
                onChange={(e) => setTesseractOCR(e.target.value)}
                placeholder="Paste the OCR output from Tesseract here...&#10;Example: ཀ ཁ ག ང"
                className="w-full h-48 p-4 border-2 border-gray-300 rounded-xl focus:border-orange-400 focus:outline-none font-mono"
              />
            </div>
          </div>

          <button
            onClick={verifyOCR}
            disabled={verifying || !image || !tesseractOCR.trim()}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {verifying ? 'Verifying with AI...' : 'Verify OCR Accuracy'}
          </button>

          {/* Results */}
          {results && (
            <div className="mt-8 space-y-6">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Verification Results</h2>
                  {results.is_correct ? (
                    <svg className="h-8 w-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Accuracy</p>
                    <p className="text-3xl font-bold text-orange-600">{results.accuracy_percentage}%</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p className="text-xl font-semibold">{results.is_correct ? 'Correct ✓' : 'Needs Correction ✗'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Actual Characters in Image:</p>
                    <p className="text-2xl">{results.actual_characters}</p>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-800 mb-2">Tesseract Output:</p>
                    <p className="text-2xl text-blue-900">{results.tesseract_output}</p>
                  </div>

                  {!results.is_correct && (
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                      <p className="text-sm font-semibold text-green-800 mb-2">✓ Correct OCR Output:</p>
                      <p className="text-2xl text-green-900">{results.correct_ocr}</p>
                    </div>
                  )}

                  {results.errors_found && results.errors_found.length > 0 && (
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                      <p className="text-sm font-semibold text-red-800 mb-2">Errors Found:</p>
                      <ul className="list-disc list-inside text-red-900 space-y-1">
                        {results.errors_found.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Character by Character Analysis */}
              {results.character_by_character && results.character_by_character.length > 0 && (
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Character-by-Character Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-sm font-semibold">Position</th>
                          <th className="px-4 py-2 text-sm font-semibold">Expected</th>
                          <th className="px-4 py-2 text-sm font-semibold">Got</th>
                          <th className="px-4 py-2 text-sm font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.character_by_character.map((char, idx) => (
                          <tr key={idx} className={char.correct ? 'bg-green-50' : 'bg-red-50'}>
                            <td className="px-4 py-2 border-t">{char.position}</td>
                            <td className="px-4 py-2 border-t text-2xl">{char.expected}</td>
                            <td className="px-4 py-2 border-t text-2xl">{char.got}</td>
                            <td className="px-4 py-2 border-t">
                              {char.correct ? (
                                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TibetanOCRVerifier;
