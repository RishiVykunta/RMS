export default function TatkalGuidePage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="bg-white rounded-[3rem] shadow-premium p-12 border border-gray-100">
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-yellow-50 text-yellow-500 rounded-[2rem] flex items-center justify-center text-5xl mx-auto mb-8 shadow-xl shadow-yellow-100 animate-pulse">
            ⚡
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">Tatkal Booking <span className="text-brand">Guide</span></h1>
          <p className="text-xl text-gray-500 font-medium">Everything you need to know about Indian Railways Tatkal reservations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-10 rounded-[2.5rem] text-white shadow-2xl">
            <p className="text-sm font-black uppercase tracking-widest opacity-80 mb-4">Phase 1</p>
            <h2 className="text-3xl font-black mb-2">AC Classes</h2>
            <p className="text-5xl font-black mb-6 tracking-tighter">10:00 AM</p>
            <ul className="space-y-3 opacity-90 font-medium text-sm">
              <li>• Opens one day before journey</li>
              <li>• Includes 1A, 2A, 3A, 3E, CC</li>
              <li>• High demand, book within seconds</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-brand to-brand-hover p-10 rounded-[2.5rem] text-white shadow-2xl">
            <p className="text-sm font-black uppercase tracking-widest opacity-80 mb-4">Phase 2</p>
            <h2 className="text-3xl font-black mb-2">Non-AC Classes</h2>
            <p className="text-5xl font-black mb-6 tracking-tighter">11:00 AM</p>
            <ul className="space-y-3 opacity-90 font-medium text-sm">
              <li>• Opens one day before journey</li>
              <li>• Includes Sleeper (SL) and 2S</li>
              <li>• Ensure payment method is ready</li>
            </ul>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h3 className="text-2xl font-black text-gray-900 mb-6">Important Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'ID Proof', desc: 'Valid original ID remains mandatory during travel.', icon: '🆔' },
                { title: 'Cancellation', desc: 'No refund is granted on confirmed Tatkal tickets.', icon: '❌' },
                { title: 'Booking Limit', desc: 'Maximum of 4 passengers per PNR for Tatkal.', icon: '👥' },
              ].map((rule) => (
                <div key={rule.title} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white transition-all group">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{rule.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{rule.title}</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{rule.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-6">Expert Tips for Success 💡</h3>
            <div className="space-y-4">
              {[
                'Login 10 minutes prior to the opening time.',
                'Keep passenger details ready in the master list.',
                'Use digital wallets or UPI for faster payment processing.',
                'Do not refresh the page during the booking process.',
              ].map((tip, i) => (
                <div key={i} className="flex gap-4 items-center bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <span className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-black text-sm">{i + 1}</span>
                  <p className="font-bold text-gray-700 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
