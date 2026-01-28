-- Allow authenticated users to insert questions
CREATE POLICY "Authenticated users can insert questions" 
ON public.questions 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Add created_by column to track who created the question
ALTER TABLE public.questions 
ADD COLUMN created_by UUID REFERENCES auth.users(id);

-- Allow users to update their own questions
CREATE POLICY "Users can update their own questions" 
ON public.questions 
FOR UPDATE 
TO authenticated
USING (created_by = auth.uid());

-- Allow users to delete their own questions
CREATE POLICY "Users can delete their own questions" 
ON public.questions 
FOR DELETE 
TO authenticated
USING (created_by = auth.uid());