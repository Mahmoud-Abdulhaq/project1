import React from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';
import { Spot4Projects, ProjectHighlight } from '../types';

interface Spot4ProjectsCardProps {
  data: Spot4Projects;
  onChange: (updated: Spot4Projects) => void;
  previewMode?: boolean;
}

export const Spot4ProjectsCard: React.FC<Spot4ProjectsCardProps> = ({
  data,
  onChange,
  previewMode = false,
}) => {
  const updateField = <K extends keyof Spot4Projects>(field: K, value: Spot4Projects[K]) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddProject = () => {
    const newProject: ProjectHighlight = {
      id: `p_${Date.now()}`,
      title: '',
      tag: '',
      description: '',
    };
    updateField('items', [...data.items, newProject]);
  };

  const handleUpdateProject = (id: string, field: keyof ProjectHighlight, val: string) => {
    const updated = data.items.map((p) =>
      p.id === id ? { ...p, [field]: val } : p
    );
    updateField('items', updated);
  };

  const handleRemoveProject = (id: string) => {
    const updated = data.items.filter((p) => p.id !== id);
    updateField('items', updated);
  };

  if (previewMode) {
    return (
      <section
        id="spot-4"
        aria-labelledby="spot-4-title"
        className="bg-black rounded-2xl border border-[#7a0110] p-6 sm:p-8 relative text-[#ff87e1]"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-black text-[#ff87e1] border border-[#7a0110] font-mono">
            Spot 4 of 5
          </span>
          <span className="text-xs font-semibold text-[#ff87e1]/70 uppercase tracking-wider">
            {data.spotTitle || 'Add Title'}
          </span>
        </div>
        <h2 id="spot-4-title" className="text-xl font-bold text-[#ff87e1]">
          {data.spotTitle || 'Add Title'}
        </h2>
        {data.subtitle && (
          <p className="text-xs sm:text-sm text-[#ff87e1]/80 mt-0.5">
            {data.subtitle}
          </p>
        )}

        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.items.map((project) => (
            <div
              key={project.id}
              className="p-5 rounded-xl bg-black border border-[#7a0110] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {project.tag && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-black text-[#ff87e1] border border-[#7a0110]">
                      {project.tag}
                    </span>
                  </div>
                )}
                <h3 className="text-base font-bold text-[#ff87e1]">
                  {project.title || <span className="text-[#ff87e1]/40 italic">Untitled Project</span>}
                </h3>
                <p className="text-xs sm:text-sm text-[#ff87e1] leading-relaxed whitespace-pre-wrap">
                  {project.description || <span className="text-[#ff87e1]/40 italic">No description provided</span>}
                </p>
              </div>
            </div>
          ))}
          {data.items.length === 0 && (
            <p className="text-sm text-[#ff87e1]/40 italic col-span-3">No projects added yet.</p>
          )}
        </div>
      </section>
    );
  }

  // Editable Mode
  return (
    <section
      id="spot-4"
      aria-labelledby="spot-4-title"
      className="bg-black rounded-2xl border border-[#7a0110] p-6 sm:p-8 relative space-y-6 text-[#ff87e1]"
    >
      {/* Header & Editable Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#7a0110]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-black text-[#ff87e1] border border-[#7a0110] font-mono shrink-0">
            Spot 4 of 5
          </span>
          <div className="flex-1">
            <input
              id="spot-4-title-input"
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
          onClick={handleAddProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#ff87e1] hover:bg-[#7a0110]/30 bg-black border border-[#7a0110] rounded-xl transition-colors self-start sm:self-center"
        >
          <Plus className="w-3.5 h-3.5 text-[#ff87e1]" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Subtitle Box */}
      <div>
        <label
          htmlFor="spot-4-subtitle-input"
          className="block text-xs font-semibold text-[#ff87e1] uppercase tracking-wider mb-1.5"
        >
          Spot Subtitle / Description
        </label>
        <input
          id="spot-4-subtitle-input"
          type="text"
          value={data.subtitle}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="Add subtitle (e.g. Featured projects, creations, and works)..."
          className="w-full text-sm text-[#ff87e1] bg-black px-3.5 py-2 rounded-xl border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] focus:border-[#7a0110] transition-all placeholder:text-[#ff87e1]/40"
        />
      </div>

      {/* Project Item Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.items.map((project, idx) => (
          <div
            key={project.id}
            className="p-4 rounded-xl bg-black border border-[#7a0110] flex flex-col justify-between space-y-3 relative"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#7a0110]">
                <span className="text-[10px] font-bold font-mono text-[#ff87e1] uppercase">
                  Project #{idx + 1}
                </span>
                {data.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(project.id)}
                    className="p-1 text-[#ff87e1]/60 hover:text-[#ff87e1] hover:bg-[#7a0110]/30 rounded"
                    title="Remove Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Title input box */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#ff87e1] mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
                  placeholder="Add project title..."
                  className="w-full text-sm font-bold text-[#ff87e1] bg-black px-2.5 py-1.5 rounded-lg border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] placeholder:text-[#ff87e1]/40"
                />
              </div>

              {/* Tag box */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#ff87e1] mb-1 flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5 text-[#ff87e1]" />
                  <span>Category / Tech Tag</span>
                </label>
                <input
                  type="text"
                  value={project.tag}
                  onChange={(e) => handleUpdateProject(project.id, 'tag', e.target.value)}
                  placeholder="e.g. Design • Development"
                  className="w-full text-xs text-[#ff87e1] bg-black px-2.5 py-1.5 rounded-lg border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] placeholder:text-[#ff87e1]/40"
                />
              </div>

              {/* Description textarea box */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#ff87e1] mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={project.description}
                  onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                  placeholder="Add project description, key features, and outcomes..."
                  className="w-full text-xs text-[#ff87e1] bg-black p-2.5 rounded-lg border border-[#7a0110] focus:outline-hidden focus:ring-1 focus:ring-[#ff87e1] placeholder:text-[#ff87e1]/40 leading-relaxed"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#ff87e1] hover:bg-[#7a0110]/30 bg-black border border-[#7a0110] rounded-xl transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#ff87e1]" />
          <span>Add Another Project Box</span>
        </button>
      </div>
    </section>
  );
};
