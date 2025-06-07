-- Create a function to insert questions that bypasses schema cache issues
CREATE OR REPLACE FUNCTION insert_question(
  p_title TEXT,
  p_content TEXT,
  p_subject TEXT,
  p_difficulty TEXT,
  p_points_offered INTEGER,
  p_language TEXT,
  p_tags TEXT[],
  p_user_id UUID
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  new_question_id UUID;
BEGIN
  -- Generate a new UUID for the question
  new_question_id := gen_random_uuid();
  
  -- Insert the question using dynamic SQL
  EXECUTE format('
    INSERT INTO questions (
      id, title, content, subject, difficulty, 
      points_offered, language, tags, user_id,
      is_solved, views_count, likes_count, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    )'
  ) USING 
    new_question_id, p_title, p_content, p_subject, p_difficulty,
    p_points_offered, p_language, p_tags, p_user_id,
    false, 0, 0, NOW(), NOW();
  
  RETURN new_question_id;
END;
$$;
