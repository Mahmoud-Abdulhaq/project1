import React from 'react';
import { Spot1Bio } from '../types';
import { ImageUploadBox } from './ImageUploadBox';

interface Spot1BioCardProps {
  data: Spot1Bio;
  onChange: (updated: Spot1Bio) => void;
  previewMode?: boolean;
}

export const Spot1BioCard: React.FC<Spot1BioCardProps> = ({
  data,
  onChange,
  previewMode = false,
}) => {
  const updateField = <K extends keyof Spot1Bio>(field: K, value: Spot1Bio[K]) => {
    onChange({ ...data, [field]: value });
  };

  // If in Preview Mode
  if (previewMode) {
    return (
      <section
        id="spot-1"
        aria-labelledby="spot-1-title"
        className="bg-black rounded-2xl border border-[#7a0110] p-6 sm:p-8 relative overflow-hidden text-[#ff87e1]"
      >
        <div className="flex items-center gap-2 pb-6 border-b border-[#7a0110]">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-black text-[#ff87e1] border border-[#7a0110] font-mono">
            Spot 1 of 5
          </span>
          <h2 id="spot-1-title" className="text-xs font-semibold text-[#ff87e1]/70 uppercase tracking-wider">
            {data.spotTitle || 'Add Title'}
          </h2>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-start gap-6">
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt={data.fullName || 'Profile photo'}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#7a0110] shrink-0"
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black border-2 border-[#7a0110] text-[#ff87e1] flex items-center justify-center font-bold text-2xl shrink-0">
              {data.fullName ? data.fullName.slice(0, 2).toUpperCase() : 'ME'}
            </div>
          )}

          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ff87e1]">
                  {data.fullName || <span className="text-[#ff87e1]/40 italic">No name provided</span>}
                </h3>
                <p className="text-base font-medium text-[#ff87e1]/80 mt-0.5">
                  {data.role || <span className="text-[#ff87e1]/40 italic">No role provided</span>}
                </p>
              </div>

              {data.statusBadge && (
                <span className="self-start sm:self-center inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black text-[#ff87e1] border border-[#7a0110]">
                  <span className="w-2 h-2 rounded-full bg-[#ff87e1] mr-2 animate-pulse" />
                  {data.statusBadge}
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-[#ff87e1] leading-relaxed font-normal whitespace-pre-wrap">
              {data.bioStory || <span className="text-[#ff87e1]/40 italic">No bio story provided yet.</span>}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Editable Mode
  return (
    <section
      id="spot-1"
      aria-labelledby="spot-1-title"
      className="bg-black rounded-2xl border border-[#7a0110] p-6 sm:p-8 relative space-y-6 text-[#ff87e1]"
    >
      {/* Spot 1 Header & Editable Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#7a0110]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-black text-[#ff87e1] border border-[#7a0110] font-mono shrink-0">
            Spot 1 of 5
          </span>
          <div className="flex-1">
            <input
              id="spot-1-title-input"
              type="text"
              value={data.spotTitle}
              onChange={(e) => updateField('spotTitle', e.target.value)}
              placeholder="Add Title"
              className="font-bold text-lg text-[#ff87e1] bg-black hover:bg-[#7a0110]/10 focus:bg-[#7a0110]/20 px-2 py-1 -ml-2 rounded-lg border border-transparent focus:border-[#7a0110] focus:outline-hidden transition-colors w-full placeholder:text-[#ff87e1]/40"
            />
          </div>
        </div>
      </div>

      {/* Row 1: Name and Image Upload Box right next to it */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Name input box (MD: 8 cols) */}
        <div className="md:col-span-8 space-y-4">
          <div>
            <label
              htmlFor="spot-1-name-input"
              className="block text-xs font-semibold text-[#ff87e1] uppercase tracking-wider mb-1.5"
            >
              My Name
            </label>
            <input
              id="spot-1-name-input"
              type="text"
              value={data.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="Enter your full name..."
              className="w-full text-base sm:text-lg font-bold text-[#ff87e1] bg-black px-3.5 py-2.5 rounded-xl border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] focus:border-[#7a0110] transition-all placeholder:text-[#ff87e1]/40"
            />
          </div>

          {/* Role / Current Title */}
          <div>
            <label
              htmlFor="spot-1-role-input"
              className="block text-xs font-semibold text-[#ff87e1] uppercase tracking-wider mb-1.5"
            >
              Role / Subtitle
            </label>
            <input
              id="spot-1-role-input"
              type="text"
              value={data.role}
              onChange={(e) => updateField('role', e.target.value)}
              placeholder="e.g. Full-Stack Developer, Designer, Student..."
              className="w-full text-sm text-[#ff87e1] bg-black px-3.5 py-2 rounded-xl border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] focus:border-[#7a0110] transition-all placeholder:text-[#ff87e1]/40"
            />
          </div>

          {/* Status Badge */}
          <div>
            <label
              htmlFor="spot-1-status-input"
              className="block text-xs font-semibold text-[#ff87e1] uppercase tracking-wider mb-1.5"
            >
              Current Status Badge
            </label>
            <input
              id="spot-1-status-input"
              type="text"
              value={data.statusBadge}
              onChange={(e) => updateField('statusBadge', e.target.value)}
              placeholder="e.g. Open for opportunities, Building new projects..."
              className="w-full text-xs text-[#ff87e1] bg-black px-3 py-2 rounded-xl border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] focus:border-[#7a0110] transition-all placeholder:text-[#ff87e1]/40"
            />
          </div>
        </div>

        {/* Dedicated Photo Upload Box right next to name (MD: 4 cols) */}
        <div className="md:col-span-4 p-4 rounded-xl border border-[#7a0110] bg-black flex flex-col items-center justify-center">
          <ImageUploadBox
            image={data.profileImage}
            onImageChange={(img) => updateField('profileImage', img)}
            onImageRemove={() => updateField('profileImage', '')}
          />
        </div>
      </div>

      {/* Row 2: Bio & Background Story */}
      <div>
        <label
          htmlFor="spot-1-bio-input"
          className="block text-xs font-semibold text-[#ff87e1] uppercase tracking-wider mb-1.5"
        >
          Bio & Background Story
        </label>
        <textarea
          id="spot-1-bio-input"
          rows={4}
          value={data.bioStory}
          onChange={(e) => updateField('bioStory', e.target.value)}
          placeholder="Tell your story, your focus, what drives you, or what you're working on..."
          className="w-full text-sm text-[#ff87e1] bg-black p-3.5 rounded-xl border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] focus:border-[#7a0110] transition-all placeholder:text-[#ff87e1]/40 leading-relaxed"
        />
      </div>
    </section>
  );
};
