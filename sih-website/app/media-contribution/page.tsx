"use client";
import { useState, useRef } from "react";
import Link from "next/link";

export default function MediaContributionPage() {
  const [selectedType, setSelectedType] = useState<"photo" | "video">("photo");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log(`Selected ${files.length} file(s):`, Array.from(files).map(f => f.name));
      // Here you can handle the file upload logic
      alert(`${files.length} file(s) selected successfully!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d1810] via-[#3d1f10] to-[#2d1810]">
      {/* Header */}
      <header className="bg-[#0c3b44] text-white py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo web.png" alt="Logo" className="h-10 w-10 object-contain" />
            <span className="font-poppins text-xl">Sangha</span>
          </Link>
          <Link href="/" className="text-sm hover:opacity-80">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 p-3 rounded-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white font-poppins">Media Contributions</h1>
              <p className="text-amber-200 text-lg mt-1">Share high-quality imagery</p>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed mt-6">
            Contribute photographs, videos, 3D models, and panoramas to help create comprehensive visual 
            documentation of heritage sites.
          </p>
        </div>

        {/* Square Box Toggle Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-amber-200 mb-4">Select Contribution Type</h3>
          <div className="grid grid-cols-2 gap-6 max-w-2xl">
            {/* Photo Box */}
            <button
              onClick={() => setSelectedType("photo")}
              className={`aspect-square rounded-lg border-2 transition-all ${
                selectedType === "photo"
                  ? "border-amber-500 bg-amber-600/20"
                  : "border-amber-900/30 bg-[rgba(41,24,10,0.8)] hover:border-amber-700"
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className={`p-4 rounded-lg mb-4 ${
                  selectedType === "photo" ? "bg-amber-600" : "bg-amber-600/60"
                }`}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white font-poppins">Photo</h3>
                <p className="text-sm text-gray-300 mt-2">Images & Photographs</p>
              </div>
            </button>

            {/* Video Box */}
            <button
              onClick={() => setSelectedType("video")}
              className={`aspect-square rounded-lg border-2 transition-all ${
                selectedType === "video"
                  ? "border-amber-500 bg-amber-600/20"
                  : "border-amber-900/30 bg-[rgba(41,24,10,0.8)] hover:border-amber-700"
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className={`p-4 rounded-lg mb-4 ${
                  selectedType === "video" ? "bg-amber-600" : "bg-amber-600/60"
                }`}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white font-poppins">Video</h3>
                <p className="text-sm text-gray-300 mt-2">Video Footage</p>
              </div>
            </button>
          </div>
        </div>

        {/* Guidelines Section */}
        <div className="bg-[rgba(41,24,10,0.8)] border border-amber-900/30 rounded-lg p-6 mb-8">
          {selectedType === "photo" ? (
            <>
              <h3 className="text-2xl font-semibold text-amber-200 mb-4">Photo Contribution Guidelines</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Resolution:</strong> Minimum 3000x2000 pixels (6 megapixels) recommended</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Format:</strong> JPEG, PNG, or TIFF formats accepted</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Quality:</strong> Clear, well-lit images without blur or distortion</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Content:</strong> Focus on architectural details, artifacts, murals, and landscape views</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Metadata:</strong> Include location, date, and brief description of the subject</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Restrictions:</strong> No watermarks, filters, or heavy editing. Natural lighting preferred</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Rights:</strong> You must own full rights to the image and grant permission for archival use</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Privacy:</strong> Avoid capturing identifiable individuals without consent</span>
                </li>
              </ul>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold text-amber-200 mb-4">Video Contribution Guidelines</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Resolution:</strong> Minimum 1080p (1920x1080) HD quality, 4K preferred</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Format:</strong> MP4, MOV, or AVI formats with H.264 codec</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Duration:</strong> 30 seconds to 10 minutes per video clip</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Stability:</strong> Use tripod or stabilization for smooth footage</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Audio:</strong> Clear audio without excessive background noise. Narration optional</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Content:</strong> Walkthrough tours, ceremonies, cultural practices, and site overviews</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">File Size:</strong> Maximum 2GB per file. Compress if necessary without quality loss</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Restrictions:</strong> No music with copyright restrictions. Natural ambient sound preferred</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Rights:</strong> You must own full rights to the footage and grant permission for archival use</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span><strong className="text-white">Privacy:</strong> Obtain consent if filming ceremonies or identifiable individuals</span>
                </li>
              </ul>
            </>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={selectedType === "photo" ? "image/jpeg,image/png,image/tiff" : "video/mp4,video/mov,video/avi"}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Submit Button */}
        <div className="flex justify-center">
          <button 
            onClick={handleSubmit}
            className="px-12 py-4 bg-amber-600 hover:bg-amber-700 text-white text-lg rounded-lg font-semibold transition-colors shadow-lg"
          >
            Submit Contribution
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-[rgba(41,24,10,0.6)] border border-amber-900/30 rounded-lg">
          <h3 className="text-xl font-semibold text-amber-200 mb-3">Need Help?</h3>
          <p className="text-gray-300 mb-4">
            If you have questions about media contributions or need technical assistance, please contact our support team.
          </p>
          <a href="mailto:support@sihsangha.com" className="text-amber-400 hover:text-amber-300 underline">
            support@sihsangha.com
          </a>
        </div>
      </main>
    </div>
  );
}
