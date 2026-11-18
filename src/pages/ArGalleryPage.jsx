import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Smartphone, 
  CheckCircle2, 
  Cpu, 
  TrendingUp, 
  AlertTriangle, 
  PenTool, 
  ArrowRight,
  Sliders,
  DollarSign,
  Compass,
  Layers,
  Wrench,
  Activity
} from 'lucide-react';
import ModelViewer from '../components/ModelViewer';
import HotspotModal from '../components/HotspotModal';
import { productsData } from '../data/productsData';

export default function ArGalleryPage({ activeProductId, setActiveProductId, setActivePage }) {
  const [selectedProduct, setSelectedProduct] = useState(
    productsData.find((p) => p.id === activeProductId) || productsData[0]
  );
  const [activeHotspot, setActiveHotspot] = useState(null);

  useEffect(() => {
    if (activeProductId) {
      const match = productsData.find((p) => p.id === activeProductId);
      if (match) setSelectedProduct(match);
    }
  }, [activeProductId]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    if (setActiveProductId) {
      setActiveProductId(product.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6 font-sans">
      {/* Precision Lab Workspace Header */}
      <div className="bg-zinc-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white border border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
          <div className="space-y-1 sm:space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>LABORATORIUM SPASIAL WEBXR // SKALA 1:1</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
              Inspeksi Prototipe 3D & Validasi Spasial Web AR
            </h1>
            <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
              Pemeriksaan rancang bangun perangkat keras mikrokontroler, 4 titik hotspot anotasi, dan proyeksi meja fisik kelas tanpa instalasi file APK.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-zinc-300 shrink-0">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>WebXR / Scene Viewer / AR Quick Look</span>
          </div>
        </div>
      </div>

      {/* 4 Product Device Selector Matrix */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {productsData.map((prod) => {
          const isSelected = selectedProduct.id === prod.id;
          return (
            <button
              key={prod.id}
              onClick={() => handleSelectProduct(prod)}
              className={`p-2.5 sm:p-3.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between space-y-1.5 sm:space-y-2.5 font-mono ${
                isSelected
                  ? 'bg-zinc-950 text-white border-zinc-950 shadow-md ring-2 ring-blue-600'
                  : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              <div className="flex items-center justify-between gap-1 w-full">
                <span className={`px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold font-mono whitespace-nowrap shrink-0 ${
                  isSelected ? 'bg-zinc-800 text-cyan-300' : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                }`}>
                  {prod.code}
                </span>
                <span className={`text-[9px] sm:text-[10px] whitespace-nowrap shrink-0 ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  4 Hotspots
                </span>
              </div>
              <div className="min-w-0">
                <h4 className={`text-[11px] sm:text-xs font-bold font-sans truncate ${
                  isSelected ? 'text-white' : 'text-zinc-950'
                }`}>
                  {prod.name}
                </h4>
                <p className={`text-[9px] sm:text-[10px] truncate mt-0.5 ${
                  isSelected ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  {prod.division}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3D Calibration Viewport */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-center px-1 text-[11px] sm:text-xs font-mono">
          <span className="font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-900 shrink-0" />
            <span className="truncate">CALIBRATION VIEWPORT</span>
          </span>
          <span className="text-zinc-500 text-[10px] sm:text-xs whitespace-nowrap">
            DIM: <strong className="text-zinc-900 font-bold">{selectedProduct.dimensions}</strong>
          </span>
        </div>

        <ModelViewer 
          product={selectedProduct} 
          onSelectHotspot={(hotspot) => setActiveHotspot(hotspot)} 
        />
      </div>

      {/* Hotspots Bench Strip */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-zinc-200 space-y-2.5 sm:space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-xs font-mono">
          <span className="font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5 text-[11px] sm:text-xs">
            <Sliders className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>TITIK ANOTASI HARDWARE & BISNIS (4 TITIK):</span>
          </span>
          <span className="text-zinc-500 text-[10px] sm:text-[11px]">
            Sentuh nomor hotspot pada 3D atau tombol di bawah:
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {selectedProduct.hotspots.map((hs, index) => (
            <button
              key={hs.id}
              onClick={() => setActiveHotspot(hs)}
              className="p-2 sm:p-2.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg text-left transition-colors flex items-start gap-2 font-mono group"
            >
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-zinc-950 group-hover:bg-blue-600 text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shrink-0 mt-0.5">
                {`0${index + 1}`}
              </span>
              <div className="flex-1 min-w-0">
                <h5 className="text-[11px] sm:text-xs font-bold text-zinc-900 group-hover:text-blue-700 transition-colors truncate font-sans">
                  {hs.title}
                </h5>
                <p className="text-[9px] sm:text-[10px] text-zinc-500 truncate mt-0.5">
                  {hs.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Technical Engineering Specifications & DUDI Commercial Value */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
        {/* Left: Engineering Hardware BOM */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-zinc-200 shadow-sm space-y-4 sm:space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>BILL OF MATERIALS & ARSITEKTUR PERANGKAT KERAS</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-950">
              Spesifikasi Rekayasa Elektronika
            </h3>
            <p className="text-[11px] sm:text-xs font-mono text-zinc-500">
              Kategori: {selectedProduct.category}
            </p>
          </div>

          <div className="space-y-2">
            {selectedProduct.specs.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-zinc-800 bg-zinc-50 p-2.5 sm:p-3 rounded-lg border border-zinc-200/80 font-mono">
                <span className="text-zinc-400 shrink-0">{`0${idx+1}.`}</span>
                <span className="leading-relaxed font-sans text-[11px] sm:text-xs">{item}</span>
              </div>
            ))}
          </div>

          {/* Pricing Ledger */}
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-950 text-white font-mono text-xs flex justify-between items-center gap-2">
            <div>
              <span className="text-zinc-400 block text-[9px] sm:text-[10px]">BIAYA PRODUKSI (HPP):</span>
              <strong className="text-xs sm:text-sm font-bold text-white">{selectedProduct.estimatedCost}</strong>
            </div>
            <div className="text-right">
              <span className="text-zinc-400 block text-[9px] sm:text-[10px]">REKOMENDASI HARGA:</span>
              <strong className="text-xs sm:text-sm font-bold text-emerald-400">{selectedProduct.sellingPrice}</strong>
            </div>
          </div>
        </div>

        {/* Right: DUDI Problem Statement & Solution */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-zinc-200 shadow-sm space-y-4 sm:space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>STUDI KELAYAKAN BISNIS MITRA INDUSTRI</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-950">
              Problem-Solution Fit PT WD Group Solo
            </h3>
            <p className="text-[11px] sm:text-xs font-mono text-zinc-500">
              Divisi: {selectedProduct.division}
            </p>
          </div>

          {/* Problem Card */}
          <div className="p-3 sm:p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-amber-900 uppercase">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Kendala Operasional Nyata (Pain Point)</span>
            </div>
            <p className="text-[11px] sm:text-xs text-amber-950 leading-relaxed font-sans">
              {selectedProduct.problemStatement}
            </p>
          </div>

          {/* Solution Card */}
          <div className="p-3 sm:p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-emerald-900 uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Solusi Rekayasa Komputer Tepat Guna</span>
            </div>
            <p className="text-[11px] sm:text-xs text-emerald-950 leading-relaxed font-sans">
              {selectedProduct.solution}
            </p>
          </div>

          {/* Value Proposition */}
          <div className="p-3 sm:p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
            <div className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
              Value Proposition Komersial:
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-zinc-900 leading-relaxed">
              "{selectedProduct.businessValue}"
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('bmc');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <PenTool className="w-4 h-4 text-cyan-400" />
            <span>PETAKAN KE BUSINESS MODEL CANVAS (BMC)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Guided Student Laboratory Activity */}
      <div className="bg-zinc-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-zinc-200 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-zinc-800 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
          <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
          <span>LEMBAR KERJA PRAKTIK MAHASISWA S1 TEKNIK KOMPUTER UMUKA:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 text-zinc-600 font-sans">
          <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-zinc-200 space-y-1">
            <strong className="text-zinc-900 font-mono text-xs block">01. Observasi Geometri 3D</strong>
            <p className="text-[11px] leading-relaxed">Rotasi orbit 360°, periksa posisi fader, soket XLR, dan display pada viewport di atas.</p>
          </div>
          <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-zinc-200 space-y-1">
            <strong className="text-zinc-900 font-mono text-xs block">02. Uji Ergonomi Web AR</strong>
            <p className="text-[11px] leading-relaxed">Gunakan smartphone untuk memproyeksikan prototipe skala 1:1 di meja fisik kelas.</p>
          </div>
          <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-zinc-200 space-y-1">
            <strong className="text-zinc-900 font-mono text-xs block">03. Evaluasi Kelayakan BMC</strong>
            <p className="text-[11px] leading-relaxed">Buka lembar kerja BMC Workspace untuk menyusun struktur biaya dan margin laba.</p>
          </div>
        </div>
      </div>

      {/* Hotspot Modal Inspector */}
      <HotspotModal
        hotspot={activeHotspot}
        onClose={() => setActiveHotspot(null)}
        productName={selectedProduct.name}
      />
    </div>
  );
}
