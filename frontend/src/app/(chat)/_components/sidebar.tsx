'use client';

import { useState } from 'react';

import {
  CheckCircle2,
  Database,
  FileText,
  LayoutDashboard,
  Loader2,
  Plus,
  Settings2,
  UploadCloud,
} from 'lucide-react';

export default function Sidebar() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus('uploading');
    setFileName(file.name);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-background border-border flex h-full w-72 flex-col overflow-hidden border-r">
      {/* Brand Section */}
      <div className="border-border flex h-12 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-md">
            <Database className="text-primary-foreground h-4 w-4" />
          </div>
          <span className="text-sm font-bold tracking-tight">RAG Analysis</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-6 p-4">
        {/* Navigation Group */}
        <div className="space-y-1">
          <p className="text-muted-foreground px-2 pb-2 text-[10px] font-bold tracking-widest uppercase">
            Menu
          </p>
          <button className="bg-muted text-foreground flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
          <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors">
            <Settings2 className="h-4 w-4" />
            Settings
          </button>
        </div>

        {/* Document Ingestion Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Knowledge Base
            </p>
            <Plus className="text-muted-foreground hover:text-foreground h-3 w-3 cursor-pointer" />
          </div>

          <label className="group border-border hover:border-primary/50 hover:bg-muted/30 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 transition-all">
            {status === 'uploading' ? (
              <Loader2 className="text-primary h-6 w-6 animate-spin" />
            ) : (
              <UploadCloud className="text-muted-foreground group-hover:text-primary h-6 w-6 transition-colors" />
            )}
            <div className="text-center">
              <p className="text-xs font-semibold">
                {status === 'uploading' ? 'Indexing Node...' : 'Upload PDF'}
              </p>
              <p className="text-muted-foreground mt-1 text-[10px]">Max 10MB per file</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleUpload}
              disabled={status === 'uploading'}
            />
          </label>

          {/* Active File Preview */}
          {fileName && (
            <div
              className={`group relative flex items-center gap-3 rounded-lg border p-3 transition-all ${
                status === 'success'
                  ? 'border-primary/20 bg-primary/5'
                  : 'border-border bg-muted/20'
              }`}
            >
              <div
                className={`rounded-md p-2 ${status === 'success' ? 'bg-primary/10 text-primary' : 'bg-background text-muted-foreground'}`}
              >
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs leading-none font-bold">{fileName}</p>
                <p className="text-muted-foreground mt-1 text-[10px]">
                  {status === 'success' ? 'Ready to Query' : 'Uploading...'}
                </p>
              </div>
              {status === 'success' && (
                <CheckCircle2 className="text-primary animate-in zoom-in h-4 w-4" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
