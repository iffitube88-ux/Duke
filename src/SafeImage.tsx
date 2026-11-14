import { useState, type ImgHTMLAttributes } from 'react';

type SafeImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'onError'> & {
  sources: readonly string[];
  fallback: string;
};

/**
 * Attempts the known photo URLs in order, then a first-party image under /public.
 * Unlike the previous handler, every failed source advances and the last failure
 * displays a legible empty-state rather than a broken image glyph.
 */
export default function SafeImage({ sources, fallback, alt, ...props }: SafeImageProps) {
  const [index, setIndex] = useState(0);
  const options = [...new Set([...sources.filter(Boolean), fallback])];
  const current = options[Math.min(index, options.length - 1)];
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable) {
    return <span role="img" aria-label={alt || 'Photo unavailable'}
      className={'safe-image-empty ' + (props.className || '')}>
      <span>DUKES OF BEAUTY</span><small>Image temporarily unavailable</small>
    </span>;
  }
  return <img {...props} src={current} alt={alt || ''}
    onError={() => {
      if (index < options.length - 1) setIndex(value => value + 1);
      else setUnavailable(true);
    }}/>;
}
