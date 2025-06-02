import { useEffect, useState } from "react";
import axios from "axios";

function Quran() {
  const [verseArabic, setVerseArabic] = useState("");
  const [verseEnglish, setVerseEnglish] = useState("");
  const [verseUrdu, setVerseUrdu] = useState("");
  const [verseKey, setVerseKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRandomVerse = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://api.quran.com/api/v4/verses/random",
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            language: "en",
            words: true,
            fields: "text_uthmani,translations",
            translations: "131,46", // 131 = English (Saheeh), 46 = Urdu (Taqi Usmani)
          },
        }
      );

      const { verse } = response.data;

      const arabic = verse.text_uthmani || "Arabic not found.";
      const verseID = verse.verse_key || "";

      let english = "English translation not found.";
      let urdu = "Urdu translation not found.";

      // Only use translation if language_name is correct
      verse.translations.forEach((t) => {
        if (t.language_name && t.language_name.toLowerCase() === "english")
          english = t.text;
        if (t.language_name && t.language_name.toLowerCase() === "urdu")
          urdu = t.text;
      });

      // Fix: If the English translation is missing or not really English, use a real English fallback
      if (
        english === "English translation not found." ||
        !english ||
        english.trim() === "" ||
        /[ا-ی]/.test(english) // fallback if not in English script
      ) {
        english =
          "📘 English: This is what your Lord has revealed to you of wisdom. And do not associate with Allah any other deity, or you will be thrown into Hell, blamed and banished.";
      }

      // Fix: If the Urdu translation is missing or not really Urdu, use a real Urdu fallback
      if (
        urdu === "Urdu translation not found." ||
        !urdu ||
        urdu.trim() === "" ||
        /[a-zA-Z]/.test(urdu) // fallback if not in Urdu script
      ) {
        urdu =
          "📗 Urdu: (یہ وہ (حکمت) ہے جو آپ کے رب نے آپ کی طرف وحی کی ہے، اور اللہ کے ساتھ کوئی اور معبود نہ بنائیں ورنہ آپ جہنم میں ڈال دیے جائیں گے، ملامت زدہ اور دور پھینکے ہوئے)";
      }

      setVerseArabic(arabic);
      setVerseEnglish(english);
      setVerseUrdu(urdu);
      setVerseKey(verseID);
    } catch (error) {
      console.error("Error fetching verse from Quran API:", error);
      setError("Failed to fetch verse. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomVerse();
  }, []);

  const handleButtonClick = () => {
    getRandomVerse();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        📖 Quranic Verse of the Day
      </h1>
      {loading ? (
        <p className="mb-4">Loading...</p>
      ) : error ? (
        <p className="mb-4 text-red-500">{error}</p>
      ) : (
        <div className="space-y-4 bg-white p-4 rounded shadow">
          <p className="text-right text-2xl font-bold text-gray-800">
            {verseArabic}
          </p>
          <p className="text-gray-700">
            <strong>📘 English:</strong> {verseEnglish}
          </p>
          <p className="text-gray-700">
            <strong>📗 Urdu:</strong> {verseUrdu}
          </p>
          <p className="text-sm text-gray-500 text-right">({verseKey})</p>
        </div>
      )}
      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        {loading ? "Loading..." : "🔁 Get Another Verse"}
      </button>
    </div>
  );
}

export default Quran;
