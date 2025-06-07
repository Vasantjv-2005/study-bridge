-- First, let's see what columns actually exist in the questions table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'questions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Drop the questions table completely and recreate it
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS questions CASCADE;

-- Recreate questions table with the exact schema we need
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  subject TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'intermediate',
  points_offered INTEGER NOT NULL DEFAULT 50,
  language TEXT NOT NULL DEFAULT 'english',
  tags TEXT[] DEFAULT '{}',
  user_id UUID NOT NULL,
  is_solved BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert questions" ON questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own questions" ON questions FOR UPDATE USING (true);
CREATE POLICY "Users can delete own questions" ON questions FOR DELETE USING (true);

-- Create answers table
CREATE TABLE answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  is_accepted BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for answers
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Create policies for answers
CREATE POLICY "Anyone can view answers" ON answers FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert answers" ON answers FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own answers" ON answers FOR UPDATE USING (true);
CREATE POLICY "Users can delete own answers" ON answers FOR DELETE USING (true);

-- Insert sample questions
INSERT INTO questions (id, title, content, subject, difficulty, points_offered, language, tags, user_id, views_count, likes_count) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'How to solve this integral calculus problem?',
    'I am struggling with finding the integral of x²sin(x)dx using integration by parts. I have tried multiple approaches but keep getting stuck. Can someone walk me through the steps?',
    'mathematics',
    'intermediate',
    50,
    'english',
    ARRAY['calculus', 'integration'],
    '00000000-0000-0000-0000-000000000001',
    24,
    5
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Explain the concept of photosynthesis in simple terms',
    'I need to explain photosynthesis to my younger sister who is in middle school. Can someone help me break it down into simple, easy-to-understand steps?',
    'biology',
    'beginner',
    75,
    'english',
    ARRAY['plant-science', 'basic-concepts'],
    '00000000-0000-0000-0000-000000000002',
    45,
    12
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Help with Python data structures - when to use lists vs dictionaries?',
    'I am learning Python and getting confused about when to use lists versus dictionaries. Can someone explain the key differences and provide some practical examples?',
    'computer-science',
    'beginner',
    100,
    'english',
    ARRAY['python', 'data-structures'],
    '00000000-0000-0000-0000-000000000003',
    18,
    3
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'How to write a compelling essay introduction?',
    'I am working on my college application essays and struggling with writing engaging introductions. What techniques work best to hook the reader from the first sentence?',
    'languages',
    'intermediate',
    60,
    'english',
    ARRAY['writing', 'essays'],
    '00000000-0000-0000-0000-000000000004',
    67,
    8
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample answers
INSERT INTO answers (question_id, user_id, content) VALUES
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000002', 'You need to use integration by parts twice. Let me show you the steps...'),
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000003', 'Here is a step-by-step solution with detailed explanation...'),
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000004', 'Another approach is to use the tabular method...'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', 'Photosynthesis is like cooking with sunlight. Plants take in carbon dioxide and water...'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000003', 'Think of it as a plant way of making food using sunlight as energy...'),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000001', 'Lists are for ordered data, dictionaries for key-value pairs. Here are examples...'),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000002', 'Use lists when order matters, dictionaries when you need fast lookups...'),
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000001', 'Start with a compelling question or statistic that hooks the reader...'),
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000002', 'Use an anecdote or personal story to create an emotional connection...')
ON CONFLICT DO NOTHING;

-- Verify the final schema
SELECT 'Questions table columns:' as info;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'questions' 
ORDER BY ordinal_position;

SELECT 'Sample questions count:' as info;
SELECT COUNT(*) as question_count FROM questions;
