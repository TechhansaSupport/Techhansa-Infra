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
    { end: 10, suffix: '+', label: 'Years of Unshakable Trust' },
    { end: 10000, suffix: '+', label: 'Happy Families' },
    { end: 50, suffix: '+', label: 'Landmark Projects' },
    { end: 5, suffix: 'M+', label: 'Sq. Ft. Developed' }
  ];

  return (
    <section 
      className="py-24 relative bg-fixed bg-center bg-cover"
      style={{ backgroundImage: 'url("/images/construction.jpg")' }}
    >
      <div className="absolute inset-0 z-0 bg-white/20"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-white/50 max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">The Techhansa Trust Metrics</h2>
            <p className="text-lg text-slate-800 font-medium leading-relaxed">We let our numbers speak for our dedication to our clients. From our first foundation to our latest skyline, we build with uncompromising quality.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue mb-4">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </h3>
                <p className="text-slate-700 font-bold uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
