import { useEffect, useState } from "react";
import "./DailyDuaPage.css";

const AsmaulHusnaPage = () => {
  const [asma, setAsma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [asmaNumber, setAsmaNumber] = useState(1); // Keep track of the current Asma number

  useEffect(() => {
    fetchAsma();
  }, [asmaNumber]); // Fetch new Asma when the Asma number changes

  const fetchAsma = async () => {
    try {
      const response = await fetch(
        `https://islamic-developers-api.p.rapidapi.com/al-asma-ul-husna?number=${asmaNumber}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "islamic-developers-api.p.rapidapi.com",
            "x-rapidapi-key":
              "68bb0b67d6msh5706d3e04f8b62bp12df22jsnb6d1fec3b0d7", // Replace with your actual API key
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data); // Checking the API response
      setAsma(data); // Assuming the data contains an object with Asma details
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to load Asma. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextAsma = () => {
    setAsmaNumber((prevNumber) => (prevNumber < 99 ? prevNumber + 1 : 1)); // Loop back to 1 after 99
    setLoading(true); // Set loading to true before fetching new data
  };

  return (
    <div className="daily-dua-container p-6 text-center">
      <h1 className="text-3xl mb-4 text-emerald-700 font-bold">
        الأسما ء الحسنى
      </h1>
      <div className="bg-white shadow rounded p-6 max-w-2xl mx-auto">
        {loading ? (
          <p className="text-gray-500">جاري التحميل...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : asma ? (
          <>
            {/* Display the Arabic and Latin Name */}
            <h2 className="text-2xl font-semibold">
              <span className="text-emerald-600">{asma.native}</span> <br />
              <span className="text-gray-500">{asma.latin}</span>
            </h2>

            {/* Button to fetch next Asma */}
            <button
              onClick={handleNextAsma}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              التالي
            </button>
          </>
        ) : (
          <p className="text-gray-500">No Asma available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default AsmaulHusnaPage;
