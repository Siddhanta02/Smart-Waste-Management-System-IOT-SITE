/*
  # Basic Schema Setup

  1. Tables
    - quizzes: Basic quiz information
    - quiz_questions: Questions with options
    - quiz_attempts: Track user attempts

  2. Security
    - Basic RLS policies for public access
*/

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id),
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL
);

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  quiz_id uuid REFERENCES quizzes(id),
  score integer NOT NULL,
  completed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Basic policies
CREATE POLICY "Public can view quizzes" ON quizzes FOR SELECT TO public USING (true);
CREATE POLICY "Public can view questions" ON quiz_questions FOR SELECT TO public USING (true);
CREATE POLICY "Users can view own attempts" ON quiz_attempts FOR SELECT USING (auth.uid() = user_id);

-- Insert sample quizzes
INSERT INTO quizzes (title, description, image_url) VALUES
  (
    'Waste Management Basics',
    'Test your knowledge about basic waste management principles',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b'
  ),
  (
    'Recycling Knowledge',
    'Challenge yourself with questions about recycling practices',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69'
  ),
  (
    'Environmental Impact',
    'Learn about how waste affects our environment',
    'https://images.unsplash.com/photo-1483569577148-f14683bed627'
  );

-- Insert sample questions
INSERT INTO quiz_questions (quiz_id, question, options, correct_answer)
SELECT
  q.id,
  'What is the first step in the waste management hierarchy?',
  '["Recycling", "Reduction", "Reuse", "Recovery"]',
  'Reduction'
FROM quizzes q
WHERE q.title = 'Waste Management Basics'
UNION ALL
SELECT
  q.id,
  'Which material takes the longest to decompose?',
  '["Paper", "Glass", "Plastic", "Aluminum"]',
  'Plastic'
FROM quizzes q
WHERE q.title = 'Recycling Knowledge'
UNION ALL
SELECT
  q.id,
  'What percentage of marine pollution is caused by plastic?',
  '["30%", "50%", "70%", "90%"]',
  '70%'
FROM quizzes q
WHERE q.title = 'Environmental Impact';