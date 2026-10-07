"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  dark?: boolean;
}

export function CopyButton({ textToCopy, className = "", dark = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const defaultClasses = dark
    ? "border-[#ff5500]/35 bg-[#200e06] text-[#ffedd5]/85 hover:text-white hover:border-[#ff5500] hover:bg-[#321509] shadow-xs"
    : "border-[#e5e5e5] bg-white text-[#71717a] hover:text-black hover:border-[#a1a1aa]";

  const copiedClasses = dark
    ? "text-white border-[#ff5500] bg-[#ff3000] shadow-[0_0_12px_rgba(255,48,0,0.5)] font-bold"
    : "text-white border-[#ff3000] bg-[#ff3000] font-bold";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied code" : "Copy code to clipboard"}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded border transition-colors focus:outline-none focus:ring-1 focus:ring-[#ff3000] cursor-pointer ${
        copied ? copiedClasses : defaultClasses
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span className="font-semibold">Copied ✓</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
