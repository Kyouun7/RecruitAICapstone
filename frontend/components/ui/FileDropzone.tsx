'use client';

import React from 'react';
import { AlertIcon } from './icons';

interface FileDropzoneProps {
  selectedFile: File | null;
  error?: string;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: () => void;
  onRemove: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function formatFileSize(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

export default function FileDropzone({
  selectedFile,
  error,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onRemove,
  fileInputRef,
  onFileChange,
}: FileDropzoneProps) {
  return (
    <div className="space-y-4">
      {/* Drag & Drop Zone */}
      {!selectedFile && (
        <div
          id="fileDrop"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={onFileSelect}
          className={`
            border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center
            text-center cursor-pointer transition-all group
            ${isDragging
              ? 'border-primary bg-surface-low'
              : error
                ? 'border-error bg-error-container/10'
                : 'border-outline-variant bg-surface-low/30 hover:bg-surface-low hover:border-primary'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={onFileChange}
            className="hidden"
          />

          {/* Upload icon circle */}
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
          </div>

          <p className="text-on-surface font-semibold mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-on-surface-variant text-sm">
            PDF or DOCX (Max 5MB)
          </p>
        </div>
      )}

      {/* Uploaded File State */}
      {selectedFile && (
        <div className="p-4 bg-surface-low rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded bg-white flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined">picture_as_pdf</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-on-surface truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-on-surface-variant">
                {formatFileSize(selectedFile.size)} • Complete
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-error-container hover:text-on-error-container transition-colors cursor-pointer shrink-0"
            aria-label="Remove file"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      )}

      {error && (
        <span className="text-xs text-error flex items-center gap-1">
          <AlertIcon /> {error}
        </span>
      )}
    </div>
  );
}
