import React from 'react';

interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: 'emerald' | 'red' | 'amber' | 'cyan' | 'purple';
  label?: string;
  sublabel?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 140,
  strokeWidth = 10,
  color = 'cyan',
  label,
  sublabel
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const offset = circumference - (clampedValue / 100) * circumference;

  const colorMap = {
    emerald: {
      stroke: '#10b981',
      bgStroke: 'rgba(16, 185, 129, 0.15)',
      text: 'text-emerald-500 dark:text-emerald-400',
      glow: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))'
    },
    red: {
      stroke: '#ef4444',
      bgStroke: 'rgba(239, 68, 68, 0.15)',
      text: 'text-rose-500 dark:text-rose-400',
      glow: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.4))'
    },
    amber: {
      stroke: '#f59e0b',
      bgStroke: 'rgba(245, 158, 11, 0.15)',
      text: 'text-amber-500 dark:text-amber-400',
      glow: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))'
    },
    cyan: {
      stroke: '#06b6d4',
      bgStroke: 'rgba(6, 182, 212, 0.15)',
      text: 'text-cyan-500 dark:text-cyan-400',
      glow: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.4))'
    },
    purple: {
      stroke: '#a855f7',
      bgStroke: 'rgba(168, 85, 247, 0.15)',
      text: 'text-purple-500 dark:text-purple-400',
      glow: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.4))'
    }
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={scheme.bgStroke}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={scheme.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            filter: scheme.glow,
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={`text-2xl font-bold font-mono tabular-nums ${scheme.text}`}>
          {label !== undefined ? label : `${clampedValue}%`}
        </span>
        {sublabel && (
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
