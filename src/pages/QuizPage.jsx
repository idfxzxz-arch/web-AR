import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  AlertCircle, 
  Check, 
  BookOpen
} from 'lucide-react';
import { quizQuestionsData } from '../data/quizQuestionsData';
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';

export default function QuizPage({ setActivePage }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedResult, setSavedResult] = useState(() => {
    return getItem(STORAGE_KEYS.QUIZ_RESULT, null);
  });

  const totalQuestions = quizQuestionsData.length;
  const currentQuestion = quizQuestionsData[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (questionId, optionKey) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quizQuestionsData.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= 70;

    const resultData = {
      score,
      correctCount,
      totalQuestions,
      passed,
      selectedAnswers,
      submittedAt: new Date().toISOString()
    };

    setIsSubmitted(true);
    setSavedResult(resultData);
    setItem(STORAGE_KEYS.QUIZ_RESULT, resultData);

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const score = savedResult?.score || 0;
  const correctCount = savedResult?.correctCount || 0;
  const passed = score >= 70;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      {/* Header */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 text-white border border-zinc-800">
        <div className="max-w-3xl space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>KUIS FORMATIF // 15 BUTIR SOAL TERPADU</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Uji Kompetensi Pemahaman Technopreneurship
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Evaluasi penguasaan materi Modul 1 sampai Modul 5 (Ambang batas kelulusan: 70% atau minimal 11 jawaban benar).
          </p>
        </div>
      </div>

      {/* Result Card when Submitted */}
      {isSubmitted && savedResult && (
        <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
          passed 
            ? 'bg-emerald-50/70 border-emerald-300' 
            : 'bg-amber-50/70 border-amber-300'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                passed ? 'bg-emerald-600' : 'bg-amber-600'
              }`}>
                {passed ? <Award className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              </div>
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                  passed ? 'text-emerald-800' : 'text-amber-800'
                }`}>
                  {passed ? 'KOMPETENSI TERPENUHI (LULUS)' : 'PERLU PENDALAMAN MATERI'}
                </span>
                <h3 className="text-xl font-black text-zinc-950 font-mono">
                  SKOR: {score} / 100
                </h3>
                <p className="text-xs text-zinc-600">
                  Benar <strong>{correctCount} dari {totalQuestions}</strong> butir soal ({score}%).
                </p>
              </div>
            </div>

            <button
              onClick={handleRetakeQuiz}
              className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ULANGI KUIS</span>
            </button>
          </div>

          <p className="text-xs text-zinc-600 leading-relaxed">
            Berikut adalah review lengkap jawaban Anda beserta pembahasan materi untuk setiap butir soal:
          </p>
        </div>
      )}

      {/* Active Quiz Layout (if not submitted) */}
      {!isSubmitted && (
        <div className="space-y-4">
          {/* Question Navigator */}
          <div className="bg-white rounded-xl p-4 border border-zinc-200 shadow-sm space-y-3 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-zinc-800">
                PERTANYAAN [{currentQuestionIndex + 1}/{totalQuestions}]
              </span>
              <span className="text-zinc-500">
                TERJAWAB: {answeredCount}/{totalQuestions} ({progressPercent}%)
              </span>
            </div>

            <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* 1-15 Numbers */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quizQuestionsData.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = idx === currentQuestionIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-7 h-7 rounded text-xs font-mono font-bold transition-colors flex items-center justify-center ${
                      isCurrent
                        ? 'bg-zinc-950 text-white ring-1 ring-zinc-950'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-5">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                {currentQuestion.moduleTitle}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-zinc-950 leading-snug pt-1">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedAnswers[currentQuestion.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(currentQuestion.id, opt.key)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-start gap-3 ${
                      isSelected
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                        : 'bg-zinc-50/70 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100 text-zinc-800'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? 'bg-zinc-800 text-cyan-300' : 'bg-white border border-zinc-300 text-zinc-700'
                    }`}>
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5 font-sans">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="pt-5 border-t border-zinc-100 flex justify-between items-center font-mono">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>SEBELUMNYA</span>
              </button>

              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>SELANJUTNYA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>SUBMIT JAWABAN KUIS</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review Section */}
      {isSubmitted && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1 font-mono text-xs">
            <h3 className="font-bold text-zinc-900 uppercase tracking-wider">
              PEMBAHASAN 15 BUTIR SOAL:
            </h3>
            <span className="text-zinc-500">
              Hijau: Tepat | Merah: Perlu Evaluasi
            </span>
          </div>

          <div className="space-y-3">
            {quizQuestionsData.map((q, idx) => {
              const studentAnswer = selectedAnswers[q.id];
              const isCorrect = studentAnswer === q.correctAnswer;
              return (
                <div 
                  key={q.id}
                  className={`bg-white rounded-xl p-5 border shadow-sm space-y-3 ${
                    isCorrect ? 'border-emerald-300' : 'border-rose-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500">
                        {q.moduleTitle}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                        {idx + 1}. {q.question}
                      </h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold flex items-center gap-1 flex-shrink-0 ${
                      isCorrect 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{isCorrect ? 'BENAR' : 'SALAH'}</span>
                    </span>
                  </div>

                  {/* Options */}
                  <div className="space-y-1.5 text-xs">
                    {q.options.map((opt) => {
                      const isStudentPick = studentAnswer === opt.key;
                      const isCorrectKey = q.correctAnswer === opt.key;

                      let rowStyle = 'bg-zinc-50 text-zinc-700 border-zinc-200';
                      if (isCorrectKey) {
                        rowStyle = 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold';
                      } else if (isStudentPick && !isCorrect) {
                        rowStyle = 'bg-rose-50 text-rose-950 border-rose-300';
                      }

                      return (
                        <div key={opt.key} className={`p-2 rounded-lg border flex items-center justify-between ${rowStyle}`}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[11px]">{opt.key}.</span>
                            <span>{opt.text}</span>
                          </div>
                          {isCorrectKey && (
                            <span className="text-[9px] font-mono bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                              KUNCI
                            </span>
                          )}
                          {isStudentPick && !isCorrect && (
                            <span className="text-[9px] font-mono bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded font-bold">
                              JAWABAN ANDA
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Pedagogical Explanation */}
                  <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg space-y-1 text-xs">
                    <span className="font-mono font-bold text-zinc-700 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      Pembahasan Pedagogis:
                    </span>
                    <p className="text-zinc-800 leading-relaxed font-sans">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-between items-center font-mono text-xs">
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
                setActivePage('assessment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span>LANJUT KE RADAR EVALUASI DIRI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
