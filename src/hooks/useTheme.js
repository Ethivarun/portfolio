import { useCallback, useState } from "react";

const META = { dark: "#0e0e0d", light: "#f3f0ea" };

/** Theme state backed by <html data-theme>. Initial value is set before paint by public/index.html. */
export default function useTheme() {
  const [theme, setState] = useState(() => document.documentElement.dataset.theme || "dark");

  const setTheme = useCallback((t) => {
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = META[t];
    setState(t);
  }, []);

  return [theme, setTheme];
}
