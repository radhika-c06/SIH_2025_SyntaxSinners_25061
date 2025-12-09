"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function DataContributionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    monastery: "",
    dataType: "",
    location: "",
    altitude: "",
    founded: "",
    description: "",
    historicalPeriod: "",
    sourceReference: "",
    overview: "",
    history: "",
    architecture: "",
    rituals: "",
    bestVisitTime: "",
    travelInfo: "",
    terms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const monasteries = ["Dubdi", "Rumtek", "Tashiding", "Tsuk"];
  const dataTypes = [
    "Historical Records",
    "Archaeological Data",
    "Textual Information",
    "Architectural Details",
    "Cultural Information",
    "Genealogical Data",
    "Linguistic Data",
    "Other"
  ];
  const languages = ["English", "Nepali", "Hindi", "Tibetan", "Bengali", "Other"];
  const historicalPeriods = [
    "Pre-17th Century",
    "17th Century",
    "18th Century",
    "19th Century",
    "20th Century",
    "Contemporary",
    "Unknown",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email format";
    if (!formData.monastery.trim()) newErrors.monastery = "Monastery name is required";
    if (!formData.dataType) newErrors.dataType = "Please select a data type";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.altitude.trim()) newErrors.altitude = "Altitude is required";
    if (!formData.founded.trim()) newErrors.founded = "Founded year/date is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.terms)
      newErrors.terms = "You must agree to the terms and conditions";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form data to API
    submitDataContribution();
  };

  const submitDataContribution = async () => {
    try {
      const response = await fetch('/api/data-contribution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data contribution');
      }

      const result = await response.json();
      console.log('Submission successful:', result);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          organization: "",
          monastery: "",
          dataType: "",
          location: "",
          altitude: "",
          founded: "",
          description: "",
          historicalPeriod: "",
          sourceReference: "",
          overview: "",
          history: "",
          architecture: "",
          rituals: "",
          bestVisitTime: "",
          travelInfo: "",
          terms: false,
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting data contribution:', error);
      setErrors({
        submit: 'Failed to submit your contribution. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d1810] via-[#3d1f10] to-[#2d1810]">
      <Nav />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 mt-20">
        {/* Success Modal Popup */}
        {submitted && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-amber-900 to-amber-950 border-2 border-amber-500/60 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border-3 border-green-400 animate-pulse">
                  <svg className="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Success Title */}
              <h2 className="text-3xl font-bold text-white text-center mb-2">
                ✨ Success!
              </h2>
              
              {/* Success Message */}
              <p className="text-amber-100 text-center mb-6 leading-relaxed text-lg">
                Your data contribution has been submitted successfully!
              </p>

              {/* Submission Details */}
              <div className="bg-amber-900/50 rounded-lg p-4 mb-6 border border-amber-600/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-amber-200 font-semibold">Monastery:</span>
                  <span className="text-amber-100">{formData.monastery}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-200 font-semibold">Data Type:</span>
                  <span className="text-amber-100">{formData.dataType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-200 font-semibold">Status:</span>
                  <span className="text-yellow-300 font-bold">⏳ Pending Review</span>
                </div>
              </div>

              {/* Notification Info */}
              <div className="bg-blue-900/30 rounded-lg p-4 mb-6 border border-blue-500/40">
                <p className="text-blue-200 text-sm text-center">
                  📧 A confirmation has been sent to<br />
                  <span className="font-semibold">{formData.email}</span>
                </p>
              </div>

              {/* Additional Info */}
              <div className="bg-amber-900/30 rounded-lg p-3 mb-6 border border-amber-700/30">
                <p className="text-amber-200 text-xs text-center leading-relaxed">
                  Our team will review your submission shortly. Thank you for contributing to the preservation of our monastery heritage! 🙏
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setSubmitted(false);
                  setErrors({});
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold rounded-lg transition-all shadow-lg transform hover:scale-105 active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Introduction Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white font-poppins">
                Data Contributions
              </h1>
              <p className="text-amber-200 text-lg mt-1">
                Share valuable historical and cultural data
              </p>
            </div>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mt-6">
            Help preserve and document the rich heritage of Sikkim's monasteries by contributing historical
            records, archaeological data, cultural information, and other valuable documentation.
          </p>
        </div>

        {/* Guidelines Section */}
        <div className="bg-[rgba(41,24,10,0.8)] border border-amber-900/30 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-amber-200 mb-4">
            Data Contribution Guidelines
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>
                <strong className="text-white">Authenticity:</strong> Ensure all data is accurate and
                verifiable with credible sources
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>
                <strong className="text-white">Documentation:</strong> Provide supporting references,
                citations, or source materials
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>
                <strong className="text-white">Format:</strong> Submit data in clear, organized format
                (text, spreadsheet, or PDF)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>
                <strong className="text-white">Relevance:</strong> Focus on historical, cultural,
                archaeological, or architectural information
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>
                <strong className="text-white">Language:</strong> Data can be submitted in English,
                Nepali, Hindi, Tibetan, or Bengali
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>
                <strong className="text-white">Rights:</strong> You must own or have permission to share
                the data you contribute
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>
                <strong className="text-white">Review Process:</strong> Our team will verify and may
                contact you for clarification
              </span>
            </li>
          </ul>
        </div>

        {/* Form Section */}
        <div className="bg-[rgba(41,24,10,0.8)] border border-amber-900/30 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-amber-200 mb-6">
            Submit Your Data
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name and Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 bg-[#2d1810] border ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-amber-900/30"
                  } text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition`}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 bg-[#2d1810] border ${
                    errors.email ? "border-red-500" : "border-amber-900/30"
                  } text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Row 2: Organization */}
            <div>
              <label className="block text-sm font-semibold text-amber-200 mb-2">
                Organization (Optional)
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Your organization or institution"
                className="w-full px-4 py-3 bg-[#2d1810] border border-amber-900/30 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            {/* Row 3: Monastery and Data Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Monastery Name *
                </label>
                <input
                  type="text"
                  name="monastery"
                  value={formData.monastery}
                  onChange={handleInputChange}
                  placeholder="Name of the monastery"
                  className={`w-full px-4 py-3 bg-[#2d1810] border ${
                    errors.monastery
                      ? "border-red-500"
                      : "border-amber-900/30"
                  } text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition`}
                />
                {errors.monastery && (
                  <p className="text-red-400 text-sm mt-1">{errors.monastery}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Data Type *
                </label>
                <select
                  name="dataType"
                  value={formData.dataType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#2d1810] border ${
                    errors.dataType ? "border-red-500" : "border-amber-900/30"
                  } text-white rounded-lg focus:outline-none focus:border-amber-500 transition`}
                >
                  <option value="">Select data type</option>
                  {dataTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.dataType && (
                  <p className="text-red-400 text-sm mt-1">{errors.dataType}</p>
                )}
              </div>
            </div>

            {/* Row 4: Location, Altitude, Founded */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Geographic location"
                  className={`w-full px-4 py-3 bg-[#2d1810] border ${
                    errors.location ? "border-red-500" : "border-amber-900/30"
                  } text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition`}
                />
                {errors.location && (
                  <p className="text-red-400 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Altitude *
                </label>
                <input
                  type="text"
                  name="altitude"
                  value={formData.altitude}
                  onChange={handleInputChange}
                  placeholder="e.g., 2000m or 6561 feet"
                  className={`w-full px-4 py-3 bg-[#2d1810] border ${
                    errors.altitude ? "border-red-500" : "border-amber-900/30"
                  } text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition`}
                />
                {errors.altitude && (
                  <p className="text-red-400 text-sm mt-1">{errors.altitude}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Founded *
                </label>
                <input
                  type="text"
                  name="founded"
                  value={formData.founded}
                  onChange={handleInputChange}
                  placeholder="Year or date founded"
                  className={`w-full px-4 py-3 bg-[#2d1810] border ${
                    errors.founded ? "border-red-500" : "border-amber-900/30"
                  } text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition`}
                />
                {errors.founded && (
                  <p className="text-red-400 text-sm mt-1">{errors.founded}</p>
                )}
              </div>
            </div>

            {/* Row 5: Description */}
            <div>
              <label className="block text-sm font-semibold text-amber-200 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the data, its significance, and relevance"
                rows={5}
                className={`w-full px-4 py-3 bg-[#2d1810] border ${
                  errors.description
                    ? "border-red-500"
                    : "border-amber-900/30"
                } text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition resize-none`}
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Row 6: Period */}
            <div>
              <label className="block text-sm font-semibold text-amber-200 mb-2">
                Historical Period (Optional)
              </label>
              <select
                name="historicalPeriod"
                value={formData.historicalPeriod}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#2d1810] border border-amber-900/30 text-white rounded-lg focus:outline-none focus:border-amber-500 transition"
              >
                <option value="">Select period</option>
                {historicalPeriods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 7: Source Reference */}
            <div>
              <label className="block text-sm font-semibold text-amber-200 mb-2">
                Source Reference or Citation (Optional)
              </label>
              <textarea
                name="sourceReference"
                value={formData.sourceReference}
                onChange={handleInputChange}
                placeholder="Provide any references, citations, or sources for this data"
                rows={3}
                className="w-full px-4 py-3 bg-[#2d1810] border border-amber-900/30 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition resize-none"
              />
            </div>

            {/* Content Section Header */}
            <div className="mt-8 pt-6 border-t border-amber-900/30">
              <h3 className="text-xl font-semibold text-amber-200 mb-6">
                Content Section (Optional)
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Provide additional content details about the monastery. All fields in this section are optional.
              </p>
            </div>

            {/* Row 8: Overview and History */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Overview
                </label>
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleInputChange}
                  placeholder="Brief overview of the monastery"
                  rows={3}
                  className="w-full px-4 py-3 bg-[#2d1810] border border-amber-900/30 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  History
                </label>
                <textarea
                  name="history"
                  value={formData.history}
                  onChange={handleInputChange}
                  placeholder="Historical background and significance"
                  rows={3}
                  className="w-full px-4 py-3 bg-[#2d1810] border border-amber-900/30 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>
            </div>

            {/* Row 9: Architecture and Rituals */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Architecture
                </label>
                <textarea
                  name="architecture"
                  value={formData.architecture}
                  onChange={handleInputChange}
                  placeholder="Architectural features and design details"
                  rows={3}
                  className="w-full px-4 py-3 bg-[#2d1810] border border-amber-900/30 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Rituals & Practices
                </label>
                <textarea
                  name="rituals"
                  value={formData.rituals}
                  onChange={handleInputChange}
                  placeholder="Religious practices, ceremonies, and rituals"
                  rows={3}
                  className="w-full px-4 py-3 bg-[#2d1810] border border-amber-900/30 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>
            </div>

            {/* Row 10: Best Visit Time and Travel Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Best Time to Visit
                </label>
                <textarea
                  name="bestVisitTime"
                  value={formData.bestVisitTime}
                  onChange={handleInputChange}
                  placeholder="Recommended seasons and times for visiting"
                  rows={3}
                  className="w-full px-4 py-3 bg-[#2d1810] border border-amber-900/30 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-200 mb-2">
                  Travel Information
                </label>
                <textarea
                  name="travelInfo"
                  value={formData.travelInfo}
                  onChange={handleInputChange}
                  placeholder="Transportation, accommodation, and access information"
                  rows={3}
                  className="w-full px-4 py-3 bg-[#2d1810] border border-amber-900/30 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 accent-amber-600"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-300 leading-relaxed"
              >
                I confirm that I own or have permission to share this data, and that
                the information provided is accurate and truthful. I grant permission
                for this data to be archived and used for heritage preservation
                purposes. *
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-400 text-sm">{errors.terms}</p>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-12 py-4 bg-amber-600 hover:bg-amber-700 text-white text-lg rounded-lg font-semibold transition-colors shadow-lg"
              >
                Submit Data Contribution
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="p-6 bg-[rgba(41,24,10,0.6)] border border-amber-900/30 rounded-lg">
          <h3 className="text-xl font-semibold text-amber-200 mb-3">
            Need Help?
          </h3>
          <p className="text-gray-300 mb-4">
            If you have questions about data contributions or need technical assistance, please contact
            our support team.
          </p>
          <a
            href="mailto:support@sihsangha.com"
            className="text-amber-400 hover:text-amber-300 underline"
          >
            support@sihsangha.com
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
