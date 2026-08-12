import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Award, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "सूरज किस दिशा से उगता है? (Which direction does the Sun rise from?)",
    options: ["पश्चिम (West)", "पूर्व (East)", "उत्तर (North)", "दक्षिण (South)"],
    correctAnswer: 1,
    explanation: "सूरज हमेशा पूर्व (East) दिशा से उगता है।"
  },
  {
    id: 2,
    question: "2 + 3 कितना होता है? (What is 2 + 3?)",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    explanation: "2 में 3 जोड़ने पर 5 प्राप्त होता है।"
  },
  {
    id: 3,
    question: "हमारे राष्ट्रपिता कौन हैं? (Who is known as the Father of our Nation?)",
    options: ["जवाहरलाल नेहरू", "महात्मा गांधी", "सुभाष चंद्र बोस", "भगत सिंह"],
    correctAnswer: 1,
    explanation: "महात्मा गांधी को भारत का राष्ट्रपिता कहा जाता है।"
  }
];

export const QuizEngine: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = sampleQuestions[currentIdx]!;

  const handleSelect = (index: number) => {
    if (!isSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);

    if (selectedOption === currentQ.correctAnswer) {
      setScore(score + 10);
      // Celebrate with confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentIdx < sampleQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0); // Reset for replay
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100 my-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <h2 className="text-xl font-bold text-gray-800">डेली क्विज़ (Daily Quiz)</h2>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-amber-700 font-semibold text-sm">
          <Award className="w-4 h-4 text-amber-500" />
          <span>{score} XP</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
          प्रश्नोत्तरी {currentIdx + 1} / {sampleQuestions.length}
        </span>
        <h3 className="text-lg font-medium text-gray-900 mt-3">{currentQ.question}</h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((option, idx) => {
          let btnStyle = "border-gray-200 hover:border-indigo-400 bg-white text-gray-700";
          if (selectedOption === idx) {
            btnStyle = "border-indigo-600 bg-indigo-50 text-indigo-900 font-medium";
          }
          if (isSubmitted) {
            if (idx === currentQ.correctAnswer) {
              btnStyle = "border-green-500 bg-green-50 text-green-900 font-medium";
            } else if (selectedOption === idx) {
              btnStyle = "border-red-500 bg-red-50 text-red-900 font-medium";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={'w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${btnStyle}'}
            >
              <span>{option}</span>
              {isSubmitted && idx === currentQ.correctAnswer && (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              )}
              {isSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isSubmitted && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 text-sm text-slate-700">
          💡 <strong>उत्तर व्याख्या:</strong> {currentQ.explanation}
        </div>
      )}

      {/* Action Button */}
      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl transition shadow-md"
        >
          उत्तर सबमिट करें (Submit Answer)
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-md"
        >
          {currentIdx < sampleQuestions.length - 1 ? "अगला प्रश्न (Next Question)" : "फिर से शुरू करें (Restart)"}
        </button>
      )}
    </div>
  );
};
