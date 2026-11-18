import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  RotateCw, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Smartphone, 
  QrCode, 
  X,
  Crosshair,
  Layers,
  Eye,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export default function ModelViewer({ product, onSelectHotspot }) {
  const modelViewerRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(false); // Default to false for precision inspection
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [cameraOrbitText, setCameraOrbitText] = useState('30° 60° auto');
  const [activeViewMode, setActiveViewMode] = useState('iso');

  const defaultOrbit = product?.cameraDefaults?.orbit || '30deg 60deg auto';

  const getAndroidSceneViewerIntent = () => {
    if (typeof window === 'undefined') return '#';
    const glbAbsoluteUrl = new URL(product.modelUrl, window.location.href).href;
    return `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(glbAbsoluteUrl)}&mode=ar_only&resizable=true&title=${encodeURIComponent(product.name)}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
  };

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iphone|ipad|ipod|windows phone/i.test(ua.toLowerCase());
    setIsMobileDevice(isMobile);

    const currentUrl = window.location.href;
    QRCode.toDataURL(currentUrl, {
      width: 240,
      margin: 1,
      color: {
        dark: '#090d16',
        light: '#ffffff'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));

    const viewer = modelViewerRef.current;
    if (viewer) {
      // Set initial smooth orbit
      viewer.cameraOrbit = defaultOrbit;
      viewer.cameraTarget = 'auto auto auto';

      const handleCameraChange = () => {
        if (viewer.cameraOrbit) {
          setCameraOrbitText(viewer.cameraOrbit);
        }
      };

      const handleError = (e) => {
        console.warn('Model loading issue:', e);
        setLoadingError(true);
      };

      const handleLoad = () => {
        setLoadingError(false);
        viewer.cameraOrbit = defaultOrbit;
        viewer.cameraTarget = 'auto auto auto';
      };

      viewer.addEventListener('camera-change', handleCameraChange);
      viewer.addEventListener('error', handleError);
      viewer.addEventListener('load', handleLoad);

      return () => {
        viewer.removeEventListener('camera-change', handleCameraChange);
        viewer.removeEventListener('error', handleError);
        viewer.removeEventListener('load', handleLoad);
      };
    }
  }, [product, defaultOrbit]);

  const handleLaunchAR = () => {
    if (isMobileDevice && modelViewerRef.current) {
      try {
        modelViewerRef.current.activateAR();
      } catch (err) {
        console.error('AR trigger fallback:', err);
        setShowQrModal(true);
      }
    } else {
      setShowQrModal(true);
    }
  };

  // Preset Camera Angles
  const setCameraAngle = (mode) => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;
    setActiveViewMode(mode);

    if (mode === 'iso') {
      viewer.cameraOrbit = defaultOrbit;
    } else if (mode === 'front') {
      viewer.cameraOrbit = '0deg 75deg auto';
    } else if (mode === 'top') {
      viewer.cameraOrbit = '0deg 20deg auto';
    } else if (mode === 'side') {
      viewer.cameraOrbit = '90deg 75deg auto';
    }
    viewer.cameraTarget = 'auto auto auto';
  };

  const handleToggleAutoRotate = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.autoRotate = !autoRotate;
      setAutoRotate(!autoRotate);
    }
  };

  const handleToggleFullscreen = () => {
    const container = document.getElementById('model-viewer-container');
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(console.error);
    }
  };

  return (
    <div 
      id="model-viewer-container"
      className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] bg-zinc-950 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800 shadow-xl flex flex-col"
    >
      {/* Top Engineering HUD Telemetry Bar */}
      <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 z-20 flex justify-between items-center gap-1.5 pointer-events-none">
        {/* Device Telemetry Tag */}
        <div className="pointer-events-auto bg-zinc-900/95 border border-zinc-800 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-white font-mono text-[10px] sm:text-[11px] flex items-center gap-1.5 sm:gap-2 shadow-sm shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-zinc-100">{product.code}</span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-zinc-400 font-sans hidden sm:inline truncate max-w-[160px]">{product.name}</span>
          <span className="text-zinc-600 hidden md:inline">|</span>
          <span className="text-cyan-400 font-semibold hidden md:inline">{product.dimensions}</span>
        </div>

        {/* Camera Preset Quick Viewers */}
        <div className="pointer-events-auto flex items-center space-x-0.5 sm:space-x-1 bg-zinc-900/95 border border-zinc-800 p-0.5 sm:p-1 rounded-lg font-mono text-[10px] sm:text-[11px] shrink-0">
          <button
            onClick={() => setCameraAngle('iso')}
            title="Sudut Isometrik 3D"
            className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded transition-colors ${
              activeViewMode === 'iso' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            ISO
          </button>
          <button
            onClick={() => setCameraAngle('front')}
            title="Tampak Depan"
            className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded transition-colors ${
              activeViewMode === 'front' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            FRONT
          </button>
          <button
            onClick={() => setCameraAngle('top')}
            title="Tampak Atas"
            className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded transition-colors ${
              activeViewMode === 'top' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            TOP
          </button>
          <button
            onClick={() => setCameraAngle('side')}
            title="Tampak Samping"
            className={`hidden sm:inline-block px-2 py-1 rounded transition-colors ${
              activeViewMode === 'side' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            SIDE
          </button>
          
          <div className="w-px h-3 sm:h-4 bg-zinc-800 mx-0.5"></div>

          {/* Turntable Auto-Rotate Toggle */}
          <button
            onClick={handleToggleAutoRotate}
            title={autoRotate ? "Jeda Putaran Turntable" : "Mulai Putaran Turntable Halus"}
            className={`p-1 sm:p-1.5 rounded transition-colors ${
              autoRotate ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
            className="p-1 sm:p-1.5 rounded text-zinc-400 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3D Calibration Viewport Element */}
      <div className="relative flex-1 w-full h-full bg-tech-grid-dark">
        <model-viewer
          ref={modelViewerRef}
          src={product.modelUrl}
          ios-src={product.usdzUrl}
          alt={`Prototipe ${product.name}`}
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          camera-controls
          touch-action="pan-y"
          auto-rotate={autoRotate}
          auto-rotate-delay="3000"
          rotation-per-second="12deg"
          camera-orbit={defaultOrbit}
          camera-target="auto auto auto"
          min-camera-orbit="auto 15deg auto"
          max-camera-orbit="auto 85deg auto"
          min-field-of-view="20deg"
          max-field-of-view="55deg"
          field-of-view="35deg"
          interpolation-decay="150"
          interaction-prompt="none"
          shadow-intensity="1.2"
          shadow-softness="0.5"
          exposure="1.0"
          environment-image="neutral"
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Progress bar slot */}
          <div slot="progress-bar" className="absolute bottom-16 left-6 right-6 z-10">
            <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
              <div className="bg-cyan-400 h-1 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Native AR Launch Button Slot for Model Viewer (Android Scene Viewer & iOS Quick Look) */}
          <button
            slot="ar-button"
            id="ar-button"
            className="pointer-events-auto absolute bottom-3 left-3 right-14 sm:left-auto sm:right-3 z-30 px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-mono text-xs font-bold rounded-lg shadow-xl flex items-center justify-center gap-1.5 sm:gap-2 border border-blue-400/30 transition-all active:scale-95 cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-200 animate-pulse shrink-0" />
            <span className="truncate">PROYEKSI MEJA (WEB AR)</span>
            <span className="bg-blue-900/80 text-cyan-300 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded border border-blue-400/20 shrink-0 font-mono">
              1:1
            </span>
          </button>

          {/* 4 Precision Hotspots positioned directly on physical components */}
          {product.hotspots.map((hotspot, idx) => (
            <button
              key={hotspot.id}
              className="hotspot"
              slot={hotspot.slot}
              data-position={hotspot.position}
              data-normal={hotspot.normal}
              onClick={() => onSelectHotspot(hotspot)}
              title={`${hotspot.title}: Klik untuk analisis komponen & bisnis`}
            >
              <span>{`0${idx + 1}`}</span>
              <div className="hotspot-annotation">
                {hotspot.title}
              </div>
            </button>
          ))}
        </model-viewer>

        {/* Fallback Viewport if asset is loading or missing */}
        {loadingError && (
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-950 text-zinc-300">
            <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3 text-cyan-400">
              <Layers className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-mono font-bold text-zinc-100 mb-1">
              BENCH VIEWPORT SIMULATION: {product.code}
            </h4>
            <p className="text-xs text-zinc-400 max-w-sm mb-4 font-mono">
              Enclosure: {product.dimensions} // {product.specs[0]}
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-sm w-full">
              {product.hotspots.map((hs, i) => (
                <button
                  key={hs.id}
                  onClick={() => onSelectHotspot(hs)}
                  className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left text-xs font-mono transition-colors"
                >
                  <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <span className="text-zinc-500">[{`0${i+1}`}]</span>
                    <span className="truncate">{hs.title}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate mt-0.5">
                    {hs.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Instrumentation Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-center pointer-events-none">
        {/* Navigation Prompt (hidden on small mobile screens to prevent clutter) */}
        <div className="hidden sm:flex pointer-events-auto bg-zinc-900/95 border border-zinc-800 px-3 py-1.5 rounded-lg text-[11px] font-mono text-zinc-400 items-center gap-2 shadow-sm">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Tahan klik/geser untuk orbit 360° • Scroll untuk zoom</span>
        </div>

        {/* QR & AR Multi-Platform Help Trigger Button (Compact icon on mobile, expanded pill on sm+) */}
        <button
          onClick={() => setShowQrModal(true)}
          title="Panduan Proyeksi Meja AR & Kode QR"
          className="pointer-events-auto ml-auto w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 bg-zinc-900/95 hover:bg-zinc-800 active:bg-zinc-700 border border-zinc-700 text-zinc-200 font-mono text-xs font-bold rounded-lg shadow-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <QrCode className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="hidden sm:inline">PANDUAN & QR AR</span>
        </button>
      </div>

      {/* Multi-Platform QR Code & Direct AR Modal (Android & iOS Equal Support) */}
      {showQrModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm pointer-events-auto"
          onClick={() => setShowQrModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full border border-zinc-300 shadow-2xl p-6 text-zinc-900 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                  WebXR Multi-Platform Protocol
                </span>
                <h3 className="text-base font-bold text-zinc-950 mt-0.5">
                  Proyeksi Meja Fisik Kelas
                </h3>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                  Bebas gunakan smartphone <strong>Android</strong> maupun <strong>iPhone</strong> tanpa instalasi file APK.
                </p>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Mobile Launchers for Both Platforms */}
            <div className="space-y-2 mb-4">
              <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wide">
                Aktivasi Langsung di Smartphone Anda:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Android Trigger Card */}
                <a
                  href={getAndroidSceneViewerIntent()}
                  className="p-3 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl flex flex-col justify-between transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Android (Chrome)
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300">
                      .GLB
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-950 group-hover:text-emerald-800">
                    Buka Google Scene Viewer
                  </span>
                  <span className="text-[10px] text-emerald-700 mt-1">
                    Samsung, Xiaomi, Oppo, Vivo, Poco, Pixel, dll.
                  </span>
                </a>

                {/* iPhone / iOS Trigger Card */}
                <a
                  rel="ar"
                  href={product.usdzUrl}
                  className="p-3 bg-blue-50 hover:bg-blue-100/80 border border-blue-200 rounded-xl flex flex-col justify-between transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-blue-800 uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Apple iOS (Safari)
                    </span>
                    <span className="text-[10px] font-mono text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded border border-blue-300">
                      .USDZ
                    </span>
                  </div>
                  <span className="text-xs font-bold text-blue-950 group-hover:text-blue-800">
                    Buka Apple Quick Look
                  </span>
                  <span className="text-[10px] text-blue-700 mt-1">
                    iPhone 8 s.d. 16 Pro, iPad (ARKit)
                  </span>
                </a>
              </div>
            </div>

            {/* QR Container for Desktop / Laptop Screens */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 flex flex-col items-center justify-center mb-3">
              <span className="text-[10px] font-mono font-bold text-zinc-600 mb-2 uppercase">
                Pindai dengan Kamera Smartphone Anda:
              </span>
              {qrDataUrl ? (
                <img 
                  src={qrDataUrl} 
                  alt="QR Code Web AR" 
                  className="w-40 h-40 rounded bg-white p-2 border border-zinc-200 shadow-sm"
                />
              ) : (
                <div className="w-40 h-40 flex items-center justify-center text-xs text-zinc-400">
                  Memuat QR Code...
                </div>
              )}
              <span className="text-[10px] font-mono text-zinc-500 mt-2 text-center">
                Membuka prototipe interaktif di browser ponsel Anda
              </span>
            </div>

            {/* Universal 3 Step Protocol for Classroom Testing */}
            <div className="space-y-1.5 mb-4 text-[11px] text-zinc-600 font-sans bg-zinc-100/70 p-3 rounded-xl border border-zinc-200">
              <div className="text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                Langkah Uji Coba di Meja Fisik Kelas:
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-zinc-200 font-mono font-bold text-[10px] flex items-center justify-center text-zinc-800 shrink-0 mt-0.5">1</span>
                <span>Buka di browser bawaan ponsel (<strong>Google Chrome</strong> di Android atau <strong>Safari</strong> di iPhone).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-zinc-200 font-mono font-bold text-[10px] flex items-center justify-center text-zinc-800 shrink-0 mt-0.5">2</span>
                <span>Sentuh tombol biru <strong>"PROYEKSI MEJA (WEB AR)"</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-zinc-200 font-mono font-bold text-[10px] flex items-center justify-center text-zinc-800 shrink-0 mt-0.5">3</span>
                <span>Arahkan kamera ke meja kelas bertekstur (kayu/kertas) dan gerakkan perlahan ke kiri/kanan untuk meletakkan alat skala 1:1.</span>
              </div>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors font-mono"
            >
              TUTUP JENDELA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
