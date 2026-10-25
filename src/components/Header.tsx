import React from 'react';
import { Radio, Code, Info, Github } from 'lucide-react';

interface HeaderProps {
  lastUpdatedText: string;
  isAutoRefreshActive: boolean;
  onOpenCodeModal: () => void;
  onOpenInfoModal: () => void;
  onOpenGithubModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lastUpdatedText,
  isAutoRefreshActive,
  onOpenCodeModal,
  onOpenInfoModal,
  onOpenGithubModal,
}) => {
  return (
    <header className="text-center mb-6 pb-6 border-b border-[#334155] relative">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        {/* Live indicator badge */}
        <div className="inline-flex items-center gap-2 bg-[#1e293b] border border-[#334155] px-3 py-1 rounded-full text-xs font-medium text-slate-300">
          <span className="relative flex h-2.5 w-2.5">
            {isAutoRefreshActive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isAutoRefreshActive ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            ></span>
          </span>
          <span className="font-semibold tracking-wide text-slate-200">
            {isAutoRefreshActive ? 'MONITORAMENTO ATIVO' : 'PAUSADO'}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Exterior 2º Turno</span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          <button
            onClick={onOpenGithubModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold border border-emerald-700/60 transition-all cursor-pointer"
            title="Como publicar e rodar direto no servidor do GitHub Pages"
          >
            <Github className="w-3.5 h-3.5 text-emerald-400" />
            <span>Publicar no GitHub</span>
          </button>

          <button
            onClick={onOpenInfoModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-slate-300 text-xs font-medium transition-colors border border-[#334155] cursor-pointer"
            title="Informações sobre a apuração no exterior"
          >
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>Como funciona</span>
          </button>

          <button
            onClick={onOpenCodeModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-all hover:border-blue-400 cursor-pointer"
            title="Ver e copiar código HTML puro ajustado com script de auto-refresh"
          >
            <Code className="w-3.5 h-3.5 text-blue-400" />
            <span>Código HTML</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-1.5">
        <Radio className="w-6 h-6 text-blue-400 animate-pulse" />
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
          Apuração Exterior – Presidente 2026
        </h1>
      </div>

      <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
        2º Turno • Apenas seções eleitorais do exterior com Boletim de Urna (BU) já divulgado
      </p>

      <div className="inline-flex items-center gap-2 bg-[#1e3a5f] text-[#93c5fd] px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium mt-3 border border-blue-500/30 shadow-sm">
        <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
        <span>Dados parciais até {lastUpdatedText} (horário de Brasília)</span>
      </div>
    </header>
  );
};
