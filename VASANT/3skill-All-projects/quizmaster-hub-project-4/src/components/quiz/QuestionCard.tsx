import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  category: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
}) => {
  const options = [
    { key: 'A', value: question.option_a },
    { key: 'B', value: question.option_b },
    { key: 'C', value: question.option_c },
    { key: 'D', value: question.option_d },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
          {question.category}
        </span>
        <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground leading-relaxed">
          {question.question_text}
        </h2>
      </div>

      <div className="grid gap-3">
        {options.map(({ key, value }) => {
          const isSelected = selectedAnswer === key;

          return (
            <button
              key={key}
              onClick={() => onSelectAnswer(key)}
              className={`
                relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                ${isSelected
                  ? 'border-primary bg-accent shadow-md'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-accent/50'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm
                    transition-all duration-200
                    ${isSelected
                      ? 'gradient-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                    }
                  `}
                >
                  {key}
                </div>
                <span className={`flex-1 font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {value}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-primary animate-scale-in" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
