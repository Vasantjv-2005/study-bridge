-- Create study materials table
CREATE TABLE IF NOT EXISTS study_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  material_type TEXT CHECK (material_type IN ('notes', 'summaries', 'presentations', 'practice-tests', 'videos', 'other')),
  file_url TEXT,
  file_type TEXT,
  file_size INTEGER,
  education_level TEXT CHECK (education_level IN ('high-school', 'undergraduate', 'graduate')),
  language TEXT DEFAULT 'english',
  tags TEXT[],
  downloads_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create material ratings table
CREATE TABLE IF NOT EXISTS material_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  material_id UUID REFERENCES study_materials(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(material_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_ratings ENABLE ROW LEVEL SECURITY;

-- Create policies for study materials
CREATE POLICY "Anyone can view materials" ON study_materials
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create materials" ON study_materials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own materials" ON study_materials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own materials" ON study_materials
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for material ratings
CREATE POLICY "Anyone can view ratings" ON material_ratings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create ratings" ON material_ratings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own ratings" ON material_ratings
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_materials_user_id ON study_materials(user_id);
CREATE INDEX idx_materials_subject ON study_materials(subject);
CREATE INDEX idx_materials_created_at ON study_materials(created_at DESC);
CREATE INDEX idx_material_ratings_material_id ON material_ratings(material_id);
