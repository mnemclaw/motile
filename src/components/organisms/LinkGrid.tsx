import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LinkBlock } from '../molecules/LinkBlock';
import type { LinkGridProps } from '../../types/config';

gsap.registerPlugin(ScrollTrigger);

interface LinkGridComponentProps extends LinkGridProps {
  startIndex?: number;
}

export function LinkGrid({ links, columns = 1, startIndex = 0 }: LinkGridComponentProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.link-grid-item');
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, []);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: columns === 1 ? '1fr' : columns === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: 'var(--space-3)',
    padding: 'var(--space-4) 0',
  };

  const autoColumns =
    links.length <= 4 ? 1 : links.length <= 8 ? 2 : 3;
  const effectiveCols = columns || autoColumns;

  return (
    <motion.div
      ref={gridRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: startIndex * 0.08 }}
      style={{
        ...gridStyle,
        gridTemplateColumns:
          effectiveCols === 1 ? '1fr' : effectiveCols === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      }}
    >
      {links.map((link, i) => (
        <div key={link.href + i} className="link-grid-item">
          <LinkBlock {...link} index={i} />
        </div>
      ))}
    </motion.div>
  );
}
