import React from 'react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<number, string>;
  onNavigate: (index: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  totalQuestions,
  currentIndex,
  answers,
  onNavigate,
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {Array.from({ length: totalQuestions }, (_, index) => {
        const isAnswered = answers[index] !== undefined;
        const isCurrent = currentIndex === index;

        return (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`
              w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200
              ${isCurrent
                ? 'gradient-primary text-primary-foreground shadow-primary scale-110'
                : isAnswered
                ? 'bg-success text-success-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
              }
            `}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionNavigation;
