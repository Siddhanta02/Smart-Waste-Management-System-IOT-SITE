-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing types if they exist
DROP TYPE IF EXISTS complaint_status CASCADE;
DROP TYPE IF EXISTS driver_status CASCADE;
DROP TYPE IF EXISTS order_status CASCADE;

-- Create custom types
CREATE TYPE complaint_status AS ENUM ('pending', 'in_progress', 'resolved');
CREATE TYPE driver_status AS ENUM ('available', 'busy', 'offline');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered');

-- Drop existing tables if they exist
DROP TABLE IF EXISTS driver_tasks CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS quiz_attempts CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS complaints CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL UNIQUE,
  full_name text,
  phone text,
  address text,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX users_email_idx ON users(email);

-- Complaints table
CREATE TABLE complaints (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  status complaint_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text,
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  status order_status DEFAULT 'pending',
  total_amount decimal(10,2) NOT NULL,
  shipping_address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES orders(id),
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL
);

-- Blogs table
CREATE TABLE blogs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quizzes table
CREATE TABLE quizzes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Quiz questions table
CREATE TABLE quiz_questions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Quiz attempts table
CREATE TABLE quiz_attempts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  score integer NOT NULL CHECK (score >= 0),
  completed_at timestamptz DEFAULT now()
);

-- Drivers table
CREATE TABLE drivers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  vehicle_number text NOT NULL,
  license_number text NOT NULL,
  status driver_status DEFAULT 'offline',
  current_location jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Driver tasks table
CREATE TABLE driver_tasks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id uuid REFERENCES drivers(id),
  complaint_id uuid REFERENCES complaints(id),
  status text DEFAULT 'pending',
  assigned_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_tasks ENABLE ROW LEVEL SECURITY;

-- Create admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'admin'
    FROM public.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policies

-- Users policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Complaints policies
CREATE POLICY "Anyone can view complaints" ON complaints
  FOR SELECT USING (true);

CREATE POLICY "Users can create complaints" ON complaints
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update complaint status" ON complaints
  FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- Products policies
CREATE POLICY "Anyone can read products" ON products
  FOR SELECT USING (true);

-- Orders policies
CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can read own order items" ON order_items
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  ));

-- Blogs policies
CREATE POLICY "Anyone can read blogs" ON blogs
  FOR SELECT USING (true);

CREATE POLICY "Users can create blogs" ON blogs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Quiz policies
CREATE POLICY "Anyone can view quizzes" ON quizzes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view quiz questions" ON quiz_questions
  FOR SELECT USING (true);

CREATE POLICY "Users can view own attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

-- Driver policies
CREATE POLICY "Admins can manage drivers" ON drivers
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Insert sample data

-- Insert products
INSERT INTO products (name, description, price, image_url, stock) VALUES
  ('Recycled Paper Notebook', 'Made from 100% recycled paper', 9.99, 'https://images.unsplash.com/photo-1531346878377-a5be20888e57', 100),
  ('Eco-friendly Water Bottle', 'Made from recycled plastic', 19.99, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8', 50),
  ('Recycled Glass Vase', 'Beautiful vase made from recycled glass', 29.99, 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9', 30);

-- Insert sample drivers
INSERT INTO drivers (vehicle_number, license_number, status) VALUES
  ('KA01MX1234', 'DL98765432', 'available'),
  ('KA01MX5678', 'DL12345678', 'available'),
  ('KA01MX9012', 'DL45678901', 'busy'),
  ('KA01MX3456', 'DL78901234', 'offline');

-- Insert sample complaints
INSERT INTO complaints (title, description, location, status) VALUES
  ('Overflowing Garbage Bin', 'The garbage bin near Central Park is overflowing and needs immediate attention', 'Central Park, Main Street', 'pending'),
  ('Illegal Dumping', 'Someone has dumped construction waste on the side of Park Road', 'Park Road, Near Shopping Mall', 'pending'),
  ('Waste Collection Delayed', 'Regular waste collection has not happened for the past 3 days', 'Green Valley Apartments', 'in_progress'),
  ('Recycling Bin Missing', 'The recycling bin at the community center has been removed', 'Community Center, West Block', 'resolved');

-- Insert quizzes and questions
DO $$
DECLARE
  waste_management_id uuid;
  recycling_id uuid;
  environmental_id uuid;
BEGIN
  -- Insert quizzes
  INSERT INTO quizzes (title, description, image_url) VALUES
    ('Waste Management Basics', 'Test your knowledge about basic waste management principles', 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b')
    RETURNING id INTO waste_management_id;
  
  INSERT INTO quizzes (title, description, image_url) VALUES
    ('Recycling Knowledge', 'Challenge yourself with questions about recycling practices', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69')
    RETURNING id INTO recycling_id;
  
  INSERT INTO quizzes (title, description, image_url) VALUES
    ('Environmental Impact', 'Learn about how waste affects our environment', 'https://images.unsplash.com/photo-1483569577148-f14683bed627')
    RETURNING id INTO environmental_id;

  -- Insert questions
  INSERT INTO quiz_questions (quiz_id, question, options, correct_answer) VALUES
    (waste_management_id, 'What is the first step in the waste management hierarchy?', '["Recycling", "Reduction", "Reuse", "Recovery"]', 'Reduction'),
    (waste_management_id, 'Which type of waste requires special handling?', '["Paper", "Plastic", "Glass", "Hazardous"]', 'Hazardous'),
    (recycling_id, 'Which material takes the longest to decompose?', '["Paper", "Glass", "Plastic", "Aluminum"]', 'Plastic'),
    (recycling_id, 'What should you do with recyclables before disposing?', '["Clean them", "Break them", "Paint them", "Fold them"]', 'Clean them'),
    (environmental_id, 'What percentage of marine pollution is caused by plastic?', '["30%", "50%", "70%", "90%"]', '70%'),
    (environmental_id, 'Which gas is primarily released by landfills?', '["Oxygen", "Carbon dioxide", "Methane", "Nitrogen"]', 'Methane');
END $$;