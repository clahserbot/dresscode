import { getDb } from '@/db/db';
import { products, settings } from '@/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import ProductGrid from '@/components/ProductGrid';
import AnimatedSection from '@/components/AnimatedSection';
import InfiniteMarquee from '@/components/InfiniteMarquee';
import ShopTheLook from '@/components/ShopTheLook';
import StyleQuiz from '@/components/StyleQuiz';
import CustomerGallery from '@/components/CustomerGallery';



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

  // Parse JSON fields for new sections
  let stl_hotspots;
  try { stl_hotspots = currentSettings.stl_hotspots ? JSON.parse(currentSettings.stl_hotspots) : undefined; } catch(e){}

  let sq_steps;
  try { sq_steps = currentSettings.sq_steps ? JSON.parse(currentSettings.sq_steps) : undefined; } catch(e){}

  let gallery_photos;
  try { gallery_photos = currentSettings.gallery_photos ? JSON.parse(currentSettings.gallery_photos) : undefined; } catch(e){}

  return (
    <div className="pt-4 space-y-24">
      {/* Hero Section */}
      <AnimatedSection delay={0.1}>
        <section className="mb-8">
          <div className="bg-[#F3F4F6] rounded-[2rem] flex flex-col md:flex-row items-center justify-between p-10 md:p-20 overflow-hidden shadow-sm">
            <div className="max-w-xl space-y-6 z-10">
              <span className="inline-block bg-white text-[#3C50E0] px-4 py-1.5 rounded-full font-semibold text-sm tracking-widest shadow-sm">
                {currentSettings.hero_discount}
              </span>
              <h1 className="font-bold text-5xl md:text-7xl text-[#111827] leading-[1.1] tracking-tight">
                {currentSettings.hero_title}
              </h1>
              <p className="text-gray-500 text-xl leading-relaxed">
                {currentSettings.hero_subtitle}
              </p>
              <button className="bg-[#111827] text-white px-10 py-4 rounded-xl font-semibold hover:bg-[#3C50E0] hover:scale-105 transition-all duration-300 mt-4 shadow-lg hover:shadow-xl hover:shadow-[#3C50E0]/30">
                Shop the Collection
              </button>
            </div>
            <div className="mt-12 md:mt-0 w-full md:w-5/12 flex justify-center z-10 relative">
              <div className="absolute inset-0 bg-[#3C50E0]/10 rounded-full blur-3xl" />
              <img 
                src={currentSettings.hero_image_url} 
                alt={currentSettings.hero_title} 
                className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-2xl relative z-10"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <InfiniteMarquee />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ShopTheLook 
          title={currentSettings.stl_title}
          subtitle={currentSettings.stl_subtitle}
          imageUrl={currentSettings.stl_image_url}
          hotspots={stl_hotspots}
        />
      </AnimatedSection>


      {/* New Arrivals Header */}
      <AnimatedSection delay={0.1}>
        <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
          <h2 className="text-3xl font-bold text-[#111827] tracking-tight">
            {searchParams.category ? <span className="capitalize">{searchParams.category}</span> : 'New Arrivals'}
          </h2>
          <a href="/shop" className="px-5 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl text-gray-700 hover:border-[#111827] hover:text-[#111827] transition-all duration-300">
            View All Pieces
          </a>
        </div>

        {results.length === 0 ? (
          <div className="py-32 text-center text-gray-400 bg-gray-50/50 rounded-3xl mb-16 border border-gray-100">
            <p className="text-xl font-medium">No items found in this category.</p>
          </div>
        ) : (
          <div className="mb-24">
            <ProductGrid products={results} />
          </div>
        )}
      </AnimatedSection>

      {/* Promo Sections */}
      <AnimatedSection delay={0.1}>
        <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-[2rem] p-10 flex flex-col sm:flex-row items-center justify-between gap-8 group hover:bg-gray-100 transition-colors duration-500 border border-transparent hover:border-gray-200">
            <div className="flex-1 space-y-4">
              <span className="text-[#3C50E0] font-semibold tracking-wider text-sm uppercase">{currentSettings.promo1_subtitle}</span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight leading-tight">{currentSettings.promo1_title}</h3>
              <a href={currentSettings.promo1_product_id ? `/product/${currentSettings.promo1_product_id}` : '#'} className="bg-[#111827] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white hover:text-[#111827] transition-all duration-300 w-fit mt-4 inline-block border-2 border-transparent hover:border-[#111827] shadow-lg">
                Explore
              </a>
            </div>
            {currentSettings.promo1_image_url ? (
              <div className="w-full sm:w-1/2 md:w-5/12 aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-gray-200 shrink-0 relative">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                <img src={currentSettings.promo1_image_url} alt={currentSettings.promo1_title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
              </div>
            ) : (
              <div className="w-full sm:w-1/2 md:w-5/12 aspect-[4/5] bg-gray-200 rounded-2xl animate-pulse shrink-0" />
            )}
          </div>
          
          <div className="bg-[#111827] rounded-[2rem] p-10 flex flex-col sm:flex-row items-center justify-between gap-8 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3C50E0]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex-1 space-y-4 relative z-10">
              <span className="text-gray-400 font-semibold tracking-wider text-sm uppercase">{currentSettings.promo2_subtitle}</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">{currentSettings.promo2_title}</h3>
              <p className="text-base text-gray-400 leading-relaxed">{currentSettings.promo2_description}</p>
              <a href={currentSettings.promo2_product_id ? `/product/${currentSettings.promo2_product_id}` : '#'} className="bg-white text-[#111827] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#3C50E0] hover:text-white transition-all duration-300 w-fit mt-4 inline-block shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-none">
                Explore
              </a>
            </div>
            {currentSettings.promo2_image_url ? (
              <div className="w-full sm:w-1/2 md:w-5/12 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gray-800 shrink-0 relative z-10">
                <img src={currentSettings.promo2_image_url} alt={currentSettings.promo2_title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] opacity-90 group-hover:opacity-100" />
              </div>
            ) : (
              <div className="w-full sm:w-1/2 md:w-5/12 aspect-[4/5] bg-gray-800 rounded-2xl animate-pulse shrink-0 relative z-10" />
            )}
          </div>
        </section>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <StyleQuiz 
          title={currentSettings.sq_title}
          subtitle={currentSettings.sq_subtitle}
          steps={sq_steps}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <CustomerGallery 
          title={currentSettings.gallery_title}
          subtitle={currentSettings.gallery_subtitle}
          photos={gallery_photos}
        />
      </AnimatedSection>

      {/* Features/Trust Badges */}
      <AnimatedSection delay={0.2}>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-t border-gray-100">
          <div className="flex flex-col items-center text-center gap-5 group">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-[#111827] group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-xl">
              <span className="group-hover:grayscale">🚚</span>
            </div>
            <div>
              <h4 className="font-bold text-[#111827] text-lg mb-1">Complimentary Delivery</h4>
              <p className="text-sm text-gray-500">For all orders over ₹200</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-5 group">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-[#111827] group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-xl">
              <span className="group-hover:grayscale">🔄</span>
            </div>
            <div>
              <h4 className="font-bold text-[#111827] text-lg mb-1">Seamless Returns</h4>
              <p className="text-sm text-gray-500">30-day return policy</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-5 group">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-[#111827] group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-xl">
              <span className="group-hover:grayscale">🔒</span>
            </div>
            <div>
              <h4 className="font-bold text-[#111827] text-lg mb-1">Secure Checkout</h4>
              <p className="text-sm text-gray-500">Encrypted payment gateway</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-5 group">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-[#111827] group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-xl">
              <span className="group-hover:grayscale">💬</span>
            </div>
            <div>
              <h4 className="font-bold text-[#111827] text-lg mb-1">Priority Support</h4>
              <p className="text-sm text-gray-500">24/7 concierge service</p>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
