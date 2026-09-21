import React, { useRef, useState } from 'react';
import { Camera, Upload, Trash2 } from 'lucide-react';

interface ImageUploadBoxProps {
  image?: string;
  onImageChange: (imageDataUrl: string) => void;
  onImageRemove: () => void;
}

// Resizes image client-side to ensure it safely fits in localStorage without hitting quota limits
async function resizeImageFile(file: File, maxDimension = 600): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL(file.type || 'image/jpeg', 0.85));
      };
      img.onerror = () => resolve(src);
      img.src = src;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  image,
  onImageChange,
  onImageRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    try {
      const resized = await resizeImageFile(file, 600);
      onImageChange(resized);
    } catch (err) {
      console.error('Error processing image:', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    if (e.target) e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center sm:items-start">
      <label className="block text-xs font-semibold text-[#ff87e1] uppercase tracking-wider mb-1.5">
        Photo of Me
      </label>

      {/* Uploaded image state */}
      {image ? (
        <div className="relative group w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#7a0110] bg-black shrink-0">
          <img
            src={image}
            alt="Profile photo"
            className="w-full h-full object-cover"
          />

          {/* Hover overlay with Change & Remove */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1 text-[#ff87e1]">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2 py-1 bg-black/80 hover:bg-[#7a0110]/40 border border-[#7a0110] rounded text-[11px] font-medium flex items-center gap-1 transition-colors w-full justify-center text-[#ff87e1]"
              title="Change photo"
            >
              <Upload className="w-3 h-3 text-[#ff87e1]" />
              <span>Change</span>
            </button>
            <button
              type="button"
              onClick={onImageRemove}
              className="px-2 py-1 bg-black/80 hover:bg-[#7a0110]/40 border border-[#7a0110] rounded text-[11px] font-medium flex items-center gap-1 transition-colors w-full justify-center text-[#ff87e1]"
              title="Remove photo"
            >
              <Trash2 className="w-3 h-3 text-[#ff87e1]" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty upload box state */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all shrink-0 bg-black text-[#ff87e1] ${
            isDragging
              ? 'border-[#ff87e1] bg-[#7a0110]/20 scale-102'
              : 'border-[#7a0110] hover:border-[#ff87e1] hover:bg-[#7a0110]/10'
          }`}
          title="Click to upload or drag & drop a photo"
        >
          <div className="w-8 h-8 rounded-full bg-black border border-[#7a0110] flex items-center justify-center text-[#ff87e1] mb-1">
            <Camera className="w-4 h-4 text-[#ff87e1]" />
          </div>
          <span className="text-[11px] font-semibold text-[#ff87e1] leading-tight">
            Add Image
          </span>
          <span className="text-[9px] text-[#ff87e1]/70 mt-0.5">
            Click / Drop
          </span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
