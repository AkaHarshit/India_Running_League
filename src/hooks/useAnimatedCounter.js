import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for animated count-up numbers.
 * Uses requestAnimationFrame for smooth 60fps animation.
 */
export default function useAnimatedCounter(end, duration = 1500, startOnMount = true) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic for smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    setCount(Math.round(eased * end));

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
    }
  }, [end, duration]);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    startTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    if (startOnMount) {
      startAnimation();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startOnMount, startAnimation]);

  return { count, isAnimating, startAnimation };
}
