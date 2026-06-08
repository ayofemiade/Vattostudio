"use client";

import { useEffect } from "react";

export function ThemeHydrator() {
  useEffect(() => {
    // Enable transitions by adding theme-ready class on next animation frame
    requestAnimationFrame(() => {
      document.documentElement.classList.add("theme-ready");
    });
  }, []);

  return null;
}
