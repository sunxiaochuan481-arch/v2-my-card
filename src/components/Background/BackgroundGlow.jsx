// 背景光晕组件
import './BackgroundGlow.css';

function BackgroundGlow({ 
  color = 'primary', 
  position = 'center',
  size = 'large',
  blur = true 
}) {
  const colorClass = `glow-${color}`;
  const positionClass = `glow-${position}`;
  const sizeClass = `glow-${size}`;

  return (
    <div className={`background-glow ${colorClass} ${positionClass} ${sizeClass} ${blur ? 'blur' : ''}`} />
  );
}

export function BackgroundGlowGroup() {
  return (
    <div className="background-glow-container">
      <BackgroundGlow color="primary" position="top-left" size="medium" />
      <BackgroundGlow color="secondary" position="bottom-right" size="large" />
      <BackgroundGlow color="accent" position="top-right" size="small" />
    </div>
  );
}

export default BackgroundGlow;
