import React from 'react';
import {
  RotateCw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface AutoRefreshBarProps {
  intervalSeconds: number;
  setIntervalSeconds: (seconds: number) => void;
  countdown: number;
  isAutoActive: boolean;
  setIsAutoActive: (active: boolean) => void;
  isChecking: boolean;
  onManualRefresh: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  lastCheckedTime: string;
}

export const AutoRefreshBar: React.FC<AutoRefreshBarProps> = ({
  intervalSeconds,
  setIntervalSeconds,
  countdown,
  isAutoActive,
  setIsAutoActive,
  isChecking,
  onManualRefresh,
  soundEnabled,
  setSoundEnabled,
  lastCheckedTime,
}) => {
  const percentageLeft = Math.max(0, Math.min(100, (countdown / intervalSeconds) * 100));

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-3.5 sm:p-4 mb-6 shadow-lg shadow-black/20">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Left: Timer and Status */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
            {/* Circular progress */}
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                className="text-[#334155]"
                fill="transparent"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                className={`transition-all duration-1000 ${
                  isAutoActive ? 'text-blue-500' : 'text-slate-500'
                }`}
                fill="transparent"
                strokeDasharray={100}
                strokeDashoffset={100 - percentageLeft}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xs font-bold text-slate-200">
              {isAutoActive ? `${countdown}s` : '—'}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Atualização Automática:
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded font-semibold ${
                  isAutoActive
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}
              >
                {isAutoActive ? 'Ativa' : 'Pausada'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isChecking ? (
                <span className="text-blue-400 flex items-center gap-1">
                  <RotateCw className="w-3 h-3 animate-spin" /> Verificando se há novos dados no servidor...
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Última verificação: <strong className="text-slate-300 font-mono">{lastCheckedTime}</strong>
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex flex-wrap items-center gap-2 justify-end">
          {/* Interval Selector */}
          <div className="flex items-center gap-1.5 bg-[#0f172a] px-2.5 py-1.5 rounded-lg border border-[#334155] text-xs">
            <span className="text-slate-400 hidden sm:inline">Intervalo:</span>
            <select
              value={intervalSeconds}
              onChange={(e) => setIntervalSeconds(Number(e.target.value))}
              disabled={!isAutoActive}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value={10} className="bg-[#1e293b] text-slate-200">A cada 10 seg</option>
              <option value={15} className="bg-[#1e293b] text-slate-200">A cada 15 seg</option>
              <option value={30} className="bg-[#1e293b] text-slate-200">A cada 30 seg</option>
              <option value={60} className="bg-[#1e293b] text-slate-200">A cada 1 min</option>
              <option value={120} className="bg-[#1e293b] text-slate-200">A cada 2 min</option>
              <option value={300} className="bg-[#1e293b] text-slate-200">A cada 5 min</option>
            </select>
          </div>

          {/* Toggle Pause / Resume */}
          <button
            onClick={() => setIsAutoActive(!isAutoActive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              isAutoActive
                ? 'bg-[#0f172a] hover:bg-[#334155] text-slate-300 border-[#334155]'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
            }`}
            title={isAutoActive ? 'Pausar atualização automática' : 'Retomar atualização automática'}
          >
            {isAutoActive ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-white" />
                <span>Retomar</span>
              </>
            )}
          </button>

          {/* Manual Refresh button */}
          <button
            onClick={onManualRefresh}
            disabled={isChecking}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
            title="Verificar imediatamente se há novos boletins de urna disponíveis"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
            <span>Atualizar Agora</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-[#0f172a] text-blue-400 border-[#334155] hover:bg-[#334155]'
                : 'bg-[#0f172a] text-slate-500 border-[#334155] hover:text-slate-400'
            }`}
            title={soundEnabled ? 'Alerta sonoro ativado' : 'Alerta sonoro desativado'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
