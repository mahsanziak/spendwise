'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from '../../styles/Sections.module.css';

interface SectionProps {
  children: React.ReactNode;
}

const Sections: React.FC<SectionProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${styles.sections} ${isVisible ? styles.visible : ''}`}
      ref={sectionRef}
    >
      {children}
    </div>
  );
};

export default Sections;
