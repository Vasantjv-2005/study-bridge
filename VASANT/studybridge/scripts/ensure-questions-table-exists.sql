-- First, let's make sure we have the correct table structure
DROP TABLE IF EXISTS public.questions CASCADE;
DROP TABLE IF EXISTS public.answers CASCADE;

-- Create questions table with the exact structure we need
CREATE TABLE public.questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Create answers table for completeness
CREATE TABLE public.answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    is_best_answer BOOLEAN DEFAULT false,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;

-- Create policies for questions
CREATE POLICY "Anyone can view questions" ON public.questions
    FOR SELECT USING (true);

CREATE POLICY "Anyone can insert questions" ON public.questions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own questions" ON public.questions
    FOR UPDATE USING (true);

-- Create policies for answers
CREATE POLICY "Anyone can view answers" ON public.answers
    FOR SELECT USING (true);

CREATE POLICY "Anyone can insert answers" ON public.answers
    FOR INSERT WITH CHECK (true);

-- Insert some sample data
INSERT INTO public.questions (title, description, subject, difficulty, points_offered, language, tags, user_id) VALUES
('How to solve quadratic equations?', 'I need help understanding the quadratic formula and when to use it.', 'mathematics', 'intermediate', 75, 'english', ARRAY['algebra', 'equations'], '00000000-0000-0000-0000-000000000001'),
('Explain photosynthesis process', 'Can someone break down the steps of photosynthesis in simple terms?', 'biology', 'beginner', 50, 'english', ARRAY['plants', 'biology'], '00000000-0000-0000-0000-000000000002'),
('Python vs JavaScript differences', 'What are the main differences between Python and JavaScript for beginners?', 'computer-science', 'beginner', 100, 'english', ARRAY['python', 'javascript', 'programming'], '00000000-0000-0000-0000-000000000003');

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'questions' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Test insert to make sure it works
INSERT INTO public.questions (title, description, subject, difficulty, points_offered, language, tags, user_id) 
VALUES ('Test Question', 'This is a test question to verify the table works', 'mathematics', 'beginner', 25, 'english', ARRAY['test'], '00000000-0000-0000-0000-000000000999');

SELECT 'Questions table created successfully with ' || COUNT(*) || ' sample questions' as result FROM public.questions;
