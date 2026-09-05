import { getDb } from '@/db/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import ProductDetailView from '@/components/ProductDetailView';

export const runtime = 'edge';

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const db = getDb();
  
  const productRes = await db.select().from(products).where(eq(products.id, params.id)).limit(1);
  const product = productRes[0];

  if (!product) {
    return notFound();
  }

  const sizes = JSON.parse(product.sizes || '[]');
  return (
    <ProductDetailView 
      product={product} 
      sizes={sizes} 
    />
  );
}
