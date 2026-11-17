import React, { useState } from 'react';
import { 
  Box, 
  BookOpen, 
  Layers, 
  PenTool, 
  HelpCircle, 
  Award, 
  Menu, 
  X, 
  Cpu, 
  Smartphone,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'modules', label: 'Modul RPS' },
    { id: 'ar-gallery', label: 'Laboratorium 3D & AR', badge: 'WebXR' },
    { id: 'tutorial', label: 'Pipeline 3D' },
    { id: 'bmc', label: 'BMC Workspace' },
    { id: 'quiz', label: 'Kuis Formatif' },
    { id: 'assessment', label: 'Evaluasi Diri (Radar)' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      {/* Top Academic Sub-header - Clean Institutional Typography */}
      <div className="bg-zinc-950 text-zinc-400 text-[11px] font-mono py-1.5 px-4 border-b border-zinc-900 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center tracking-tight">
          <div className="flex items-center space-x-3">
            <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              PTI FKIP UMS
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-300">S1 Teknik Komputer UMUKA (15 Mahasiswa)</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">Mitra: PT WD Group Solo</span>
          </div>
          <div className="flex items-center space-x-3 text-zinc-400">
            <span>Dosen Pengampu: Wildan Deni Fahrezi, M.Pd.</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-300 font-semibold">WebXR 1:1 Scale</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Identity */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-950 flex items-center justify-center text-white border border-zinc-800 group-hover:bg-blue-600 transition-colors">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-zinc-950 font-sans">
                  KREAR
                </span>
                <span className="bg-zinc-100 text-zinc-700 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-zinc-200">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-medium -mt-0.5 hidden sm:block">
                WebXR Technopreneurship Media
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 rounded-md text-xs font-semibold tracking-tight transition-all duration-150 flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-zinc-950 text-white shadow-sm' 
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-mono font-bold px-1 rounded ${
                      isActive ? 'bg-zinc-800 text-cyan-300' : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={() => handleNavClick('ar-gallery')}
              className="px-2.5 py-1.5 rounded-md text-xs font-bold font-mono bg-zinc-950 text-white flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>AR</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-zinc-700 hover:bg-zinc-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 py-3 space-y-1">
          <div className="p-2.5 mb-2 bg-zinc-50 rounded-lg text-xs font-mono text-zinc-600 border border-zinc-200 flex justify-between items-center">
            <span>S1 Teknik Komputer UMUKA</span>
            <span className="font-bold text-zinc-900">PT WD Group</span>
          </div>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-semibold ${
                  isActive 
                    ? 'bg-zinc-950 text-white' 
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-zinc-800 text-cyan-300' : 'bg-zinc-200 text-zinc-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
