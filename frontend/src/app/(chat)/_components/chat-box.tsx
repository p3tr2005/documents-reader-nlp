'use client';

import { useEffect, useRef, useState } from 'react';

import { useChat } from '@/ui/hooks/use-chat';
import { SendHorizontal, Sparkles } from 'lucide-react';

import { ChatMessage } from './chat-message';

export default function ChatBox() {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const tempInput = input;
    setInput('');
    await sendMessage(tempInput);
  };

  return (
    <div className="bg-background flex flex-1 flex-col overflow-hidden">
      <div
        ref={scrollRef}
        className="scrollbar-thin scrollbar-thumb-border flex-1 overflow-y-auto p-4"
      >
        {messages.length === 0 && (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 opacity-20" />
            <p className="text-sm italic opacity-50">
              Silahkan upload PDF di sidebar untuk memulai.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}

        {isLoading && (
          <div className="mb-4 flex justify-start px-8">
            <div className="bg-muted/20 border-border text-muted-foreground animate-pulse rounded-lg border px-4 py-2 text-xs">
              Memproses node graf...
            </div>
          </div>
        )}
      </div>

      <div className="border-border bg-background/50 border-t p-6">
        <div className="bg-muted/50 border-border focus-within:ring-ring relative mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border px-4 py-2 transition-all focus-within:ring-1">
          <input
            className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent py-2 text-sm focus:outline-none"
            placeholder="Tanyakan analisis Teori Graf..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="text-muted-foreground hover:text-primary p-2 transition-colors disabled:opacity-20"
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
