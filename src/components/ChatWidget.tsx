import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
}

// Converts **text** → <strong>text</strong>, strips other markdown noise
function renderContent(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Strip stray markdown symbols: #, `, ~~, --, ---
    const clean = part
      .replace(/^#{1,6}\s/gm, '')
      .replace(/`{1,3}/g, '')
      .replace(/~~|---/g, '');
    return <span key={i}>{clean}</span>;
  });
}

const WELCOME: Message = {
  role: 'assistant',
  content: "Hi! I'm Pulse, Sai's AI assistant. Ask me anything about his experience, projects, or skills.",
};

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // Escape closes the panel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming || sessionCount >= 20) return;

    setInput('');
    setSessionCount((c) => c + 1);

    const history = messages
      .filter((m) => !m.streaming)
      .map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: text },
      { role: 'assistant', content: '', streaming: true },
    ]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        let userMessage = 'Sorry, something went wrong. Please try again.';
        if (res.status === 429) {
          userMessage = "You've sent too many messages. Please wait a moment and try again.";
        } else if (res.status === 500 || res.status === 503) {
          userMessage =
            'The chat service is temporarily unavailable. Please try again in a moment.';
        } else if (res.status === 403) {
          userMessage = 'Access denied. Please try refreshing the page.';
        }
        const e = new Error('Request failed') as Error & { userMessage: string };
        e.userMessage = userMessage;
        throw e;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              accumulated = "Sorry, I couldn't retrieve that information. Please try again.";
            } else if (parsed.delta) {
              accumulated += parsed.delta;
            }
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.role === 'assistant') {
                updated[updated.length - 1] = { ...last, content: accumulated, streaming: true };
              }
              return updated;
            });
          } catch {
            // skip
          }
        }
      }

      // Mark streaming done
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === 'assistant') {
          updated[updated.length - 1] = { ...last, streaming: false };
        }
        return updated;
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      const userMessage =
        (err as Error & { userMessage?: string })?.userMessage ??
        'Sorry, something went wrong. Please try again.';
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === 'assistant') {
          updated[updated.length - 1] = {
            ...last,
            content: userMessage,
            streaming: false,
          };
        }
        return updated;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [input, streaming, sessionCount, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating action button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : "Open chat with Pulse"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg focus-visible:ring-2 focus-visible:ring-red-500 outline-none"
        style={{
          background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-black" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6 text-black" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: 'var(--primary)' }}
            aria-hidden="true"
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Pulse"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-[22rem] md:w-96 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(19, 19, 19, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              height: '520px',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(255,0,51,0.15), rgba(204,0,40,0.08))',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
                }}
              >
                <Bot className="w-4 h-4 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-bold text-white truncate"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Pulse
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/50 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--primary), var(--primary-container))',
                      }}
                    >
                      <Bot className="w-3 h-3 text-black" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed select-text ${
                      msg.role === 'user'
                        ? 'rounded-tr-sm text-black font-medium cursor-default'
                        : 'rounded-tl-sm text-white/90 cursor-text'
                    }`}
                    style={{
                      background:
                        msg.role === 'user'
                          ? 'linear-gradient(135deg, var(--primary), var(--primary-container))'
                          : 'rgba(255,255,255,0.06)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {msg.role === 'assistant' && msg.streaming && msg.content === '' ? (
                      // Typing dots
                      <span className="flex gap-1 items-center py-0.5">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="w-1.5 h-1.5 rounded-full bg-red-400"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: dot * 0.15,
                              ease: 'easeInOut',
                            }}
                          />
                        ))}
                      </span>
                    ) : (
                      <>
                        {renderContent(msg.content)}
                        {msg.streaming && msg.content && (
                          <motion.span
                            className="inline-block w-0.5 h-3.5 ml-0.5 align-middle"
                            style={{ background: 'var(--primary)' }}
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div
              className="flex-shrink-0 px-3 py-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {sessionCount >= 20 && (
                <p
                  className="text-xs text-center mb-2"
                  style={{ color: 'var(--on-surface-variant)' }}
                >
                  Session limit reached. Refresh to continue.
                </p>
              )}
              <div
                className="flex items-end gap-2 rounded-xl px-3 py-2"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything…"
                  disabled={streaming || sessionCount >= 20}
                  rows={1}
                  maxLength={500}
                  aria-label="Chat message input"
                  className="flex-1 bg-transparent text-white text-sm resize-none outline-none placeholder:text-white/30 leading-relaxed py-0.5 min-h-[24px] max-h-24 disabled:opacity-50"
                  style={{ fontFamily: 'var(--font-body)' }}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = 'auto';
                    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
                  }}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!input.trim() || streaming || sessionCount >= 20}
                  aria-label="Send message"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
                  }}
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
