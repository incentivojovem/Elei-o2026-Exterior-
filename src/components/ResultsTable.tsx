import React, { useState, useMemo } from 'react';
import { CountryResult } from '../types';
import { Search, Download, Check, CheckCircle2 } from 'lucide-react';

interface ResultsTableProps {
  countries: CountryResult[];
}

type SortField = 'default' | 'totalVotes' | 'flavioPct' | 'lulaPct' | 'name';

export const ResultsTable: React.FC<ResultsTableProps> = ({ countries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('default');
  const [sortAsc, setSortAsc] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filtered and sorted list
  const filteredCountries = useMemo(() => {
    let result = [...countries];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.country.toLowerCase().includes(term) ||
          (c.note && c.note.toLowerCase().includes(term))
      );
    }

    if (sortField !== 'default') {
      result.sort((a, b) => {
        let valA = 0;
        let valB = 0;
        if (sortField === 'totalVotes') {
          valA = a.totalValid;
          valB = b.totalValid;
        } else if (sortField === 'flavioPct') {
          valA = a.flavioPct;
          valB = b.flavioPct;
        } else if (sortField === 'lulaPct') {
          valA = a.lulaPct;
          valB = b.lulaPct;
        } else if (sortField === 'name') {
          return sortAsc
            ? a.country.localeCompare(b.country)
            : b.country.localeCompare(a.country);
        }
        return sortAsc ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [countries, searchTerm, sortField, sortAsc]);

  const handleCopyTsv = () => {
    const header = 'País / Território\tStatus\tFlávio (PL)\t% Flávio\tLula (PT)\t% Lula\tTotal Válido\n';
    const rows = filteredCountries
      .map(
        (c) =>
          `${c.country}\t${c.isFullyApurado ? '100% Apurado' : 'Parcial'}\t${c.flavioVotes}\t${c.flavioPct.toFixed(2)}%\t${c.lulaVotes}\t${c.lulaPct.toFixed(2)}%\t${c.totalValid}`
      )
      .join('\n');
    navigator.clipboard.writeText(header + rows);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-8">
      {/* Table header & controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-100">
              Resultado por país / território
            </h2>
            {/* Legenda do ícone verde 100% apurado */}
            <span
              className="inline-flex items-center gap-1 bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 px-2 py-0.5 rounded-full text-xs font-semibold"
              title="Países com todas as seções eleitorais encerradas e BUs divulgados"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Ícone verde = 100% apurado</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {filteredCountries.length} {filteredCountries.length === 1 ? 'território apurado' : 'territórios com BUs divulgados'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search box */}
          <div className="relative flex-1 sm:w-52">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filtrar país..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#1e293b] border border-[#334155] rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Sort selector */}
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            className="bg-[#1e293b] border border-[#334155] text-slate-200 text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="default">Ordem Padrão (BU)</option>
            <option value="totalVotes">Mais votos válidos</option>
            <option value="flavioPct">Maior % Flávio</option>
            <option value="lulaPct">Maior % Lula</option>
            <option value="name">Nome do país</option>
          </select>

          {/* Copy Table */}
          <button
            onClick={handleCopyTsv}
            className="flex items-center gap-1.5 bg-[#1e293b] hover:bg-[#334155] text-slate-300 text-xs px-2.5 py-1.5 rounded-lg border border-[#334155] transition-colors cursor-pointer"
            title="Copiar dados da tabela para Excel/Planilha"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-[#334155] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#0f172a] border-b border-[#334155] text-slate-400 text-xs font-semibold">
                <th className="py-3 px-4">País / Território</th>
                <th className="py-3 px-4">Flávio (PL)</th>
                <th className="py-3 px-4">Lula (PT)</th>
                <th className="py-3 px-4">Total válido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155] text-sm">
              {filteredCountries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">
                    Nenhum país encontrado para o filtro aplicado.
                  </td>
                </tr>
              ) : (
                filteredCountries.map((c) => {
                  const isFlavioWinner = c.flavioVotes > c.lulaVotes;
                  const isLulaWinner = c.lulaVotes > c.flavioVotes;

                  return (
                    <tr
                      key={c.id}
                      className="transition-colors hover:bg-slate-800/40"
                    >
                      {/* Country name com ícone verde para 100% apurado */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {c.isFullyApurado && (
                            <span
                              className="inline-flex items-center justify-center text-emerald-400"
                              title="100% das seções apuradas neste país"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            </span>
                          )}
                          <span className="font-semibold text-slate-100">{c.country}</span>
                          {c.isFullyApurado && (
                            <span
                              className="hidden sm:inline-block text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40"
                              title="100% apurado"
                            >
                              100%
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Flávio */}
                      <td
                        className={`py-3 px-4 ${
                          isFlavioWinner
                            ? 'font-bold text-[#3b82f6]'
                            : 'text-slate-300'
                        }`}
                      >
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span>{c.flavioVotes.toLocaleString('pt-BR')}</span>
                          <span
                            className={`text-xs font-semibold ${
                              isFlavioWinner ? 'text-[#3b82f6]' : 'text-slate-400 font-normal'
                            }`}
                          >
                            ({c.flavioPct.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%)
                          </span>
                        </div>
                      </td>

                      {/* Lula */}
                      <td
                        className={`py-3 px-4 ${
                          isLulaWinner
                            ? 'font-bold text-[#ef4444]'
                            : 'text-slate-300'
                        }`}
                      >
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span>{c.lulaVotes.toLocaleString('pt-BR')}</span>
                          <span
                            className={`text-xs font-semibold ${
                              isLulaWinner ? 'text-[#ef4444]' : 'text-slate-400 font-normal'
                            }`}
                          >
                            ({c.lulaPct.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%)
                          </span>
                        </div>
                      </td>

                      {/* Total Valid */}
                      <td className="py-3 px-4 font-semibold text-slate-200">
                        {c.totalValid.toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
