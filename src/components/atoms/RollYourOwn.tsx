import { motion } from 'framer-motion';

export function RollYourOwn() {
  return (
    <motion.a
      href="/motile/edit"
      aria-label="Open the Motile editor"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 18,
        delay: 0.6,
      }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'inline-block',
        padding: '0.55rem 1rem',
        background: '#c8f542',
        color: '#0e0e0e',
        fontWeight: 800,
        fontSize: '0.8rem',
        letterSpacing: '0.01em',
        borderRadius: '12px',
        transform: 'rotate(-6deg)',
        boxShadow: '3px 3px 0 #0e0e0e',
        textDecoration: 'none',
        lineHeight: 1.3,
        cursor: 'pointer',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      Roll your own Motile ✦
    </motion.a>
  );
}
