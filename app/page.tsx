import { getDb } from '@/db/db';
import { products, settings } from '@/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import ProductGrid from '@/components/ProductGrid';

export const runtime = 'edge';

export default async function Storefront(props: { searchParams: Promise<{ category?: string, q?: string }> }) {
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

  const allSettings = await db.select().from(settings);
  const settingsMap = allSettings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const defaultSettings: Record<string, string> = {
    hero_title: 'Premium Fall Collection',
    hero_subtitle: 'Discover our latest styles designed for the modern lifestyle. Quality meets comfort.',
    hero_discount: 'Up to 50% OFF',
    hero_image_url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop',
    promo1_title: 'Summer Essentials',
    promo1_subtitle: 'Up to 20% off',
    promo1_image_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop',
    promo1_product_id: '',
    promo2_title: 'Accessories Sale',
    promo2_subtitle: 'Up to 40% off',
    promo2_description: 'The perfect additions to complete your look.',
    promo2_image_url: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2070&auto=format&fit=crop',
    promo2_product_id: ''
  };

  const currentSettings = { ...defaultSettings, ...settingsMap };

  return (
    <div className="pt-4">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="bg-[#F3F4F6] rounded-2xl flex flex-col md:flex-row items-center justify-between p-10 md:p-16 overflow-hidden">
          <div className="max-w-xl space-y-4 z-10">
            <span className="text-[#3C50E0] font-semibold text-lg tracking-wide">{currentSettings.hero_discount}</span>
            <h1 className="font-bold text-4xl md:text-5xl text-[#111827] leading-tight">
              {currentSettings.hero_title}
            </h1>
            <p className="text-gray-600 text-lg">
              {currentSettings.hero_subtitle}
            </p>
            <button className="bg-[#111827] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3C50E0] transition mt-4">
              Shop Now
            </button>
          </div>
          <div className="mt-8 md:mt-0 w-full md:w-1/2 flex justify-center z-10">
            <img 
              src={currentSettings.hero_image_url} 
              alt={currentSettings.hero_title} 
              className="w-full h-auto max-h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals Header */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-[#111827]">
          {searchParams.category ? <span className="capitalize">{searchParams.category}</span> : 'New Arrivals'}
        </h2>
        <a href="/shop" className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
          See All
        </a>
      </div>

      {results.length === 0 ? (
        <div className="py-24 text-center text-gray-500 bg-gray-50 rounded-xl mb-16">
          <p className="text-lg font-medium">No items found in this category.</p>
        </div>
      ) : (
        <div className="mb-16">
          <ProductGrid products={results} />
        </div>
      )}

      {/* Promo Sections */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#F3F4F6] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 group">
          <div className="flex-1 space-y-3">
            <span className="text-gray-600 font-medium">{currentSettings.promo1_subtitle}</span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#111827]">{currentSettings.promo1_title}</h3>
            <a href={currentSettings.promo1_product_id ? `/product/${currentSettings.promo1_product_id}` : '#'} className="bg-[#111827] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#3C50E0] transition w-fit mt-4 inline-block">
              Grab the deal
            </a>
          </div>
          {currentSettings.promo1_image_url ? (
            <div className="w-full sm:w-1/2 md:w-2/5 aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-200 shrink-0">
              <img src={currentSettings.promo1_image_url} alt={currentSettings.promo1_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ) : (
            <div className="w-full sm:w-1/2 md:w-2/5 aspect-[4/3] bg-gray-300 rounded-xl animate-pulse shrink-0" />
          )}
        </div>
        
        <div className="bg-[#F3F4F6] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 group">
          <div className="flex-1 space-y-3">
            <span className="text-gray-600 font-medium">{currentSettings.promo2_subtitle}</span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#111827]">{currentSettings.promo2_title}</h3>
            <p className="text-sm text-gray-500">{currentSettings.promo2_description}</p>
            <a href={currentSettings.promo2_product_id ? `/product/${currentSettings.promo2_product_id}` : '#'} className="bg-[#3C50E0] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#111827] transition w-fit mt-2 inline-block">
              Grab the deal
            </a>
          </div>
          {currentSettings.promo2_image_url ? (
            <div className="w-full sm:w-1/2 md:w-2/5 aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-200 shrink-0">
              <img src={currentSettings.promo2_image_url} alt={currentSettings.promo2_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ) : (
            <div className="w-full sm:w-1/2 md:w-2/5 aspect-[4/3] bg-gray-300 rounded-xl animate-pulse shrink-0" />
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-16">
        <div className="bg-[#111827] rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#3C50E0]/30 to-transparent pointer-events-none" />
          <div className="max-w-md relative z-10">
            <h2 className="text-3xl font-bold text-white mb-3">Don't Miss Out Latest Trends & Offers</h2>
            <p className="text-gray-400">Register to receive news about the latest offers & discount codes</p>
          </div>
          <form className="flex w-full max-w-md gap-3 relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3C50E0]"
            />
            <button type="submit" className="bg-[#3C50E0] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Features/Trust Badges */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
        <div className="flex flex-col items-start gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">🚚</div>
          <div>
            <h4 className="font-semibold text-[#111827]">Free Shipping</h4>
            <p className="text-sm text-gray-500">For all orders over ₹200</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">🔄</div>
          <div>
            <h4 className="font-semibold text-[#111827]">1 & 1 Returns</h4>
            <p className="text-sm text-gray-500">Cancellation after 1 day</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">🔒</div>
          <div>
            <h4 className="font-semibold text-[#111827]">Secure Payments</h4>
            <p className="text-sm text-gray-500">Guarantee secure payments</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">💬</div>
          <div>
            <h4 className="font-semibold text-[#111827]">24/7 Support</h4>
            <p className="text-sm text-gray-500">Anywhere & anytime</p>
          </div>
        </div>
      </section>
    </div>
  );
}
