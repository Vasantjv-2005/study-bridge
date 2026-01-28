import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  answeredCount: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, answeredCount }) => {
  const progressPercentage = ((current) / total) * 100;
  const answeredPercentage = (answeredCount / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">
          Question <span className="font-semibold text-foreground">{current + 1}</span> of {total}
        </span>
        <span className="text-muted-foreground">
          <span className="font-semibold text-primary">{answeredCount}</span> answered
        </span>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary/30 rounded-full transition-all duration-500"
          style={{ width: `${answeredPercentage}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 gradient-primary rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
