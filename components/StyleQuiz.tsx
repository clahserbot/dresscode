"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export type QuizStep = {
  question: string;
  options: string[];
};

const defaultSteps: QuizStep[] = [
  {
    question: "What's your daily uniform?",
    options: ["Streetwear", "Business Casual", "Minimalist", "Athleisure"]
  },
  {
    question: "Pick your color palette",
    options: ["Monochrome (Black/White)", "Earthy Neutrals", "Bold & Vibrant", "Pastels"]
  }
];

type StyleQuizProps = {
  title?: string;
  subtitle?: string;
  steps?: QuizStep[];
};

export default function StyleQuiz({ 
  title = "Find Your Perfect Fit", 
  subtitle = "Answer a few quick questions and let us curate a personalized collection just for you.", 
  steps = defaultSteps 
}: StyleQuizProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSelect = (option: string) => {
    setAnswers([...answers, option]);
    setStep(step + 1);
  };

  return (
    <section className="mb-24">
      <div className="bg-gray-50 border border-gray-100 rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-sm">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#3C50E0]/5 to-transparent pointer-events-none" />
        
        <div className="w-full md:w-1/2 relative z-10 text-[#111827]">
          <span className="text-[#3C50E0] font-semibold tracking-widest text-sm uppercase mb-4 block">Personal Shopper</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">{title}</h2>
          <p className="text-gray-500 text-lg">{subtitle}</p>
        </div>

        <div className="w-full md:w-1/2 relative z-10 min-h-[300px]">
          <AnimatePresence mode="wait">
            {step < steps.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-400">
                  <span>Question {step + 1} of {steps.length}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-6">{steps[step].question}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {steps[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className="text-left px-6 py-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:border-[#111827] hover:bg-gray-50 transition-all group flex justify-between items-center"
                    >
                      {opt}
                      <ArrowRight size={18} className="text-gray-300 group-hover:text-[#111827] transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-[#3C50E0]/20 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center justify-center h-full min-h-[300px]"
              >
                <div className="w-16 h-16 bg-[#3C50E0]/10 rounded-full flex items-center justify-center mb-6">
                  <Check size={32} className="text-[#3C50E0]" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-4">Your Style is Ready!</h3>
                <p className="text-gray-500 mb-8">We've curated pieces that perfectly match your {answers[1]} {answers[0]} vibe.</p>
                <button 
                  onClick={() => {
                    const vibe = `${answers[1]}-${answers[0]}`.replace(/\s+/g, '-').toLowerCase();
                    router.push(`/shop?curated=true&vibe=${encodeURIComponent(vibe)}`);
                  }}
                  className="bg-[#111827] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3C50E0] transition-colors shadow-lg w-full"
                >
                  View Your Collection
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
