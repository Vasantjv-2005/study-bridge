-- Drop the table if it exists
DROP TABLE IF EXISTS questions;

-- Create the questions table with the correct schema
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Add some sample questions
INSERT INTO questions (title, description, subject, difficulty, points_offered, language, tags, user_id, is_solved, views_count, likes_count)
VALUES 
  ('How to solve this integral calculus problem?', 'I''m struggling with finding the integral of x²sin(x)dx using integration by parts. I''ve tried multiple approaches but keep getting stuck. Can someone walk me through the steps?', 'mathematics', 'intermediate', 50, 'english', ARRAY['calculus', 'integration'], '00000000-0000-0000-0000-000000000001', false, 24, 5),
  
  ('Explain the concept of photosynthesis in simple terms', 'I need to explain photosynthesis to my younger sister who''s in middle school. Can someone help me break it down into simple, easy-to-understand steps?', 'biology', 'beginner', 75, 'english', ARRAY['plant-science', 'basic-concepts'], '00000000-0000-0000-0000-000000000002', false, 45, 12),
  
  ('Help with Python data structures - when to use lists vs dictionaries?', 'I''m learning Python and getting confused about when to use lists versus dictionaries. Can someone explain the key differences and provide some practical examples?', 'computer-science', 'beginner', 100, 'english', ARRAY['python', 'data-structures'], '00000000-0000-0000-0000-000000000003', false, 18, 3);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON questions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON questions
  FOR INSERT WITH CHECK (true);

-- Verify the table was created
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'questions';

-- Show sample data
SELECT * FROM questions LIMIT 5;
