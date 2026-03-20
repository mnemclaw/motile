import { motion } from 'framer-motion';
import type { MediaProps } from '../../types/config';

interface MediaBlockProps extends MediaProps {
  index?: number;
}

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return null;
}

export function MediaBlock({ url, title, caption, index = 0 }: MediaBlockProps) {
  const embedUrl = getEmbedUrl(url);

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
        overflow: 'hidden',
        backdropFilter: 'var(--backdrop-blur)',
        WebkitBackdropFilter: 'var(--backdrop-blur)',
      }}
    >
      {title && (
        <div
          style={{
            padding: 'var(--space-4) var(--space-4) 0',
            fontWeight: 600,
            fontSize: 'var(--text-base)',
            color: 'var(--color-text)',
          }}
        >
          {title}
        </div>
      )}
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
            }}
          >
            <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              {url}
            </a>
          </div>
        )}
      </div>
      {caption && (
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
          }}
        >
          {caption}
        </div>
      )}
    </motion.div>
  );
}
