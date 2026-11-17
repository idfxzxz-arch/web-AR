import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  Printer, 
  RotateCcw, 
  Save, 
  Sparkles, 
  Users, 
  HeartHandshake, 
  Truck, 
  Award, 
  Activity, 
  Layers, 
  Building, 
  DollarSign, 
  CreditCard,
  FileCheck
} from 'lucide-react';
import BMCBlock from '../components/BMCBlock';
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';

const INITIAL_BMC_STATE = {
  keyPartners: '',
  keyActivities: '',
  keyResources: '',
  valuePropositions: '',
  customerRelationships: '',
  channels: '',
  customerSegments: '',
  costStructure: '',
  revenueStreams: ''
};

const SAMPLE_WD_GROUP_BMC = {
  keyPartners: `1. PT WD Group Solo (Mitra Produksi & Pengujian Panggung Riil)
2. Pemasok Komponen IC MAX485 & Mikrokontroler ESP32 di Glodok/Surabaya
3. Vendor Fabrikasi PCB JLCPCB / Mitra Lokal
4. Bengkel Laser Cutting Casing Akrilik & Sheet Metal Solo
5. Asosiasi Sound & Lighting Operator Indonesia (APLGI Soloraya)`,
  keyActivities: `1. Perakitan & Penyolderan Sirkuit PCB Controller DMX-512
2. Pemrograman Firmware ESP32 dengan Preset Warna RGBW Instan
3. Uji Burn-in & Ketahanan Lonjakan Listrik Genset Panggung
4. Kalibrasi Fader Geser 10K untuk Kurva Peredupan Halus
5. Pemasaran Langsung & Demonstrasi ke Rental Panggung`,
  keyResources: `1. Skema Elektronik Terverifikasi & Lisensi Desain Hardware
2. Alat Uji Rig Lampu Panggung (Moving Head & Par LED DMX)
3. Mahasiswa S1 Teknik Komputer UMUKA sebagai Engineer R&D
4. Fasilitas Laboratorium Uji PTI FKIP UMS & Workshop PT WD Group
5. Aset Digital 3D & Web AR KREAR untuk Katalog Penjualan`,
  valuePropositions: `1. Konsol DMX Fleksibel dengan Harga 60% Lebih Murah dari Mixer Impor (Rp 1.850.000 vs Rp 8.000.000+)
2. Dilengkapi Preset Warna & Fader Halus Siap Pakai Tanpa Pemrograman Laptop yang Rumit
3. Tangguh Terhadap Fluktuasi Arus Listrik Genset Panggung Lokal
4. Jaminan Garansi Servis Cepat & Ketersediaan Suku Cadang Lokal dalam 24 Jam`,
  customerRelationships: `1. Garansi Tukar Unit Baru 6 Bulan & Servis Komponen 1 Tahun
2. Pembaruan Firmware Fitur Baru Gratis Seumur Hidup
3. Komunitas Pengguna & Grup WhatsApp Edukasi Tata Panggung
4. Layanan Konsultasi Pengaturan Alamat Kanal DMX Panggung`,
  channels: `1. Demonstrasi Langsung pada Konser Musik PT WD Production Solo
2. Media Web Interaktif KREAR (Web AR 1:1 Katalog Digital)
3. Kemitraan Toko Sound System & Alat Musik di Jawa Tengah
4. Pameran Teknologi Kreatif Kampus UMS & UMUKA
5. Kanal Media Sosial & Marketplace Tokopedia/Shopee`,
  customerSegments: `1. Pengusaha Rental Sound System & Lighting Panggung Skala Menengah ke Bawah di Soloraya
2. Pengelola Gedung Serbaguna, Aula Sekolah, & Kampus
3. Event Organizer (EO) Musik Pertunjukan & Sanggar Seni
4. Musisi Independen & Penyelenggara Teater/Pentas Tari`,
  costStructure: `1. Biaya Bill of Materials (BOM) Komponen: ESP32, MAX485, Fader 10K, OLED, XLR (Rp 420.000/unit)
2. Biaya Casing Metal/Akrilik & Powder Coating (Rp 130.000/unit)
3. Biaya Perakitan, Pengujian, & Quality Control (Rp 100.000/unit)
4. Biaya Kemasan Box & Panduan Pengguna (Rp 25.000/unit)
Total HPP: ~Rp 675.000 per unit`,
  revenueStreams: `1. Penjualan Unit Konsol Smart Stage Lighting Controller (Rp 1.850.000 per unit, Margin Laba Kotor 63%)
2. Jasa Kustomisasi Preset Warna Khusus Panggung (Rp 250.000/event)
3. Penjualan Modul Aksesori Tambahan (Kabel DMX Balanced & Case Box)
4. Jasa Pelatihan Operator Tata Cahaya untuk Sanggar/Sekolah`
};

