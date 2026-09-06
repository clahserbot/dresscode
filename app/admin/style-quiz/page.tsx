"use client";

import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';

type QuizStep = {
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

export default function StyleQuizAdmin() {
  const [settings, setSettings] = useState({
    sq_title: 'Find Your Perfect Fit',
    sq_subtitle: 'Answer a few quick questions and let us curate a personalized collection just for you.',
    sq_steps: JSON.stringify(defaultSteps)
  });
  
  const [steps, setSteps] = useState<QuizStep[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle'|'saving'>('idle');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        const sString = data.sq_steps || JSON.stringify(defaultSteps);
        let parsed = defaultSteps;
        try { parsed = JSON.parse(sString); } catch(e){}
        setSteps(parsed);
        setSettings({
          sq_title: data.sq_title || 'Find Your Perfect Fit',
          sq_subtitle: data.sq_subtitle || 'Answer a few quick questions and let us curate a personalized collection just for you.',
          sq_steps: sString
        });
      });
  }, []);

  const handleStepQuestionChange = (index: number, value: string) => {
    const newS = [...steps];
    newS[index].question = value;
    setSteps(newS);
  };

  const handleOptionChange = (stepIndex: number, optionIndex: number, value: string) => {
    const newS = [...steps];
    newS[stepIndex].options[optionIndex] = value;
    setSteps(newS);
  };

  const addStep = () => {
    setSteps([...steps, { question: 'New Question', options: ['Option 1', 'Option 2'] }]);
  };

  const removeStep = (index: number) => {
    const newS = [...steps];
    newS.splice(index, 1);
    setSteps(newS);
  };

  const addOption = (stepIndex: number) => {
    const newS = [...steps];
    newS[stepIndex].options.push('New Option');
    setSteps(newS);
  };

  const removeOption = (stepIndex: number, optionIndex: number) => {
    const newS = [...steps];
    newS[stepIndex].options.splice(optionIndex, 1);
    setSteps(newS);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStatus('saving');
    
    const currentRes = await fetch('/api/settings');
    const currentSettings = await currentRes.json();

    const toSave = { 
        ...currentSettings, 
        sq_title: settings.sq_title,
        sq_subtitle: settings.sq_subtitle,
        sq_steps: JSON.stringify(steps)
    };

    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toSave)
    });
    
    setSettings({
        ...settings,
        sq_steps: JSON.stringify(steps)
    });
    setUploadStatus('idle');
    alert('Style Quiz Settings saved successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Style Quiz Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Main Content</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Title</label>
              <input 
                type="text" 
                value={settings.sq_title} 
                onChange={e => setSettings({...settings, sq_title: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Subtitle</label>
              <input 
                type="text" 
                value={settings.sq_subtitle} 
                onChange={e => setSettings({...settings, sq_subtitle: e.target.value})} 
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
            <button type="button" onClick={addStep} className="text-sm flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg font-medium transition-colors">
              <Plus size={16} /> Add Question
            </button>
          </div>
          <div className="space-y-6">
            {steps.map((s, idx) => (
              <div key={idx} className="border border-gray-200 p-6 rounded-xl relative">
                <button type="button" onClick={() => removeStep(idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
                <div className="mb-4 pr-10">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700">Question {idx + 1}</label>
                    <input type="text" value={s.question} onChange={e => handleStepQuestionChange(idx, e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Options</label>
                        <button type="button" onClick={() => addOption(idx)} className="text-xs text-[#3C50E0] hover:underline font-medium">
                            + Add Option
                        </button>
                    </div>
                    {s.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex gap-2 items-center">
                            <input type="text" value={opt} onChange={e => handleOptionChange(idx, optIdx, e.target.value)} className="flex-1 border rounded-md px-3 py-1.5 text-sm" />
                            <button type="button" onClick={() => removeOption(idx, optIdx)} className="text-red-400 hover:text-red-600 p-1">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex justify-end">
          <button 
            type="submit" 
            disabled={uploadStatus !== 'idle'}
            className="w-full sm:w-auto bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-black disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {uploadStatus !== 'idle' && <Loader2 className="w-5 h-5 animate-spin" />}
            {uploadStatus === 'idle' ? 'Save Settings' : 'Saving...'}
          </button>
        </div>
      </form>
    </div>
  );
}
