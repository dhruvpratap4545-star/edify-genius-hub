import React, { useState } from 'react';

export default function ChidiyaBuddy() {
  const [message, setMessage] = useState("नमस्ते! मैं आपकी चिड़िया रानी हूँ! चलिए पढ़ाई करते हैं! 🐥");
  const [isTalking, setIsTalking] = useState(false);

  const speak = (text: string) => {
    setMessage(text);
    setIsTalking(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.pitch = 1.3; // प्यारी आवाज़
      utterance.rate = 0.9;
      utterance.onend = () => setIsTalking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end animate-bounce">
      {/* चिड़िया का डायलॉग बॉक्स */}
      <div className="bg-white text-gray-800 p-3 rounded-2xl shadow-xl border-2 border-yellow-400 mb-2 max-w-xs text-sm font-bold relative">
        {message}
        <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
      </div>

      {/* उड़ती/बोलती हुई चिड़िया */}
      <button 
        onClick={() => speak("अरे वाह! आप बहुत होशियार बच्चे हैं! चलिए आगे बढ़ते हैं!")}
        aria-label="Talk to Chidiya Rani"
        className={`w-20 h-20 rounded-full bg-gradient-to-r from-yellow-300 to-pink-400 p-2 shadow-2xl transform hover:scale-110 transition-all ${isTalking ? "animate-pulse" : ""}`}
      >
        <span className="text-5xl">🐤</span>
      </button>
    </div>
  );
}
