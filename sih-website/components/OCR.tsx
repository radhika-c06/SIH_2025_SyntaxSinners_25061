"use client";
import { useState } from "react";
import Tesseract from "tesseract.js";

export default function OCR() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['eng', 'hin', 'nep', 'bod']);
  
  const languageOptions = [
    { code: 'eng', name: 'English' },
    { code: 'hin', name: 'Hindi' },
    { code: 'nep', name: 'Nepali' },
    { code: 'ben', name: 'Bengali' },
    { code: 'bod', name: 'Tibetan' },
  ];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const preprocessImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas not supported'));
            return;
          }

          canvas.width = img.width;
          canvas.height = img.height;

          // Draw original image
          ctx.drawImage(img, 0, 0);

          // Get image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Convert to grayscale and increase contrast
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            // Increase contrast
            const contrast = 1.5;
            const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
            const newValue = factor * (avg - 128) + 128;
            const clampedValue = Math.max(0, Math.min(255, newValue));
            
            data[i] = data[i + 1] = data[i + 2] = clampedValue;
          }

          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const startOCR = async () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    // Start OCR
    setIsLoading(true);
    setText("");
    setProgress(0);

    try {
      console.log("Starting OCR process...");
      
      // Preprocess image for better OCR
      console.log("Preprocessing image...");
      const processedImage = await preprocessImage(selectedFile);
      
      // Use createWorker with selected languages (including Tibetan)
      console.log("Loading languages:", selectedLanguages);
      const worker = await Tesseract.createWorker(selectedLanguages, 1, {
        logger: (m) => {
          console.log("OCR Progress:", m);
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          } else if (m.status === "loading tesseract core" || m.status === "initializing tesseract" || m.status === "loading language traineddata") {
            setProgress(Math.round(m.progress * 50)); // First 50% for loading
          }
        },
      });

      // Set parameters optimized for artistic/painted text
      await worker.setParameters({
        tessedit_pageseg_mode: Tesseract.PSM.AUTO,
        tessedit_char_whitelist: '',
        preserve_interword_spaces: '1',
      });
      
      // Try recognition with preprocessed image
      console.log("Attempting OCR with preprocessed image...");
      const result = await worker.recognize(processedImage);
      
      console.log("OCR Result:", result.data);
      
      let finalText = result.data.text.trim();
      
      // If no text found with preprocessed image, try original
      if (!finalText) {
        console.log("Trying with original image...");
        const originalResult = await worker.recognize(selectedFile);
        finalText = originalResult.data.text.trim();
      }
      
      await worker.terminate();
      
      if (finalText) {
        setText(finalText);
      } else {
        setText("No text found in the image. This image may contain artistic or stylized text that is difficult to recognize. For best results:\n\n• Use images with clear, printed text\n• Ensure good lighting and contrast\n• Avoid heavily stylized fonts\n• Try photographing text straight-on");
      }
    } catch (error) {
      console.error("OCR Error:", error);
      setText(`Error extracting text: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Section */}
      <div className="bg-[rgba(41,24,10,0.8)] border border-amber-900/30 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-amber-200 mb-4">
          Upload Image for OCR
        </h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="block w-full text-sm text-gray-300
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-amber-600 file:text-white
            hover:file:bg-amber-700 file:cursor-pointer
            cursor-pointer"
        />
        <p className="text-gray-400 text-sm mt-2">
          Supports multiple languages including Tibetan script
        </p>
        <p className="text-amber-300 text-xs mt-1">
          💡 Tip: For best results, use high-contrast images with clear, well-lit text
        </p>

        {/* Language Selection */}
        <div className="mt-4">
          <label className="text-amber-200 text-sm font-semibold mb-2 block">
            Select Languages for Recognition:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {languageOptions.map((lang) => (
              <label
                key={lang.code}
                className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors ${
                  selectedLanguages.includes(lang.code)
                    ? 'bg-amber-600/30 border-amber-500'
                    : 'bg-gray-900/50 border-amber-900/30 hover:border-amber-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(lang.code)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLanguages([...selectedLanguages, lang.code]);
                    } else {
                      setSelectedLanguages(selectedLanguages.filter(l => l !== lang.code));
                    }
                  }}
                  className="w-4 h-4 accent-amber-600"
                />
                <span className="text-gray-300 text-sm">{lang.name}</span>
              </label>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-2">
            Select at least one language. More languages may take longer to process.
          </p>
        </div>
        
        {selectedFile && !isLoading && selectedLanguages.length > 0 && (
          <button
            onClick={startOCR}
            className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
          >
            Start OCR
          </button>
        )}
        
        {selectedFile && !isLoading && selectedLanguages.length === 0 && (
          <p className="mt-4 text-amber-400 text-sm">
            Please select at least one language to proceed.
          </p>
        )}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="bg-[rgba(41,24,10,0.8)] border border-amber-900/30 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <div className="flex-1">
              <p className="text-white font-semibold mb-2">
                {progress < 50 ? "Loading OCR engine..." : "Extracting text..."} {progress}%
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                First-time load may take 30-60 seconds to download language files
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {image && (
        <div className="bg-[rgba(41,24,10,0.8)] border border-amber-900/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-amber-200 mb-4">
            Image Preview
          </h3>
          <img
            src={image}
            alt="Uploaded"
            className="max-w-full h-auto rounded-lg border border-amber-900/50"
          />
        </div>
      )}

      {/* Extracted Text */}
      {text && !isLoading && (
        <div className="bg-[rgba(41,24,10,0.8)] border border-amber-900/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-amber-200 mb-4">
            OCR
          </h3>
          <pre className="bg-gray-900/50 border border-amber-900/30 rounded-lg p-4 text-gray-200 whitespace-pre-wrap font-mono text-sm max-h-96 overflow-y-auto">
            {text}
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(text)}
            className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
          >
            Copy Text
          </button>
        </div>
      )}
    </div>
  );
}
