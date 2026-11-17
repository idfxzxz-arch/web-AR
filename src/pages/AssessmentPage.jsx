import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  Printer, 
  TrendingUp, 
  AlertCircle, 
  Info,
  Sliders,
  Check
} from 'lucide-react';
import RadarChartComponent from '../components/RadarChartComponent';
import { 
  dimensionsData, 
  likertScaleOptions, 
  calculateDimensionScores 
} from '../data/selfAssessmentData';
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';

export default function AssessmentPage({ setActivePage }) {
  const [answers, setAnswers] = useState(() => {
    const saved = getItem(STORAGE_KEYS.ASSESSMENT_RADAR, null);
    return saved?.answers || {};
  });
  const [calculatedResult, setCalculatedResult] = useState(() => {
    const saved = getItem(STORAGE_KEYS.ASSESSMENT_RADAR, null);
    return saved?.calculatedResult || null;
  });
  const [studentName, setStudentName] = useState(() => {
    const saved = getItem(STORAGE_KEYS.ASSESSMENT_RADAR, null);
    return saved?.studentName || '';
  });
  const [studentNim, setStudentNim] = useState(() => {
    const saved = getItem(STORAGE_KEYS.ASSESSMENT_RADAR, null);
    return saved?.studentNim || '';
  });

  const totalQuestions = 15;
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === totalQuestions;

  const handleSelectOption = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCalculate = () => {
    const results = calculateDimensionScores(answers);
    const savedPayload = {
      answers,
      calculatedResult: results,
      studentName,
      studentNim,
      evaluatedAt: new Date().toISOString()
    };
    setCalculatedResult(results);
    setItem(STORAGE_KEYS.ASSESSMENT_RADAR, savedPayload);

    const resultsElement = document.getElementById('radar-results-section');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCalculatedResult(null);
    setItem(STORAGE_KEYS.ASSESSMENT_RADAR, null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 text-white border border-zinc-800 no-print">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>INSTRUMEN EVALUASI DIRI // MASHUDI ET AL. (2025)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Profil Kompetensi Technopreneurship 5 Dimensi
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Petakan kesiapan kewirausahaan teknologi Anda melalui visualisasi Pentagon Radar Chart setelah mempelajari media KREAR & studi kasus PT WD Group Solo.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            {calculatedResult && (
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold rounded-lg border border-zinc-700 transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>CETAK LAPORAN</span>
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-zinc-900 hover:bg-rose-950 text-rose-300 font-semibold rounded-lg border border-zinc-800 hover:border-rose-800 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Identity Form */}
      <div className="bg-white rounded-xl p-5 border border-zinc-200 shadow-sm space-y-3 font-mono text-xs">
        <span className="font-bold text-zinc-800 uppercase tracking-wider block">
          IDENTITAS MAHASISWA EVALUAN:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1">
              NAMA MAHASISWA
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Nama Mahasiswa Evaluator"
              className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-zinc-500 mb-1">
              NIM & PROGRAM STUDI
            </label>
            <input
              type="text"
              value={studentNim}
              onChange={(e) => setStudentNim(e.target.value)}
              placeholder="Contoh: L200210001 (S1 Teknik Komputer UMUKA)"
              className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Likert Scale Legend */}
      <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200 flex flex-wrap justify-between items-center gap-3 text-xs font-mono text-zinc-600">
        <div className="flex items-center gap-1.5 font-bold text-zinc-800">
          <Info className="w-4 h-4 text-blue-600" />
          <span>SKALA LIKERT 1–5:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          {likertScaleOptions.map((opt) => (
            <span key={opt.value} className="flex items-center gap-1">
              <strong className="w-4 h-4 rounded bg-zinc-200 text-zinc-800 flex items-center justify-center text-[10px] font-bold">
                {opt.value}
              </strong>
              <span>{opt.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 5 Dimensions Questions */}
      <div className="space-y-4">
        {dimensionsData.map((dim) => (
          <div 
            key={dim.id}
            className="bg-white rounded-xl p-5 sm:p-6 border border-zinc-200 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-zinc-100 font-mono">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-zinc-950 text-white text-xs font-bold">
                    {dim.id}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 font-sans">
                    {dim.name} ({dim.shortName})
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 font-sans">
                  {dim.description}
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {dim.questions.map((q) => {
                const currentAnswer = answers[q.id];
                return (
                  <div 
                    key={q.id}
                    className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-2.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-700 font-mono text-[11px] font-bold mt-0.5">
                        {q.code}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-zinc-800 leading-relaxed flex-1">
                        {q.statement}
                      </p>
                    </div>

                    {/* 1-5 Radios */}
                    <div className="grid grid-cols-5 gap-1.5 pt-1 font-mono">
                      {likertScaleOptions.map((opt) => {
                        const isSelected = currentAnswer === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSelectOption(q.id, opt.value)}
                            className={`p-2 rounded border text-center transition-colors flex flex-col items-center justify-center gap-0.5 ${
                              isSelected
                                ? 'bg-zinc-950 text-white border-zinc-950 font-bold'
                                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                            }`}
                          >
                            <span className="text-xs font-bold">
                              {opt.value}
                            </span>
                            <span className="text-[9px] hidden sm:block truncate text-zinc-400">
                              {opt.shortLabel}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Calculation Trigger */}
      <div className="bg-zinc-100 rounded-xl p-5 border border-zinc-200 text-center space-y-3 font-mono">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-xs">
          <div className="text-zinc-600">
            Terjawab: <strong>{answeredCount} dari {totalQuestions}</strong> butir instrumen.
          </div>
          <button
            onClick={handleCalculate}
            disabled={!isAllAnswered}
            className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none shadow-sm"
          >
            <span>HITUNG PROFIL & TAMPILKAN RADAR CHART</span>
          </button>
        </div>
        {!isAllAnswered && (
          <p className="text-[11px] text-amber-700 font-sans">
            * Harap isi seluruh 15 butir pernyataan di atas untuk mengkalkulasi Pentagon Radar Chart.
          </p>
        )}
      </div>

      {/* Pentagon Radar Chart & Detailed Profile Results */}
      {calculatedResult && (
        <div id="radar-results-section" className="space-y-6 pt-2">
          {/* Print Only Header */}
          <div className="hidden print-only border-b pb-4 font-mono">
            <h2 className="text-xl font-bold uppercase">LAPORAN PROFIL TECHNOPRENEURSHIP 5 DIMENSI</h2>
            <p className="text-xs text-zinc-600 mt-1 font-sans">
              Evaluator: {studentName || '-'} | NIM: {studentNim || '-'} | Tanggal: {new Date().toLocaleDateString('id-ID')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Pentagon Radar Chart */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                  VISUALISASI SPASIAL RADAR PENTAGON (0% - 100%)
                </span>
                <h3 className="text-lg font-bold text-zinc-950 mt-0.5">
                  Pentagon Radar Chart Kompetensi
                </h3>
                <p className="text-xs font-mono text-zinc-500">
                  Formula: Sd = (Skor Riil / 15) × 100% (Mashudi et al., 2025).
                </p>
              </div>

              <RadarChartComponent dimensionResults={calculatedResult.dimensionResults} />

              <div className="pt-3 border-t border-zinc-100 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500">TOTAL CAPAIAN:</span>
                <strong className="text-zinc-950 font-bold">
                  {calculatedResult.overallPercentage}% (Total {calculatedResult.totalRaw} / 75)
                </strong>
              </div>
            </div>

            {/* Right: Dimension Scores Breakdown Table */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-zinc-950 font-mono">
                RINCIAN CAPAIAN PER DIMENSI:
              </h3>

              <div className="space-y-2.5">
                {calculatedResult.dimensionResults.map((dim) => (
                  <div 
                    key={dim.id}
                    className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-zinc-950 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                          {dim.id}
                        </span>
                        <h4 className="text-xs font-bold text-zinc-900">
                          {dim.name}
                        </h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${dim.categoryBadge}`}>
                        {dim.percentage}% — {dim.category}
                      </span>
                    </div>

                    <div className="w-full bg-zinc-200 rounded-full h-1 overflow-hidden">
                      <div 
                        className="bg-zinc-950 h-1 rounded-full"
                        style={{ width: `${dim.percentage}%` }}
                      ></div>
                    </div>

                    <p className="text-[11px] text-zinc-600 leading-relaxed italic bg-white p-2.5 rounded-lg border border-zinc-100 font-sans">
                      "{dim.recommendation}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center pt-2 no-print font-mono text-xs">
            <button
              onClick={() => {
                setActivePage('bmc');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              ← KEMBALI KE BMC WORKSPACE
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>CETAK HASIL LAPORAN (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
