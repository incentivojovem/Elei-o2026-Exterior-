import React from 'react';
import { ShieldAlert, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-10 pt-6 border-t border-[#334155] text-center text-slate-400 text-xs leading-relaxed max-w-3xl mx-auto space-y-3">
      <div className="flex items-center justify-center gap-1.5 text-amber-400/90 font-medium text-xs">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Aviso Legal sobre a Apuração Extraoficial</span>
      </div>

      <p>
        <strong>Fonte:</strong> Boletins de Urna (BUs) impressos e afixados nos locais de votação pelas embaixadas e consulados brasileiros, publicados pelo Tribunal Superior Eleitoral (TSE) e compilados por veículos de imprensa (CNN Brasil, G1, UOL, Congresso em Foco e outros).
      </p>

      <p className="text-slate-500 text-[11px]">
        * Emirados Árabes Unidos incluído em algumas compilações da CNN.<br />
        ** Algumas reportagens agregam Hong Kong à China; outras separam.
      </p>

      <p className="bg-[#1e293b]/60 border border-[#334155] p-3 rounded-lg text-slate-300">
        Estes números <strong>não são a totalização oficial final</strong>. A totalização oficial do TSE só começa e é proclamada após o encerramento da votação em todo o território nacional (17h, horário de Brasília).
      </p>

      <div className="flex items-center justify-center gap-4 text-slate-400 pt-2">
        <a
          href="https://resultados.tse.jus.br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 hover:underline"
        >
          Portal Oficial TSE <ExternalLink className="w-3 h-3" />
        </a>
        <span>•</span>
        <span>Atualização automática via polling de dados</span>
      </div>
    </footer>
  );
};
