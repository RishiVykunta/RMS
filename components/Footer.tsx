import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-black text-brand tracking-tighter flex items-center space-x-2">
              <span className="text-3xl">🚄</span>
              <span>RailConnect</span>
            </Link>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Modern railway reservation system providing a seamless travel experience. Built with love for real travelers.
            </p>
            <div className="mt-6 flex space-x-4">
              {['𝕏', 'f', '📸', 'in'].map((social, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white cursor-pointer transition-all">
                  <span className="text-xs">{social}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Contact', 'Blog', 'Press'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 hover:text-brand text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4">
              {['Help Center', 'Cancellation Policy', 'Terms of Service', 'Privacy Policy', 'Trust & Safety'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 hover:text-brand text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Services</h3>
            <ul className="space-y-4">
              {['Train Booking', 'PNR Status', 'Seat Availability', 'Train Schedule', 'Running Status'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 hover:text-brand text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
          <p>© 2026 RailConnect DBMS Project. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span>Made with ✨ and Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