export default function BmcWorkspacePage({ setActivePage }) {
  const [bmcData, setBmcData] = useState(() => {
    return getItem(STORAGE_KEYS.BMC_DATA, INITIAL_BMC_STATE);
  });
  const [lastSaved, setLastSaved] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setItem(STORAGE_KEYS.BMC_DATA, bmcData);
    setLastSaved(new Date().toLocaleTimeString());
  }, [bmcData]);

  const handleChange = (blockId, value) => {
    setBmcData((prev) => ({
      ...prev,
      [blockId]: value
    }));
  };

  const handleLoadSample = () => {
    setBmcData(SAMPLE_WD_GROUP_BMC);
    setNotification('Studi Kasus PT WD Group berhasil dimuat ke seluruh 9 blok kanvas.');
    setTimeout(() => setNotification(''), 4000);
  };

  const handleResetCanvas = () => {
    setBmcData(INITIAL_BMC_STATE);
    setShowResetModal(false);
    setNotification('Kanvas berhasil dikosongkan.');
    setTimeout(() => setNotification(''), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      {/* Header - Technical Workbench Style */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 text-white border border-zinc-800 no-print">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <PenTool className="w-4 h-4" />
              <span>OSTERWALDER BUSINESS MODEL CANVAS // TECHNOPRENEURSHIP</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Kanvas Pemodelan Bisnis Produk Rekayasa
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Petakan kelayakan pasar, analisis kemitraan industri, struktur biaya, dan aliran pendapatan dari produk inovasi hardware cerdas Anda.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={handleLoadSample}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              title="Muat contoh lengkap BMC produk Smart Stage Lighting Controller"
            >
              <span>MUAT CONTOH WD GROUP</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold rounded-lg border border-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>CETAK / PDF</span>
            </button>

            <button
              onClick={() => setShowResetModal(true)}
              className="px-3 py-2 bg-zinc-900 hover:bg-rose-950 text-rose-300 font-semibold rounded-lg border border-zinc-800 hover:border-rose-800 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          </div>
        </div>

        {/* Status Line */}
        <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            <span>Penyimpanan Otomatis (LocalStorage: `krear_bmc_data`)</span>
            {lastSaved && <span className="text-zinc-500">• {lastSaved}</span>}
          </div>
          {notification && (
            <span className="text-cyan-300 font-semibold">
              {notification}
            </span>
          )}
        </div>
      </div>

      {/* Print Academic Header */}
      <div className="hidden print-only mb-6 border-b-2 border-black pb-4 font-mono">
        <h2 className="text-xl font-bold uppercase">
          LEMBAR KERJA BUSINESS MODEL CANVAS (KREAR)
        </h2>
        <p className="text-xs text-zinc-600 mt-1 font-sans">
          Pendidikan Teknik Informatika (PTI) FKIP UMS × S1 Teknik Komputer UMUKA
        </p>
        <div className="mt-2 text-xs flex justify-between text-zinc-800">
          <span>Mitra: PT WD Group Solo</span>
          <span>Dosen: Wildan Deni Fahrezi, M.Pd.</span>
          <span>Tanggal: {new Date().toLocaleDateString('id-ID')}</span>
        </div>
      </div>

      {/* 9 Blocks Grid */}
      <div className="space-y-3">
        {/* Top 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-1">
            <BMCBlock
              id="keyPartners"
              title="Key Partners"
              subTitle="Mitra Kunci Strategis"
              icon={Building}
              questionPrompt="Siapa mitra pihak luar penentu pasokan komponen & perakitan?"
              examples="PT WD Group Solo, supplier IC MAX485, vendor PCB, asosiasi EO."
              value={bmcData.keyPartners}
              onChange={handleChange}
              colorScheme="purple"
              minHeight="min-h-[380px]"
            />
          </div>

          <div className="lg:col-span-1 space-y-3">
            <BMCBlock
              id="keyActivities"
              title="Key Activities"
              subTitle="Aktivitas Kunci"
              icon={Activity}
              questionPrompt="Aktivitas vital apa yang wajib dilakukan untuk memproduksi & menguji alat?"
              examples="Perakitan sirkuit, pemrograman firmware, uji lonjakan genset."
              value={bmcData.keyActivities}
              onChange={handleChange}
              colorScheme="blue"
              minHeight="min-h-[160px]"
            />
            <BMCBlock
              id="keyResources"
              title="Key Resources"
              subTitle="Sumber Daya Kunci"
              icon={Layers}
              questionPrompt="Aset fisik, skema PCB, dan keahlian teknis apa yang mutlak dimiliki?"
              examples="Alat solder presisi, rig moving head, lisensi firmware, aset Web AR."
              value={bmcData.keyResources}
              onChange={handleChange}
              colorScheme="blue"
              minHeight="min-h-[160px]"
            />
          </div>

          <div className="lg:col-span-1">
            <BMCBlock
              id="valuePropositions"
              title="Value Propositions"
              subTitle="Proposisi Nilai Unik"
              icon={Award}
              questionPrompt="Apa keunggulan mutlak yang membuat konsumen memilih produk kita?"
              examples="Harga 60% lebih terjangkau, tahan lonjakan listrik, garansi suku cadang lokal 24 jam."
              value={bmcData.valuePropositions}
              onChange={handleChange}
              colorScheme="amber"
              minHeight="min-h-[380px]"
            />
          </div>

          <div className="lg:col-span-1 space-y-3">
            <BMCBlock
              id="customerRelationships"
              title="Customer Relationships"
              subTitle="Hubungan Pelanggan"
              icon={HeartHandshake}
              questionPrompt="Bagaimana menjaga loyalitas pembeli dan melayani purna jual?"
              examples="Garansi ganti unit 6 bulan, update firmware gratis seumur hidup, konsultasi DMX."
              value={bmcData.customerRelationships}
              onChange={handleChange}
              colorScheme="emerald"
              minHeight="min-h-[160px]"
            />
            <BMCBlock
              id="channels"
              title="Channels"
              subTitle="Saluran Distribusi"
              icon={Truck}
              questionPrompt="Lewat kanal apa calon pembeli mengenal dan memesan alat ini?"
              examples="Live demo panggung konser PT WD Group, Web AR 1:1, toko musik Jawa Tengah."
              value={bmcData.channels}
              onChange={handleChange}
              colorScheme="emerald"
              minHeight="min-h-[160px]"
            />
          </div>

          <div className="lg:col-span-1">
            <BMCBlock
              id="customerSegments"
              title="Customer Segments"
              subTitle="Segmen Pelanggan"
              icon={Users}
              questionPrompt="Siapa target pengguna yang paling membutuhkan produk ini?"
              examples="Rental sound/lighting panggung Soloraya, EO konser musik, aula sekolah/gedung."
              value={bmcData.customerSegments}
              onChange={handleChange}
              colorScheme="rose"
              minHeight="min-h-[380px]"
            />
          </div>
        </div>

        {/* Bottom 2 Financial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <BMCBlock
            id="costStructure"
            title="Cost Structure"
            subTitle="Struktur Biaya Pengeluaran (HPP)"
            icon={CreditCard}
            questionPrompt="Komponen biaya terbesar apa saja dalam memproduksi dan memasarkan produk?"
            examples="BOM elektronika (Rp 420 rb), casing akrilik (Rp 130 rb), tenaga perakitan (Rp 100 rb)."
            value={bmcData.costStructure}
            onChange={handleChange}
            colorScheme="rose"
            minHeight="min-h-[160px]"
          />
          <BMCBlock
            id="revenueStreams"
            title="Revenue Streams"
            subTitle="Aliran Pendapatan Masuk"
            icon={DollarSign}
            questionPrompt="Bagaimana model bisnis menghasilkan kas masuk secara berkelanjutan?"
            examples="Penjualan unit hardware (Rp 1.850.000/unit), jasa custom preset DMX, sewa per event."
            value={bmcData.revenueStreams}
            onChange={handleChange}
            colorScheme="emerald"
            minHeight="min-h-[160px]"
          />
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-zinc-300 text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                Kosongkan Seluruh Kanvas?
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Tindakan ini akan mengosongkan seluruh teks di ke-9 blok BMC yang tersimpan.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleResetCanvas}
                className="flex-1 py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg"
              >
                Ya, Kosongkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
