import { type RefObject, useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useIntersectionObserver(
  callback: (isIntersecting: boolean) => void,
  options: UseIntersectionObserverOptions = {},
): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
    once = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          callback(entry.isIntersecting);
          if (entry.isIntersecting && once) {
            observer.unobserve(element);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback, threshold, rootMargin, once]);

  return ref;
}

export function useScrollAnimation(className = "visible") {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up, .fade-in, .scale-in");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, [className]);
}
