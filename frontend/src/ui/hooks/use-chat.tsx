'use client';

import { useCallback, useRef, useState } from 'react';

export type MessageRole = 'user' | 'assistant' | 'system' | 'error';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

interface UseChatStreamReturn {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearMessages: () => void;
}

export const useChat = (
  endpoint: string = 'http://localhost:8000/chat-stream'
): UseChatStreamReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;
      if (abortControllerRef.current) abortControllerRef.current.abort();

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        createdAt: new Date(),
      };

      const assistantMessageId = crypto.randomUUID();
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${endpoint}?message=${encodeURIComponent(content)}`, {
          signal: abortController.signal,
        });

        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

        setMessages((prev) => [
          ...prev,
          { id: assistantMessageId, role: 'assistant', content: '', createdAt: new Date() },
        ]);

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        let leftover = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = leftover + decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            leftover = lines.pop() || '';

            let cleanContent = '';
            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith('data: ')) {
                cleanContent += trimmed.replace('data: ', '');
              }
            }

            if (cleanContent) {
              setMessages((prev) => {
                const updated = [...prev];
                const lastIdx = updated.length - 1;
                if (updated[lastIdx].id === assistantMessageId) {
                  updated[lastIdx] = {
                    ...updated[lastIdx],
                    content: updated[lastIdx].content + cleanContent,
                  };
                }
                return updated;
              });
            }
          }
        }
      } catch (err: unknown) {
        setError('Failed to send message.');
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint]
  );

  return { messages, sendMessage, isLoading, error, clearMessages: () => setMessages([]) };
};
