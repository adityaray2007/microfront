"use client";

import React, { useRef } from "react";

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Tabs({
  tabs,
  activeId,
  onChange,
  orientation = "horizontal",
  className = "",
}: TabsProps) {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (orientation === "vertical") {
      if (e.key === "ArrowDown") {
        nextIndex = (index + 1) % tabs.length;
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        e.preventDefault();
      }
    } else {
      if (e.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        e.preventDefault();
      }
    }

    if (nextIndex !== index) {
      onChange(tabs[nextIndex].id);
      const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  };

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-orientation={orientation}
      className={`flex ${
        orientation === "vertical"
          ? "flex-col gap-1 border-r border-[#262626] pr-2"
          : "flex-row gap-2 border-b border-[#262626] pb-2 overflow-x-auto no-scrollbar"
      } ${className}`}
    >
      {tabs.map((tab, idx) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`px-3 py-2 text-sm font-mono text-left transition-colors rounded-md focus:outline-none focus:ring-1 focus:ring-[#22c55e] cursor-pointer whitespace-nowrap ${
              isActive
                ? "bg-[#141414] text-white border-l-2 border-[#22c55e]"
                : "text-[#8a8a8a] hover:text-white hover:bg-[#0a0a0a]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
