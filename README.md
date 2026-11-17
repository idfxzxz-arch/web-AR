# KREAR: Media Pembelajaran Web AR Technopreneurship

> **Judul Skripsi:** Pengembangan KREAR: Media Pembelajaran Berbasis Augmented Reality untuk Meningkatkan Kompetensi Technopreneurship Mahasiswa melalui Digitalisasi Produk Industri Kreatif  
> **Program Studi:** Pendidikan Teknik Informatika (PTI) FKIP Universitas Muhammadiyah Surakarta  
> **Subjek Pengguna:** 15 Mahasiswa S1 Teknik Komputer Universitas Muhammadiyah Karanganyar (UMUKA)  
> **Mitra Industri (DUDI):** PT WD Group Solo  
> **Dosen Pengampu:** Wildan Deni Fahrezi, S.Pd., M.Pd.  

---

## 🚀 Fitur Utama KREAR

1. **Laboratorium Spasial WebXR Interaktif (3D & Web AR)**:
   - Orbit 360°, zoom in/out, pan, reset camera, dan fullscreen view.
   - 4 Titik Hotspot anotasi pada setiap prototipe untuk membedah fungsi rekayasa perangkat keras dan nilai komersial bisnisnya.
   - Proyeksi spasial 1:1 di meja fisik kelas menggunakan WebXR / Scene Viewer (Android) dan AR Quick Look USDZ (iOS Safari) tanpa instalasi APK.
   - Modal QR Code otomatis untuk pengguna laptop/desktop agar dapat memindai dan membuka prototipe di ponsel cerdas secara instan.

2. **4 Prototipe Produk Riil PT WD Group Solo**:
   - `WD-LC-01`: Smart Stage Lighting Controller (WD Production & Event Organizer)
   - `WD-FT-02`: Smart Futsal Court Timer & Controller (WD Futsal & WD IT)
   - `WD-EA-03`: IoT Smart Event Access Controller (WD Event Organizer & WD IT)
   - `WD-AM-04`: Digital Audio Level & Acoustic Monitor (WD Music Entertainment & Record)

3. **5 Modul Pembelajaran Terintegrasi RPS UMUKA**:
   - Modul 1 (CPMK 2 / Pertemuan 4): Peluang Usaha Berbasis Teknologi & Industri Kreatif
   - Modul 2 (CPMK 3 / Pertemuan 5–6): Perumusan Ide Inovasi & Business Model Canvas (BMC)
   - Modul 3 (CPMK 4 / Pertemuan 7): Alur Kerja Digitalisasi Aset Fisik ke 3D & Web AR
   - Modul 4 (CPMK 5 / Pertemuan 13): Validasi Prototipe Produk Industri Cerdas
   - Modul 5 (CPMK 6 / Pertemuan 14): Evaluasi Kelayakan Bisnis & Pitching Produk Inovasi

4. **Interactive BMC Workspace**:
   - Kanvas 9 blok Osterwalder dengan auto-save ke `localStorage` (`krear_bmc_data`).
   - Tombol "Muat Contoh WD Group" untuk studi kasus Smart Stage Lighting Controller.
   - Ekspor / Cetak Dokumen via `window.print()` dengan layout bersih khusus cetak.

5. **Kuis Formatif 15 Butir Soal Terintegrasi**:
   - Pengerjaan interaktif 15 butir soal pilihan ganda dengan navigasi nomor soal.
   - Kalkulasi skor otomatis (0–100), passing grade 70%, efek konfeti saat lulus.
   - Review jawaban mahasiswa vs kunci benar disertai pembahasan pedagogis mendalam.

6. **Angket Evaluasi Diri 5 Dimensi & Pentagon Radar Chart (Mashudi et al., 2025)**:
   - 15 butir skala Likert 1–5 terbagi rata dalam 5 dimensi kompetensi.
   - Kalkulasi otomatis persentase capaian per dimensi: $S_d = (\text{Skor Riil} / 15) \times 100\%$.
   - Kategori capaian: Sangat Tinggi ($\ge 80\%$), Tinggi ($60\% \le S_d < 80\%$), Cukup ($40\% \le S_d < 60\%$), dan Perlu Peningkatan ($< 40\%$).
   - Visualisasi Pentagon Radar Chart menggunakan Chart.js (`react-chartjs-2`).
   - Rekomendasi personalisasi pengembangan kompetensi dan cetak laporan hasil evaluasi.

---

## 🛠️ Panduan Menjalankan Proyek

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Akses aplikasi melalui browser di `http://localhost:3000`.

### 3. Build untuk Produksi & Deployment
```bash
npm run build
```
Hasil kompilasi siap didistribusikan di folder `dist/` untuk hosting gratis di:
- **Vercel** (`npx vercel`)
- **Cloudflare Pages**
- **GitHub Pages**

# web-AR
