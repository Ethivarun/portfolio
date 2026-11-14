import { useEffect } from "react";

/**
 * Cinematic two-way reveal.
 * Every [data-reveal] element animates IN when it enters the viewport and back OUT
 * when it leaves — upward if it left through the top, downward if through the bottom.
 * Variants (value of data-reveal): "" (rise) | "zoom" | "left" | "right" | "blur".
 * Optional stagger: style={{ "--d": "120ms" }}.
 */
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
          target.classList.toggle("is-visible", isIntersecting);
          target.classList.toggle("is-above", !isIntersecting && boundingClientRect.top < 0);
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
