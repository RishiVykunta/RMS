import Link from 'next/link';
import { useState } from 'react';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: "How do I cancel my ticket?",
      a: "You can cancel your ticket through the 'My Bookings' section in your profile. Select the ticket and click on 'Cancel Ticket'."
    },
    {
      q: "When will I get my refund?",
      a: "Refunds are typically processed within 5-7 business days to the original payment method."
    },
    {
      q: "Can I change my boarding station?",
      a: "Yes, boarding station changes can be made up to 24 hours before the scheduled departure of the train."
    },
    {
      q: "What is the Tatkal booking timing?",
      a: "Tatkal bookings open at 10:00 AM for AC classes and 11:00 AM for Non-AC classes, one day in advance of the journey."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              How can we <span className="text-brand">help you?</span>
            </h1>
            <div className="max-w-2xl mx-auto relative group">
              <input 
                type="text" 
                placeholder="Search for help (e.g. 'refund', 'cancellation')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-8 py-5 bg-white rounded-3xl shadow-xl border-none outline-none focus:ring-2 focus:ring-brand/20 transition-all font-medium text-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand text-white p-3 rounded-2xl shadow-lg shadow-brand/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Help Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: '💸', title: 'Track Refund', desc: 'Check the status of your recent refund request.' },
              { icon: '❌', title: 'Cancel Ticket', desc: 'Need to cancel? Do it quickly and hassle-free.' },
              { icon: '🎫', title: 'Booking Issues', desc: 'Facing trouble while booking? We are here.' }
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-[2.5rem] shadow-premium shadow-hover border border-gray-100 group cursor-pointer hover:border-brand transition-all duration-300">
                <div className="text-4xl mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-brand/5 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-premium border border-gray-100 mb-20">
            <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight flex items-center gap-3">
              <span className="text-brand">Frequently</span> Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {faqs.map((faq, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-brand transition-colors">
                    {faq.q}
                  </h4>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-900 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl opacity-50" />
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6">Still need help?</h2>
              <p className="text-lg text-gray-400 font-medium mb-10 max-w-md">
                Our support team is available 24/7 to assist you with any questions or issues.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-brand text-white px-10 py-4 rounded-full font-black hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 flex items-center gap-2">
                  <span>Chat with us</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <button className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full font-black hover:bg-white/20 transition-all backdrop-blur-md">
                  Email Support
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-end relative z-10">
              <div className="w-64 h-64 bg-brand rounded-full flex items-center justify-center text-8xl shadow-2xl shadow-brand/30 animate-pulse">
                🤙
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
