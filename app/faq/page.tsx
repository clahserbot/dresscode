export default function FAQ() {
  const faqs = [
    {
      q: "What is your return policy?",
      a: "We offer a 30-day return policy for all unworn items with original tags attached. Please contact our support team to initiate a return."
    },
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 3-5 business days within India. Express shipping is available for 1-2 day delivery."
    },
    {
      q: "Do you ship internationally?",
      a: "Currently, we only ship within India. We are working on expanding our delivery network soon."
    },
    {
      q: "How can I track my order?",
      a: "Once your order ships, you will receive a confirmation email with a tracking number and link to track your package."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-[#111827] mb-8">Frequently Asked Questions</h1>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-[#111827] mb-2">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
