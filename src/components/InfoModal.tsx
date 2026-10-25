import React from 'react';
import { X, Info, HelpCircle, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1e293b] border border-[#334155] rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#334155] bg-[#0f172a]">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-slate-100 text-base">
              Como funciona a apuração dos BUs no exterior
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              1. Por que os resultados do exterior saem antes?
            </h4>
            <p className="text-slate-400">
              Devido ao fuso horário, a votação em países da Oceania (Nova Zelândia, Austrália) e Ásia (Japão, Coreia do Sul) encerra muitas horas antes do início da votação no Brasil.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2. O que é o Boletim de Urna (BU)?
            </h4>
            <p className="text-slate-400">
              Ao término da votação em cada seção, a urna eletrônica imprime uma fita de papel contendo todos os votos registrados naquela urna (o BU), afixada publicamente na porta do local de votação para conferência de fiscais e eleitores.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-100 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              3. Por que estes números são extraoficiais?
            </h4>
            <p className="text-slate-400">
              O TSE só inicia a transmissão dos dados e a contagem oficial de votos a partir das 17h (horário de Brasília). As compilações anteriores a esse horário são feitas pela imprensa e observadores a partir das fotos dos boletins físicos afixados nos consulados.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#0f172a] border-t border-[#334155] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};
