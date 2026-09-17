import React, { useState, useEffect, useRef } from 'react';

function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quartic for a smooth slowdown
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return (
    <span ref={countRef}>
      {new Intl.NumberFormat('en-US').format(count)}{suffix}
    </span>
  );
}

export default function Milestones() {
  const stats = [
    { end: 20, suffix: '+', label: 'Years of Excellence' },
    { end: 15000, suffix: '+', label: 'Happy Families' },
    { end: 50, suffix: '+', label: 'Landmark Projects' },
    { end: 25, suffix: 'M', label: 'Sq. Ft. Developed' }
  ];

  return (
    <section className="py-24 text-foreground relative">
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 20%, white 80%, rgba(255,255,255,0) 100%)' }}></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Two Decades of Transformation</h2>
          <p className="text-lg text-muted">From a single residential complex to shaping city skylines across the globe, our journey is defined by relentless innovation and unwavering trust.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <h3 className="text-3xl md:text-5xl md:text-6xl font-bold text-blue drop-shadow-[0_2px_10px_rgba(14,165,233,0.2)] mb-4">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </h3>
              <p className="text-muted font-semibold uppercase tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
