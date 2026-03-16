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
              {[
                { 
                  name: 'X', 
                  color: 'bg-black text-white', 
                  hover: 'hover:bg-gray-800',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
                    </svg>
                  )
                },
                { 
                  name: 'Facebook', 
                  color: 'bg-[#1877F2] text-white', 
                  hover: 'hover:bg-[#166fe5]',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )
                },
                { 
                  name: 'Instagram', 
                  color: 'bg-[#E4405F] text-white', 
                  hover: 'hover:bg-[#d62e4c]',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  )
                },
                { 
                  name: 'LinkedIn', 
                  color: 'bg-[#0077B5] text-white', 
                  hover: 'hover:bg-[#006399]',
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  )
                },
              ].map((social, i) => (
                <div key={i} className={`w-9 h-9 rounded-xl flex items-center justify-center ${social.color} ${social.hover} cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 border border-transparent`}>
                  {social.icon}
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
              {[
                { name: 'Help Center', href: '/support' },
                { name: 'Cancellation Policy', href: '/support#faq' },
                { name: 'Terms of Service', href: '/support#terms' },
                { name: 'Privacy Policy', href: '/support#privacy' },
                { name: 'Trust & Safety', href: '/support#safety' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-500 hover:text-brand text-sm transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                { name: 'Train Booking', href: '/search?source=NDLS&destination=MMCT&date=2024-12-01&class=All+Classes' },
                { name: 'PNR Status', href: '/pnr-status' },
                { name: 'Seat Availability', href: '/seat-availability' },
                { name: 'Train Schedule', href: '/train-schedule' },
                { name: 'Running Status', href: '/running-status' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-500 hover:text-brand text-sm transition-colors">{item.name}</Link>
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
