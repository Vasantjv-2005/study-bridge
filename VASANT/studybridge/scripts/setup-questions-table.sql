-- Create the questions table with proper schema
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  subject TEXT NOT NULL,
  difficulty TEXT DEFAULT 'intermediate',
  points_offered INTEGER DEFAULT 50,
  language TEXT DEFAULT 'english',
  tags TEXT[] DEFAULT '{}',
  user_id UUID NOT NULL,
  is_solved BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject);
CREATE INDEX IF NOT EXISTS idx_questions_user_id ON questions(user_id);

-- Insert some sample questions for testing
INSERT INTO questions (title, description, subject, difficulty, points_offered, language, tags, user_id) VALUES
('How to solve quadratic equations?', 'I am struggling with understanding the quadratic formula and when to use it. Can someone explain the steps clearly?', 'mathematics', 'intermediate', 75, 'english', ARRAY['algebra', 'equations'], '00000000-0000-0000-0000-000000000001'),
('Explain photosynthesis process', 'What are the main stages of photosynthesis and how do they work together?', 'biology', 'beginner', 50, 'english', ARRAY['plants', 'cellular-biology'], '00000000-0000-0000-0000-000000000002'),
('JavaScript async/await vs Promises', 'What is the difference between using async/await and traditional Promise chains? When should I use each?', 'computer-science', 'advanced', 100, 'english', ARRAY['javascript', 'programming'], '00000000-0000-0000-0000-000000000003'),
('French verb conjugation help', 'I need help understanding how to conjugate irregular French verbs in the past tense.', 'languages', 'intermediate', 60, 'english', ARRAY['french', 'grammar'], '00000000-0000-0000-0000-000000000004'),
('Newton''s laws of motion', 'Can someone explain Newton''s three laws of motion with real-world examples?', 'physics', 'beginner', 40, 'english', ARRAY['mechanics', 'classical-physics'], '00000000-0000-0000-0000-000000000005')
ON CONFLICT (id) DO NOTHING;
