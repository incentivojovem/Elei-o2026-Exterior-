import React from 'react';
import { ElectionTotals } from '../types';
import { Vote } from 'lucide-react';

interface TotalSummaryCardProps {
  totals: ElectionTotals;
  isChecking: boolean;
}

export const TotalSummaryCard: React.FC<TotalSummaryCardProps> = ({
  totals,
  isChecking,
}) => {
  const flavioVotesFmt = totals.flavioVotes.toLocaleString('pt-BR');
  const lulaVotesFmt = totals.lulaVotes.toLocaleString('pt-BR');
  const totalVotesFmt = totals.totalValid.toLocaleString('pt-BR');

  const flavioPctFmt = totals.flavioPct.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  const lulaPctFmt = totals.lulaPct.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  return (
    <section className="bg-[#1e293b] rounded-xl p-5 sm:p-6 mb-6 border border-[#334155] shadow-xl relative overflow-hidden transition-all duration-300">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Vote className="w-5 h-5 text-blue-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-200">
            Total dos BUs já divulgados (exterior)
          </h2>
        </div>

        {isChecking && (
          <span className="text-xs text-blue-400 animate-pulse font-medium">
            Verificando atualizações de BUs...
          </span>
        )}
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        
        {/* Flávio Bolsonaro Card */}
        <div className="bg-[#0f172a] rounded-xl p-5 text-center border-t-4 border-[#3b82f6] shadow-md hover:border-t-[5px] transition-all relative">
          <div className="text-lg font-bold text-slate-100 mb-0.5">
            Flávio Bolsonaro
          </div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            PL • 22
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#3b82f6] tracking-tight my-2">
            {flavioPctFmt}%
          </div>
          <div className="text-sm font-medium text-slate-400">
            <strong className="text-slate-200">{flavioVotesFmt}</strong> votos
          </div>
        </div>

        {/* Lula Card */}
        <div className="bg-[#0f172a] rounded-xl p-5 text-center border-t-4 border-[#ef4444] shadow-md hover:border-t-[5px] transition-all relative">
          <div className="text-lg font-bold text-slate-100 mb-0.5">
            Lula
          </div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            PT • 13
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#ef4444] tracking-tight my-2">
            {lulaPctFmt}%
          </div>
          <div className="text-sm font-medium text-slate-400">
            <strong className="text-slate-200">{lulaVotesFmt}</strong> votos
          </div>
        </div>
      </div>

      {/* Comparative Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-semibold mb-1.5 px-0.5 text-slate-300">
          <span className="text-[#3b82f6]">Flávio ({flavioPctFmt}%)</span>
          <span className="text-[#ef4444]">Lula ({lulaPctFmt}%)</span>
        </div>
        <div className="h-3 w-full bg-[#0f172a] rounded-full overflow-hidden flex p-0.5 border border-[#334155]">
          <div
            className="h-full bg-[#3b82f6] rounded-l-full transition-all duration-700 ease-out"
            style={{ width: `${totals.flavioPct}%` }}
          />
          <div
            className="h-full bg-[#ef4444] rounded-r-full transition-all duration-700 ease-out"
            style={{ width: `${totals.lulaPct}%` }}
          />
        </div>
      </div>

      {/* Valid Votes Total Banner */}
      <div className="pt-3 border-t border-[#334155]/60 text-center">
        <p className="text-slate-400 text-sm">
          Total de votos válidos apurados nos BUs: <strong className="text-slate-100 font-bold text-base">{totalVotesFmt}</strong>
        </p>
      </div>
    </section>
  );
};
