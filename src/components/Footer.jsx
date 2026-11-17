import React from 'react';
import { Box, Building2, UserCheck, ShieldCheck, GraduationCap } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-12 pb-8 border-t border-zinc-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand & Project Identity */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white border border-zinc-800">
                <Box className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight font-mono">
                KREAR<span className="text-cyan-400">.EDU</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Pengembangan Media Pembelajaran Berbasis Augmented Reality untuk Meningkatkan Kompetensi Technopreneurship Mahasiswa melalui Digitalisasi Produk Industri Kreatif.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Skripsi PTI FKIP UMS
              </span>
            </div>
          </div>

          {/* Academic Partnership */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              Kemitraan DUDI & Subjek Uji
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                <span>
                  <strong className="text-zinc-200">Subjek Riset:</strong> 15 Mahasiswa S1 Teknik Komputer Universitas Muhammadiyah Karanganyar (UMUKA)
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                <span>
                  <strong className="text-zinc-200">Mitra Industri:</strong> PT WD Group Solo (Production, Futsal, & Music Entertainment)
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                <span>
                  <strong className="text-zinc-200">Dosen Pengampu:</strong> Wildan Deni Fahrezi, S.Pd., M.Pd.
                </span>
              </li>
            </ul>
          </div>

          {/* Navigasi Modul */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              Fitur Pembelajaran
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-zinc-400 hover:text-white transition-colors"
              >
                Beranda
              </button>
              <button 
                onClick={() => { setActivePage('modules'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-zinc-400 hover:text-white transition-colors"
              >
                Modul RPS
              </button>
              <button 
                onClick={() => { setActivePage('ar-gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-zinc-400 hover:text-white transition-colors"
              >
                Lab 3D & AR
              </button>
              <button 
                onClick={() => { setActivePage('tutorial'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-zinc-400 hover:text-white transition-colors"
              >
                Pipeline 3D
              </button>
              <button 
                onClick={() => { setActivePage('bmc'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-zinc-400 hover:text-white transition-colors"
              >
                BMC Workspace
              </button>
              <button 
                onClick={() => { setActivePage('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-zinc-400 hover:text-white transition-colors"
              >
                Kuis Formatif
              </button>
              <button 
                onClick={() => { setActivePage('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left text-zinc-400 hover:text-white transition-colors"
              >
                Evaluasi Radar
              </button>
            </div>
          </div>

          {/* Arsitektur Standar */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              Arsitektur WebXR
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Teknologi berbasis standar terbuka zero-cost serverless hosting:
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">React 18</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">WebXR Device API</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">Scene Viewer</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">AR Quick Look</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">Chart.js Radar</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-zinc-500 gap-3">
          <p>© {new Date().getFullYear()} KREAR — PTI FKIP UMS & S1 Teknik Komputer UMUKA.</p>
          <div className="flex items-center space-x-3 text-zinc-400">
            <span>Serverless Zero-Cost</span>
            <span>•</span>
            <span className="text-emerald-400">Status: Verified Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
