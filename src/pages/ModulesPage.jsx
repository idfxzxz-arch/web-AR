import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Box, 
  Clock, 
  Target, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { learningModulesData } from '../data/learningModulesData';

export default function ModulesPage({ setActivePage, setSelectedProductId }) {
  const [activeModuleId, setActiveModuleId] = useState(1);

  const currentModule = learningModulesData.find((m) => m.id === activeModuleId) || learningModulesData[0];

  const handleOpenProduct = (productId) => {
    if (setSelectedProductId) {
      setSelectedProductId(productId);
    }
    setActivePage('ar-gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 text-white border border-zinc-800">
        <div className="max-w-3xl space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>SILABUS RPS // TECHNOPRENEURSHIP UMUKA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            5 Modul Pembelajaran Berbasis Kasus Industri
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Kurikulum terstruktur untuk 15 mahasiswa S1 Teknik Komputer Universitas Muhammadiyah Karanganyar bersama DUDI PT WD Group Solo.
          </p>
        </div>
      </div>

      {/* Main Grid: Sidebar Navigator + Module Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider px-1">
            Daftar Modul RPS (CPMK 2–6)
          </h3>
          <div className="space-y-2">
            {learningModulesData.map((mod) => {
              const isSelected = mod.id === activeModuleId;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex flex-col space-y-2 font-mono ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-md ring-2 ring-blue-600'
                      : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      isSelected ? 'bg-zinc-800 text-cyan-300' : 'bg-zinc-100 text-zinc-700'
                    }`}>
                      {mod.cpmk}
                    </span>
                    <span className={`text-[11px] ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {mod.meeting}
                    </span>
                  </div>
                  <h4 className={`text-xs font-bold leading-snug font-sans ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                    Modul {mod.id}: {mod.title}
                  </h4>
                  <div className="flex items-center justify-between pt-1 text-[10px]">
                    <span className={isSelected ? 'text-zinc-400' : 'text-zinc-500'}>
                      {mod.badge}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Quiz Card */}
          <div className="bg-zinc-100 border border-zinc-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-zinc-900 font-mono font-bold text-xs uppercase">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Uji Pemahaman Formatif</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              Evaluasi penguasaan materi Modul 1 sampai Modul 5 melalui 15 butir soal pilihan ganda.
            </p>
            <button
              onClick={() => {
                setActivePage('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>BUKA KUIS 15 SOAL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Detail Content */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 pb-5 border-b border-zinc-100">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-white font-bold">
                {currentModule.cpmk}
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                {currentModule.meeting}
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                {currentModule.duration}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
              {currentModule.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {currentModule.summary}
            </p>
          </div>

          {/* Objectives */}
          <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 uppercase">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Tujuan Pembelajaran Khusus (Sub-CPMK)</span>
            </div>
            <ul className="space-y-1.5">
              {currentModule.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sections */}
          <div className="space-y-5">
            {currentModule.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-base font-bold text-zinc-950 border-l-2 border-zinc-950 pl-3 font-sans">
                  {sec.heading}
                </h3>
                
                {sec.content && (
                  <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed whitespace-pre-line space-y-2">
                    {sec.content}
                  </div>
                )}

                {/* Comparison Table */}
                {sec.comparison && (
                  <div className="overflow-x-auto my-3 border border-zinc-200 rounded-lg">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-zinc-100 text-zinc-800 border-b border-zinc-200 font-mono">
                        <tr>
                          <th className="p-2.5">Aspek</th>
                          <th className="p-2.5">Wirausaha Konvensional</th>
                          <th className="p-2.5 text-blue-700 bg-blue-50/50">Technopreneurship</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 text-zinc-700">
                        {sec.comparison.map((c, i) => (
                          <tr key={i} className="hover:bg-zinc-50">
                            <td className="p-2.5 font-semibold text-zinc-900 font-mono text-[11px]">{c.aspect}</td>
                            <td className="p-2.5 text-zinc-600">{c.conventional}</td>
                            <td className="p-2.5 font-medium text-blue-900 bg-blue-50/20">{c.techno}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Competency Checklist */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-900 uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Daftar Periksa Penguasaan Mahasiswa</span>
            </div>
            <ul className="space-y-1">
              {currentModule.checklist.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-emerald-950">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-zinc-100 flex flex-wrap justify-between items-center gap-3">
            {currentModule.relatedProductId && (
              <button
                onClick={() => handleOpenProduct(currentModule.relatedProductId)}
                className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                <Box className="w-4 h-4 text-cyan-400" />
                <span>INSPEKSI PROTOTIPE 3D TERKAIT</span>
              </button>
            )}

            <button
              onClick={() => {
                setActivePage('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-mono text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>UJI DI KUIS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
