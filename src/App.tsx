import { type FormEvent, useState } from "react";

import { CursorTrail } from "./components/ui/cursor-trail";
import { ExpandingSubmitButton } from "./components/ui/expanding-submit-button";

function App() {
  const [requested, setRequested] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequested(true);
  };

  return (
    <main className="min-h-screen bg-[var(--one-go-background)] p-3 text-[var(--one-go-foreground)] sm:p-4">
      <CursorTrail />

      <section className="relative flex min-h-[calc(100svh-24px)] items-center justify-center overflow-hidden rounded-[10px] bg-[var(--one-go-background)] px-5 py-24 sm:min-h-[calc(100svh-32px)]">
        <div className="relative z-10 mx-auto w-full max-w-[1200px] text-center">
          <p className="mb-8 text-xl font-semibold tracking-tight text-black">For the collectors</p>
          <h1 className="mx-auto max-w-[1160px] text-[clamp(42px,5.2vw,74px)] font-semibold leading-[.96] tracking-[-.035em]">Your whole Bandcamp.<br />In one go.</h1>
          <p className="mx-auto mt-6 max-w-[1100px] text-xl font-semibold leading-[1.35] tracking-tight text-black sm:whitespace-nowrap">Every release you bought. One download. The format you want. Kept local.</p>

          <form
            className="mx-auto mt-8 w-full max-w-[430px]"
            onSubmit={handleSubmit}
            onFocus={() => setIsFormActive(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsFormActive(false);
            }}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="email">Email address</label>
              <input id="email" required type="email" inputMode="email" autoComplete="email" placeholder="Your email" className="min-w-0 flex-1 rounded-full border border-black/15 bg-white/55 px-4 py-2.5 text-[13px] font-medium tracking-tight outline-none placeholder:text-black/42 focus:border-black/45" />
              <ExpandingSubmitButton className="sm:min-w-10">Join The Waitlist</ExpandingSubmitButton>
            </div>
            <div className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${isFormActive ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}>
              <div className="min-h-0 overflow-hidden">
                <p className="pt-1 text-center text-[11px] font-medium tracking-tight text-black/46">One click. Every release. Your format.</p>
              </div>
            </div>
          </form>
        </div>
      </section>

      <footer className="flex flex-col gap-2 px-1 pb-1 pt-4 text-[11px] font-medium text-black/48 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 In One Go</span>
        <span>Independent. Not affiliated with Bandcamp.</span>
      </footer>

      {requested && (
        <div className="fixed bottom-5 left-1/2 z-[60] w-[min(420px,calc(100%-40px))] -translate-x-1/2 rounded-xl border border-black/20 bg-[var(--one-go-background)] px-5 py-4 text-center text-[13px] shadow-[0_14px_40px_rgba(0,0,0,.18)]" role="status">
          This visual waitlist is ready; the live form endpoint is the next connection to make.
        </div>
      )}
    </main>
  );
}

export default App;
