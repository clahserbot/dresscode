import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import SiteHeader from '@/components/SiteHeader';

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DressCode",
  description: "Premium clothing for modern lifestyles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-sans antialiased bg-[#FFFFFF] text-[#111827] min-h-screen flex flex-col selection:bg-[#3C50E0]/20 selection:text-[#3C50E0]`}
      >
        <SiteHeader />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-8 md:py-12">
          {children}
        </main>

        <footer className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#111827]">Help & Support</h3>
                <ul className="text-sm text-gray-500 space-y-3">
                  <li>Kottayam, Kerala</li>
                  <li>(+099) 532-786-9843</li>
                  <li>support@example.com</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#111827]">Account</h3>
                <ul className="text-sm text-gray-500 space-y-3">
                  <li><a href="/cart" className="hover:text-[#111827] transition-colors">Cart</a></li>
                  <li><a href="/wishlist" className="hover:text-[#111827] transition-colors">Wishlist</a></li>
                  <li><a href="/" className="hover:text-[#111827] transition-colors">Shop</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#111827]">Quick Link</h3>
                <ul className="text-sm text-gray-500 space-y-3">
                  <li><a href="/privacy" className="hover:text-[#111827] transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-[#111827] transition-colors">Terms of Use</a></li>
                  <li><a href="/faq" className="hover:text-[#111827] transition-colors">FAQ</a></li>
                  <li><a href="/contact" className="hover:text-[#111827] transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-[#111827]">Download Apps</h3>
                <p className="text-sm text-gray-500">Get the latest updates from our app.</p>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-12 pt-8 flex justify-center text-sm text-gray-500">
              <p>&copy; 2026 DressCode. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
