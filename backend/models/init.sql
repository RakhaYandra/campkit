-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  borrow_limit INT DEFAULT 2,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    stock_quantity INT NOT NULL,
    available_quantity INT NOT NULL,
    price_per_day DECIMAL(10,2) NOT NULL,
    condition_status VARCHAR(20) NOT NULL, -- new, good, maintenance, retired
    image_urls TEXT[], -- Array of image URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    category_id INT REFERENCES categories(id) -- Add category relationship
);

-- Product Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Borrowings Table
CREATE TABLE borrowings (
    id SERIAL PRIMARY KEY,
    booking_code VARCHAR(20) UNIQUE NOT NULL,
    user_id INT REFERENCES users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, confirmed, active, returned, cancelled
    total_price DECIMAL(10,2) NOT NULL,
    borrow_date DATE NOT NULL,
    return_date DATE NOT NULL,
    actual_return_date DATE,
    penalty_amount DECIMAL(10,2) DEFAULT 0,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Borrowing Items Table
CREATE TABLE borrowing_items (
    id SERIAL PRIMARY KEY,
    borrowing_id INT REFERENCES borrowings(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    price_per_day DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) NOT NULL, -- return_reminder, confirmation, penalty, system
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Maintenance Table
CREATE TABLE product_maintenance (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE,
    maintenance_type VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'ongoing', -- ongoing, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_borrowings_user_id ON borrowings(user_id);
CREATE INDEX idx_borrowings_status ON borrowings(status);
CREATE INDEX idx_borrowing_items_borrowing_id ON borrowing_items(borrowing_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_products_category_id ON products(category_id);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create triggers for updating timestamp
CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_modtime
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_borrowings_modtime
    BEFORE UPDATE ON borrowings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_maintenance_modtime
    BEFORE UPDATE ON product_maintenance
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
