/*
  # Add Sample Data for Admin Dashboard

  1. Changes
    - Add sample drivers
    - Add sample complaints
    - Add driver tasks
    - Update RLS policies
*/

-- Add sample drivers
INSERT INTO drivers (vehicle_number, license_number, status)
VALUES
  ('KA01MX1234', 'DL98765432', 'available'),
  ('KA01MX5678', 'DL12345678', 'available'),
  ('KA01MX9012', 'DL45678901', 'busy'),
  ('KA01MX3456', 'DL78901234', 'offline');

-- Add sample complaints
INSERT INTO complaints (title, description, location, status)
VALUES
  (
    'Overflowing Garbage Bin',
    'The garbage bin near Central Park is overflowing and needs immediate attention',
    'Central Park, Main Street',
    'pending'
  ),
  (
    'Illegal Dumping',
    'Someone has dumped construction waste on the side of Park Road',
    'Park Road, Near Shopping Mall',
    'pending'
  ),
  (
    'Waste Collection Delayed',
    'Regular waste collection has not happened for the past 3 days',
    'Green Valley Apartments',
    'in_progress'
  ),
  (
    'Recycling Bin Missing',
    'The recycling bin at the community center has been removed',
    'Community Center, West Block',
    'resolved'
  );

-- Add sample driver tasks
INSERT INTO driver_tasks (driver_id, complaint_id, status)
SELECT 
  d.id,
  c.id,
  'assigned'
FROM drivers d, complaints c
WHERE d.status = 'busy'
AND c.status = 'in_progress'
LIMIT 1;