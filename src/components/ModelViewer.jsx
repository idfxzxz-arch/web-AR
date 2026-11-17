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
      className="relative w-full h-[520px] sm:h-[580px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col"
    >
      {/* Top Engineering HUD Telemetry Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap justify-between items-center gap-2 pointer-events-none">
        {/* Device Telemetry Tag */}
        <div className="pointer-events-auto bg-zinc-900/95 border border-zinc-800 px-3 py-1.5 rounded-lg text-white font-mono text-[11px] flex items-center gap-2.5 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-bold text-zinc-100">{product.code}</span>
          </div>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 font-sans">{product.name}</span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-cyan-400 font-semibold hidden sm:inline">{product.dimensions}</span>
        </div>

        {/* Camera Preset Quick Viewers */}
        <div className="pointer-events-auto flex items-center space-x-1 bg-zinc-900/95 border border-zinc-800 p-1 rounded-lg font-mono text-[11px]">
          <button
            onClick={() => setCameraAngle('iso')}
            title="Sudut Isometrik 3D"
            className={`px-2 py-1 rounded transition-colors ${
              activeViewMode === 'iso' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            ISO 3D
          </button>
          <button
            onClick={() => setCameraAngle('front')}
            title="Tampak Depan"
            className={`px-2 py-1 rounded transition-colors ${
              activeViewMode === 'front' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            FRONT
          </button>
          <button
            onClick={() => setCameraAngle('top')}
            title="Tampak Atas"
            className={`px-2 py-1 rounded transition-colors ${
              activeViewMode === 'top' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            TOP
          </button>
          <button
            onClick={() => setCameraAngle('side')}
            title="Tampak Samping"
            className={`px-2 py-1 rounded transition-colors ${
              activeViewMode === 'side' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            SIDE
          </button>
          
          <div className="w-px h-4 bg-zinc-800 mx-0.5"></div>

          {/* Turntable Auto-Rotate Toggle */}
          <button
            onClick={handleToggleAutoRotate}
            title={autoRotate ? "Jeda Putaran Turntable" : "Mulai Putaran Turntable Halus"}
            className={`p-1.5 rounded transition-colors ${
              autoRotate ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
            className="p-1.5 rounded text-zinc-400 hover:text-white text-xs transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
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
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col sm:flex-row justify-between items-center gap-2 pointer-events-none">
        {/* Navigation Prompt */}
        <div className="pointer-events-auto bg-zinc-900/95 border border-zinc-800 px-3 py-1.5 rounded-lg text-[11px] font-mono text-zinc-400 flex items-center gap-2 shadow-sm">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span>Tahan klik/geser untuk orbit 360° • Scroll untuk zoom</span>
        </div>

        {/* Primary AR Trigger Button */}
        <button
          onClick={handleLaunchAR}
          className="pointer-events-auto w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-mono text-xs font-bold rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors"
        >
          <Smartphone className="w-4 h-4 text-cyan-200" />
          <span>PROYEKSI MEJA (WEB AR)</span>
          <span className="bg-blue-800 text-cyan-300 text-[10px] px-1.5 py-0.2 rounded font-mono">
            1:1
          </span>
        </button>
      </div>

      {/* QR Code Modal for Desktop Projections */}
      {showQrModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm pointer-events-auto"
          onClick={() => setShowQrModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-sm w-full border border-zinc-300 shadow-2xl p-6 text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                  WebXR Spatial Protocol
                </span>
                <h3 className="text-base font-bold text-zinc-950 mt-0.5">
                  Proyeksi Meja Fisik Kelas
                </h3>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed mb-3 font-sans">
              Pindai kode QR untuk membuka model <strong>{product.name}</strong> secara langsung di kamera ponsel:
            </p>

            {/* QR Container */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 flex flex-col items-center justify-center mb-3">
              {qrDataUrl ? (
                <img 
                  src={qrDataUrl} 
                  alt="QR Code Web AR" 
                  className="w-44 h-44 rounded bg-white p-2 border border-zinc-200"
                />
              ) : (
                <div className="w-44 h-44 flex items-center justify-center text-xs text-zinc-400">
                  Memuat QR Code...
                </div>
              )}
              <span className="text-[10px] font-mono text-zinc-500 mt-2">
                Chrome Android (Scene Viewer) / Safari iOS (Quick Look)
              </span>
            </div>

            {/* 3 Step Protocol */}
            <div className="space-y-1.5 mb-4 text-[11px] text-zinc-600 font-sans">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-zinc-100 font-mono font-bold text-[10px] flex items-center justify-center text-zinc-800">1</span>
                <span>Arahkan kamera smartphone ke kode QR di atas.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-zinc-100 font-mono font-bold text-[10px] flex items-center justify-center text-zinc-800">2</span>
                <span>Buka tautan web, lalu sentuh <strong>"Lihat di Ruang Anda"</strong>.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-zinc-100 font-mono font-bold text-[10px] flex items-center justify-center text-zinc-800">3</span>
                <span>Sorot permukaan meja kelas untuk menempatkan alat 1:1.</span>
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
