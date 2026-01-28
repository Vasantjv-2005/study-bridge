import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / totalTime) * 100;
  
  const isWarning = timeLeft <= 60;
  const isCritical = timeLeft <= 30;
  
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-14 h-14">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted/50"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className={`transition-all duration-1000 ${
              isCritical
                ? 'text-destructive'
                : isWarning
                ? 'text-timer'
                : 'text-primary'
            }`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock className={`w-5 h-5 ${
            isCritical
              ? 'text-destructive animate-pulse'
              : isWarning
              ? 'text-timer'
              : 'text-primary'
          }`} />
        </div>
      </div>
      <div className="text-right">
        <p className={`text-2xl font-display font-bold tabular-nums ${
          isCritical
            ? 'text-destructive'
            : isWarning
            ? 'text-timer'
            : 'text-foreground'
        }`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        <p className="text-xs text-muted-foreground">Time Remaining</p>
      </div>
    </div>
  );
};

export default Timer;
