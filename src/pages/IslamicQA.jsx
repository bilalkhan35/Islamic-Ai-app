import { useState } from "react";

function IslamicQA() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAnswer = async (question) => {
    setLoading(true);
    setResponse("");
    try {
      const apiKey = import.meta.env.VITE_HF_TOKEN;
      if (!apiKey) {
        setResponse(
          "API key missing. Please set VITE_HF_TOKEN in your .env file."
        );
        setLoading(false);
        return;
      }
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content:
                "You are a knowledgeable and kind Islamic scholar AI. Always answer with Quran and Hadith references in a clear and spiritual way.",
            },
            {
              role: "user",
              content: `Please answer this question: ${question}`,
            },
          ],
        }),
      });
      if (!res.ok) {
        setResponse("API error. Please try again later.");
      } else {
        const data = await res.json();
        setResponse(
          data.choices?.[0]?.message?.content || "No answer received."
        );
      }
    } catch (err) {
      setResponse("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (input.trim()) {
      fetchAnswer(input);
      setInput("");
    } else {
      setResponse("Please enter a question.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Islamic Q&amp;A</h1>
      <textarea
        className="w-full h-24 p-2 border rounded mb-4"
        placeholder="Ask your question about Islam..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Response:</h2>
        <p className="mt-2 whitespace-pre-line bg-gray-100 p-4 rounded border">
          {response}
        </p>
      </div>
    </div>
  );
}

export default IslamicQA;
