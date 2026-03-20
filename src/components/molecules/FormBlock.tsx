import { motion } from 'framer-motion';
import { useState } from 'react';
import type { FormProps } from '../../types/config';

interface FormBlockProps extends FormProps {
  index?: number;
}

export function FormBlock({
  title,
  placeholder = 'Enter your email',
  buttonLabel = 'Subscribe',
  successMessage = 'Thanks! You\'re subscribed.',
  index = 0,
}: FormBlockProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{
        background: 'var(--color-surface)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: 'var(--space-6)',
        textAlign: 'center',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
      }}
    >
      {title && (
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--color-text)',
            margin: '0 0 var(--space-4)',
          }}
        >
          {title}
        </h3>
      )}
      {submitted ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ color: 'var(--color-primary)', fontWeight: 500, margin: 0 }}
        >
          {successMessage}
        </motion.p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', gap: 'var(--space-2)', maxWidth: 400, margin: '0 auto' }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            aria-label={placeholder}
            style={{
              flex: 1,
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--color-bg)',
              border: 'var(--border-card)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text)',
              fontSize: 'var(--text-base)',
              outline: 'none',
            }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--color-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: 'var(--text-base)',
              cursor: 'pointer',
              boxShadow: 'var(--glow-primary)',
            }}
          >
            {buttonLabel}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}
