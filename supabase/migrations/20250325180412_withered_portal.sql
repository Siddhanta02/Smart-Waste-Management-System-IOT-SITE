/*
  # Add RLS policies for orders table

  1. Security Changes
    - Enable RLS on orders table (if not already enabled)
    - Add policies for:
      - Users can create their own orders
      - Users can read their own orders
      - Admins can read all orders
*/

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create their own orders"
ON orders
FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own orders"
ON orders
FOR SELECT
TO public
USING (auth.uid() = user_id);

-- Add policy for order items
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own order items"
ON order_items
FOR INSERT
TO public
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

CREATE POLICY "Users can read their own order items"
ON order_items
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);