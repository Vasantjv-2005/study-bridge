-- First, let's make sure the user_profiles table exists and has the right structure
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  country TEXT,
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  education_level TEXT,
  subjects_of_interest TEXT[],
  languages TEXT[],
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view all profiles" ON user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Now let's make sure the questions table has the right structure and foreign key
DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  subject TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'intermediate',
  points_offered INTEGER NOT NULL DEFAULT 50,
  language TEXT NOT NULL DEFAULT 'english',
  tags TEXT[] DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_solved BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for questions
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create policies for questions
CREATE POLICY "Anyone can view questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert questions" ON questions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own questions" ON questions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own questions" ON questions FOR DELETE USING (auth.uid() = user_id);

-- Create answers table for counting
CREATE TABLE IF NOT EXISTS answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
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
CREATE POLICY "Authenticated users can insert answers" ON answers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own answers" ON answers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own answers" ON answers FOR DELETE USING (auth.uid() = user_id);

-- Insert some sample data for testing
INSERT INTO user_profiles (id, full_name, country, avatar_url) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Lisa Mueller', 'Germany', '/placeholder.svg?height=32&width=32'),
  ('00000000-0000-0000-0000-000000000002', 'Raj Kumar', 'India', '/placeholder.svg?height=32&width=32'),
  ('00000000-0000-0000-0000-000000000003', 'Sophie Chen', 'France', '/placeholder.svg?height=32&width=32'),
  ('00000000-0000-0000-0000-000000000004', 'Taro Nakamura', 'Japan', '/placeholder.svg?height=32&width=32')
ON CONFLICT (id) DO NOTHING;

-- Insert some sample questions
INSERT INTO questions (id, title, content, subject, difficulty, points_offered, language, tags, user_id, views_count, likes_count) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'How to solve this integral calculus problem?',
    'I''m struggling with finding the integral of x²sin(x)dx using integration by parts. I''ve tried multiple approaches but keep getting stuck. Can someone walk me through the steps?',
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
    'I need to explain photosynthesis to my younger sister who''s in middle school. Can someone help me break it down into simple, easy-to-understand steps?',
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
    'I''m learning Python and getting confused about when to use lists versus dictionaries. Can someone explain the key differences and provide some practical examples?',
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
    'I''m working on my college application essays and struggling with writing engaging introductions. What techniques work best to hook the reader from the first sentence?',
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

-- Insert some sample answers for counting
INSERT INTO answers (question_id, user_id, content) VALUES
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000002', 'You need to use integration by parts twice...'),
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000003', 'Here''s a step-by-step solution...'),
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000004', 'Another approach is to use...'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', 'Photosynthesis is like cooking with sunlight...'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000003', 'Think of it as a plant''s way of making food...'),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000001', 'Lists are for ordered data, dictionaries for key-value pairs...'),
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000002', 'Start with a compelling question or statistic...')
ON CONFLICT DO NOTHING;
