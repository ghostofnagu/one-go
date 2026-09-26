"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "../../lib/utils";

interface ExpandingSubmitButtonProps {
  className?: string;
  children: string;
}

export function ExpandingSubmitButton({
  className,
  children,
}: ExpandingSubmitButtonProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      type="submit"
      className={cn(
        "group inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--one-go-foreground)] px-3 text-[13px] font-semibold text-[var(--one-go-background)] outline-none transition-transform duration-150 active:scale-[.97] focus-visible:ring-2 focus-visible:ring-[var(--one-go-foreground)] focus-visible:ring-offset-2",
        className,
      )}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      aria-label={children}
    >
      <span
        className={cn(
          "whitespace-nowrap overflow-hidden transition-[max-width,opacity] duration-200 ease-out",
          isActive ? "max-w-40 opacity-100" : "max-w-0 opacity-0",
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full bg-[var(--one-go-background)] text-[var(--one-go-foreground)] transition-transform duration-200 ease-out",
          isActive && "rotate-45",
        )}
        aria-hidden="true"
      >
        <ArrowUpRight size={13} strokeWidth={2.25} />
      </span>
    </button>
  );
}
