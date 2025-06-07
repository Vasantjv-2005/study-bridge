-- Drop the existing table if it exists
DROP TABLE IF EXISTS questions CASCADE;

-- Create the questions table with the correct schema
CREATE TABLE questions (
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

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON questions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON questions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON questions
  FOR UPDATE WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_created_at ON questions(created_at DESC);
CREATE INDEX idx_questions_is_solved ON questions(is_solved);

-- Insert sample data
INSERT INTO questions (title, description, subject, difficulty, points_offered, language, tags, user_id, is_solved, views_count, likes_count)
VALUES 
  ('How to solve this integral calculus problem?', 'I''m struggling with finding the integral of x²sin(x)dx using integration by parts. I''ve tried multiple approaches but keep getting stuck. Can someone walk me through the steps?', 'mathematics', 'intermediate', 50, 'english', ARRAY['calculus', 'integration'], '00000000-0000-0000-0000-000000000001', false, 24, 5),
  
  ('Explain the concept of photosynthesis in simple terms', 'I need to explain photosynthesis to my younger sister who''s in middle school. Can someone help me break it down into simple, easy-to-understand steps?', 'biology', 'beginner', 75, 'english', ARRAY['plant-science', 'basic-concepts'], '00000000-0000-0000-0000-000000000002', false, 45, 12),
  
  ('Help with Python data structures - when to use lists vs dictionaries?', 'I''m learning Python and getting confused about when to use lists versus dictionaries. Can someone explain the key differences and provide some practical examples?', 'computer-science', 'beginner', 100, 'english', ARRAY['python', 'data-structures'], '00000000-0000-0000-0000-000000000003', false, 18, 3),
  
  ('Understanding quantum mechanics basics', 'I''m taking my first quantum physics course and struggling with the wave-particle duality concept. Can someone explain this in simple terms with examples?', 'physics', 'intermediate', 125, 'english', ARRAY['quantum-physics', 'wave-particle'], '00000000-0000-0000-0000-000000000004', false, 67, 8),
  
  ('French grammar: when to use subjunctive mood?', 'I''m learning French and having trouble understanding when to use the subjunctive mood. The rules seem complex and I keep making mistakes. Any tips?', 'languages', 'intermediate', 60, 'english', ARRAY['french', 'grammar', 'subjunctive'], '00000000-0000-0000-0000-000000000005', true, 89, 15);

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'questions' 
ORDER BY ordinal_position;

-- Show sample data
SELECT id, title, subject, difficulty, points_offered, is_solved, views_count, likes_count, created_at 
FROM questions 
ORDER BY created_at DESC;
