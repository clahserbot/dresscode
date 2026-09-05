export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-[#111827] mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions about an order, our products, or our website? We're here to help!
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-[#111827]">Address</h3>
              <p className="text-gray-600">Kottayam, Kerala<br />India</p>
            </div>
            <div>
              <h3 className="font-medium text-[#111827]">Email</h3>
              <p className="text-gray-600">support@dresscode.example.com</p>
            </div>
            <div>
              <h3 className="font-medium text-[#111827]">Phone</h3>
              <p className="text-gray-600">(+099) 532-786-9843</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">Message</label>
              <textarea rows={4} className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 resize-none"></textarea>
            </div>
            <button type="button" className="w-full bg-[#111827] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-black transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
