import React, { useState, useEffect } from "react";
import axios from "axios";

const HadithoftheDay = () => {
  const [hadith, setHadith] = useState(null);
  const [error, setError] = useState(null);

  const fetchHadith = async () => {
    try {
      const response = await axios.get(
        `https://hadithapi.com/api/hadiths/?apiKey=${
          import.meta.env.VITE_HADITH_API_HADITH
        }`
      );

      // Check if we have hadith data
      if (
        response.data &&
        response.data.hadiths &&
        response.data.hadiths.data &&
        response.data.hadiths.data.length > 0
      ) {
        // Get a random index to select a new hadith each time
        const randomIndex = Math.floor(
          Math.random() * response.data.hadiths.data.length
        );
        const fetchedHadith = response.data.hadiths.data[randomIndex];
        console.log(fetchedHadith); // Log the entire hadith object to check available fields
        setHadith(fetchedHadith);
      } else {
        setError("No data received from the API.");
      }
    } catch (err) {
      setError("Network error or invalid API response.");
      console.error(err);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchHadith();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Hadith of the Day
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {hadith ? (
          <div>
            {/* Display the Hadith Source (Book Name) and Hadith Number */}
            {hadith.book && (
              <p className="text-md text-gray-700">
                <strong className="font-medium text-gray-900">Source:</strong>{" "}
                {hadith.book.bookName} {hadith.hadithNumber}
              </p>
            )}

            {/* Display English Hadith */}
            <p className="text-lg font-semibold text-gray-800 mt-4">
              <strong>Hadith:</strong> {hadith.hadithEnglish}
            </p>

            {/* Display English Narrator */}
            <p className="text-md text-gray-600 mt-4">
              <strong>English Narrator:</strong> {hadith.englishNarrator}
            </p>

            {/* Display Urdu Translation */}
            <p className="text-md text-gray-600 mt-4">
              <strong>Urdu Translation:</strong> {hadith.hadithUrdu}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading hadith...</p>
        )}

        <div className="flex justify-center">
          <button
            onClick={fetchHadith} // Trigger the API call again when clicked
            className="mt-6 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Load New Hadith
          </button>
        </div>
      </div>
    </div>
  );
};

export default HadithoftheDay;
