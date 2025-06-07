-- Add phone column to user_profiles table if it doesn't exist
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Create index on phone column
CREATE INDEX IF NOT EXISTS idx_user_profiles_phone ON user_profiles(phone);
