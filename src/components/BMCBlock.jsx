import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function BMCBlock({
  id,
  title,
  subTitle,
  icon: Icon,
  questionPrompt,
  examples,
  value,
  onChange,
  colorScheme = "blue",
  minHeight = "min-h-[160px]"
}) {
  const schemeMap = {
    blue: "border-zinc-200 focus-within:border-blue-600 bg-white",
    purple: "border-zinc-200 focus-within:border-purple-600 bg-white",
    emerald: "border-zinc-200 focus-within:border-emerald-600 bg-white",
    amber: "border-zinc-200 focus-within:border-amber-600 bg-white",
    rose: "border-zinc-200 focus-within:border-rose-600 bg-white"
  };

  const schemeBorder = schemeMap[colorScheme] || schemeMap.blue;

  return (
    <div className={`rounded-xl border ${schemeBorder} shadow-sm overflow-hidden flex flex-col transition-all duration-150`}>
      {/* Header */}
      <div className="px-3.5 py-2.5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="w-4 h-4 text-zinc-700" />}
          <div>
            <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-wider font-mono">
              {title}
            </h4>
            <span className="text-[10px] text-zinc-500 block">
              {subTitle}
            </span>
          </div>
        </div>
        <div className="group relative">
          <button 
            type="button" 
            className="p-1 text-zinc-400 hover:text-zinc-700 focus:outline-none"
            aria-label="Panduan pengisian"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
          <div className="hidden group-hover:block absolute right-0 z-30 w-64 p-3 mt-1 bg-zinc-950 text-zinc-100 text-[11px] rounded-lg shadow-2xl leading-relaxed border border-zinc-800">
            <p className="font-mono font-bold text-cyan-400 mb-1">Pertanyaan Pemandu:</p>
            <p className="mb-2 text-zinc-300">{questionPrompt}</p>
            {examples && (
              <p className="text-zinc-400 text-[10px] italic border-t border-zinc-800 pt-1.5">
                Studi Kasus WD Group: {examples}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Guide Prompt */}
      <div className="px-3.5 pt-2 text-[11px] text-zinc-500 leading-tight">
        {questionPrompt}
      </div>

      {/* Textarea */}
      <div className="p-3.5 flex-1 flex flex-col">
        <textarea
          id={`bmc-${id}`}
          value={value || ''}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder={`Tuliskan rincian ${title.toLowerCase()}...`}
          className={`w-full ${minHeight} resize-none bg-zinc-50/60 hover:bg-zinc-50 focus:bg-white text-xs text-zinc-900 placeholder-zinc-400 p-2.5 rounded-lg border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors leading-relaxed font-sans`}
        />
        <div className="mt-1.5 flex justify-between items-center text-[10px] font-mono text-zinc-400 px-0.5">
          <span>{value ? `${value.length} karakter` : 'Belum diisi'}</span>
          <span className="text-emerald-600 font-semibold">Tersimpan otomatis</span>
        </div>
      </div>
    </div>
  );
}
