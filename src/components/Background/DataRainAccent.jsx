import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './DataRainAccent.css';

const GLYPHS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソ';
const FALL_END_RATIO = 1;
const FALL_FADE_START_RATIO = 0.78;
const BAND_CENTER = 0.5;
const BAND_WIDTH = 0.24;
const FONT_SIZE_MIN = 15;
const FONT_SIZE_MAX = 22;
const ROUTE_BURST_ACTIVE_RATE = 0.72;

const randomBetween = (min, max) => min + Math.random() * (max - min);
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getCenteredBand = (start, size) => {
  const halfWidth = BAND_WIDTH / 2;
  return [
    start + size * (BAND_CENTER - halfWidth),
    start + size * (BAND_CENTER + halfWidth),
  ];
};

function createColumns(width, height, fontSize, shellRect, routeBurst = false) {
  const shellLeft = shellRect?.left ?? width * 0.18;
  const shellRight = shellRect?.right ?? width * 0.82;
  const leftSpace = Math.max(0, shellLeft);
  const rightSpace = Math.max(0, width - shellRight);
  const minBand = Math.max(fontSize * 3.2, 46);

  const leftRange = leftSpace > minBand
    ? getCenteredBand(0, leftSpace)
    : getCenteredBand(0, width * 0.28);
  const rightRange = rightSpace > minBand
    ? getCenteredBand(shellRight, rightSpace)
    : getCenteredBand(width * 0.72, width * 0.28);

  const ranges = [
    [Math.max(0, leftRange[0]), Math.min(width, leftRange[1])],
    [Math.max(0, rightRange[0]), Math.min(width, rightRange[1])],
  ];

  return ranges.flatMap(([start, end], rangeIndex) => {
    const columns = [];
    const spacing = randomBetween(fontSize * 1.9, fontSize * 2.4);

    for (let x = start; x <= end; x += spacing) {
      columns.push({
        x: x + randomBetween(-5, 5),
        y: routeBurst
          ? randomBetween(-height * 0.12, height * 0.08)
          : randomBetween(-height * 0.28, 0),
        speed: randomBetween(0.16, 0.34),
        length: Math.floor(randomBetween(7, 16)),
        alpha: randomBetween(0.08, 0.18),
        active: routeBurst ? Math.random() < ROUTE_BURST_ACTIVE_RATE : Math.random() > 0.42,
        rangeIndex,
      });
    }

    return columns;
  });
}

const getFallOpacity = (y, height) => {
  const fadeStart = height * FALL_FADE_START_RATIO;
  const fadeEnd = height * FALL_END_RATIO;

  if (y <= fadeStart) return 1;

  return 1 - clamp((y - fadeStart) / (fadeEnd - fadeStart), 0, 1);
};

function DataRainAccent() {
  const canvasRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    let animationFrame = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let fontSize = 13;
    let columns = [];
    let lastTime = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      fontSize = Math.max(FONT_SIZE_MIN, Math.min(FONT_SIZE_MAX, width / 66));
      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const shellRect = document.querySelector('.page-shell')?.getBoundingClientRect();
      columns = createColumns(width, height, fontSize, shellRect, true);
    };

    const drawGlyph = (column, time) => {
      const fallOpacity = getFallOpacity(column.y, height);
      if (fallOpacity <= 0) return;

      for (let i = 0; i < column.length; i += 1) {
        const y = column.y - i * fontSize;
        if (y < -fontSize || y > height + fontSize) continue;

        const fade = 1 - i / column.length;
        const glyphIndex = (Math.floor(time / 75) + i * 5 + column.rangeIndex * 11) % GLYPHS.length;
        const alpha = column.alpha * fade * fallOpacity;

        context.fillStyle = i === 0
          ? `rgba(218, 255, 226, ${alpha * 1.45})`
          : `rgba(105, 220, 132, ${alpha})`;
        context.fillText(GLYPHS[glyphIndex], column.x, y);
      }
    };

    const draw = (time) => {
      if (!lastTime) lastTime = time;
      const delta = Math.min(time - lastTime, 34);
      lastTime = time;

      context.clearRect(0, 0, width, height);
      context.font = `${fontSize}px Consolas, "Courier New", monospace`;
      context.textBaseline = 'top';

      columns.forEach((column) => {
        if (!column.active) {
          if (Math.random() < delta * 0.000045) {
            column.active = true;
            column.y = randomBetween(-height * 0.18, -fontSize);
            column.speed = randomBetween(0.16, 0.34);
            column.length = Math.floor(randomBetween(7, 16));
            column.alpha = randomBetween(0.08, 0.18);
          }
          return;
        }

        drawGlyph(column, time);
        column.y += delta * column.speed;

        if (column.y > height * FALL_END_RATIO) {
          column.active = false;
        }
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [pathname]);

  return <canvas ref={canvasRef} className="data-rain-accent" aria-hidden="true" />;
}

export default DataRainAccent;
