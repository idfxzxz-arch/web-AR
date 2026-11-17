export const learningModulesData = [
  {
    id: 1,
    cpmk: "CPMK 2",
    meeting: "Pertemuan 4",
    title: "Peluang Usaha Berbasis Teknologi & Industri Kreatif",
    badge: "Fondasi Technopreneurship",
    duration: "150 Menit",
    summary: "Memahami hakikat technopreneurship, perbedaannya dengan wirausaha konvensional, serta cara membidik peluang inovasi bernilai tambah pada ekosistem industri kreatif lokal Soloraya.",
    objectives: [
      "Menganalisis perbedaan karakteristik wirausaha konvensional dengan technopreneurship.",
      "Mengidentifikasi problem statement operasional pada industri kreatif lokal (event organizer, seni pertunjukan, fasilitas olahraga).",
      "Merumuskan usulan solusi berbasis rekayasa teknologi komputer cerdas (IoT & mikrokontroler)."
    ],
    sections: [
      {
        heading: "1. Hakikat Technopreneurship di Era Transformasi Digital",
        content: `Technopreneurship merupakan sinergi antara keahlian teknologi (teknologi rekayasa perangkat keras, IoT, perangkat lunak) dan jiwa kewirausahaan (analisis pasar, perhitungan risiko, penciptaan nilai). Berbeda dengan wirausaha konvensional yang kerap mengandalkan replikasi bisnis berbiaya rendah, technopreneurship berfokus pada **inovasi teknologi terbarukan** sebagai *competitive moat* (benteng keunggulan bersaing).

Bagi mahasiswa S1 Teknik Komputer Universitas Muhammadiyah Karanganyar (UMUKA), technopreneurship bukan sekadar merakit sirkuit elektronika, melainkan mengemas kemampuan komputasi fisik (*physical computing*) menjadi produk komersial yang memecahkan masalah nyata masyarakat.`
      },
      {
        heading: "2. Matriks Komparasi: Wirausaha Konvensional vs Technopreneurship",
        comparison: [
          {
            aspect: "Penggerak Utama",
            conventional: "Perdagangan barang/jasa yang sudah ada (komoditas umum).",
            techno: "Inovasi teknologi, paten, otomatisasi cerdas, efisiensi sistem."
          },
          {
            aspect: "Potensi Skalabilitas",
            conventional: "Linear (penambahan omzet membutuhkan penambahan modal fisik sebanding).",
            techno: "Eksponensial (biaya marjinal reproduksi perangkat lunak & modul IoT relatif rendah)."
          },
          {
            aspect: "Sifat Persaingan",
            conventional: "Perang harga (*red ocean*) dengan margin laba tipis.",
            techno: "Diferensiasi fitur berbasis teknologi bernilai tinggi (*blue ocean*)."
          },
          {
            aspect: "Profil Risiko",
            conventional: "Risiko operasional dan fluktuasi harga bahan baku.",
            techno: "Risiko riset dan pengembangan (R&D) terukur dengan potensi imbal hasil tinggi."
          }
        ]
      },
      {
        heading: "3. Studi Kasus Industri: Menangkap Peluang di PT WD Group Solo",
        content: `PT WD Group Solo menaungi berbagai divisi usaha: WD Production & Event Organizer, WD Futsal, dan WD Music Entertainment. Di balik geliat bisnis pertunjukan dan sewa fasilitas olahraga, terdapat inefisiensi nyata:
1. **Peralatan Panggung Impor yang Sangat Mahal**: Lighting console DMX impor berharga belasan juta rupiah, sulit diperbaiki jika terkena lonjakan tegangan genset di lapangan terbuka. Peluang: Membangun *Smart Stage Lighting Controller* rakitan lokal.
2. **Kebocoran Pendapatan Sewa & Beban Listrik Lampu Sorot**: Lampu sorot futsal berdaya ribuan watt sering lupa dipadamkan petugas kasir, memicu pemborosan listrik jutaan rupiah per bulan. Peluang: Membangun *Smart Futsal Court Timer* yang memutus relay otomatis.
3. **Bottleneck Antrean Konser Musik**: Pemalsuan tiket dan pemeriksaan manual memicu kerumunan berdesakan. Peluang: *IoT Smart Event Access Controller* mandiri.`
      }
    ],
    checklist: [
      "Mampu mendefinisikan perbedaan wirausaha konvensional vs technopreneurship",
      "Mampu mengidentifikasi minimal 3 kendala nyata di industri mitra lokal",
      "Memiliki hipotesis produk teknologi cerdas yang dapat diuji coba kelayakannya"
    ],
    relatedProductId: "lighting-controller"
  },
  {
    id: 2,
    cpmk: "CPMK 3",
    meeting: "Pertemuan 5–6",
    title: "Perumusan Ide Inovasi & Business Model Canvas (BMC)",
    badge: "Design Thinking & Pemodelan Bisnis",
    duration: "300 Menit (2 Pertemuan)",
    summary: "Mengaplikasikan metodologi Design Thinking untuk menajamkan ide prototipe dan memetakan model bisnis yang berkelanjutan ke dalam 9 blok Business Model Canvas (BMC) Osterwalder.",
    objectives: [
      "Menguasai alur 5 fase Design Thinking: Empathize, Define, Ideate, Prototype, dan Test.",
      "Menyusun 9 blok Business Model Canvas yang koheren untuk produk teknologi cerdas.",
      "Mengidentifikasi Value Proposition unik dari prototipe berbasis mikrokontroler dan IoT."
    ],
    sections: [
      {
        heading: "1. Pendekatan Human-Centered Design Thinking",
        content: `Inovasi produk gagal di pasar bukan karena keterbatasan teknis mahasiswa, melainkan karena produk tersebut **tidak dibutuhkan oleh siapa pun**. Design Thinking menjamin mahasiswa berangkat dari empati mendalam terhadap pengguna akhir:
- **Empathize**: Wawancara langsung sound engineer, lighting operator, manajer futsal, dan panitia event PT WD Group.
- **Define**: Rumuskan *Pain Points* (ketakutan terbesar pengguna) dan *Gain Points* (harapan ideal).
- **Ideate**: Brainstorming fitur teknis mikrokontroler (ESP32, sensor, modul komunikasi).
- **Prototype**: Merancang skema elektronik dan model 3D spasial di KREAR.
- **Test**: Menempatkan prototipe digital 3D/AR langsung di meja kerja mitra untuk evaluasi ergonomi.`
      },
      {
        heading: "2. Bedah 9 Blok Business Model Canvas (BMC) Osterwalder",
        content: `BMC memetakan logika bisnis ke dalam satu lembar kanvas strategis:
1. **Customer Segments**: Siapa pelanggan yang paling membutuhkan solusi kita? (Contoh: Pemilik rental sound/lighting panggung, pengelola venue olahraga, promotor musik).
2. **Value Propositions**: Apa nilai unik yang membuat konsumen membeli produk kita dibanding kompetitor? (Contoh: Harga 60% lebih murah dari alat impor, bergaransi servis lokal 24 jam).
3. **Channels**: Lewat jalur mana produk dipromosikan dan didistribusikan? (Direct sales ke komunitas EO, demo pameran, toko daring).
4. **Customer Relationships**: Bagaimana membangun loyalitas konsumen? (Layanan purna jual, update firmware gratis, komunitas pengguna).
5. **Revenue Streams**: Dari mana aliran uang masuk? (Penjualan unit hardware, sewa alat per event, biaya kustomisasi fitur).
6. **Key Resources**: Aset vital apa yang mutlak dimiliki? (Komponen mikrokontroler, rancangan PCB, model 3D, teknisi perakit).
7. **Key Activities**: Aktivitas kunci penentu kelangsungan bisnis? (Perakitan sirkuit, kalibrasi sensor, pengujian beban, pemasaran).
8. **Key Partnerships**: Mitra strategis pendukung keberhasilan? (Toko komponen elektronika, pabrik pencetak PCB, vendor akrilik/casing, DUDI PT WD Group).
9. **Cost Structure**: Komponen biaya terbesar dalam operasional? (Biaya bill of materials/BOM komponen elektronika, biaya perakitan, biaya pemasaran).`
      }
    ],
    checklist: [
      "Mampu melakukan wawancara kebutuhan pengguna (Empathize)",
      "Mampu mengisi 9 blok BMC secara logis dan saling terkait di BMC Workspace",
      "Mampu mengidentifikasi Value Proposition yang berdaya saing kuat"
    ],
    relatedProductId: "futsal-timer"
  },
  {
    id: 3,
    cpmk: "CPMK 4",
    meeting: "Pertemuan 7",
    title: "Alur Kerja Digitalisasi Aset Fisik ke 3D & Web AR",
    badge: "Pipeline 3D & WebXR",
    duration: "150 Menit",
    summary: "Mempelajari alur lengkap digitalisasi prototipe fisik perangkat keras menjadi aset 3D digital interaktif berstandar web (.glb dan .usdz) yang siap diproyeksikan melalui Augmented Reality tanpa instalasi aplikasi.",
    objectives: [
      "Memahami prinsip fotogrametri seluler dan pemodelan poligon rendah (*low-poly*) di Blender 4.x.",
      "Mengaplikasikan teknik baking material PBR dan kompresi Draco agar ukuran berkas <= 5 MB.",
      "Mengintegrasikan model 3D ke web viewer berbasis WebGL dan WebXR menggunakan Google Model Viewer."
    ],
    sections: [
      {
        heading: "1. Mengapa Digitalisasi 3D & Web AR Krusial bagi Technopreneur?",
        content: `Sebelum mengeluarkan modal jutaan rupiah untuk mencetak casing industri, mencetak ribuan PCB, atau memproduksi massal, prototipe digital 3D memungkinkan pengujian ergonomi, estetika, dan tata letak tombol secara instan.

Lebih jauh lagi, **Web AR (Augmented Reality berbasis web)** menghilangkan friksi instalasi aplikasi APK yang memberatkan memori ponsel calon pembeli atau investor. Cukup dengan membuka tautan URL atau memindai kode QR, objek 3D langsung muncul berskala 1:1 di atas meja fisik melalui kamera ponsel.`
      },
      {
        heading: "2. Alur 4 Tahap Digitalisasi Aset Hardware",
        content: `Pipeline standar industri yang diterapkan pada media KREAR:
1. **Tahap 1: Pengambilan Dimensi & Fotogrametri**: Mengukur dimensi fisik perangkat asli PT WD Group menggunakan jangka sorong (caliper), mendokumentasikan sudut 360° resolusi tinggi.
2. **Tahap 2: Pemodelan Low-Poly di Blender 4.x**: Membangun geometri yang efisien (menjaga poligon di bawah 20.000 segitiga), merapikan topologi, menandai seam untuk UV Unwrapping.
3. **Tahap 3: Texturing PBR & Kompresi Draco**: Membakar (*bake*) tekstur Realistic PBR (Albedo, Roughness, Metallic, Normal Map) ke dalam 1 set gambar 2048x2048. Mengaktifkan Draco Mesh Compression di Blender saat ekspor ke file **.glb** untuk mereduksi ukuran berkas hingga 80% (target: < 5 MB).
4. **Tahap 4: Konversi ke USDZ & Integrasi WebXR**: Mengonversi berkas ke format **.usdz** untuk mendukung AR Quick Look di iPhone/iPad Safari, serta menghubungkan ke komponen \`<model-viewer>\` di peramban web modern.`
      }
    ],
    checklist: [
      "Memahami perbedaan format .glb (standar WebGL/Android) dan .usdz (iOS)",
      "Mengetahui batasan ukuran berkas 3D web (< 5 MB) demi kecepatan pemuatan",
      "Mampu mengonfigurasi atribut \`ar-modes=\"webxr scene-viewer quick-look\"\`"
    ],
    relatedProductId: "event-access"
  },
  {
    id: 4,
    cpmk: "CPMK 5",
    meeting: "Pertemuan 13",
    title: "Validasi Prototipe Produk Industri Cerdas",
    badge: "Uji Ergonomi & Spasial AR",
    duration: "150 Menit",
    summary: "Mengevaluasi prototipe produk industri PT WD Group Solo menggunakan fitur inspeksi 3D dan proyeksi spasial Web AR untuk validasi ergonomi fisik, kemudahan pemeliharaan, dan fungsi bisnis komponen.",
    objectives: [
      "Melakukan inspeksi visual 360 derajat terhadap tata letak komponen elektronika.",
      "Memvalidasi skala spasial 1:1 pada meja fisik kelas menggunakan mode Augmented Reality.",
      "Menganalisis keterkaitan antara anotasi teknis pada hotspot 3D dengan proposisi nilai bisnis produk."
    ],
    sections: [
      {
        heading: "1. Pengujian Spasial Skala 1:1 di Lingkungan Nyata",
        content: `Melalui sensor kamera ponsel cerdas dan kapabilitas SLAM (*Simultaneous Localization and Mapping*) pada ARCore/ARKit, Web AR mampu menempatkan prototipe digital produk di atas meja kelas secara presisi.

Mahasiswa S1 Teknik Komputer dapat menguji:
- **Skala & Dimensi Nyata**: Apakah ukuran casing Smart Stage Lighting Controller terlalu memakan tempat di meja operator panggung?
- **Jangkauan Ergonomi**: Apakah fader geser 10K dan sakelar preset mudah dijangkau oleh jemari teknisi saat kondisi minim cahaya?
- **Keterbacaan Display**: Apakah display 7-segment Smart Futsal Timer tampak proporsional jika digantung di dinding lapangan?`
      },
      {
        heading: "2. Titik Anotasi Interaktif (Hotspots) sebagai Jembatan Hardware-Bisnis",
        content: `Pada media KREAR, setiap prototipe dilengkapi 4 titik hotspot interaktif. Hotspot ini bukan sekadar keterangan komponen elektronika, melainkan mengaitkan fungsi teknis langsung ke nilai keuntungan bisnis:
- **Contoh pada Smart Stage Lighting Controller**: Hotspot IC MAX485 menjelaskan spesifikasi konversi sinyal UART ke diferensial RS-485, sekaligus menerangkan nilai bisnisnya yaitu kompatibilitas global dengan rig moving head panggung dunia.`
      }
    ],
    checklist: [
      "Melakukan rotasi 360 derajat dan zoom in pada komponen mikro di 3D Viewer",
      "Mengaktifkan mode Web AR di smartphone dan meletakkan produk di meja kelas",
      "Mengklik seluruh hotspot (1-4) dan mencatat fungsi bisnis masing-masing komponen"
    ],
    relatedProductId: "audio-monitor"
  },
  {
    id: 5,
    cpmk: "CPMK 6",
    meeting: "Pertemuan 14",
    title: "Evaluasi Kelayakan Bisnis & Pitching Produk Inovasi",
    badge: "Validasi Pasar & Presentasi",
    duration: "150 Menit",
    summary: "Menghitung kelayakan finansial (COGS, Margin, BEP), memvalidasi Product-Market Fit, dan menguasai teknik presentasi pitching memikat di hadapan investor dan mitra DUDI.",
    objectives: [
      "Menghitung Break-Even Point (BEP) dan margin keuntungan dari produk prototipe.",
      "Mengukur indikator Product-Market Fit melalui validasi penerimaan pengguna industri.",
      "Menyusun slide dan narasi pitching 5 menit yang berdaya pikat tinggi (*Elevator Pitch*)."
    ],
    sections: [
      {
        heading: "1. Kalkulasi Tekno-Ekonomis Sederhana",
        content: `Sebuah produk rekayasa komputer cerdas harus memiliki hitungan ekonomi yang masuk akal:
- **Cost of Goods Sold (COGS / HPP)**: Total biaya komponen hardware (mikrokontroler, modul, casing, kabel, soket) ditambah biaya perakitan dan tenaga kerja.
- **Selling Price (Harga Jual)**: Dihitung berdasarkan nilai tambah penghematan yang dirasakan konsumen (*value-based pricing*), bukan sekadar *cost-plus*.
- **Break-Even Point (BEP)**: Titik impas di mana total pendapatan menutup seluruh biaya investasi awal R&D.`
      },
      {
        heading: "2. Struktur Pitching 5 Menit di Depan Mitra DUDI & Investor",
        content: `Saat mendemonstrasikan prototipe di hadapan Dosen Pengampu Wildan Deni Fahrezi, S.Pd., M.Pd. dan manajemen PT WD Group Solo, mahasiswa harus menyajikan:
1. **Hook & Problem (Menit 1)**: Fakta kebocoran biaya atau mahalnya alat impor di industri lokal saat ini.
2. **Solution & AR Demo (Menit 2)**: Menunjukkan prototipe 3D/AR KREAR yang telah dirancang berskala 1:1.
3. **Business Model & Market Size (Menit 3)**: Penjelasan 9 blok BMC, segmen target, dan proyeksi omzet.
4. **Traction & Validation (Menit 4)**: Hasil uji coba fungsi perangkat keras dan testimoni awal operator lapangan.
5. **The Ask & Vision (Menit 5)**: Rencana modal ekspansi dan kerja sama kemitraan produksi.`
      }
    ],
    checklist: [
      "Mengetahui kalkulasi HPP dan estimasi harga jual 4 produk PT WD Group",
      "Memahami kriteria Product-Market Fit (konsumen bersedia membayar solusi)",
      "Siap melakukan pitching produk dengan bantuan media visual 3D & Web AR KREAR"
    ],
    relatedProductId: "lighting-controller"
  }
];

