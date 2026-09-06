import { getDb } from '@/db/db';
import { products } from '@/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import ProductGrid from '@/components/ProductGrid';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';

export default async function ShopPage(props: { searchParams: Promise<{ curated?: string, vibe?: string, category?: string, q?: string }> }) {
  const searchParams = await props.searchParams;
  const db = getDb();
  
  let results;
  if (searchParams.q) {
    results = await db.select().from(products).where(
      sql`lower(${products.title}) LIKE ${`%${searchParams.q.toLowerCase()}%`}`
    ).orderBy(desc(products.createdAt));
  } else if (searchParams.category) {
    results = await db.select().from(products).where(eq(products.category, searchParams.category)).orderBy(desc(products.createdAt));
  } else {
    results = await db.select().from(products).orderBy(desc(products.createdAt));
  }

  // Format the vibe string if present (e.g., "earthy-neutrals-streetwear" -> "Earthy Neutrals Streetwear")
  const formattedVibe = searchParams.vibe 
    ? searchParams.vibe.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  return (
    <div className="pt-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-100 pb-8">
          <div className="space-y-3">
            {searchParams.curated === 'true' && searchParams.vibe ? (
              <>
                <span className="text-[#3C50E0] font-semibold tracking-widest text-sm uppercase">Curated For You</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
                  Your Collection
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl">
                  We've hand-picked these pieces to perfectly match your <span className="font-semibold text-[#111827]">{formattedVibe}</span> aesthetic.
                </p>
              </>
            ) : searchParams.category ? (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight capitalize">
                  {searchParams.category}
                </h1>
                <p className="text-gray-500 text-lg">Explore our collection of premium {searchParams.category.toLowerCase()}.</p>
              </>
            ) : searchParams.q ? (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
                  Search Results
                </h1>
                <p className="text-gray-500 text-lg">Showing results for "{searchParams.q}"</p>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
                  All Pieces
                </h1>
                <p className="text-gray-500 text-lg">Explore our entire collection of premium apparel and accessories.</p>
              </>
            )}
          </div>
          
          {searchParams.curated === 'true' && (
            <Link 
              href="/shop" 
              className="mt-6 md:mt-0 px-6 py-3 text-sm font-semibold border border-gray-200 rounded-xl text-gray-700 hover:border-[#111827] hover:text-[#111827] transition-all duration-300"
            >
              View All Pieces Instead
            </Link>
          )}
        </div>
      </AnimatedSection>

      {/* Product Grid */}
      <AnimatedSection delay={0.2}>
        {results.length === 0 ? (
          <div className="py-32 text-center text-gray-400 bg-gray-50/50 rounded-3xl border border-gray-100">
            <p className="text-xl font-medium">No items found.</p>
            <Link href="/shop" className="text-[#3C50E0] hover:underline mt-4 inline-block font-semibold">
              Clear filters and view all pieces
            </Link>
          </div>
        ) : (
          <div className="mb-24">
            <ProductGrid products={results} />
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
