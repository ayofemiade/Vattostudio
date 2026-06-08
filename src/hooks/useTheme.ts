"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setThemeState] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Read initial theme from document element
    const html = document.documentElement;
    const initialTheme = html.getAttribute("data-theme") as "dark" | "light" | null;
    if (initialTheme === "dark" || initialTheme === "light") {
      setThemeState(initialTheme);
    }

    // Observe changes to the data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = html.getAttribute("data-theme") as "dark" | "light" | null;
          if (newTheme === "dark" || newTheme === "light") {
            setThemeState(newTheme);
          }
        }
      });
    });

    observer.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const setTheme = (t: "dark" | "light") => {
    const html = document.documentElement;
    html.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  };

  return { theme, toggleTheme, setTheme };
}
