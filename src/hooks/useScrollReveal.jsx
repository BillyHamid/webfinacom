import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

export function RevealOnScroll({ children, className = '', delay = 0, direction = 'up', duration = 700 }) {
  const { ref, isVisible } = useScrollReveal();

  const directions = {
    up: 'translate3d(0, 40px, 0)',
    down: 'translate3d(0, -40px, 0)',
    left: 'translate3d(40px, 0, 0)',
    right: 'translate3d(-40px, 0, 0)',
    none: 'translate3d(0, 0, 0)',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : directions[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

export function StaggerChildren({ children, className = '', stagger = 100, direction = 'up' }) {
  const { ref, isVisible } = useScrollReveal();

  const directions = {
    up: 'translate3d(0, 40px, 0)',
    down: 'translate3d(0, -40px, 0)',
    left: 'translate3d(40px, 0, 0)',
    right: 'translate3d(-40px, 0, 0)',
  };

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translate3d(0, 0, 0)' : directions[direction],
                transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${i * stagger}ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${i * stagger}ms`,
                willChange: 'opacity, transform',
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
