import ChatBox from './_components/chat-box';
import Sidebar from './_components/sidebar';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground flex h-screen w-full overflow-hidden">
      <Sidebar />

      <div className="border-border relative flex h-full flex-1 flex-col overflow-hidden border-l">
        <header className="border-border bg-background/50 flex h-12 shrink-0 items-center border-b px-6 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">#</span>
            <span className="text-sm font-bold tracking-tight">nlp-assistant-rag</span>
          </div>
        </header>

        <ChatBox />
      </div>
    </main>
  );
}
