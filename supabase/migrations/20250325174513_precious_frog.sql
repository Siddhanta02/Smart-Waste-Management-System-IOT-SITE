/*
  # Initial Schema for Recyclean

  1. New Tables
    - users
      - Custom user data and profile information
    - complaints
      - User-submitted complaints about waste management
    - products
      - Recycled products for marketplace
    - orders
      - User orders from marketplace
    - blogs
      - User blog posts
    - quizzes
      - Educational quizzes
    - quiz_attempts
      - User quiz attempts and scores
    - drivers
      - Waste collection truck drivers
    - driver_tasks
      - Tasks assigned to drivers
    
  2. Security
    - RLS enabled on all tables
    - Policies for user access control
*/

-- Create custom types
CREATE TYPE complaint_status AS ENUM ('pending', 'in_progress', 'resolved');
CREATE TYPE driver_status AS ENUM ('available', 'busy', 'offline');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  address TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Complaints table
CREATE TABLE complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  status complaint_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  status order_status DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Blogs table
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Quizzes table
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quiz questions table
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES quizzes(id),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL
);

-- Quiz attempts table
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  quiz_id UUID REFERENCES quizzes(id),
  score INT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Drivers table
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  vehicle_number TEXT NOT NULL,
  license_number TEXT NOT NULL,
  status driver_status DEFAULT 'offline',
  current_location JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Driver tasks table
CREATE TABLE driver_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID REFERENCES drivers(id),
  complaint_id UUID REFERENCES complaints(id),
  status TEXT DEFAULT 'pending',
  assigned_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
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

-- Create policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Anyone can read products
CREATE POLICY "Anyone can read products" ON products
  FOR SELECT USING (true);

-- Users can read their own orders
CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Users can read and create blogs
CREATE POLICY "Users can read all blogs" ON blogs
  FOR SELECT USING (true);

CREATE POLICY "Users can create blogs" ON blogs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can read all quizzes
CREATE POLICY "Users can read all quizzes" ON quizzes
  FOR SELECT USING (true);

-- Users can read and create quiz attempts
CREATE POLICY "Users can read own quiz attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

-- Admin policies
CREATE POLICY "Admins have full access" ON users
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  ));

-- Insert some initial data
INSERT INTO products (name, description, price, image_url, stock) VALUES
  ('Recycled Paper Notebook', 'Made from 100% recycled paper', 9.99, 'https://images.unsplash.com/photo-1531346878377-a5be20888e57', 100),
  ('Eco-friendly Water Bottle', 'Made from recycled plastic', 19.99, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8', 50),
  ('Recycled Glass Vase', 'Beautiful vase made from recycled glass', 29.99, 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9', 30);

INSERT INTO quizzes (title, description) VALUES
  ('Waste Management Basics', 'Test your knowledge about waste management fundamentals'),
  ('Recycling 101', 'Learn about different types of recyclable materials'),
  ('Environmental Impact', 'Understand how waste affects our environment');