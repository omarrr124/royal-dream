import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that returns a ref and a boolean `shouldAnimate`.
 * `shouldAnimate` becomes `true` ONLY when scrolling DOWN (top-to-bottom) into view.
 * When scrolling UP (bottom-to-top), `shouldAnimate` remains `true` (locked in final state) so no entrance animation occurs.
 * Resets to `false` ONLY when the element is completely off-screen BELOW the viewport (e.g. when user scrolls back up to the top hero section).
 * Handles page refreshes mid-scroll gracefully without triggering upward or refresh entrance animations.
 */
export const useDownwardEntrance = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const lastScrollY = useRef(0);
  const hasAnimatedIn = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    // Synchronously check mount position to handle mid-page refresh
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight) {
        // If element is already inside or above viewport on page load/refresh
        hasAnimatedIn.current = true;
        setShouldAnimate(true);
      }
    }

    const checkPosition = () => {
      if (!ref.current) return;

      const currentScrollY = window.scrollY;
      // Scroll direction: true strictly when scrolling DOWN
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Element is entering/in viewport
      const isEnteringViewport = rect.top < windowHeight * (1 - threshold) && rect.bottom > 0;
      // Element is completely offscreen BELOW the viewport
      const isCompletelyBelowViewport = rect.top >= windowHeight;

      if (isCompletelyBelowViewport) {
        // User is above the element (e.g. at Hero section) -> quietly reset off-screen
        hasAnimatedIn.current = false;
        setShouldAnimate(false);
      } else if (isEnteringViewport) {
        if (isScrollingDown) {
          // Downward scroll into view -> trigger 3D spring entrance animation if not already done
          if (!hasAnimatedIn.current) {
            hasAnimatedIn.current = true;
            setShouldAnimate(true);
          }
        } else {
          // Upward scroll into view -> lock to visible immediately (NO entrance animation)
          hasAnimatedIn.current = true;
          setShouldAnimate(true);
        }
      }
    };

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(checkPosition);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return { ref, shouldAnimate };
};
