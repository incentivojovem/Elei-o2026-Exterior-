import React from 'react';
import { Clock, CheckCircle2, Hourglass, Lock, AlertCircle } from 'lucide-react';

export const TimezoneTimeline: React.FC = () => {
  return (
    <section className="bg-[#1e293b] rounded-xl p-4 sm:p-5 mb-6 border border-[#334155] shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#334155]">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm sm:text-base font-bold text-slate-100">
            Cronograma dos BUs por Fuso Horário no Exterior
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 bg-[#0f172a] px-2.5 py-1 rounded-full border border-[#334155]">
          Por que a compilação atual vai até 10h30?
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        Os Boletins de Urna (BUs) físicos só são impressos e afixados na porta dos consulados no momento em que a votação local termina. Por causa da rotação da Terra e dos fusos horários, os dados chegam em etapas ao longo do dia:
      </p>

      {/* Grid de Etapas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        
        {/* Bloco 1: Ásia e Oceania */}
        <div className="bg-[#0f172a] p-3 rounded-lg border border-emerald-800/50 relative">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-100">Ásia & Oceania</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
              <CheckCircle2 className="w-3 h-3" /> 10h30 (Concluído)
            </span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Japão, Austrália, Nova Zelândia, Coreia do Sul, China, etc. votaram de madrugada (horário de Brasília). <strong>Todos os BUs já foram divulgados e somam os 47.499 votos atuais.</strong>
          </p>
        </div>

        {/* Bloco 2: Oriente Médio e África */}
        <div className="bg-[#0f172a] p-3 rounded-lg border border-blue-800/40 relative">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-100">Oriente Médio</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded border border-blue-800">
              ~10h30 (Apurado)
            </span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Emirados Árabes Unidos e seções próximas encerraram e foram compiladas no boletim das 10h30.
          </p>
        </div>

        {/* Bloco 3: Europa */}
        <div className="bg-[#0f172a] p-3 rounded-lg border border-amber-800/40 relative">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-100">Europa</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">
              <Hourglass className="w-3 h-3 animate-spin" /> Entre 12h e 14h
            </span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Portugal (Lisboa/Porto), Reino Unido (Londres), França, Itália, Alemanha e Espanha. <strong>Próxima grande leva de BUs a ser afixada.</strong>
          </p>
        </div>

        {/* Bloco 4: Américas */}
        <div className="bg-[#0f172a] p-3 rounded-lg border border-slate-700/60 relative">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-100">Américas & TSE</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
              <Lock className="w-3 h-3" /> A partir das 17h
            </span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            EUA (Miami, Boston, NY), Canadá e América do Sul. Totalização oficial pelo sistema do TSE é liberada pontualmente às 17h de Brasília.
          </p>
        </div>

      </div>

      <div className="mt-3 pt-2.5 border-t border-[#334155]/60 flex items-center gap-2 text-slate-400 text-[11px]">
        <AlertCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span>
          O auto-refresh do site verifica periodicamente o arquivo <code className="text-blue-300 font-mono">dados-apuracao.json</code>. Assim que os BUs da Europa forem digitados ou o TSE liberar novos dados, o painel atualizará instantaneamente.
        </span>
      </div>
    </section>
  );
};
