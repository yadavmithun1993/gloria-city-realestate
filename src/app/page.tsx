import React from 'react';
import MasterPlan from '../components/map/MasterPlan';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-3">
              {/* Logo Placeholder */}
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="font-bold text-2xl text-slate-900 tracking-tight">Gloria City</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Home</a>
              <a href="#masterplan" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Master Plan</a>
              <a href="#amenities" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Amenities</a>
              <a href="#contact" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Contact</a>
            </div>
            <div className="hidden md:flex">
              <a href="#masterplan" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-600 transition-colors shadow-md">
                Book a Plot
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background gradient block (placeholder for image) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 -z-10">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm mb-6 border border-emerald-500/30 backdrop-blur-sm">
            Premium Residential Colony in Rooppura
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            Build Your Dream Home <br /> at <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">Gloria City</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-slate-300 mx-auto mb-10 leading-relaxed">
            Experience luxury living with state-of-the-art amenities, excellent connectivity to Sikar and Kochhor, and a community designed for your family's future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#masterplan" className="px-8 py-4 bg-emerald-500 text-white rounded-full font-bold text-lg hover:bg-emerald-400 hover:-translate-y-1 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              View Master Plan
            </a>
            <a href="#amenities" className="px-8 py-4 bg-white/10 text-white backdrop-blur-md rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
              Explore Amenities
            </a>
          </div>
        </div>
        
        {/* Decorative Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">World-Class Amenities</h2>
            <p className="mt-4 text-lg text-slate-500">Everything you need for a comfortable and secure lifestyle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Amenity 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-emerald-600">🌳</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lush Green Parks</h3>
              <p className="text-slate-600 leading-relaxed">Beautifully landscaped gardens and children's play areas spread across the colony for your evening strolls.</p>
            </div>
            {/* Amenity 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-amber-500">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 Security</h3>
              <p className="text-slate-600 leading-relaxed">Gated community with CCTV surveillance and round-the-clock security personnel ensuring complete peace of mind.</p>
            </div>
            {/* Amenity 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-blue-600">🛣️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Prime Connectivity</h3>
              <p className="text-slate-600 leading-relaxed">Wide internal roads with seamless highway access, connecting you effortlessly to Sikar and Kochhor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Master Plan Section */}
      <section id="masterplan" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Interactive Master Plan</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Explore our project layout. Green plots are available for immediate booking. Click on any available plot to secure it instantly.
            </p>
          </div>
          
          <MasterPlan />
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Gloria City Residential Colony</h3>
          <p className="text-slate-400 mb-8">Rooppura, Near Sikar-Kochhor Highway, Rajasthan</p>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Gloria City Developers. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
