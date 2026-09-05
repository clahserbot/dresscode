export default function TermsOfUse() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-[#111827] mb-8">Terms of Use</h1>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          Welcome to DressCode! These Terms of Use constitute a legally binding agreement made between you and DressCode, concerning your access to and use of our website.
        </p>
        <h2 className="text-xl font-semibold text-[#111827] mt-8 mb-4">1. Agreement to Terms</h2>
        <p>
          By accessing the Site, you agree that you have read, understood, and agree to be bound by all of these Terms of Use. If you do not agree with all of these Terms of Use, then you are expressly prohibited from using the Site.
        </p>
        <h2 className="text-xl font-semibold text-[#111827] mt-8 mb-4">2. Intellectual Property Rights</h2>
        <p>
          Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site are owned or controlled by us.
        </p>
        <h2 className="text-xl font-semibold text-[#111827] mt-8 mb-4">3. User Representations</h2>
        <p>
          By using the Site, you represent and warrant that all registration information you submit will be true, accurate, current, and complete.
        </p>
        <p className="pt-8 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
