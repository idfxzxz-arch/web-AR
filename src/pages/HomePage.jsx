import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Smartphone, 
  Laptop, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Award, 
  BookOpen, 
  PenTool, 
  Building2,
  Users,
  Terminal,
  Compass,
  Sliders,
  DollarSign
} from 'lucide-react';
import { productsData } from '../data/productsData';
import { learningModulesData } from '../data/learningModulesData';

export default function HomePage({ setActivePage, setSelectedProductId }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(productsData[0]);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const mobile = /android|iphone|ipad|ipod|windows phone/i.test(ua.toLowerCase());
    setIsMobile(mobile);
  }, []);

  const handleProductCardClick = (productId) => {
    if (setSelectedProductId) {
      setSelectedProductId(productId);
    }
    setActivePage('ar-gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-16 font-sans">
      {/* Precision Editorial Hero Section */}
      <section className="border-b border-zinc-200 bg-white bg-tech-grid pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Institutional Metadata Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-zinc-950 text-white font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              KREAR-SYSTEM
            </span>
            <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 border border-zinc-300">
              RISET: PTI FKIP UMS
            </span>
            <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 border border-zinc-300">
              SUBJEK: S1 TEKNIK KOMPUTER UMUKA
            </span>
            <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 border border-zinc-300">
              MITRA DUDI: PT WD GROUP SOLO
            </span>
          </div>

          {/* Asymmetric Two-Column Hero Workstation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Direct Architectural Problem & Solution Statement */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight leading-[1.08]">
                Media Pembelajaran Web AR untuk Validasi Spasial Produk Industri Kreatif.
              </h1>
              
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl font-normal">
                Platform pembelajaran interaktif berbasis <strong>WebXR</strong> dan <strong>Model Viewer</strong> yang dirancang untuk membekali 15 mahasiswa S1 Teknik Komputer Universitas Muhammadiyah Karanganyar dengan kompetensi technopreneurship melalui digitalisasi 3D perangkat keras riil dari <strong>PT WD Group Solo</strong> tanpa instalasi file APK.
              </p>

              {/* Hardware Device State Detector */}
              <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50 max-w-xl">
                {isMobile ? (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-zinc-900">
                        MODE SPASIAL WEB AR AKTIF
                      </h4>
                      <p className="text-[11px] text-zinc-600 mt-0.5">
                        Sensor kamera WebXR / Scene Viewer siap memproyeksikan prototipe produk skala 1:1 di atas meja kelas.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-zinc-950 text-white flex items-center justify-center flex-shrink-0">
                        <Laptop className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-zinc-900">
                          MODE 3D DESKTOP WORKSTATION
                        </h4>
                        <p className="text-[11px] text-zinc-600 mt-0.5">
                          Rotasi orbit 360°, zoom in, dan telaah 4 titik anotasi. Buka di smartphone untuk proyeksi meja fisik.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActivePage('ar-gallery')}
                      className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-mono font-bold rounded-lg transition-colors flex-shrink-0"
                    >
                      Buka Lab 3D
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActivePage('ar-gallery')}
                  className="px-5 py-3 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
                >
                  <Box className="w-4 h-4 text-cyan-400" />
                  <span>BUKA LABORATORIUM SPASIAL 3D & AR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActivePage('bmc')}
                  className="px-4 py-3 bg-white hover:bg-zinc-50 text-zinc-900 font-mono text-xs font-bold rounded-lg border border-zinc-300 transition-colors flex items-center gap-2"
                >
                  <PenTool className="w-4 h-4 text-zinc-700" />
                  <span>BMC WORKSPACE</span>
                </button>
                <button
                  onClick={() => setActivePage('assessment')}
                  className="px-4 py-3 bg-white hover:bg-zinc-50 text-zinc-900 font-mono text-xs font-bold rounded-lg border border-zinc-300 transition-colors flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-zinc-700" />
                  <span>RADAR EVALUASI</span>
                </button>
              </div>
            </div>

            {/* Right Column: Live Device Inspector Bench Preview */}
            <div className="lg:col-span-5 bg-zinc-950 rounded-2xl border border-zinc-800 p-5 text-white space-y-4 shadow-xl">
              <div className="flex justify-between items-center pb-3 border-b border-zinc-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-zinc-300 font-bold">BENCH TELEMETRY</span>
                </div>
                <span className="text-zinc-500">{hoveredProduct.code}</span>
              </div>

              {/* Active Product Preview Card */}
              <div className="space-y-3">
                <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                    {hoveredProduct.division}
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {hoveredProduct.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {hoveredProduct.tagline}
                  </p>
                </div>

                {/* Specs Readout */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 block">DIMENSI FISIK</span>
                    <strong className="text-zinc-200">{hoveredProduct.dimensions}</strong>
                  </div>
                  <div className="p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 block">HOTSPOT ANOTASI</span>
                    <strong className="text-cyan-400">4 Titik Rekayasa</strong>
                  </div>
                  <div className="p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 block">BIAYA MANUFAKTUR (HPP)</span>
                    <strong className="text-zinc-200">{hoveredProduct.estimatedCost}</strong>
                  </div>
                  <div className="p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 block">HARGA JUAL PASAR</span>
                    <strong className="text-emerald-400">{hoveredProduct.sellingPrice}</strong>
                  </div>
                </div>

                {/* 4 Mini Product Switchers */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-zinc-500 block mb-2">PILIH PRODUK DUDI:</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {productsData.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setHoveredProduct(p)}
                        className={`p-2 rounded font-mono text-[10px] font-bold border transition-colors ${
                          hoveredProduct.id === p.id
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {p.code.split('-')[1]}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleProductCardClick(hoveredProduct.id)}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-cyan-400 text-xs font-mono font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <span>INSPEKSI SPASIAL 3D & HOTSPOT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Products Registry (Ledger Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>REGISTRY PRODUK INDUSTRI KREATIF</span>
            </div>
            <h2 className="text-2xl font-black text-zinc-950 tracking-tight">
              4 Prototipe Rekayasa Komputer PT WD Group Solo
            </h2>
            <p className="text-xs text-zinc-600 mt-0.5">
              Setiap produk dikembangkan berdasarkan permasalahan operasional nyata mitra DUDI.
            </p>
          </div>
          <button
            onClick={() => setActivePage('ar-gallery')}
            className="text-xs font-mono font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>LIHAT SELURUH DI VIEWER 3D</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Grid - High Contrast Technical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productsData.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleProductCardClick(prod.id)}
              className="bg-white rounded-xl border border-zinc-200 hover:border-zinc-400 shadow-sm transition-all duration-150 p-5 cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-900 border border-zinc-200">
                    {prod.code}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    4 Hotspots
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    {prod.division}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-950 group-hover:text-blue-700 transition-colors line-clamp-1 mt-0.5">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-zinc-600 line-clamp-2 mt-1 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500">HPP / Jual:</span>
                  <span className="font-bold text-zinc-900">{prod.estimatedCost} / {prod.sellingPrice}</span>
                </div>
                <div className="w-full py-2 bg-zinc-50 group-hover:bg-zinc-950 group-hover:text-white text-zinc-800 text-xs font-mono font-semibold rounded-lg text-center transition-colors">
                  Buka di Mode 3D / AR →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum Mapping (RPS S1 Teknik Komputer UMUKA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
              STRUKTUR KURIKULUM & EVALUASI
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight mt-1">
              Pemetaan RPS 5 Capaian Pembelajaran (CPMK)
            </h2>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              Disusun untuk perkuliahan Technopreneurship S1 Teknik Komputer UMUKA di bawah bimbingan Dosen Pengampu Wildan Deni Fahrezi, S.Pd., M.Pd.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {learningModulesData.map((mod) => (
              <button
                key={mod.id}
                onClick={() => {
                  setActivePage('modules');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 text-left transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="font-bold text-blue-700">{mod.cpmk}</span>
                    <span className="text-zinc-500">{mod.meeting}</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 leading-snug">
                    {mod.title}
                  </h4>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-200/60 flex items-center justify-between">
                  <span>Pelajari Modul</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Dimensions of Technopreneurship Assessment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 text-white space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                INSTRUMEN EVALUASI KOMPETENSI (MASHUDI ET AL., 2025)
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Pengukuran Profil Technopreneurship 5 Dimensi
              </h2>
            </div>
            <button
              onClick={() => {
                setActivePage('assessment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 flex-shrink-0"
            >
              <span>BUKA ANGKET & RADAR CHART</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-mono">
            {[
              { code: 'D1', name: 'Techno-economic', focus: 'BOM Hardware & Margin Kelayakan' },
              { code: 'D2', name: 'Entrepreneurial Mindset', focus: 'Ketahanan Risiko & Problem Solving' },
              { code: 'D3', name: 'Tech Innovation', focus: 'Penguasaan 3D/Web AR & IoT' },
              { code: 'D4', name: 'Market Orientation', focus: 'Identifikasi Pelanggan & Analisis Pasar' },
              { code: 'D5', name: 'Venture & Pitching', focus: '9 Blok BMC & Presentasi Investor' },
            ].map((d) => (
              <div key={d.code} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-cyan-400 font-bold">{d.code}</span>
                <h4 className="text-white font-bold">{d.name}</h4>
                <p className="text-[11px] text-zinc-400 font-sans">{d.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
