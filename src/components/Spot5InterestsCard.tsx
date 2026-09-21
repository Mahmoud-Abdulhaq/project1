import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Spot5Interests, FactItem } from '../types';

interface Spot5InterestsCardProps {
  data: Spot5Interests;
  onChange: (updated: Spot5Interests) => void;
  previewMode?: boolean;
}

export const Spot5InterestsCard: React.FC<Spot5InterestsCardProps> = ({
  data,
  onChange,
  previewMode = false,
}) => {
  const updateField = <K extends keyof Spot5Interests>(field: K, value: Spot5Interests[K]) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddFact = () => {
    const newFact: FactItem = {
      id: `f_${Date.now()}`,
      label: '',
      value: '',
    };
    updateField('facts', [...data.facts, newFact]);
  };

  const handleUpdateFact = (id: string, field: keyof FactItem, val: string) => {
    const updated = data.facts.map((f) =>
      f.id === id ? { ...f, [field]: val } : f
    );
    updateField('facts', updated);
  };

  const handleRemoveFact = (id: string) => {
    const updated = data.facts.filter((f) => f.id !== id);
    updateField('facts', updated);
  };

  if (previewMode) {
    return (
      <section
        id="spot-5"
        aria-labelledby="spot-5-title"
        className="bg-black rounded-2xl border border-[#7a0110] p-6 sm:p-8 relative text-[#ff87e1]"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-black text-[#ff87e1] border border-[#7a0110] font-mono">
            Spot 5 of 5
          </span>
          <span className="text-xs font-semibold text-[#ff87e1]/70 uppercase tracking-wider">
            {data.spotTitle || 'Add Title'}
          </span>
        </div>
        <h2 id="spot-5-title" className="text-xl font-bold text-[#ff87e1]">
          {data.spotTitle || 'Add Title'}
        </h2>
        {data.subtitle && (
          <p className="text-xs sm:text-sm text-[#ff87e1]/80 mt-0.5">
            {data.subtitle}
          </p>
        )}

        <div className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.facts.map((fact) => (
              <div
                key={fact.id}
                className="p-4 rounded-xl bg-black border border-[#7a0110] flex flex-col justify-between"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff87e1]/70 mb-1">
                  {fact.label || <span className="italic text-[#ff87e1]/40">Quick Fact</span>}
                </span>
                <p className="text-sm font-medium text-[#ff87e1]">
                  {fact.value || <span className="italic text-[#ff87e1]/40">No value added</span>}
                </p>
              </div>
            ))}
            {data.facts.length === 0 && (
              <p className="text-sm text-[#ff87e1]/40 italic col-span-3">No facts added yet.</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Editable Mode
  return (
    <section
      id="spot-5"
      aria-labelledby="spot-5-title"
      className="bg-black rounded-2xl border border-[#7a0110] p-6 sm:p-8 relative space-y-6 text-[#ff87e1]"
    >
      {/* Header & Editable Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#7a0110]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-black text-[#ff87e1] border border-[#7a0110] font-mono shrink-0">
            Spot 5 of 5
          </span>
          <div className="flex-1">
            <input
              id="spot-5-title-input"
              type="text"
              value={data.spotTitle}
              onChange={(e) => updateField('spotTitle', e.target.value)}
              placeholder="Add Title"
              className="font-bold text-lg text-[#ff87e1] bg-black hover:bg-[#7a0110]/10 focus:bg-[#7a0110]/20 px-2 py-1 -ml-2 rounded-lg border border-transparent focus:border-[#7a0110] focus:outline-hidden transition-colors w-full placeholder:text-[#ff87e1]/40"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddFact}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#ff87e1] hover:bg-[#7a0110]/30 bg-black border border-[#7a0110] rounded-xl transition-colors self-start sm:self-center"
        >
          <Plus className="w-3.5 h-3.5 text-[#ff87e1]" />
          <span>Add Quick Fact</span>
        </button>
      </div>

      {/* Subtitle Box */}
      <div>
        <label
          htmlFor="spot-5-subtitle-input"
          className="block text-xs font-semibold text-[#ff87e1] uppercase tracking-wider mb-1.5"
        >
          Spot Subtitle / Description
        </label>
        <input
          id="spot-5-subtitle-input"
          type="text"
          value={data.subtitle}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="Add subtitle (e.g. Interests, favorite tools, trivia, and personal quick facts)..."
          className="w-full text-sm text-[#ff87e1] bg-black px-3.5 py-2 rounded-xl border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] focus:border-[#7a0110] transition-all placeholder:text-[#ff87e1]/40"
        />
      </div>

      {/* Quick Facts Boxes */}
      <div>
        <label className="block text-xs font-semibold text-[#ff87e1] uppercase tracking-wider mb-2.5">
          Quick Facts / Trivia Boxes
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.facts.map((fact, idx) => (
            <div
              key={fact.id}
              className="p-3.5 rounded-xl bg-black border border-[#7a0110] space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono text-[#ff87e1] uppercase">
                  Fact #{idx + 1}
                </span>
                {data.facts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFact(fact.id)}
                    className="p-1 text-[#ff87e1]/60 hover:text-[#ff87e1] hover:bg-[#7a0110]/30 rounded"
                    title="Remove Fact"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={fact.label}
                  onChange={(e) => handleUpdateFact(fact.id, 'label', e.target.value)}
                  placeholder="Label (e.g. Current Focus, Tools, Hobbies)..."
                  className="w-full text-xs font-bold text-[#ff87e1] bg-black px-2.5 py-1.5 rounded-lg border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] placeholder:text-[#ff87e1]/40"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={fact.value}
                  onChange={(e) => handleUpdateFact(fact.id, 'value', e.target.value)}
                  placeholder="Value / Answer..."
                  className="w-full text-xs text-[#ff87e1] bg-black px-2.5 py-1.5 rounded-lg border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] placeholder:text-[#ff87e1]/40"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleAddFact}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#ff87e1] hover:bg-[#7a0110]/30 bg-black border border-[#7a0110] rounded-xl transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#ff87e1]" />
          <span>Add Another Quick Fact Box</span>
        </button>
      </div>
    </section>
  );
};
