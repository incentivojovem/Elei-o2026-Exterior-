import React, { useState } from 'react';
import { X, Copy, Check, Globe, Github, Terminal, CheckCircle2, AlertTriangle } from 'lucide-react';

interface GithubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const gitCommands = `npm run build
git add .
git commit -m "build: corrigir deploy github pages"
git push origin main`;

  const copyCommands = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1e293b] border border-[#334155] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#334155] bg-[#0f172a]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                Solução para a Tela Branca (main.tsx 404 no GitHub Pages)
              </h3>
              <p className="text-xs text-slate-400">
                Como configurar o GitHub para carregar a versão compilada
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

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300">
          
          {/* Motivo do Erro */}
          <div className="bg-red-950/30 border border-red-800/50 p-3.5 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-red-300 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>Por que aconteceu o erro "main.tsx 404"?</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              O GitHub Pages foi configurado para ler direto da raiz (<code className="text-red-400 font-mono">/</code>) do repositório, onde estão os arquivos de código-fonte não compilados (<code className="text-red-400 font-mono">main.tsx</code>). Os navegadores não executam TypeScript diretamente. O GitHub Pages precisa servir a versão compilada (<code className="text-emerald-400 font-mono">dist</code> ou <code className="text-emerald-400 font-mono">docs</code>).
            </p>
          </div>

          {/* Solução Recomendada 1 */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-emerald-800/60 bg-emerald-950/10 space-y-2">
            <span className="font-bold text-emerald-300 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Opção 1: Ativar o GitHub Actions (Recomendado — 1 clique)
            </span>
            <p className="text-slate-300 text-xs leading-relaxed">
              No seu repositório no GitHub:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 text-xs pl-1">
              <li>Acesse a aba <strong>Settings</strong> (Configurações) no topo.</li>
              <li>No menu lateral esquerdo, clique em <strong>Pages</strong>.</li>
              <li>
                Em <strong>Build and deployment &gt; Source</strong>, altere de <em>"Deploy from a branch"</em> para 👉 <strong className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">GitHub Actions</strong>.
              </li>
            </ol>
            <p className="text-[11px] text-slate-400 italic">
              Pronto! O workflow <code className="text-blue-400 font-mono">.github/workflows/deploy.yml</code> que criamos compilará o projeto e colocará o site no ar sem tela branca.
            </p>
          </div>

          {/* Solução Alternativa 2 */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-[#334155] space-y-2">
            <span className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-400" />
              Opção 2: Se preferir manter "Deploy from a branch"
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              Se você preferir continuar com a opção tradicional de branch:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 text-xs pl-1">
              <li>Vá em <strong>Settings &gt; Pages</strong>.</li>
              <li>Em <strong>Branch</strong>, selecione <strong>main</strong> e mude a pasta de <code className="text-amber-400">/ (root)</code> para 👉 <strong className="text-blue-400">/docs</strong>.</li>
              <li>Clique em <strong>Save</strong>.</li>
            </ol>
            <p className="text-[11px] text-slate-400 italic">
              Configuramos o comando de build para salvar automaticamente os arquivos compilados prontos dentro da pasta <code className="text-blue-400 font-mono">docs/</code>.
            </p>
          </div>

          {/* Comandos para enviar os arquivos compilados */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-[#334155] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-blue-400" />
                Comandos para subir a pasta docs e lockfile atualizados:
              </span>
              <button
                onClick={copyCommands}
                className="flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300 bg-blue-950/60 px-2 py-1 rounded border border-blue-800/50 cursor-pointer"
              >
                {copiedCmd ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 bg-[#080d1a] rounded-lg text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed border border-slate-800">
              {gitCommands}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0f172a] border-t border-[#334155] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
          >
            Entendi, Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
