/*
  # Fix Quiz Tables and Data Structure

  1. Changes
    - Add proper constraints and indexes
    - Fix quiz questions data structure
    - Add more sample questions per quiz
    - Ensure proper data relationships

  2. Security
    - Maintain RLS policies
    - Add proper access controls
*/

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  score integer NOT NULL CHECK (score >= 0),
  completed_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);

-- Enable RLS
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Policies for quizzes
CREATE POLICY "Anyone can view quizzes"
  ON quizzes FOR SELECT
  TO public
  USING (true);

-- Policies for quiz_questions
CREATE POLICY "Anyone can view quiz questions"
  ON quiz_questions FOR SELECT
  TO public
  USING (true);

-- Policies for quiz_attempts
CREATE POLICY "Users can view their own attempts"
  ON quiz_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create quiz attempts"
  ON quiz_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample quiz data
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

-- Insert questions for Waste Management Basics
WITH quiz AS (SELECT id FROM quizzes WHERE title = 'Waste Management Basics')
INSERT INTO quiz_questions (quiz_id, question, options, correct_answer)
VALUES
  (
    (SELECT id FROM quiz),
    'What is the first step in the waste management hierarchy?',
    '["Recycling", "Reduction", "Reuse", "Recovery"]',
    'Reduction'
  ),
  (
    (SELECT id FROM quiz),
    'Which type of waste requires special handling?',
    '["Paper", "Plastic", "Glass", "Hazardous"]',
    'Hazardous'
  ),
  (
    (SELECT id FROM quiz),
    'What color bin is typically used for general waste?',
    '["Blue", "Green", "Black", "Yellow"]',
    'Black'
  ),
  (
    (SELECT id FROM quiz),
    'What is composting?',
    '["Burning waste", "Recycling plastic", "Decomposing organic matter", "Landfill disposal"]',
    'Decomposing organic matter'
  );

-- Insert questions for Recycling Knowledge
WITH quiz AS (SELECT id FROM quizzes WHERE title = 'Recycling Knowledge')
INSERT INTO quiz_questions (quiz_id, question, options, correct_answer)
VALUES
  (
    (SELECT id FROM quiz),
    'Which material takes the longest to decompose?',
    '["Paper", "Glass", "Plastic", "Aluminum"]',
    'Plastic'
  ),
  (
    (SELECT id FROM quiz),
    'What should you do with recyclables before disposing?',
    '["Clean them", "Break them", "Paint them", "Fold them"]',
    'Clean them'
  ),
  (
    (SELECT id FROM quiz),
    'Which item cannot be recycled?',
    '["Newspaper", "Plastic bottle", "Ceramic mug", "Aluminum can"]',
    'Ceramic mug'
  ),
  (
    (SELECT id FROM quiz),
    'What happens to recycled plastic bottles?',
    '["They are burned", "They become new bottles", "They are buried", "They are exported"]',
    'They become new bottles'
  );

-- Insert questions for Environmental Impact
WITH quiz AS (SELECT id FROM quizzes WHERE title = 'Environmental Impact')
INSERT INTO quiz_questions (quiz_id, question, options, correct_answer)
VALUES
  (
    (SELECT id FROM quiz),
    'What percentage of marine pollution is caused by plastic?',
    '["30%", "50%", "70%", "90%"]',
    '70%'
  ),
  (
    (SELECT id FROM quiz),
    'Which gas is primarily released by landfills?',
    '["Oxygen", "Carbon dioxide", "Methane", "Nitrogen"]',
    'Methane'
  ),
  (
    (SELECT id FROM quiz),
    'How many years does it take for a plastic bottle to decompose?',
    '["50-100", "200-300", "400-500", "700-1000"]',
    '400-500'
  ),
  (
    (SELECT id FROM quiz),
    'What is the main environmental impact of improper waste disposal?',
    '["Noise pollution", "Light pollution", "Soil contamination", "Air freshening"]',
    'Soil contamination'
  );