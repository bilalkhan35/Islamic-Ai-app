import { useEffect, useState } from "react";
import "./DailyDuaPage.css";

const AsmaulHusnaPage = () => {
  const [asma, setAsma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [asmaNumber, setAsmaNumber] = useState(1);

  useEffect(() => {
    fetchAsma();
  }, [asmaNumber]);

  const fetchAsma = async () => {
    try {
      const cached = localStorage.getItem(`asmaulhusna_${asmaNumber}`);
      if (cached) {
        setAsma(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const response = await fetch("https://api.aladhan.com/v1/asmaAlHusna");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const namesArray = data.data;
      const nameObj = Array.isArray(namesArray)
        ? namesArray[asmaNumber - 1]
        : null;

      if (!nameObj) {
        setError("No Asma available at the moment.");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        `asmaulhusna_${asmaNumber}`,
        JSON.stringify(nameObj)
      );

      setAsma(nameObj);
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to load Asma. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextAsma = () => {
    setAsmaNumber((prevNumber) => (prevNumber < 99 ? prevNumber + 1 : 1));
    setLoading(true);
  };

  return (
    <div className="daily-dua-container p-6 text-center">
      <h1 className="text-3xl mb-4 text-emerald-700 font-bold">
        الأسماء الحسنى
      </h1>
      <div className="bg-white shadow rounded p-6 max-w-2xl mx-auto">
        {loading ? (
          <p className="text-gray-500">جاري التحميل...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : asma ? (
          <>
            <h2 className="text-2xl font-semibold">
              <span className="text-emerald-600">{asma.name}</span>
              <br />
              <span className="text-gray-500">
                {asma.transliteration} — {asma.en.meaning}
              </span>
            </h2>
            <button
              onClick={handleNextAsma}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 cursor-pointer"
            >
              Next
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
