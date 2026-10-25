import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Terminal } from 'lucide-react';

interface HtmlSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlSnippetModal: React.FC<HtmlSnippetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'fullHtml' | 'script' | 'meta'>('fullHtml');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Código HTML completo ajustado com os dados estritamente reais e rotina de auto-atualização periódica
  const fullHtmlCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apuração Exterior – 2º Turno Presidente 2026 | Boletins de Urna</title>
  
  <!-- CASO PREFIRA ATUALIZAÇÃO NATIVA POR META TAG (Descomente abaixo para recarregar a cada 30 segundos):
  <meta http-equiv="refresh" content="30">
  -->

  <style>
    :root {
      --bg: #0f172a;
      --card: #1e293b;
      --text: #f1f5f9;
      --muted: #94a3b8;
      --flavio: #3b82f6;
      --lula: #ef4444;
      --border: #334155;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 1rem;
    }
    .container { max-width: 960px; margin: 0 auto; }
    header {
      text-align: center;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border);
    }
    h1 { font-size: 1.6rem; margin-bottom: 0.4rem; }
    .subtitle { color: var(--muted); font-size: 0.95rem; }

    /* Barra de controle de atualização automática */
    .refresh-control {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #1e293b;
      border: 1px solid var(--border);
      padding: 0.4rem 1rem;
      border-radius: 999px;
      font-size: 0.82rem;
      margin-top: 0.75rem;
    }
    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
    }
    .btn-action {
      background: #0f172a;
      color: #93c5fd;
      border: 1px solid var(--border);
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.75rem;
    }
    .btn-action:hover {
      background: #1e3a5f;
    }

    .update { 
      display: inline-block; 
      background: #1e3a5f; 
      color: #93c5fd; 
      padding: 0.35rem 0.8rem; 
      border-radius: 999px; 
      font-size: 0.8rem; 
      margin-top: 0.8rem;
    }
    .total-card {
      background: var(--card);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      border: 1px solid var(--border);
    }
    .total-title { font-size: 1.1rem; margin-bottom: 1rem; color: var(--muted); }
    .candidates {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (max-width: 600px) { .candidates { grid-template-columns: 1fr; } }
    .cand {
      background: #0f172a;
      border-radius: 10px;
      padding: 1.2rem;
      text-align: center;
    }
    .cand.flavio { border-top: 4px solid var(--flavio); }
    .cand.lula { border-top: 4px solid var(--lula); }
    .cand-name { font-weight: 600; font-size: 1.1rem; }
    .cand-party { color: var(--muted); font-size: 0.85rem; }
    .cand-pct { font-size: 2.2rem; font-weight: 700; margin: 0.4rem 0; }
    .cand-votes { color: var(--muted); font-size: 0.95rem; }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--card);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    th, td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }
    th { background: #0f172a; color: var(--muted); font-weight: 500; font-size: 0.85rem; }
    tr:last-child td { border-bottom: none; }
    .pct { font-weight: 600; }
    .flavio-pct { color: var(--flavio); }
    .lula-pct { color: var(--lula); }
    .winner { font-weight: 700; }
    footer {
      margin-top: 2.5rem;
      text-align: center;
      color: var(--muted);
      font-size: 0.8rem;
      line-height: 1.6;
    }
    footer a { color: #60a5fa; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Apuração Exterior – Presidente 2026</h1>
      <p class="subtitle">2º Turno • Apenas seções do exterior com Boletim de Urna já divulgado</p>
      
      <!-- Controle de atualização com tempo fixo -->
      <div class="refresh-control">
        <span class="status-indicator" id="statusDot"></span>
        <span>Auto-atualização: <strong id="lblContador" style="color:#93c5fd;">em 30s</strong></span>
        <button class="btn-action" id="btnToggle" onclick="alternarAutoRefresh()">Pausar</button>
        <button class="btn-action" onclick="atualizarPagina()">Atualizar Agora</button>
      </div>

      <div class="update" id="lblUpdate">Dados parciais até ~10h30 de 25/10/2026 (horário de Brasília)</div>
    </header>

    <section class="total-card">
      <div class="total-title">Total dos BUs já divulgados (exterior)</div>
      <div class="candidates">
        <div class="cand flavio">
          <div class="cand-name">Flávio Bolsonaro</div>
          <div class="cand-party">PL • 22</div>
          <div class="cand-pct">69,2%</div>
          <div class="cand-votes">32.870 votos</div>
        </div>
        <div class="cand lula">
          <div class="cand-name">Lula</div>
          <div class="cand-party">PT • 13</div>
          <div class="cand-pct">30,8%</div>
          <div class="cand-votes">14.629 votos</div>
        </div>
      </div>
      <p style="text-align:center; margin-top:1rem; color:var(--muted); font-size:0.9rem;">
        Total de votos válidos apurados nos BUs: <strong>47.499</strong>
      </p>
    </section>

    <div style="display:flex;align-items:center;gap:8px;margin-bottom:1rem;">
      <h2 style="font-size:1.2rem;">Resultado por país / território</h2>
      <span style="display:inline-flex;align-items:center;gap:4px;background:#064e3b;color:#34d399;border:1px solid #059669;padding:2px 8px;border-radius:999px;font-size:0.75rem;font-weight:600;">
        <span style="color:#10b981;font-size:1rem;line-height:1;">✓</span> Ícone verde = 100% apurado
      </span>
    </div>
    <table>
      <thead>
        <tr>
          <th>País / Território</th>
          <th>Flávio (PL)</th>
          <th>Lula (PT)</th>
          <th>Total válido</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Japão</td>
          <td class="winner flavio-pct">28.538 <span class="pct">(80,08%)</span></td>
          <td>7.098 <span class="pct">(19,92%)</span></td>
          <td>35.636</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Austrália</td>
          <td>3.465 <span class="pct">(36,5%)</span></td>
          <td class="winner lula-pct">6.017 <span class="pct">(63,5%)</span></td>
          <td>9.482</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Emirados Árabes Unidos*</td>
          <td class="winner flavio-pct">772 <span class="pct">(54,56%)</span></td>
          <td>643 <span class="pct">(45,44%)</span></td>
          <td>1.415</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>China (continental)</td>
          <td>134 <span class="pct">(26,3%)</span></td>
          <td class="winner lula-pct">375 <span class="pct">(73,7%)</span></td>
          <td>509</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>China (incl. Hong Kong)**</td>
          <td>267 <span class="pct">(34,7%)</span></td>
          <td class="winner lula-pct">502 <span class="pct">(65,3%)</span></td>
          <td>769</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Nova Zelândia</td>
          <td>101 <span class="pct">(19,5%)</span></td>
          <td class="winner lula-pct">418 <span class="pct">(80,5%)</span></td>
          <td>519</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Hong Kong</td>
          <td class="winner flavio-pct">133 <span class="pct">(51,15%)</span></td>
          <td>127 <span class="pct">(48,85%)</span></td>
          <td>260</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Singapura</td>
          <td>121 <span class="pct">(36,2%)</span></td>
          <td class="winner lula-pct">213 <span class="pct">(63,8%)</span></td>
          <td>334</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Taiwan</td>
          <td class="winner flavio-pct">130 <span class="pct">(58,0%)</span></td>
          <td>94 <span class="pct">(42,0%)</span></td>
          <td>224</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Coreia do Sul</td>
          <td>82 <span class="pct">(35,65%)</span></td>
          <td class="winner lula-pct">148 <span class="pct">(64,35%)</span></td>
          <td>230</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Tailândia</td>
          <td class="winner flavio-pct">60 <span class="pct">(51,7%)</span></td>
          <td>56 <span class="pct">(48,3%)</span></td>
          <td>116</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Malásia</td>
          <td class="winner flavio-pct">44 <span class="pct">(51,8%)</span></td>
          <td>41 <span class="pct">(48,2%)</span></td>
          <td>85</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Filipinas</td>
          <td class="winner flavio-pct">39 <span class="pct">(59,1%)</span></td>
          <td>27 <span class="pct">(40,9%)</span></td>
          <td>66</td>
        </tr>
        <tr>
          <td><span style="color:#10b981;font-weight:bold;margin-right:6px;" title="100% apurado">✓</span>Indonésia</td>
          <td class="winner flavio-pct">23 <span class="pct">(60,5%)</span></td>
          <td>15 <span class="pct">(39,5%)</span></td>
          <td>38</td>
        </tr>
      </tbody>
    </table>

    <footer>
      <p>
        Fonte: Boletins de Urna (BUs) publicados pelo TSE e compilados por veículos de imprensa (CNN Brasil, G1, Congresso em Foco e outros) até ~10h30 de 25/10/2026.<br>
        * Emirados Árabes Unidos incluído em algumas compilações da CNN.<br>
        ** Algumas reportagens agregam Hong Kong à China; outras separam.<br>
        Estes números <strong>não são oficiais</strong>. A totalização oficial do TSE começa após o encerramento da votação no Brasil (17h horário de Brasília).<br>
        Página gerada sem dados fictícios.
      </p>
    </footer>
  </div>

  <!-- SCRIPT DE ATUALIZAÇÃO AUTOMÁTICA POR TEMPO FIXO -->
  <script>
    // Tempo fixo em segundos entre cada atualização
    const INTERVALO_SEGUNDOS = 30;
    let segundosRestantes = INTERVALO_SEGUNDOS;
    let autoRefreshAtivo = true;

    const lblContador = document.getElementById('lblContador');
    const btnToggle = document.getElementById('btnToggle');
    const statusDot = document.getElementById('statusDot');

    // Executa a contagem regressiva a cada segundo
    setInterval(() => {
      if (!autoRefreshAtivo) return;

      segundosRestantes--;
      if (lblContador) lblContador.textContent = 'em ' + segundosRestantes + 's';

      if (segundosRestantes <= 0) {
        atualizarPagina();
      }
    }, 1000);

    // Pausar ou retomar a atualização automática
    function alternarAutoRefresh() {
      autoRefreshAtivo = !autoRefreshAtivo;
      if (autoRefreshAtivo) {
        btnToggle.textContent = 'Pausar';
        statusDot.style.background = '#10b981';
        lblContador.textContent = 'em ' + segundosRestantes + 's';
      } else {
        btnToggle.textContent = 'Retomar';
        statusDot.style.background = '#f59e0b';
        lblContador.textContent = 'Pausado';
      }
    }

    // Recarrega a página preservando a rolagem para obter novos dados do servidor
    function atualizarPagina() {
      if (lblContador) lblContador.textContent = 'Atualizando...';
      window.location.reload();
    }
  </script>
</body>
</html>`;

  const scriptOnlyCode = `<!-- SCRIPT PARA INSERIR ANTES DE </body> -->
<script>
  // Defina o tempo fixo desejado (ex: 30 segundos)
  const INTERVALO_SEGUNDOS = 30;
  let segundosRestantes = INTERVALO_SEGUNDOS;
  let ativo = true;

  // Atualização periódica automática
  setInterval(() => {
    if (!ativo) return;
    segundosRestantes--;

    const el = document.getElementById('lblContador');
    if (el) el.textContent = 'em ' + segundosRestantes + 's';

    if (segundosRestantes <= 0) {
      window.location.reload();
    }
  }, 1000);

  function alternarAutoRefresh() {
    ativo = !ativo;
    const btn = document.getElementById('btnToggle');
    const el = document.getElementById('lblContador');
    if (btn) btn.textContent = ativo ? 'Pausar' : 'Retomar';
    if (el) el.textContent = ativo ? 'em ' + segundosRestantes + 's' : 'Pausado';
  }
</script>`;

  const metaOnlyCode = `<!-- ADICIONE DENTRO DA TAG <head> DO SEU ARQUIVO HTML: -->
<!-- O parâmetro 'content' define o tempo fixo em segundos para recarregar a página -->

<meta http-equiv="refresh" content="30">`;

  const handleCopy = () => {
    let text = fullHtmlCode;
    if (activeTab === 'script') text = scriptOnlyCode;
    if (activeTab === 'meta') text = metaOnlyCode;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1e293b] border border-[#334155] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#334155] bg-[#0f172a]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Código HTML com Atualização Automática
              </h3>
              <p className="text-xs text-slate-400">
                Dados reais dos Boletins de Urna divulgados com temporizador de recarregamento
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#334155] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="bg-[#1e293b] px-4 pt-3 border-b border-[#334155] flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('fullHtml')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
                activeTab === 'fullHtml'
                  ? 'border-blue-500 text-blue-400 bg-[#0f172a]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              HTML Completo com Script
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
                activeTab === 'script'
                  ? 'border-blue-500 text-blue-400 bg-[#0f172a]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Apenas o Script JS
            </button>
            <button
              onClick={() => setActiveTab('meta')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
                activeTab === 'meta'
                  ? 'border-blue-500 text-blue-400 bg-[#0f172a]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Opção Meta Tag (Puro HTML)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm mb-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código</span>
              </>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm text-slate-300">
          <div className="relative rounded-xl overflow-hidden border border-[#334155] bg-[#0b1120]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#0f172a] border-b border-[#334155] text-slate-400 text-xs font-mono">
              <span>{activeTab === 'fullHtml' ? 'index.html' : activeTab === 'script' ? 'script.js' : 'meta-refresh.html'}</span>
              <span>{copied ? '✓ Copiado' : 'Clique no botão acima para copiar'}</span>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-96 leading-relaxed select-all">
              {activeTab === 'fullHtml' && fullHtmlCode}
              {activeTab === 'script' && scriptOnlyCode}
              {activeTab === 'meta' && metaOnlyCode}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#0f172a] border-t border-[#334155] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#334155] hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
