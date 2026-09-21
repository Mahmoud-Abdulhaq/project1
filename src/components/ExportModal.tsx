import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Code } from 'lucide-react';
import { AboutMeData } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AboutMeData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const [tab, setTab] = useState<'markdown' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  // Generate Markdown without links, email, location, or personal philosophy
  const markdownContent = `# ${data.spot1.fullName || 'My Profile'}
${data.spot1.role ? `**${data.spot1.role}**` : ''}
${data.spot1.statusBadge ? `*${data.spot1.statusBadge}*` : ''}

---

## 1. ${data.spot1.spotTitle || 'Add Title'}
${data.spot1.bioStory || ''}

---

## 2. ${data.spot2.spotTitle || 'Add Title'}
${data.spot2.subtitle ? `*${data.spot2.subtitle}*` : ''}

${(data.spot2.categories || [])
  .map(
    (cat) => `### ${cat.name || 'Category'}\n${(cat.skills || []).map((s) => `- ${s}`).join('\n')}`
  )
  .join('\n\n')}

---

## 3. ${data.spot3.spotTitle || 'Add Title'}
${data.spot3.subtitle ? `*${data.spot3.subtitle}*` : ''}

${(data.spot3.items || [])
  .map(
    (item) =>
      `### ${item.role || 'Role'} ${item.organization ? `@ ${item.organization}` : ''} ${item.period ? `(${item.period})` : ''}\n${item.description || ''}`
  )
  .join('\n\n')}

---

## 4. ${data.spot4.spotTitle || 'Add Title'}
${data.spot4.subtitle ? `*${data.spot4.subtitle}*` : ''}

${(data.spot4.items || [])
  .map(
    (p) =>
      `### ${p.title || 'Project'} ${p.tag ? `[${p.tag}]` : ''}\n${p.description || ''}`
  )
  .join('\n\n')}

---

## 5. ${data.spot5.spotTitle || 'Add Title'}
${data.spot5.subtitle ? `*${data.spot5.subtitle}*` : ''}

${(data.spot5.facts || [])
  .filter((f) => f.label || f.value)
  .map((f) => `- **${f.label}:** ${f.value}`)
  .join('\n')}
`;

  // Create clean export data object omitting removed fields
  const cleanExportData = {
    spot1: {
      spotNumber: 1,
      spotTitle: data.spot1.spotTitle,
      fullName: data.spot1.fullName,
      role: data.spot1.role,
      statusBadge: data.spot1.statusBadge,
      bioStory: data.spot1.bioStory,
      profileImage: data.spot1.profileImage || undefined,
    },
    spot2: data.spot2,
    spot3: data.spot3,
    spot4: {
      ...data.spot4,
      items: data.spot4.items.map(({ id, title, tag, description }) => ({
        id,
        title,
        tag,
        description,
      })),
    },
    spot5: {
      spotNumber: 5,
      spotTitle: data.spot5.spotTitle,
      subtitle: data.spot5.subtitle,
      facts: data.spot5.facts,
    },
  };

  const jsonContent = JSON.stringify(cleanExportData, null, 2);
  const activeContent = tab === 'markdown' ? markdownContent : jsonContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename =
      tab === 'markdown' ? 'about-me-profile.md' : 'about-me-profile.json';
    const mimeType = tab === 'markdown' ? 'text/markdown' : 'application/json';
    const blob = new Blob([activeContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="export-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div
        id="export-modal-container"
        className="bg-black rounded-2xl border border-[#7a0110] shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col my-auto overflow-hidden text-[#ff87e1]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#7a0110] flex items-center justify-between bg-black">
          <div>
            <h2 className="text-base font-bold text-[#ff87e1]">
              Export Profile
            </h2>
            <p className="text-xs text-[#ff87e1]/70">
              Export all 5 info spots as formatted Markdown or JSON
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#ff87e1] hover:bg-[#7a0110]/30 rounded-xl transition-colors border border-transparent hover:border-[#7a0110]"
            aria-label="Close export modal"
          >
            <X className="w-5 h-5 text-[#ff87e1]" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 py-2.5 bg-black border-b border-[#7a0110] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab('markdown')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                tab === 'markdown'
                  ? 'bg-black text-[#ff87e1] border-[#7a0110] font-bold shadow-xs'
                  : 'text-[#ff87e1]/70 border-transparent hover:text-[#ff87e1]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#ff87e1]" />
              <span>Markdown (.md)</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('json')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                tab === 'json'
                  ? 'bg-black text-[#ff87e1] border-[#7a0110] font-bold shadow-xs'
                  : 'text-[#ff87e1]/70 border-transparent hover:text-[#ff87e1]'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-[#ff87e1]" />
              <span>JSON (.json)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 bg-black hover:bg-[#7a0110]/30 text-[#ff87e1] border border-[#7a0110] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#ff87e1]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#ff87e1]" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 bg-black hover:bg-[#7a0110]/30 text-[#ff87e1] border border-[#7a0110] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#ff87e1]" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Preview content area */}
        <div className="p-6 overflow-y-auto flex-1 bg-black text-[#ff87e1] font-mono text-xs border-t border-[#7a0110]">
          <pre className="whitespace-pre-wrap leading-relaxed select-all">
            {activeContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
