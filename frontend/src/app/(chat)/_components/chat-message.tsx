'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ChatMessage({ role, content }: { role: string; content: string }) {
  const isAssistant = role === 'assistant';

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-6 px-4 md:px-8`}>
      <div
        className={`max-w-[85%] rounded-2xl border p-5 shadow-sm ${
          isAssistant
            ? 'bg-muted/40 text-foreground border-border'
            : 'bg-primary text-primary-foreground border-transparent'
        }`}
      >
        {/* Label Pengirim */}
        <div className="mb-3 flex items-center gap-2 opacity-50">
          <span className="text-[10px] font-black tracking-widest uppercase">
            {isAssistant ? 'AI Assistant' : 'You'}
          </span>
        </div>

        {/* Content Area */}
        {isAssistant ? (
          <div className="prose prose-sm dark:prose-invert prose-p:my-4 prose-p:leading-7 prose-headings:mt-8 prose-headings:mb-4 prose-strong:text-primary max-w-none text-justify leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-justify text-sm leading-relaxed font-normal whitespace-pre-wrap">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}
