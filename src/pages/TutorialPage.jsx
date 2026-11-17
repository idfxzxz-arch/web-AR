import React, { useState } from 'react';
import { 
  Layers, 
  Camera, 
  Cpu, 
  Terminal, 
  Code,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Box
} from 'lucide-react';

export default function TutorialPage({ setActivePage }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: "Studi Kasus & Fotogrametri",
      subtitle: "Pengukuran Fisik & Dokumentasi 360°",
      icon: Camera,
      content: `Langkah awal digitalisasi prototipe perangkat keras adalah mengumpulkan data metrik akurat dari benda fisik asli di workshop PT WD Group Solo:
- **Pengukuran Presisi**: Menggunakan jangka sorong digital (*vernier caliper*) untuk mengukur dimensi enclosure, jarak antar tombol fader, ukuran display OLED/7-segment, dan lubang konektor XLR/jack audio.
- **Sesi Pemotretan 360°**: Mengambil 80–120 foto dengan pencahayaan merata (*diffused lighting*) dari sudut atas, tengah, dan bawah objek berlatar polos.
- **Ekstraksi Point Cloud**: Menggunakan peranti lunak fotogrametri (seperti Meshroom atau Polycam) untuk menghasilkan jaring poligon mentah (raw mesh).`
    },
    {
      step: 2,
      title: "Pemodelan Low-Poly di Blender 4.x",
      subtitle: "Retopologi, Beveling, & UV Mapping",
      icon: Layers,
      content: `Model mentah fotogrametri biasanya memiliki jutaan poligon yang sangat berat untuk dijalankan di web. Diperlukan proses retopologi di Blender 4.x:
- **Target Poligon Rendah**: Pertahankan jumlah poligon di bawah 20.000 segitiga (*triangles*) agar dapat dirender pada 60 FPS di ponsel Android kelas menengah.
- **Modular Hard-Surface**: Pisahkan objek bergerak seperti fader geser, kenop putar, dan soket konektor menjadi komponen mesh terpisah.
- **UV Unwrapping Efisien**: Menandai *Seam* dan melakukan unwrap dengan memaksimalkan penggunaan area peta tekstur (0–1 UV space) tanpa peregangan berlebih.`
    },
    {
      step: 3,
      title: "Baking Tekstur PBR & Kompresi Draco",
      subtitle: "Optimasi Berkas Berstandar Web (< 5 MB)",
      icon: Cpu,
      content: `Untuk menghadirkan pencahayaan fotorealistik tanpa membebani peramban:
- **PBR Baking**: Membakar (*bake*) peta Normal, Roughness, Metallic, dan Ambient Occlusion dari model *high-poly* ke model *low-poly* ke dalam resolusi 2048x2048 piksel.
- **Ekspor Format .glTF / .glb**: Format berkas biner standar terbuka WebGL yang menyatukan geometri, material, dan tekstur ke dalam satu file mandiri.
- **Kompresi Draco Mesh**: Aktifkan fitur *Draco Compression* di panel ekspor Blender (Quantization Bits: Position 14, Normal 10, TexCoord 12) untuk mereduksi ukuran berkas dari 25 MB menjadi di bawah 4.5 MB.`
    },
    {
      step: 4,
      title: "Integrasi Web AR & Konversi USDZ",
      subtitle: "WebXR, Android Scene Viewer, & iOS Safari Quick Look",
      icon: Code,
      content: `Agar prototipe dapat diproyeksikan langsung di atas meja kelas tanpa menginstal file APK:
- **Konversi ke USDZ**: Gunakan alat Apple \`usdzconvert\` atau pustaka peramban untuk menghasilkan format .usdz yang terbaca langsung oleh AR Quick Look di Safari iOS.
- **Implementasi Google Model Viewer**: Pasang tag kustom \`<model-viewer>\` dengan atribut \`ar-modes="webxr scene-viewer quick-look"\`.
- **Penempatan Hotspot Spasial**: Tambahkan atribut \`slot="hotspot-X"\` lengkap dengan \`data-position\` dan \`data-normal\` koordinat 3D di atas tombol fader, display, dan mikrokontroler.`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 text-white border border-zinc-800">
        <div className="max-w-3xl space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>ALUR KERJA DIGITALISASI 3D // STANDAR WEBXR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pipeline Digitalisasi 3D & Deployment Web AR
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Panduan teknis langkah demi langkah mengubah perangkat keras elektronika riil PT WD Group Solo menjadi aset 3D WebXR berstandar industri dengan ukuran berkas di bawah 5 MB.
          </p>
        </div>
      </div>

      {/* 4 Step Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((st) => {
          const Icon = st.icon;
          const isSelected = activeStep === st.step;
          return (
            <button
              key={st.step}
              onClick={() => setActiveStep(st.step)}
              className={`p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between space-y-3 font-mono ${
                isSelected
                  ? 'bg-zinc-950 text-white border-zinc-950 shadow-md ring-2 ring-blue-600'
                  : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  isSelected ? 'bg-zinc-800 text-cyan-300' : 'bg-zinc-100 text-zinc-700'
                }`}>
                  STEP 0{st.step}
                </span>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-zinc-400'}`} />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-snug font-sans">
                  {st.title}
                </h4>
                <p className={`text-[10px] mt-0.5 truncate ${
                  isSelected ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  {st.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detail */}
      {(() => {
        const current = steps.find((s) => s.step === activeStep) || steps[0];
        const Icon = current.icon;
        return (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
              <div className="w-10 h-10 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">
                  TAHAP {current.step} DARI 4
                </span>
                <h3 className="text-lg font-bold text-zinc-950">
                  {current.title} — {current.subtitle}
                </h3>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-line bg-zinc-50 p-5 rounded-xl border border-zinc-200 font-sans">
              {current.content}
            </div>

            {current.step === 3 && (
              <div className="bg-zinc-950 rounded-xl p-4 text-white font-mono text-xs space-y-2 border border-zinc-800">
                <div className="flex items-center gap-2 text-cyan-400 pb-2 border-b border-zinc-800 text-[11px]">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>BLENDER PYTHON EXPORT DRACO SCRIPT</span>
                </div>
                <pre className="text-zinc-300 overflow-x-auto p-1 leading-relaxed">
{`bpy.ops.export_scene.gltf(
    filepath="lighting-controller.glb",
    export_format='GLB',
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=7,
    export_draco_position_quantization=14,
    export_draco_normal_quantization=10,
    export_draco_texcoord_quantization=12
)`}
                </pre>
              </div>
            )}

            {current.step === 4 && (
              <div className="bg-zinc-950 rounded-xl p-4 text-white font-mono text-xs space-y-2 border border-zinc-800">
                <div className="flex items-center gap-2 text-cyan-400 pb-2 border-b border-zinc-800 text-[11px]">
                  <Code className="w-3.5 h-3.5" />
                  <span>HTML MODEL VIEWER INTEGRATION</span>
                </div>
                <pre className="text-zinc-300 overflow-x-auto p-1 leading-relaxed">
{`<model-viewer
  src="/models/lighting-controller.glb"
  ios-src="/models/lighting-controller.usdz"
  ar
  ar-modes="webxr scene-viewer quick-look"
  camera-controls
  auto-rotate
  shadow-intensity="1.2">
  <button slot="hotspot-1" data-position="-0.2 0.05 0.1" class="hotspot">01</button>
</model-viewer>`}
                </pre>
              </div>
            )}
          </div>
        );
      })()}

      {/* Specification Table */}
      <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-zinc-950 font-mono">
          STANDAR METRIK ASET 3D KREAR:
        </h3>
        <div className="overflow-x-auto border border-zinc-200 rounded-lg">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-zinc-100 text-zinc-800 font-mono border-b border-zinc-200">
              <tr>
                <th className="p-2.5">Parameter</th>
                <th className="p-2.5">Target Batas</th>
                <th className="p-2.5">Format</th>
                <th className="p-2.5">Kegunaan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700">
              <tr>
                <td className="p-2.5 font-mono font-semibold text-zinc-900">File Size</td>
                <td className="p-2.5 font-mono text-blue-700 font-bold">&lt; 5.0 MB</td>
                <td className="p-2.5 font-mono">.glb / .usdz</td>
                <td className="p-2.5">Pemuatan cepat pada koneksi seluler tanpa lagging</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono font-semibold text-zinc-900">Polycount</td>
                <td className="p-2.5 font-mono text-blue-700 font-bold">&lt; 20.000 Tris</td>
                <td className="p-2.5 font-mono">Low-Poly Mesh</td>
                <td className="p-2.5">Kelancaran rendering 60 FPS pada WebXR smartphone</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono font-semibold text-zinc-900">Texture Resolution</td>
                <td className="p-2.5 font-mono text-blue-700 font-bold">2048 x 2048 px</td>
                <td className="p-2.5 font-mono">Packed PBR</td>
                <td className="p-2.5">Ketajaman label tombol, fader, dan layar instrumen</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono font-semibold text-zinc-900">AR Protocol Android</td>
                <td className="p-2.5 font-mono text-blue-700 font-bold">Scene Viewer</td>
                <td className="p-2.5 font-mono">.glb (Binary glTF)</td>
                <td className="p-2.5">Native AR di browser Google Chrome tanpa instalasi APK</td>
              </tr>
              <tr>
                <td className="p-2.5 font-mono font-semibold text-zinc-900">AR Protocol iOS</td>
                <td className="p-2.5 font-mono text-blue-700 font-bold">Quick Look</td>
                <td className="p-2.5 font-mono">.usdz</td>
                <td className="p-2.5">Native AR di Safari iPhone/iPad</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex justify-between items-center pt-2 font-mono text-xs">
        <button
          onClick={() => {
            setActivePage('modules');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-zinc-600 hover:text-zinc-950 transition-colors"
        >
          ← KEMBALI KE MODUL RPS
        </button>
        <button
          onClick={() => {
            setActivePage('ar-gallery');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <Box className="w-4 h-4 text-cyan-400" />
          <span>BUKA DI LABORATORIUM AR</span>
        </button>
      </div>
    </div>
  );
}
