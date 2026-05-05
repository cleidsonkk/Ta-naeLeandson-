"use client";

import { useEffect, useState } from "react";
import {
  type CountdownTime,
  getTimeLeft,
} from "@/lib/countdown";

export function CountdownTimer({
  targetDate,
  initialTime,
}: {
  targetDate: string;
  initialTime: CountdownTime;
}) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Object.entries(time).map(([label, value]) => (
        <div
          key={label}
          className="border border-[rgba(201,168,76,0.26)] bg-[rgba(255,255,255,0.03)] p-6 text-center"
        >
          <div
            className="font-display text-5xl italic text-[var(--color-gold-light)]"
            style={{ animation: "flipIn 0.7s ease both" }}
          >
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--color-cream-muted)]">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
