import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { Spot2Skills, SkillCategory } from '../types';

interface Spot2SkillsCardProps {
  data: Spot2Skills;
  onChange: (updated: Spot2Skills) => void;
  previewMode?: boolean;
}

export const Spot2SkillsCard: React.FC<Spot2SkillsCardProps> = ({
  data,
  onChange,
  previewMode = false,
}) => {
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});

  const updateField = <K extends keyof Spot2Skills>(field: K, value: Spot2Skills[K]) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddCategory = () => {
    const newCategory: SkillCategory = {
      id: `c_${Date.now()}`,
      name: '',
      skills: [],
    };
    updateField('categories', [...data.categories, newCategory]);
  };

  const handleUpdateCategoryName = (catId: string, name: string) => {
    const updated = data.categories.map((c) =>
      c.id === catId ? { ...c, name } : c
    );
    updateField('categories', updated);
  };

  const handleRemoveCategory = (catId: string) => {
    const updated = data.categories.filter((c) => c.id !== catId);
    updateField('categories', updated);
  };

  const handleAddSkill = (catId: string) => {
    const skillText = (newSkillInputs[catId] || '').trim();
    if (!skillText) return;

    const updated = data.categories.map((c) => {
      if (c.id === catId) {
        return { ...c, skills: [...c.skills, skillText] };
      }
      return c;
    });

    updateField('categories', updated);
    setNewSkillInputs((prev) => ({ ...prev, [catId]: '' }));
  };

  const handleRemoveSkill = (catId: string, skillIdx: number) => {
    const updated = data.categories.map((c) => {
      if (c.id === catId) {
        return { ...c, skills: c.skills.filter((_, idx) => idx !== skillIdx) };
      }
      return c;
    });
    updateField('categories', updated);
  };

  if (previewMode) {
    return (
      <section
        id="spot-2"
        aria-labelledby="spot-2-title"
        className="bg-black rounded-2xl border border-[#7a0110] p-6 sm:p-8 relative text-[#ff87e1]"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-black text-[#ff87e1] border border-[#7a0110] font-mono">
            Spot 2 of 5
          </span>
          <span className="text-xs font-semibold text-[#ff87e1]/70 uppercase tracking-wider">
            {data.spotTitle || 'Add Title'}
          </span>
        </div>
        <h2 id="spot-2-title" className="text-xl font-bold text-[#ff87e1]">
          {data.spotTitle || 'Add Title'}
        </h2>
        {data.subtitle && (
          <p className="text-xs sm:text-sm text-[#ff87e1]/80 mt-0.5">
            {data.subtitle}
          </p>
        )}

        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.categories.map((category) => (
            <div
              key={category.id}
              className="p-5 rounded-xl bg-black border border-[#7a0110] space-y-3"
            >
              <h3 className="text-sm font-bold text-[#ff87e1] pb-2 border-b border-[#7a0110]">
                {category.name || <span className="text-[#ff87e1]/40 italic">Category</span>}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-black text-[#ff87e1] border border-[#7a0110]"
                  >
                    {skill}
                  </span>
                ))}
                {category.skills.length === 0 && (
                  <span className="text-xs text-[#ff87e1]/40 italic">No skills added</span>
                )}
              </div>
            </div>
          ))}
          {data.categories.length === 0 && (
            <p className="text-sm text-[#ff87e1]/40 italic col-span-3">No categories added yet.</p>
          )}
        </div>
      </section>
    );
  }

  // Editable Mode
  return (
    <section
      id="spot-2"
      aria-labelledby="spot-2-title"
      className="bg-black rounded-2xl border border-[#7a0110] p-6 sm:p-8 relative space-y-6 text-[#ff87e1]"
    >
      {/* Header & Editable Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#7a0110]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-black text-[#ff87e1] border border-[#7a0110] font-mono shrink-0">
            Spot 2 of 5
          </span>
          <div className="flex-1">
            <input
              id="spot-2-title-input"
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
          onClick={handleAddCategory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#ff87e1] hover:bg-[#7a0110]/30 bg-black border border-[#7a0110] rounded-xl transition-colors self-start sm:self-center"
        >
          <Plus className="w-3.5 h-3.5 text-[#ff87e1]" />
          <span>Add Category Box</span>
        </button>
      </div>

      {/* Subtitle Box */}
      <div>
        <label
          htmlFor="spot-2-subtitle-input"
          className="block text-xs font-semibold text-[#ff87e1] uppercase tracking-wider mb-1.5"
        >
          Spot Subtitle / Description
        </label>
        <input
          id="spot-2-subtitle-input"
          type="text"
          value={data.subtitle}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="Add subtitle (e.g. Core competencies, tools, and technical proficiency)..."
          className="w-full text-sm text-[#ff87e1] bg-black px-3.5 py-2 rounded-xl border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] focus:border-[#7a0110] transition-all placeholder:text-[#ff87e1]/40"
        />
      </div>

      {/* Categories & Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.categories.map((category, idx) => (
          <div
            key={category.id}
            className="p-4 rounded-xl bg-black border border-[#7a0110] space-y-3 relative"
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#7a0110]">
              <input
                type="text"
                value={category.name}
                onChange={(e) => handleUpdateCategoryName(category.id, e.target.value)}
                placeholder={`Category ${idx + 1} Name...`}
                className="font-bold text-sm text-[#ff87e1] bg-black px-2 py-1 rounded border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] w-full placeholder:text-[#ff87e1]/40"
              />
              {data.categories.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category.id)}
                  className="p-1 text-[#ff87e1]/60 hover:text-[#ff87e1] hover:bg-[#7a0110]/30 rounded"
                  title="Remove Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* List of Skills Chips */}
            <div className="flex flex-wrap gap-1.5 min-h-[36px]">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-black text-[#ff87e1] border border-[#7a0110]"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(category.id, sIdx)}
                    className="hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {category.skills.length === 0 && (
                <span className="text-xs text-[#ff87e1]/40 italic py-1">No skills added yet</span>
              )}
            </div>

            {/* Add Skill Input Box */}
            <div className="flex items-center gap-1.5 pt-2">
              <input
                type="text"
                value={newSkillInputs[category.id] || ''}
                onChange={(e) =>
                  setNewSkillInputs((prev) => ({ ...prev, [category.id]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(category.id);
                  }
                }}
                placeholder="Type skill & enter..."
                className="text-xs text-[#ff87e1] bg-black px-2.5 py-1.5 rounded-lg border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] flex-1 placeholder:text-[#ff87e1]/40"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(category.id)}
                className="px-2.5 py-1.5 bg-black hover:bg-[#7a0110]/30 text-[#ff87e1] border border-[#7a0110] rounded-lg text-xs font-semibold shrink-0"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleAddCategory}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#ff87e1] hover:bg-[#7a0110]/30 bg-black border border-[#7a0110] rounded-xl transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#ff87e1]" />
          <span>Add Another Category Box</span>
        </button>
      </div>
    </section>
  );
};
