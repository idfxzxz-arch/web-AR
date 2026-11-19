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
  const [qrSmartDataUrl, setQrSmartDataUrl] = useState('');
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [mobileOS, setMobileOS] = useState('desktop'); // 'ios' | 'android' | 'desktop'
  const [loadingError, setLoadingError] = useState(false);
  const [cameraOrbitText, setCameraOrbitText] = useState('30° 60° auto');
  const [activeViewMode, setActiveViewMode] = useState('iso');

  const defaultOrbit = product?.cameraDefaults?.orbit || '30deg 60deg auto';

  const getAbsoluteUsdzUrl = () => {
    if (typeof window === 'undefined') return product.usdzUrl;
    const host = window.location.hostname;
    if (host === 'idxcodes.my.id' || host === 'www.idxcodes.my.id') {
      return `https://www.idxcodes.my.id${product.usdzUrl}`;
    }
    return new URL(product.usdzUrl, window.location.href).href;
  };

  const getAndroidSceneViewerIntent = () => {
    if (typeof window === 'undefined') return '#';
    const host = window.location.hostname;
    const baseUrl = (host === 'idxcodes.my.id' || host === 'www.idxcodes.my.id')
      ? 'https://www.idxcodes.my.id'
      : window.location.origin;
    const glbAbsoluteUrl = `${baseUrl}${product.modelUrl}`;
    const fallbackUrl = encodeURIComponent(`${baseUrl}/?page=ar-gallery&product=${product.id}`);
    return `intent://arvr.google.com/scene-viewer/1.2?file=${encodeURIComponent(glbAbsoluteUrl)}&mode=ar_preferred&title=${encodeURIComponent(product.name)}#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${fallbackUrl};end;`;
  };

  const handleAndroidARLaunch = () => {
    if (modelViewerRef.current && typeof modelViewerRef.current.activateAR === 'function') {
      try {
        modelViewerRef.current.activateAR();
        setShowQrModal(false);
        return;
      } catch (err) {
        console.warn('activateAR fallback to intent:', err);
      }
    }
    // Fallback if activateAR not available
    window.location.href = getAndroidSceneViewerIntent();
  };

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/iphone|ipad|ipod/i.test(ua)) {
      setMobileOS('ios');
      setIsMobileDevice(true);
    } else if (/android/i.test(ua)) {
      setMobileOS('android');
      setIsMobileDevice(true);
    } else {
      setMobileOS('desktop');
      setIsMobileDevice(false);
    }

    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      const canonicalOrigin = (host === 'idxcodes.my.id' || host === 'www.idxcodes.my.id')
        ? 'https://www.idxcodes.my.id'
        : window.location.origin;

      // Instant Smart Auto-Launch AR URL (loads ar.html in 50ms, auto-launches Apple Quick Look or Scene Viewer)
      const smartLaunchUrl = `${canonicalOrigin}/ar.html?id=${product.id}`;
      QRCode.toDataURL(smartLaunchUrl, {
        width: 280,
        margin: 1,
        color: { dark: '#090d16', light: '#ffffff' }
      })
        .then((url) => setQrSmartDataUrl(url))
        .catch((err) => console.error('Error generating smart QR code:', err));
    }

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
      className="relative w-full h-[340px] sm:h-[440px] md:h-[500px] bg-zinc-950 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800 shadow-xl flex flex-col"
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
          ios-src={getAbsoluteUsdzUrl()}
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

          {/* Native AR Launch Button Slot for Model Viewer (Dual iOS rel=ar & Android WebXR Engine) */}
          {mobileOS === 'ios' ? (
            <a
              slot="ar-button"
              id="ar-button"
              rel="ar"
              href={getAbsoluteUsdzUrl()}
              className="pointer-events-auto absolute bottom-3 left-3 right-14 sm:left-auto sm:right-48 z-30 h-10 px-3 sm:px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-mono text-xs font-bold rounded-lg shadow-xl flex items-center justify-center gap-1.5 sm:gap-2 border border-blue-400/30 transition-all active:scale-95 cursor-pointer no-underline"
            >
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E" 
                alt="Apple AR Quick Look" 
                className="w-0 h-0 absolute opacity-0 pointer-events-none" 
              />
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-200 animate-pulse shrink-0" />
              <span className="truncate">PROYEKSI MEJA (WEB AR)</span>
              <span className="bg-blue-900/80 text-cyan-300 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded border border-blue-400/20 shrink-0 font-mono">
                1:1
              </span>
            </a>
          ) : (
            <button
              slot="ar-button"
              id="ar-button"
              className="pointer-events-auto absolute bottom-3 left-3 right-14 sm:left-auto sm:right-48 z-30 h-10 px-3 sm:px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-mono text-xs font-bold rounded-lg shadow-xl flex items-center justify-center gap-1.5 sm:gap-2 border border-blue-400/30 transition-all active:scale-95 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-200 animate-pulse shrink-0" />
              <span className="truncate">PROYEKSI MEJA (WEB AR)</span>
              <span className="bg-blue-900/80 text-cyan-300 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded border border-blue-400/20 shrink-0 font-mono">
                1:1
              </span>
            </button>
          )}

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
          className="pointer-events-auto ml-auto w-10 h-10 sm:w-auto sm:h-10 sm:px-3 bg-zinc-900/95 hover:bg-zinc-800 active:bg-zinc-700 border border-zinc-700 text-zinc-200 font-mono text-xs font-bold rounded-lg shadow-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
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
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                  WebXR Universal Auto-Detect
                </span>
                <h3 className="text-base font-bold text-zinc-950 mt-0.5">
                  Proyeksi Meja AR: {product.code}
                </h3>
                <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
                  1 Barcode pintar untuk <strong>Android</strong> dan <strong>iPhone</strong> (Skala 1:1).
                </p>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* If opening on mobile: Automatically show the SINGLE right button for their device */}
            {isMobileDevice && (
              <div className="space-y-2 mb-3">
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 font-bold uppercase text-[10px]">Perangkat Anda:</span>
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      mobileOS === 'ios' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {mobileOS === 'ios' ? '🍏 Apple iOS (Quick Look)' : '🤖 Android (Scene Viewer)'}
                    </span>
                  </div>

                  {mobileOS === 'ios' ? (
                    <a
                      rel="ar"
                      href={getAbsoluteUsdzUrl()}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-mono rounded-xl shadow-lg flex items-center justify-center gap-2 font-bold text-xs transition-all active:scale-95 no-underline cursor-pointer"
                    >
                      <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E" 
                        alt="Apple AR Quick Look" 
                        className="w-0 h-0 absolute opacity-0 pointer-events-none" 
                      />
                      <Smartphone className="w-4 h-4 text-cyan-200 animate-pulse shrink-0" />
                      <span>BUKA KAMERA AR (APPLE QUICK LOOK)</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAndroidARLaunch}
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-mono rounded-xl shadow-lg flex items-center justify-center gap-2 font-bold text-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4 text-emerald-200 animate-pulse" />
                      <span>BUKA KAMERA AR (GOOGLE SCENE VIEWER)</span>
                    </button>
                  )}

                  <p className="text-[10px] text-zinc-500 text-center font-sans">
                    Sistem otomatis memilih protokol terbaik tanpa perlu pilih manual.
                  </p>
                </div>
              </div>
            )}

            {/* Universal QR Code (1 Barcode for both Android and iPhone) */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col items-center justify-center mb-3">
              <span className="text-[10px] font-mono font-bold text-zinc-700 mb-2.5 uppercase text-center flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-blue-600" />
                <span>1 Barcode Instan AR (Android & iPhone)</span>
              </span>

              {/* QR Image Display */}
              {qrSmartDataUrl ? (
                <img 
                  src={qrSmartDataUrl} 
                  alt={`QR Code Instan AR ${product.code}`} 
                  className="w-48 h-48 rounded-lg bg-white p-2 border border-zinc-300 shadow-sm"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-xs text-zinc-400 font-mono">
                  Membuat Barcode...
                </div>
              )}

              <div className="mt-2.5 text-center space-y-0.5">
                <span className="text-xs font-bold font-sans text-zinc-900 block">
                  Pindai dari PC dengan Kamera HP
                </span>
                <span className="text-[10px] font-mono text-zinc-500 block">
                  Otomatis meluncurkan Apple AR (iPhone) & Google AR (Android)
                </span>
              </div>
            </div>

            {/* Quick 3 Step Guide */}
            <div className="space-y-1.5 mb-3 text-[11px] text-zinc-600 font-sans bg-zinc-100/70 p-3 rounded-xl border border-zinc-200">
              <div className="text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                Langkah Cepat di Meja Kelas:
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-zinc-200 font-mono font-bold text-[10px] flex items-center justify-center text-zinc-800 shrink-0 mt-0.5">1</span>
                <span>Pindai barcode di atas menggunakan kamera bawaan ponsel (bebas Android maupun iPhone).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-zinc-200 font-mono font-bold text-[10px] flex items-center justify-center text-zinc-800 shrink-0 mt-0.5">2</span>
                <span>Ketuk notifikasi tautan yang muncul untuk membuka prototipe 3D skala 1:1.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-zinc-200 font-mono font-bold text-[10px] flex items-center justify-center text-zinc-800 shrink-0 mt-0.5">3</span>
                <span>Sentuh tombol <strong>"PROYEKSI MEJA (WEB AR)"</strong> lalu arahkan kamera ke meja kelas Anda.</span>
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
