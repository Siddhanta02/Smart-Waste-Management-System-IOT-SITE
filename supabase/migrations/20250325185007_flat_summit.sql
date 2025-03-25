/*
  # Add More Environmental Quizzes

  1. New Quizzes
    - Water Conservation
    - Energy Efficiency
    - Sustainable Living
    - Climate Change

  2. Questions
    - 4-5 questions per quiz
    - Multiple choice format
    - Varied difficulty levels
*/

-- Insert new quizzes
INSERT INTO quizzes (title, description, image_url) VALUES
  (
    'Water Conservation',
    'Test your knowledge about water conservation methods and importance',
    'https://images.unsplash.com/photo-1538300342682-cf57afb97285'
  ),
  (
    'Energy Efficiency',
    'Learn about energy conservation and sustainable practices',
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e'
  ),
  (
    'Sustainable Living',
    'Explore the principles of sustainable living and eco-friendly practices',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc'
  ),
  (
    'Climate Change',
    'Understand the impact of climate change and global warming',
    'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce'
  );

-- Insert questions for Water Conservation
WITH quiz AS (SELECT id FROM quizzes WHERE title = 'Water Conservation')
INSERT INTO quiz_questions (quiz_id, question, options, correct_answer)
VALUES
  (
    (SELECT id FROM quiz),
    'How much of Earth''s water is freshwater?',
    '["1%", "3%", "10%", "25%"]',
    '3%'
  ),
  (
    (SELECT id FROM quiz),
    'Which activity consumes the most water in a typical household?',
    '["Showering", "Toilet flushing", "Dishwashing", "Laundry"]',
    'Toilet flushing'
  ),
  (
    (SELECT id FROM quiz),
    'What is greywater?',
    '["Rainwater", "Ocean water", "Used water from sinks and showers", "Drinking water"]',
    'Used water from sinks and showers'
  ),
  (
    (SELECT id FROM quiz),
    'How many gallons of water can a dripping faucet waste per day?',
    '["1-2 gallons", "3-5 gallons", "5-10 gallons", "10-20 gallons"]',
    '5-10 gallons'
  );

-- Insert questions for Energy Efficiency
WITH quiz AS (SELECT id FROM quizzes WHERE title = 'Energy Efficiency')
INSERT INTO quiz_questions (quiz_id, question, options, correct_answer)
VALUES
  (
    (SELECT id FROM quiz),
    'Which appliance typically uses the most energy in a home?',
    '["Refrigerator", "Air conditioner", "Water heater", "Washing machine"]',
    'Air conditioner'
  ),
  (
    (SELECT id FROM quiz),
    'What is the most energy-efficient light bulb type?',
    '["Incandescent", "LED", "Halogen", "Fluorescent"]',
    'LED'
  ),
  (
    (SELECT id FROM quiz),
    'How much energy can you save by turning down your thermostat by 1 degree?',
    '["1%", "3%", "5%", "10%"]',
    '3%'
  ),
  (
    (SELECT id FROM quiz),
    'Which energy source is considered renewable?',
    '["Coal", "Natural gas", "Solar", "Oil"]',
    'Solar'
  );

-- Insert questions for Sustainable Living
WITH quiz AS (SELECT id FROM quizzes WHERE title = 'Sustainable Living')
INSERT INTO quiz_questions (quiz_id, question, options, correct_answer)
VALUES
  (
    (SELECT id FROM quiz),
    'What is a carbon footprint?',
    '["Shoe size", "Amount of CO2 emissions", "Walking distance", "Forest area"]',
    'Amount of CO2 emissions'
  ),
  (
    (SELECT id FROM quiz),
    'Which transportation method has the lowest environmental impact?',
    '["Car", "Bus", "Bicycle", "Motorcycle"]',
    'Bicycle'
  ),
  (
    (SELECT id FROM quiz),
    'What is the main benefit of buying local food?',
    '["Lower prices", "Better taste", "Reduced transportation emissions", "More variety"]',
    'Reduced transportation emissions'
  ),
  (
    (SELECT id FROM quiz),
    'Which material is most eco-friendly for shopping bags?',
    '["Plastic", "Paper", "Cotton", "Biodegradable plastic"]',
    'Cotton'
  );

-- Insert questions for Climate Change
WITH quiz AS (SELECT id FROM quizzes WHERE title = 'Climate Change')
INSERT INTO quiz_questions (quiz_id, question, options, correct_answer)
VALUES
  (
    (SELECT id FROM quiz),
    'What is the greenhouse effect?',
    '["Plant growth in greenhouses", "Trapping of heat in atmosphere", "Effect of green buildings", "Growing vegetables"]',
    'Trapping of heat in atmosphere'
  ),
  (
    (SELECT id FROM quiz),
    'Which gas contributes most to the greenhouse effect?',
    '["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"]',
    'Carbon dioxide'
  ),
  (
    (SELECT id FROM quiz),
    'What is the main cause of sea level rise?',
    '["More rain", "Melting ice caps", "Ocean currents", "Wind patterns"]',
    'Melting ice caps'
  ),
  (
    (SELECT id FROM quiz),
    'Which human activity contributes most to climate change?',
    '["Agriculture", "Transportation", "Burning fossil fuels", "Construction"]',
    'Burning fossil fuels'
  );