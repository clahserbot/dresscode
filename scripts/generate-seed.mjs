import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import crypto from 'crypto';

const s3Client = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_S3_REGION || 'ap-south-1',
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY,
    secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY,
  },
});

const dummyProducts = [
  {
    title: 'Silk Blend Overcoat',
    category: 'outerwear',
    price: 299.99,
    description: 'A luxurious silk blend overcoat perfect for fall evenings.',
    imageUrl: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Classic Wool Trench',
    category: 'outerwear',
    price: 189.99,
    description: 'Timeless wool trench coat for everyday elegance.',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Essential Cotton Tee',
    category: 'tops',
    price: 29.99,
    description: 'Breathable and soft essential cotton t-shirt.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Ribbed Knit Sweater',
    category: 'tops',
    price: 79.99,
    description: 'Cozy ribbed knit sweater for chilly days.',
    imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Tailored Trousers',
    category: 'bottoms',
    price: 89.99,
    description: 'Perfectly tailored trousers for a sharp look.',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Wide Leg Denim',
    category: 'bottoms',
    price: 69.99,
    description: 'Comfortable wide-leg denim jeans with vintage wash.',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Leather Crossbody Bag',
    category: 'accessories',
    price: 129.99,
    description: 'Genuine leather crossbody bag with adjustable strap.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Minimalist Watch',
    category: 'accessories',
    price: 149.99,
    description: 'Sleek minimalist watch with matte black finish.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'
  }
];

const categories = [
  { id: crypto.randomUUID(), name: 'Outerwear', slug: 'outerwear' },
  { id: crypto.randomUUID(), name: 'Tops', slug: 'tops' },
  { id: crypto.randomUUID(), name: 'Bottoms', slug: 'bottoms' },
  { id: crypto.randomUUID(), name: 'Accessories', slug: 'accessories' }
];

async function uploadImageToSupabase(imageUrl, filename) {
  console.log(`Downloading ${imageUrl}...`);
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log(`Uploading ${filename} to Supabase...`);
  const command = new PutObjectCommand({
    Bucket: 'dresscode',
    Key: `products/${filename}`,
    Body: buffer,
    ContentType: 'image/jpeg'
  });
  
  await s3Client.send(command);
  // Supabase public URL format
  return `https://qwfivsvkheiwqfivzmvq.supabase.co/storage/v1/object/public/dresscode/products/${filename}`;
}

async function run() {
  let sql = `-- Seed Data\n\n`;

  // Categories
  sql += `INSERT INTO categories (id, name, slug) VALUES\n`;
  const catVals = categories.map(c => `('${c.id}', '${c.name}', '${c.slug}')`).join(',\n');
  sql += catVals + `;\n\n`;

  // Products
  sql += `INSERT INTO products (id, title, description, price, sizes, category, r2_image_url, created_at) VALUES\n`;
  
  const productRows = [];
  for (let i = 0; i < dummyProducts.length; i++) {
    const product = dummyProducts[i];
    const filename = `dummy-${i}-${Date.now()}.jpg`;
    
    try {
      const publicUrl = await uploadImageToSupabase(product.imageUrl, filename);
      const id = crypto.randomUUID();
      const sizes = JSON.stringify(['S', 'M', 'L']);
      const createdAt = Date.now();
      
      const titleEscaped = product.title.replace(/'/g, "''");
      const descEscaped = product.description.replace(/'/g, "''");
      
      productRows.push(`('${id}', '${titleEscaped}', '${descEscaped}', ${product.price}, '${sizes}', '${product.category}', '${publicUrl}', ${createdAt})`);
    } catch (err) {
      console.error(`Failed to process ${product.title}:`, err);
    }
  }

  sql += productRows.join(',\n') + `;\n`;

  fs.writeFileSync('seed.sql', sql);
  console.log('Generated seed.sql successfully!');
}

run();
