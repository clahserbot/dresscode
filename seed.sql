-- Seed Data

INSERT INTO categories (id, name, slug) VALUES
('05fe7090-304c-4069-991a-08f0b89feed7', 'Outerwear', 'outerwear'),
('fae686b8-86b4-4371-b60a-6388b0ae3e54', 'Tops', 'tops'),
('037adfb0-f02e-4173-ad33-5b5ac1ab976b', 'Bottoms', 'bottoms'),
('623f7f87-01fa-46a0-8b15-59c71d285392', 'Accessories', 'accessories');

INSERT INTO products (id, title, description, price, sizes, category, r2_image_url, created_at) VALUES
('826d2dea-8fdf-4dd9-bccc-3b009b98aa8b', 'Silk Blend Overcoat', 'A luxurious silk blend overcoat perfect for fall evenings.', 299.99, '["S","M","L"]', 'outerwear', 'https://qwfivsvkheiwqfivzmvq.supabase.co/storage/v1/object/public/dresscode/products/dummy-0-1788634643766.jpg', 1788634644778),
('c4d54472-8e9e-4de6-a6fa-2aeea15737b4', 'Classic Wool Trench', 'Timeless wool trench coat for everyday elegance.', 189.99, '["S","M","L"]', 'outerwear', 'https://qwfivsvkheiwqfivzmvq.supabase.co/storage/v1/object/public/dresscode/products/dummy-1-1788634644778.jpg', 1788634644960),
('2cf03561-528d-4541-91d8-d0fda4a9a391', 'Essential Cotton Tee', 'Breathable and soft essential cotton t-shirt.', 29.99, '["S","M","L"]', 'tops', 'https://qwfivsvkheiwqfivzmvq.supabase.co/storage/v1/object/public/dresscode/products/dummy-2-1788634644960.jpg', 1788634645224),
('a9d6ac39-709a-47f0-9807-c65633eeda22', 'Ribbed Knit Sweater', 'Cozy ribbed knit sweater for chilly days.', 79.99, '["S","M","L"]', 'tops', 'https://qwfivsvkheiwqfivzmvq.supabase.co/storage/v1/object/public/dresscode/products/dummy-3-1788634645224.jpg', 1788634645371),
('7be702c3-f9b8-4eb6-95cc-ec8a4e917c0b', 'Tailored Trousers', 'Perfectly tailored trousers for a sharp look.', 89.99, '["S","M","L"]', 'bottoms', 'https://qwfivsvkheiwqfivzmvq.supabase.co/storage/v1/object/public/dresscode/products/dummy-4-1788634645371.jpg', 1788634645689),
('2593890d-b372-4b35-acf0-1f5649dc0769', 'Wide Leg Denim', 'Comfortable wide-leg denim jeans with vintage wash.', 69.99, '["S","M","L"]', 'bottoms', 'https://qwfivsvkheiwqfivzmvq.supabase.co/storage/v1/object/public/dresscode/products/dummy-5-1788634645689.jpg', 1788634645891),
('9066de82-8c74-4178-a08e-90a1915844c3', 'Leather Crossbody Bag', 'Genuine leather crossbody bag with adjustable strap.', 129.99, '["S","M","L"]', 'accessories', 'https://qwfivsvkheiwqfivzmvq.supabase.co/storage/v1/object/public/dresscode/products/dummy-6-1788634645891.jpg', 1788634646159),
('4f4b2e06-126a-479e-b2f1-7c38d28d5aca', 'Minimalist Watch', 'Sleek minimalist watch with matte black finish.', 149.99, '["S","M","L"]', 'accessories', 'https://qwfivsvkheiwqfivzmvq.supabase.co/storage/v1/object/public/dresscode/products/dummy-7-1788634646159.jpg', 1788634646288);
