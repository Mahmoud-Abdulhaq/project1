import React from 'react';
import { User, Sparkles, Share2, RotateCcw, Eye, Edit3, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onOpenExport: () => void;
  onReset: () => void;
  previewMode: boolean;
  onTogglePreviewMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenExport,
  onReset,
  previewMode,
  onTogglePreviewMode,
}) => {
  const scrollToSpot = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header id="app-navbar" className="border-b border-[#7a0110] bg-black/95 backdrop-blur-md sticky top-0 z-30 text-[#ff87e1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Status */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black text-[#ff87e1] border border-[#7a0110] flex items-center justify-center font-bold text-sm">
              <User className="w-4 h-4 text-[#ff87e1]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 id="app-heading" className="text-sm font-bold tracking-tight text-[#ff87e1]">
                  About Me
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black text-[#ff87e1] border border-[#7a0110]">
                  <Sparkles className="w-2.5 h-2.5 mr-1 text-[#ff87e1]" />
                  5 Info Spots
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#ff87e1] bg-black px-2 py-0.5 rounded-md border border-[#7a0110]">
                  <CheckCircle2 className="w-3 h-3 text-[#ff87e1]" />
                  <span>Auto-saved</span>
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={onTogglePreviewMode}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-[#7a0110] flex items-center gap-1 bg-black text-[#ff87e1]"
            >
              {previewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{previewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              type="button"
              onClick={onOpenExport}
              className="p-1.5 text-[#ff87e1] hover:bg-[#7a0110]/30 rounded-lg border border-[#7a0110] bg-black"
              title="Share / Export"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Spot Navigation Jump Links */}
        <nav aria-label="Spot navigation" className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5 text-xs">
          <button
            type="button"
            onClick={() => scrollToSpot('spot-1')}
            className="px-2.5 py-1 rounded-lg text-[#ff87e1] hover:bg-[#7a0110]/30 border border-transparent hover:border-[#7a0110] transition-colors whitespace-nowrap font-medium"
          >
            Spot 1
          </button>
          <button
            type="button"
            onClick={() => scrollToSpot('spot-2')}
            className="px-2.5 py-1 rounded-lg text-[#ff87e1] hover:bg-[#7a0110]/30 border border-transparent hover:border-[#7a0110] transition-colors whitespace-nowrap font-medium"
          >
            Spot 2
          </button>
          <button
            type="button"
            onClick={() => scrollToSpot('spot-3')}
            className="px-2.5 py-1 rounded-lg text-[#ff87e1] hover:bg-[#7a0110]/30 border border-transparent hover:border-[#7a0110] transition-colors whitespace-nowrap font-medium"
          >
            Spot 3
          </button>
          <button
            type="button"
            onClick={() => scrollToSpot('spot-4')}
            className="px-2.5 py-1 rounded-lg text-[#ff87e1] hover:bg-[#7a0110]/30 border border-transparent hover:border-[#7a0110] transition-colors whitespace-nowrap font-medium"
          >
            Spot 4
          </button>
          <button
            type="button"
            onClick={() => scrollToSpot('spot-5')}
            className="px-2.5 py-1 rounded-lg text-[#ff87e1] hover:bg-[#7a0110]/30 border border-transparent hover:border-[#7a0110] transition-colors whitespace-nowrap font-medium"
          >
            Spot 5
          </button>
        </nav>

        {/* Global Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {/* Mode Switcher */}
          <button
            type="button"
            onClick={onTogglePreviewMode}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-[#7a0110] bg-black hover:bg-[#7a0110]/30 text-[#ff87e1] transition-colors flex items-center gap-1.5"
            title="Switch between Edit mode and Finished Profile view"
          >
            {previewMode ? (
              <>
                <Edit3 className="w-3.5 h-3.5 text-[#ff87e1]" />
                <span>Switch to Edit Mode</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-[#ff87e1]" />
                <span>Preview Mode</span>
              </>
            )}
          </button>

          <button
            id="reset-defaults-btn"
            type="button"
            onClick={onReset}
            className="px-2.5 py-1.5 text-xs text-[#ff87e1] hover:bg-[#7a0110]/30 bg-black rounded-xl border border-[#7a0110] transition-colors flex items-center gap-1"
            title="Reset to blank template"
          >
            <RotateCcw className="w-3 h-3 text-[#ff87e1]" />
            <span>Clear / Reset</span>
          </button>

          <button
            id="export-profile-btn"
            type="button"
            onClick={onOpenExport}
            className="px-3 py-1.5 text-xs font-medium text-[#ff87e1] hover:bg-[#7a0110]/30 bg-black rounded-xl border border-[#7a0110] transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-[#ff87e1]" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
