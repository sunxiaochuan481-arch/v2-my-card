import { useEffect, useRef, useState } from 'react';
import './RevealImage.css';

const GLYPHS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト';
const REVEAL_DURATION = 1800;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const easeInOutCubic = (value) => (
  value < 0.5
    ? 4 * value * value * value
    : 1 - ((-2 * value + 2) ** 3) / 2
);

function RevealImage({ src, alt = '', className = '', imgClassName = '', variant = 'default', ...props }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const loadedRef = useRef(false);
  const completeRef = useRef(false);
  const revealStartRef = useRef(null);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [completeSrc, setCompleteSrc] = useState(null);
  const isLoaded = loadedSrc === src;
  const isComplete = completeSrc === src;

  useEffect(() => {
    loadedRef.current = isLoaded;
  }, [isLoaded]);

  useEffect(() => {
    let isCancelled = false;
    const preview = new Image();

    const markLoaded = () => {
      if (!isCancelled) {
        setLoadedSrc(src);
      }
    };

    preview.onload = markLoaded;
    preview.onerror = markLoaded;
    preview.src = src;

    if (preview.complete) {
      markLoaded();
    }

    return () => {
      isCancelled = true;
      preview.onload = null;
      preview.onerror = null;
    };
  }, [src]);

  useEffect(() => {
    loadedRef.current = false;
    completeRef.current = false;
    revealStartRef.current = null;

    if (rootRef.current) {
      rootRef.current.style.setProperty('--reveal-solid', '-22%');
      rootRef.current.style.setProperty('--reveal-edge', '-8%');
      rootRef.current.style.setProperty('--scan-top', '-10%');
    }
  }, [src]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;

    const context = canvas.getContext('2d');
    let animationFrame = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let fontSize = 13;
    let columns = [];
    let lastTime = 0;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      fontSize = clamp(width / 26, 10, 15);

      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.ceil(width / fontSize) + 2;
      columns = Array.from({ length: count }, (_, index) => ({
        x: index * fontSize + ((index % 3) - 1) * 1.5,
        y: -Math.random() * height,
        speed: 0.24 + Math.random() * 0.42,
        alpha: 0.32 + Math.random() * 0.32,
      }));
    };

    const draw = (time) => {
      if (!lastTime) lastTime = time;
      const delta = Math.min(time - lastTime, 34);
      lastTime = time;

      if (loadedRef.current && revealStartRef.current === null) {
        revealStartRef.current = time;
      }

      const rawProgress = revealStartRef.current === null
        ? 0
        : clamp((time - revealStartRef.current) / REVEAL_DURATION, 0, 1);
      const progress = easeInOutCubic(rawProgress);
      const solid = -22 + progress * 128;
      const edge = -8 + progress * 128;
      const scanTop = edge - 2;

      root.style.setProperty('--reveal-solid', `${solid}%`);
      root.style.setProperty('--reveal-edge', `${edge}%`);
      root.style.setProperty('--scan-top', `${scanTop}%`);

      context.fillStyle = loadedRef.current ? 'rgba(2, 7, 5, 0.17)' : 'rgba(2, 7, 5, 0.12)';
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px Consolas, "Courier New", monospace`;
      context.textBaseline = 'top';

      columns.forEach((column, index) => {
        const y = column.y;
        const glyph = GLYPHS[(Math.floor(time / 54) + index * 7) % GLYPHS.length];
        const score = (Math.max(y, 0) / height) * 100;
        const revealFade = revealStartRef.current === null
          ? 1
          : clamp((score - solid + 14) / 34, 0, 1);
        const headAlpha = column.alpha * revealFade;

        context.fillStyle = `rgba(201, 255, 220, ${headAlpha})`;
        context.fillText(glyph, column.x, y);

        context.fillStyle = `rgba(78, 198, 113, ${headAlpha * 0.38})`;
        context.fillText(GLYPHS[(index + Math.floor(y)) % GLYPHS.length], column.x, y - fontSize * 1.2);
        context.fillText(GLYPHS[(index * 3 + Math.floor(y)) % GLYPHS.length], column.x, y - fontSize * 2.4);

        column.y += delta * column.speed;
        if (column.y > height + fontSize * 4) {
          column.y = -fontSize * (3 + Math.random() * 18);
          column.speed = 0.24 + Math.random() * 0.42;
          column.alpha = 0.32 + Math.random() * 0.32;
        }
      });

      if (rawProgress >= 1 && !completeRef.current) {
        completeRef.current = true;
        setCompleteSrc(src);
        return;
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [src]);

  const handleLoad = () => {
    setLoadedSrc(src);
  };

  return (
    <span
      ref={rootRef}
      className={`reveal-image reveal-image-${variant} ${isLoaded ? 'loaded' : ''} ${isComplete ? 'complete' : ''} ${className}`}
    >
      <img
        className={imgClassName}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        {...props}
      />
      <canvas ref={canvasRef} className="reveal-matrix-canvas" aria-hidden="true" />
      <span className="reveal-scanline" aria-hidden="true" />
    </span>
  );
}

export default RevealImage;
