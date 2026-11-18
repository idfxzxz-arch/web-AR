import React from 'react';
import { X, Cpu, TrendingUp, CheckCircle, AlertCircle, Wrench } from 'lucide-react';

export default function HotspotModal({ hotspot, onClose, productName }) {
  if (!hotspot) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl sm:rounded-2xl max-w-lg w-full shadow-2xl border border-zinc-200 overflow-hidden transform transition-all duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Engineering Teardown Sheet Style */}
        <div className="bg-zinc-950 p-4 sm:p-5 text-white border-b border-zinc-800 relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors focus:outline-none"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 mb-1 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span className="truncate">Hardware Teardown // {productName}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {hotspot.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-zinc-400 font-mono mt-0.5">
            SUB-SISTEM: {hotspot.subtitle}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[78vh] overflow-y-auto">
          {/* Physical Hardware Part */}
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
            <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-0.5">
              Komponen Fisik & Seri Part
            </div>
            <div className="text-xs sm:text-sm font-bold text-zinc-900 font-mono">
              {hotspot.component}
            </div>
          </div>

          {/* Technical Engineering Detail */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              <span>Spesifikasi Rekayasa Sirkuit</span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-700 leading-relaxed bg-blue-50/60 p-3 rounded-xl border border-blue-200/80">
              {hotspot.technicalDetail}
            </p>
          </div>

          {/* DUDI Business Function */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fungsi Bisnis & Relevansi DUDI (PT WD Group)</span>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
              <p className="text-[11px] sm:text-xs font-semibold text-emerald-950 leading-relaxed">
                "{hotspot.businessFunction}"
              </p>
              <div className="text-[10px] sm:text-[11px] text-emerald-800 mt-2 flex items-center gap-1.5 pt-2 border-t border-emerald-200/60">
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
                <span>Titik ini menghubungkan logika sirkuit dengan efisiensi biaya operasional.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-50 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-zinc-200 flex justify-between items-center text-[10px] sm:text-[11px] font-mono text-zinc-500">
          <span className="hidden sm:inline">KREAR ANNOTATION ENGINE</span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white font-sans text-xs font-semibold rounded-lg transition-colors text-center"
          >
            Tutup Lembar Analisis
          </button>
        </div>
      </div>
    </div>
  );
}
