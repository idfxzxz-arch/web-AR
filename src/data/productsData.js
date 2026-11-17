export const productsData = [
  {
    id: "lighting-controller",
    name: "Smart Stage Lighting Controller",
    code: "WD-LC-01",
    division: "WD Production & Event Organizer",
    category: "Tata Panggung & Otomasi DMX-512",
    tagline: "Konsol Pengendali Pencahayaan Panggung Fleksibel & Terjangkau",
    description: "Sistem otomasi pencahayaan panggung cerdas berbasis mikrokontroler dengan protokol komunikasi industri DMX-512, fader presisi geser 10K, dan antarmuka pemantauan status visual OLED.",
    specs: [
      "Mikrokontroler ESP32 / Arduino Nano presisi tinggi",
      "IC Driver Transceiver DMX-512 (MAX485)",
      "Potensiometer Fader Geser 10K (Smooth Dimming Curve)",
      "Display OLED 0.96 inci I2C (Alamat Kanal DMX & Status Warna)",
      "Sakelar Preset Warna RGBW (Strobe, Blackout, Fade, Chase)",
      "Terminal Port XLR 3-pin Output Standar Industri Panggung",
      "Catu Daya 12V DC dengan Regulator Proteksi Tegangan Balik"
    ],
    dimensions: "24 cm x 15 cm x 6 cm",
    estimatedCost: "Rp 650.000",
    sellingPrice: "Rp 1.850.000",
    businessValue: "Mengatasi mahalnya mixer lampu panggung impor (yang harganya bisa mencapai Rp 8–15 juta); menyediakan otomasi tata pencahayaan konser yang fleksibel, modular, dan terjangkau bagi para pelaku industri pertunjukan, rental sound-lighting, dan EO lokal.",
    problemStatement: "Para pengusaha panggung dan pertunjukan lokal di Soloraya sering terbebani oleh tingginya biaya impor lighting console DMX yang rumit dan rentan rusak jika terpapar fluktuasi arus listrik lapangan.",
    solution: "Menghadirkan controller DMX-512 rakitan industri kreatif lokal yang tangguh, mudah diperbaiki suku cadangnya, dan dirancang ergonomis dengan preset warna instan.",
    modelUrl: "/models/lighting-controller.glb",
    usdzUrl: "/models/lighting-controller.usdz",
    poster: "/models/posters/lighting-controller.jpg",
    cameraDefaults: {
      orbit: "0deg 55deg auto",
      target: "auto auto auto"
    },
    hotspots: [
      {
        id: "hotspot-1",
        title: "Fader Geser 10K",
        subtitle: "Hardware Kontrol Analog",
        slot: "hotspot-1",
        position: "-0.045 0.058 0.01",
        normal: "0 1 0",
        component: "Linear Slide Potentiometer 10K Ohm",
        technicalDetail: "Memberikan sinyal analog presisi untuk konversi ADC 12-bit mikrokontroler guna menghasilkan kurva peredupan (dimming) lampu LED panggung yang halus tanpa kedipan (flicker-free).",
        businessFunction: "Kontrol intensitas cahaya halus (dimming) yang memberikan kepuasan visual maksimal pada tata panggung pertunjukan."
      },
      {
        id: "hotspot-2",
        title: "OLED Display 0.96\"",
        subtitle: "Antarmuka Visual Operasional",
        slot: "hotspot-2",
        position: "0.05 0.052 -0.02",
        normal: "0 1 0",
        component: "Monochrome OLED 128x64 I2C Display",
        technicalDetail: "Menampilkan alamat DMX universe awal (1-512), status nilai master fader, indikator channel aktif, dan mode preset warna yang sedang berjalan secara real-time.",
        businessFunction: "Monitoring alamat kanal DMX & status warna secara cepat di ruang panggung yang gelap tanpa perlu laptop tambahan."
      },
      {
        id: "hotspot-3",
        title: "IC Driver MAX485",
        subtitle: "Transceiver Komunikasi Standar",
        slot: "hotspot-3",
        position: "0.05 0.052 0.03",
        normal: "0 1 0",
        component: "MAX485 Differential Bus Transceiver IC",
        technicalDetail: "Mengonversi sinyal UART mikrokontroler ke sinyal diferensial RS-485 yang mampu mentransmisikan paket data DMX-512 hingga jarak kabel 300 meter dengan imunitas derau tinggi.",
        businessFunction: "Transceiver protokol standar industri panggung DMX-512 yang menjamin kompatibilitas produk dengan seluruh merk moving head dan par LED dunia."
      },
      {
        id: "hotspot-4",
        title: "Terminal Port XLR 3-Pin",
        subtitle: "Antarmuka Fisik Output Industri",
        slot: "hotspot-4",
        position: "0.07 0.025 0.076",
        normal: "0 0 1",
        component: "Standard Neutrik-style 3-Pin XLR Female Chassis Connector",
        technicalDetail: "Terminal output balanced untuk kabel mikrofon/DMX standar (Pin 1: Ground/Shield, Pin 2: Data -, Pin 3: Data +) dengan mekanisme pengunci klip tahan goncangan panggung.",
        businessFunction: "Port output koneksi ke deretan lampu panggung yang kokoh dan tahan banting dalam pemakaian rental intensif."
      }
    ]
  },
  {
    id: "futsal-timer",
    name: "Smart Futsal Court Timer & Controller",
    code: "WD-FT-02",
    division: "WD Futsal & WD IT",
    category: "IoT & Otomasi Fasilitas Olahraga",
    tagline: "Otomasi Tata Listrik & Pengatur Waktu Sewa Lapangan Futsal Real-Time",
    description: "Sistem cerdas manajemen sewa lapangan olahraga yang mengintegrasikan timer digital 7-segment besar, otomasi sakelar beban lampu sorot daya tinggi via relay 30A, modul RTC presisi tinggi, dan kontrol nirkabel.",
    specs: [
      "Mikrokontroler ESP32 Dual Core Wi-Fi/BLE",
      "Modul Relay 4-Channel 30A (Heavy Duty Load Lampu Sorot LED 400W-1000W)",
      "Modul Real Time Clock (RTC) DS3231 Presisi Suhu Terkompensasi",
      "Display 7-Segment LED 4-Digit Besar (Ukuran 4 inci per digit)",
      "Buzzer Alarm Peringatan Suara Keras (Piezo Siren 105 dB)",
      "Antarmuka Dashboard Web Lokal / Mobile untuk Operator Kasir",
      "Enclosure Akrilik Tahan Benturan Bola & Debu Indoor"
    ],
    dimensions: "60 cm x 25 cm x 10 cm",
    estimatedCost: "Rp 900.000",
    sellingPrice: "Rp 2.400.000",
    businessValue: "Mencegah kebocoran pendapatan sewa akibat kelalaian penjaga kasir atau kecurangan durasi main, mengotomasi pemadaman deretan lampu sorot berdaya listrik ribuan watt secara presisi saat waktu sewa habis, serta menciptakan transparansi waktu bagi konsumen.",
    problemStatement: "Pemilik lapangan futsal kerap mengalami kerugian biaya listrik akibat lampu lapangan tetap menyala melebihi durasi sewa, serta perselisihan durasi main antara penyewa dan kasir lapangan.",
    solution: "Otomasi pemadaman listrik terpadu dengan jam hitung mundur raksasa yang langsung terlihat oleh pemain dan terhubung ke sistem kasir.",
    modelUrl: "/models/futsal-timer.glb",
    usdzUrl: "/models/futsal-timer.usdz",
    poster: "/models/posters/futsal-timer.jpg",
    cameraDefaults: {
      orbit: "0deg 75deg auto",
      target: "auto auto auto"
    },
    hotspots: [
      {
        id: "hotspot-1",
        title: "Display 7-Segment 4\"",
        subtitle: "Visualisasi Waktu Spasial",
        slot: "hotspot-1",
        position: "0.0 0.13 -0.052",
        normal: "0 0 -1",
        component: "4-Digit Ultra-Bright Red LED 7-Segment Modules",
        technicalDetail: "Display LED super terang dengan sudut pandang lebar 120° yang dapat dibaca jelas dari jarak 50 meter di ujung lapangan oleh pemain dan wasit.",
        businessFunction: "Tampilan sisa waktu sewa menit dan detik yang transparan, menghilangkan komplain pemain dan menjaga jadwal lapangan tetap tepat waktu."
      },
      {
        id: "hotspot-2",
        title: "Relay 4-Channel 30A",
        subtitle: "Sakelar Beban Arus Kuat",
        slot: "hotspot-2",
        position: "-0.22 0.08 0.0",
        normal: "0 1 0",
        component: "Songle 30A 250VAC Optocoupler-Isolated Relay Module",
        technicalDetail: "Dilengkapi proteksi optocoupler isolasi galvanik antara sinyal logika 3.3V mikrokontroler dan jalur listrik PLN 220V hingga 6600 Watt beban induktif.",
        businessFunction: "Sakelar digital beban listrik lampu sorot watt besar yang mati otomatis demi efisiensi biaya tagihan listrik operasional mitra bisnis."
      },
      {
        id: "hotspot-3",
        title: "Modul RTC DS3231",
        subtitle: "Penjaga Akurasi Waktu Riil",
        slot: "hotspot-3",
        position: "0.18 0.08 0.0",
        normal: "0 1 0",
        component: "DS3231 High-Precision I2C RTC with CR2032 Battery Backup",
        technicalDetail: "Memiliki kristal terintegrasi dengan kompensasi suhu (TCXO) sehingga penyimpangan waktu kurang dari 1 menit per tahun, tetap berjalan presisi saat pemadaman listrik PLN.",
        businessFunction: "Pencatat waktu riil akurat meski listrik padam, mencegah manipulasi sistem waktu oleh pihak tidak bertanggung jawab."
      },
      {
        id: "hotspot-4",
        title: "Buzzer Alarm 105 dB",
        subtitle: "Notifikasi Akustik Lapangan",
        slot: "hotspot-4",
        position: "0.22 0.265 0.0",
        normal: "0 1 0",
        component: "Industrial Piezo Buzzer Siren 12V 105 dB",
        technicalDetail: "Menghasilkan nada frekuensi tinggi 2.8 kHz yang terdengar jelas di tengah gemuruh suara pemain futsal, berbunyi 1 menit sebelum waktu habis dan saat waktu tuntas.",
        businessFunction: "Peringatan audio penanda habisnya sesi bermain yang adil dan tegas tanpa perlu teriakan manual dari petugas kasir."
      }
    ]
  },
  {
    id: "event-access",
    name: "IoT Smart Event Access Controller",
    code: "WD-EA-03",
    division: "WD Event Organizer & WD IT",
    category: "Sistem Akses Cerdas & Ticketing Otomatis",
    tagline: "Gerbang Validasi Tiket Digital & Gelang RFID Cepat Tanpa Antrean",
    description: "Pedestal validasi tiket otomatis berbasis mikrokontroler ESP32 dengan pemindai QR Code 2D cepat, pembaca RFID 13.56 MHz untuk tiket gelang VIP, layar umpan balik grafis IPS 2.4\", dan pemicu solenoid barrier gate.",
    specs: [
      "Modul Pemindai Barcode / QR Code 2D GM66 (Omnidirectional CMOS sensor)",
      "Modul RFID RC522 (13.56 MHz Mifare Card / Wristband)",
      "Mikrokontroler ESP32 Wi-Fi & Bluetooth dengan Enkripsi SHA-256",
      "Layar IPS LCD 2.4 inci TFT Full Color SPI",
      "Indikator Buzzer Beep & Dual LED Ring Status (Hijau/Merah)",
      "Modul Solenoid Barrier Lock Relay Trigger 12V DC",
      "Enclosure Pedestal Metal Finishing Powder Coating Tahan Cuaca Luar Ruang"
    ],
    dimensions: "30 cm x 25 cm x 110 cm",
    estimatedCost: "Rp 1.150.000",
    sellingPrice: "Rp 3.500.000",
    businessValue: "Mengeliminasi antrean panjang berdesakan di pintu masuk event musik / pameran, mencegah kerugian jutaan rupiah akibat tiket palsu atau tangkapan layar tiket yang dipakai berulang, serta menyediakan analitik data kedatangan penonton secara real-time.",
    problemStatement: "Gatekeeper tiket manual di konser musik sering menjadi titik kemacetan (bottleneck), rentan terhadap kecurangan pemalsuan tiket cetak, dan sulit memverifikasi hak akses area VIP secara akurat.",
    solution: "Sistem pemindai gerbang terintegrasi mandiri (self-check-in turnstile) yang memvalidasi tiket digital dan gelang RFID dalam waktu kurang dari 1 detik.",
    modelUrl: "/models/event-access.glb",
    usdzUrl: "/models/event-access.usdz",
    poster: "/models/posters/event-access.jpg",
    cameraDefaults: {
      orbit: "0deg 70deg auto",
      target: "auto auto auto"
    },
    hotspots: [
      {
        id: "hotspot-1",
        title: "QR Scanner GM66",
        subtitle: "Modul Pemindai Optik Cepat",
        slot: "hotspot-1",
        position: "0.0 0.98 -0.10",
        normal: "0 1 -1",
        component: "GM66 2D CMOS Image Barcode/QR Code Scanner",
        technicalDetail: "Sudut baca 60°, membaca kode QR dari layar ponsel dengan kecerahan minim sekalipun dalam waktu kurang dari 200 ms, terhubung via UART serial.",
        businessFunction: "Pemindai tiket digital e-voucher ponsel cepat (< 1 detik) yang memecah kepadatan antrean penonton konser."
      },
      {
        id: "hotspot-2",
        title: "RFID Reader RC522",
        subtitle: "NFC / Tag Sensor 13.56 MHz",
        slot: "hotspot-2",
        position: "0.08 0.95 -0.08",
        normal: "1 1 0",
        component: "MFRC522 High-Integration Reader/Writer IC",
        technicalDetail: "Frekuensi kerja 13.56 MHz dengan jarak baca 3–5 cm, mendukung protokol enkripsi Mifare Classic 1K untuk gelang kain ber-chip RFID.",
        businessFunction: "Validasi gelang/kartu panitia & VIP dengan sekali tap untuk akses area backstage tanpa kompromi keamanan."
      },
      {
        id: "hotspot-3",
        title: "Layar IPS LCD 2.4\"",
        subtitle: "Antarmuka Pengguna Visual",
        slot: "hotspot-3",
        position: "0.0 0.92 -0.09",
        normal: "0 1 -1",
        component: "2.4\" TFT SPI LCD 240x320 Pixels 65K Color",
        technicalDetail: "Menampilkan animasi visual: centang hijau selamat datang dengan nama pengunjung, atau silang merah jika tiket sudah terpakai (double check-in rejection).",
        businessFunction: "Umpan balik nama pengunjung dan status validitas secara jelas dan ramah bagi penonton."
      },
      {
        id: "hotspot-4",
        title: "Solenoid Lock Driver",
        subtitle: "Aktuator Mekanikal Gerbang",
        slot: "hotspot-4",
        position: "-0.11 0.48 0.0",
        normal: "-1 0 0",
        component: "Heavy Duty 12V DC Solenoid Bolt Door Lock with Flyback Diode",
        technicalDetail: "Menarik lidah pengunci turnstile selama 3 detik saat data tiket dinyatakan VALID oleh database, dan mengunci seketika saat sensor optik mendeteksi 1 orang telah lewat.",
        businessFunction: "Mekanisme pengunci gerbang putar / barrier gate yang menjamin hanya penonton bertiket valid yang dapat masuk area acara."
      }
    ]
  },
  {
    id: "audio-monitor",
    name: "Digital Audio Level & Acoustic Monitor",
    code: "WD-AM-04",
    division: "WD Music Entertainment & Record",
    category: "Tata Suara & Pemantau Akustik Lingkungan",
    tagline: "Pemantau Desibel Suara Lingkungan & Indikator VU Meter Presisi Studio",
    description: "Alat pemantau desibel (sound level meter) dan meter level puncak audio panggung yang menggabungkan sensor mikrofon elektret berpenguat op-amp, display grafis VU meter 10-segmen stereo, dan kalkulasi desibel real-time pada LCD 16x2.",
    specs: [
      "Sensor Suara Mikrofon Elektret Presisi Tinggi dengan Penguat Op-Amp MAX4466 (Low Noise)",
      "Mikrokontroler Arduino Nano / ATmega328P 16 MHz",
      "Display Bar LED VU Meter 10-Segment Stereo Dual Channel (Hijau, Kuning, Merah)",
      "Display LCD 16x2 I2C Backlight Biru Penampil Nilai Desibel (dBA SPL) & Peak Hold",
      "Sakelar Kalibrasi Sensitivitas Analog (Multi-Turn Trimpot Precision)",
      "Konektor Input Audio Jack 6.35 mm & XLR Balanced Passthrough",
      "Enclosure Aluminium Rackmount 1U Standar Audio Profesional"
    ],
    dimensions: "48 cm x 18 cm x 4.4 cm (1U Rack)",
    estimatedCost: "Rp 550.000",
    sellingPrice: "Rp 1.600.000",
    businessValue: "Memantau ambang batas kebisingan konser musik guna mematuhi regulasi K3 lingkungan akustik dan kenyamanan warga sekitar panggung, serta mencegah kerusakan speaker dan amplifier berharga puluhan juta akibat distorsi gelombang (audio clipping).",
    problemStatement: "Banyak event pertunjukan musik ditegur aparat atau warga sekitar karena tingkat kebisingan melebihi batas legal, serta sound engineer sering mengalami kerusakan driver tweeter speaker karena tidak memiliki alat ukur desibel yang objektif.",
    solution: "Menyediakan perangkat rackmount pemantau desibel dan VU meter visual yang akurat, mudah dipasang di meja mixing FOH (Front of House), dan bersertifikasi kalibrasi terjangkau.",
    modelUrl: "/models/audio-monitor.glb",
    usdzUrl: "/models/audio-monitor.usdz",
    poster: "/models/posters/audio-monitor.jpg",
    cameraDefaults: {
      orbit: "0deg 75deg auto",
      target: "auto auto auto"
    },
    hotspots: [
      {
        id: "hotspot-1",
        title: "Mikrofon & Preamp MAX4466",
        subtitle: "Transduser Akustik Sensitif",
        slot: "hotspot-1",
        position: "-0.16 0.022 -0.095",
        normal: "0 0 -1",
        component: "Electret Capsule with MAX4466 Adjustable Gain Op-Amp",
        technicalDetail: "Respon frekuensi linear 20 Hz – 20 kHz dengan power supply rejection ratio (PSRR) unggul, meminimalkan gangguan induksi listrik panggung.",
        businessFunction: "Menangkap gelombang tekanan suara secara linear untuk menjamin akurasi pembacaan kenyaringan suara panggung."
      },
      {
        id: "hotspot-2",
        title: "LED VU Meter 10-Segment",
        subtitle: "Indikator Visual Dinamis",
        slot: "hotspot-2",
        position: "-0.05 0.022 -0.092",
        normal: "0 0 -1",
        component: "Dual 10-Bar Step LED Array with LM3914 Logarithmic Drivers",
        technicalDetail: "Menampilkan dinamika skala logaritma audio dari -20 dB hingga +3 dB dengan indikator warna: Hijau (aman), Kuning (peringatan), Merah (overload/clipping).",
        businessFunction: "Indikator visual level puncak audio secara instan yang langsung memperingatkan teknisi FOH sebelum speaker jebol."
      },
      {
        id: "hotspot-3",
        title: "Display LCD 16x2",
        subtitle: "Tampilan Metrik Digital",
        slot: "hotspot-3",
        position: "0.06 0.022 -0.092",
        normal: "0 0 -1",
        component: "HD44780-Compatible 1602 LCD with PCF8574 I2C Adapter",
        technicalDetail: "Menampilkan metrik dBA Leq (Continuous Equivalent Sound Level) dan Peak dBA dengan laju penyegaran data setiap 250 milidetik.",
        businessFunction: "Menampilkan desibel riil (dBA SPL) terukur sebagai bukti kepatuhan terhadap regulasi tingkat kebisingan lingkungan pemerintah."
      },
      {
        id: "hotspot-4",
        title: "Trimmer Kalibrasi Presisi",
        subtitle: "Penyesuaian Akustik Ruang",
        slot: "hotspot-4",
        position: "0.17 0.022 -0.095",
        normal: "0 0 -1",
        component: "Bourns 3296 Multi-turn Cermet Trimmer Potentiometer",
        technicalDetail: "Memungkinkan kalibrasi offset dBA mikrofon terhadap alat pembanding standar (Sound Level Calibrator Kelas 1) dengan ketelitian putaran 25 lapis.",
        businessFunction: "Penyesuaian sensitivitas akustik ruangan studio atau panggung terbuka agar data pengukuran selalu valid dan terpercaya."
      }
    ]
  }
];
