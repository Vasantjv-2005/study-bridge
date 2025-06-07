-- Create video sessions table
CREATE TABLE IF NOT EXISTS video_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  session_type TEXT CHECK (session_type IN ('1-on-1', 'group', 'language-exchange', 'homework-help')) NOT NULL,
  max_participants INTEGER DEFAULT 1,
  current_participants INTEGER DEFAULT 0,
  points_cost INTEGER DEFAULT 0,
  duration_minutes INTEGER NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT CHECK (status IN ('scheduled', 'active', 'completed', 'cancelled')) DEFAULT 'scheduled',
  meeting_url TEXT,
  languages TEXT[],
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create session participants table
CREATE TABLE IF NOT EXISTS session_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES video_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('registered', 'attended', 'no-show')) DEFAULT 'registered',
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  UNIQUE(session_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE video_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_participants ENABLE ROW LEVEL SECURITY;

-- Create policies for video sessions
CREATE POLICY "Anyone can view sessions" ON video_sessions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create sessions" ON video_sessions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Hosts can update own sessions" ON video_sessions
  FOR UPDATE USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete own sessions" ON video_sessions
  FOR DELETE USING (auth.uid() = host_id);

-- Create policies for session participants
CREATE POLICY "Anyone can view participants" ON session_participants
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can join sessions" ON session_participants
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own participation" ON session_participants
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_sessions_host_id ON video_sessions(host_id);
CREATE INDEX idx_sessions_scheduled_at ON video_sessions(scheduled_at);
CREATE INDEX idx_sessions_subject ON video_sessions(subject);
CREATE INDEX idx_participants_session_id ON session_participants(session_id);
CREATE INDEX idx_participants_user_id ON session_participants(user_id);
