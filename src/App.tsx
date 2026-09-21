import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Spot1BioCard } from './components/Spot1BioCard';
import { Spot2SkillsCard } from './components/Spot2SkillsCard';
import { Spot3ExperienceCard } from './components/Spot3ExperienceCard';
import { Spot4ProjectsCard } from './components/Spot4ProjectsCard';
import { Spot5InterestsCard } from './components/Spot5InterestsCard';
import { ExportModal } from './components/ExportModal';
import { DEFAULT_ABOUT_ME_DATA } from './defaultData';
import { AboutMeData, SpotNumber, Spot1Bio, Spot2Skills, Spot3Experience, Spot4Projects, Spot5Interests } from './types';
import { User, Layers, Briefcase, FolderGit2, Compass, Sparkles, CheckCircle, Edit3, Eye } from 'lucide-react';

const STORAGE_KEY = 'project1_aboutme_blank_v2';

export default function App() {
  const [data, setData] = useState<AboutMeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.spot1 && parsed.spot2 && parsed.spot3 && parsed.spot4 && parsed.spot5) {
          return parsed;
        }
      }
      return DEFAULT_ABOUT_ME_DATA;
    } catch {
      return DEFAULT_ABOUT_ME_DATA;
    }
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Sync to localStorage so changes and photo stay even if refreshed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save About Me data to localStorage', e);
    }
  }, [data]);

  const handleSpot1Change = (updated: Spot1Bio) => {
    setData((prev) => ({ ...prev, spot1: updated }));
  };

  const handleSpot2Change = (updated: Spot2Skills) => {
    setData((prev) => ({ ...prev, spot2: updated }));
  };

  const handleSpot3Change = (updated: Spot3Experience) => {
    setData((prev) => ({ ...prev, spot3: updated }));
  };

  const handleSpot4Change = (updated: Spot4Projects) => {
    setData((prev) => ({ ...prev, spot4: updated }));
  };

  const handleSpot5Change = (updated: Spot5Interests) => {
    setData((prev) => ({ ...prev, spot5: updated }));
  };

  const handleReset = () => {
    if (window.confirm('Reset all 5 spots back to blank template boxes?')) {
      setData(DEFAULT_ABOUT_ME_DATA);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn('Failed to clear storage', e);
      }
    }
  };

  const spotsList = [
    { num: 1 as SpotNumber, id: 'spot-1', label: '1. Bio', icon: User, title: data.spot1.spotTitle || 'Add Title' },
    { num: 2 as SpotNumber, id: 'spot-2', label: '2. Skills', icon: Layers, title: data.spot2.spotTitle || 'Add Title' },
    { num: 3 as SpotNumber, id: 'spot-3', label: '3. Journey', icon: Briefcase, title: data.spot3.spotTitle || 'Add Title' },
    { num: 4 as SpotNumber, id: 'spot-4', label: '4. Projects', icon: FolderGit2, title: data.spot4.spotTitle || 'Add Title' },
    { num: 5 as SpotNumber, id: 'spot-5', label: '5. Interests', icon: Compass, title: data.spot5.spotTitle || 'Add Title' },
  ];

  const scrollToSpot = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="about-me-app" className="min-h-screen bg-black flex flex-col text-[#ff87e1] selection:bg-[#7a0110] selection:text-[#ff87e1]">
      {/* Navigation Bar */}
      <Navbar
        onOpenExport={() => setExportModalOpen(true)}
        onReset={handleReset}
        previewMode={previewMode}
        onTogglePreviewMode={() => setPreviewMode(!previewMode)}
      />

      <main id="main-spots-container" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* 5 Spots Quick Control & Status Strip */}
        <section
          id="spots-overview-bar"
          aria-label="5 Spots Overview"
          className="bg-black rounded-2xl border border-[#7a0110] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[#ff87e1]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black border border-[#7a0110] flex items-center justify-center text-[#ff87e1]">
              <Sparkles className="w-4 h-4 text-[#ff87e1]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#ff87e1] tracking-tight flex items-center gap-2">
                <span>Personal Profile & Portfolio</span>
                <span className="text-xs font-mono font-normal text-[#ff87e1]/70">
                  (5 Blank Info Spots)
                </span>
              </h2>
              <p className="text-xs text-[#ff87e1]/80">
                {previewMode
                  ? 'Currently viewing finished preview. Click "Switch to Edit Mode" to edit any box.'
                  : 'Every box and title is directly editable below. Photo and text automatically stay on refresh.'}
              </p>
            </div>
          </div>

          {/* Quick jump pills and Mode Toggle */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <div className="flex items-center gap-1.5 flex-wrap">
              {spotsList.map((spot) => {
                const Icon = spot.icon;
                return (
                  <button
                    key={spot.num}
                    type="button"
                    onClick={() => scrollToSpot(spot.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-black hover:bg-[#7a0110]/30 border border-[#7a0110] text-[#ff87e1] transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#ff87e1]" />
                    <span>Spot {spot.num}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black hover:bg-[#7a0110]/30 text-[#ff87e1] border border-[#7a0110] transition-colors flex items-center gap-1.5 ml-auto md:ml-2"
            >
              {previewMode ? <Edit3 className="w-3 h-3 text-[#ff87e1]" /> : <Eye className="w-3 h-3 text-[#ff87e1]" />}
              <span>{previewMode ? 'Edit Mode' : 'Preview Mode'}</span>
            </button>
          </div>
        </section>

        {/* SPOT 1: Bio & Identity with photo upload box right next to name */}
        <Spot1BioCard
          data={data.spot1}
          onChange={handleSpot1Change}
          previewMode={previewMode}
        />

        {/* SPOT 2: Skills & Tech Stack with categorized boxes */}
        <Spot2SkillsCard
          data={data.spot2}
          onChange={handleSpot2Change}
          previewMode={previewMode}
        />

        {/* SPOT 3: Experience & Milestones with timeline boxes */}
        <Spot3ExperienceCard
          data={data.spot3}
          onChange={handleSpot3Change}
          previewMode={previewMode}
        />

        {/* SPOT 4: Featured Projects & Creations with project boxes */}
        <Spot4ProjectsCard
          data={data.spot4}
          onChange={handleSpot4Change}
          previewMode={previewMode}
        />

        {/* SPOT 5: Quick Facts with trivia boxes */}
        <Spot5InterestsCard
          data={data.spot5}
          onChange={handleSpot5Change}
          previewMode={previewMode}
        />
      </main>

      {/* Footer */}
      <footer id="app-footer" className="border-t border-[#7a0110] bg-black py-6 mt-12 text-[#ff87e1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#ff87e1]/80 gap-3">
          <div className="flex items-center gap-2 font-mono">
            <span>About Me • 5 Spots Portfolio</span>
            <span className="text-[#7a0110]">•</span>
            <span>All changes automatically saved</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="text-[#ff87e1]/70 hover:text-[#ff87e1] transition-colors"
            >
              Reset to Blank
            </button>
            <button
              type="button"
              onClick={() => setExportModalOpen(true)}
              className="text-[#ff87e1] hover:underline underline-offset-4 font-medium"
            >
              Export Profile
            </button>
            <span className="inline-flex items-center gap-1.5 text-[#ff87e1]">
              <CheckCircle className="w-3.5 h-3.5 text-[#ff87e1]" />
              <span>Persists on refresh</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Export / Share Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        data={data}
      />
    </div>
  );
}
