// src/components/common/Counter.jsx
import React, { useEffect, useState, useRef } from 'react';

export const Counter = ({ target, suffix = '', duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  const numericTarget = typeof target === 'number' 
    ? target 
    : parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;

  const actualSuffix = suffix || (typeof target === 'string' ? target.replace(/[0-9]/g, '') : '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * (2 - progress) * numericTarget);
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericTarget);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, numericTarget, duration]);

  return (
    <span ref={ref} className="font-mono">
      {count}
      {actualSuffix}
    </span>
  );
};
