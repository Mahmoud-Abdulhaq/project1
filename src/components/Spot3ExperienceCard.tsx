import React from 'react';
import { Plus, Trash2, Calendar, Building2 } from 'lucide-react';
import { Spot3Experience, ExperienceItem } from '../types';

interface Spot3ExperienceCardProps {
  data: Spot3Experience;
  onChange: (updated: Spot3Experience) => void;
  previewMode?: boolean;
}

export const Spot3ExperienceCard: React.FC<Spot3ExperienceCardProps> = ({
  data,
  onChange,
  previewMode = false,
}) => {
  const updateField = <K extends keyof Spot3Experience>(field: K, value: Spot3Experience[K]) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `e_${Date.now()}`,
      role: '',
      organization: '',
      period: '',
      description: '',
    };
    updateField('items', [...data.items, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof ExperienceItem, val: string) => {
    const updated = data.items.map((item) =>
      item.id === id ? { ...item, [field]: val } : item
    );
    updateField('items', updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = data.items.filter((item) => item.id !== id);
    updateField('items', updated);
  };

  if (previewMode) {
    return (
      <section
        id="spot-3"
        aria-labelledby="spot-3-title"
        className="bg-black rounded-2xl border border-[#7a0110] p-6 sm:p-8 relative text-[#ff87e1]"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-black text-[#ff87e1] border border-[#7a0110] font-mono">
            Spot 3 of 5
          </span>
          <span className="text-xs font-semibold text-[#ff87e1]/70 uppercase tracking-wider">
            {data.spotTitle || 'Add Title'}
          </span>
        </div>
        <h2 id="spot-3-title" className="text-xl font-bold text-[#ff87e1]">
          {data.spotTitle || 'Add Title'}
        </h2>
        {data.subtitle && (
          <p className="text-xs sm:text-sm text-[#ff87e1]/80 mt-0.5">
            {data.subtitle}
          </p>
        )}

        <div className="pt-6 space-y-6">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-black border border-[#7a0110] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-[#ff87e1]">
                    {item.role || <span className="text-[#ff87e1]/40 italic">Role / Position</span>}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#ff87e1]/80 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-[#ff87e1]" />
                    <span>{item.organization || <span className="text-[#ff87e1]/40 italic">Organization</span>}</span>
                  </div>
                </div>
                {item.period && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-black text-[#ff87e1] border border-[#7a0110] self-start sm:self-center">
                    <Calendar className="w-3 h-3 text-[#ff87e1]" />
                    <span>{item.period}</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#ff87e1] leading-relaxed whitespace-pre-wrap">
                {item.description || <span className="text-[#ff87e1]/40 italic">No description provided</span>}
              </p>
            </div>
          ))}
          {data.items.length === 0 && (
            <p className="text-sm text-[#ff87e1]/40 italic">No experience items added yet.</p>
          )}
        </div>
      </section>
    );
  }

  // Editable Mode
  return (
    <section
      id="spot-3"
      aria-labelledby="spot-3-title"
      className="bg-black rounded-2xl border border-[#7a0110] p-6 sm:p-8 relative space-y-6 text-[#ff87e1]"
    >
      {/* Header & Editable Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#7a0110]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-black text-[#ff87e1] border border-[#7a0110] font-mono shrink-0">
            Spot 3 of 5
          </span>
          <div className="flex-1">
            <input
              id="spot-3-title-input"
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
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#ff87e1] hover:bg-[#7a0110]/30 bg-black border border-[#7a0110] rounded-xl transition-colors self-start sm:self-center"
        >
          <Plus className="w-3.5 h-3.5 text-[#ff87e1]" />
          <span>Add Milestone / Role</span>
        </button>
      </div>

      {/* Subtitle Box */}
      <div>
        <label
          htmlFor="spot-3-subtitle-input"
          className="block text-xs font-semibold text-[#ff87e1] uppercase tracking-wider mb-1.5"
        >
          Spot Subtitle / Description
        </label>
        <input
          id="spot-3-subtitle-input"
          type="text"
          value={data.subtitle}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="Add subtitle (e.g. Work history, leadership, education, or accomplishments)..."
          className="w-full text-sm text-[#ff87e1] bg-black px-3.5 py-2 rounded-xl border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] focus:border-[#7a0110] transition-all placeholder:text-[#ff87e1]/40"
        />
      </div>

      {/* Experience Items */}
      <div className="space-y-6">
        {data.items.map((item, idx) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-black border border-[#7a0110] space-y-4 relative"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#7a0110]">
              <span className="text-xs font-bold font-mono text-[#ff87e1] uppercase">
                Item #{idx + 1}
              </span>
              {data.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-1 text-[#ff87e1]/60 hover:text-[#ff87e1] hover:bg-[#7a0110]/30 rounded"
                  title="Remove this milestone"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#ff87e1] mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={item.role}
                  onChange={(e) => handleUpdateItem(item.id, 'role', e.target.value)}
                  placeholder="e.g. Senior Engineer, Founder, Lead..."
                  className="w-full text-xs font-semibold text-[#ff87e1] bg-black px-3 py-2 rounded-lg border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] placeholder:text-[#ff87e1]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#ff87e1] mb-1">
                  Organization / Company
                </label>
                <input
                  type="text"
                  value={item.organization}
                  onChange={(e) => handleUpdateItem(item.id, 'organization', e.target.value)}
                  placeholder="e.g. Acme Corp, University..."
                  className="w-full text-xs text-[#ff87e1] bg-black px-3 py-2 rounded-lg border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] placeholder:text-[#ff87e1]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#ff87e1] mb-1">
                  Time Period
                </label>
                <input
                  type="text"
                  value={item.period}
                  onChange={(e) => handleUpdateItem(item.id, 'period', e.target.value)}
                  placeholder="e.g. 2022 - Present"
                  className="w-full text-xs text-[#ff87e1] bg-black px-3 py-2 rounded-lg border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] placeholder:text-[#ff87e1]/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[#ff87e1] mb-1">
                Description / Highlights
              </label>
              <textarea
                rows={3}
                value={item.description}
                onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                placeholder="What did you build, lead, or learn in this position?"
                className="w-full text-xs text-[#ff87e1] bg-black p-3 rounded-lg border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] placeholder:text-[#ff87e1]/40 leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#ff87e1] hover:bg-[#7a0110]/30 bg-black border border-[#7a0110] rounded-xl transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#ff87e1]" />
          <span>Add Another Milestone Box</span>
        </button>
      </div>
    </section>
  );
};
