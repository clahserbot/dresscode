export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-[#111827] mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          At DressCode, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
        <h2 className="text-xl font-semibold text-[#111827] mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes personal data, such as your name, shipping address, email address, and telephone number.
        </p>
        <h2 className="text-xl font-semibold text-[#111827] mt-8 mb-4">2. Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to process orders, manage your account, and deliver targeted advertising.
        </p>
        <h2 className="text-xl font-semibold text-[#111827] mt-8 mb-4">3. Disclosure of Your Information</h2>
        <p>
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows: By Law or to Protect Rights, Third-Party Service Providers, and Marketing Communications.
        </p>
        <p className="pt-8 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
