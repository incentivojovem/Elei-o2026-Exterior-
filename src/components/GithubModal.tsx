import React, { useState } from 'react';
import { X, Copy, Check, Globe, Github, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

interface GithubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const gitCommands = `git init
git add .
git commit -m "Publicação Apuração Exterior 2026"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main`;

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
                Como Rodar Direto no Servidor Online do GitHub (GitHub Pages)
              </h3>
              <p className="text-xs text-slate-400">
                O projeto já está configurado com <code className="text-emerald-400">base: './'</code> e workflow automático
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
          
          {/* Passo 1 */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-[#334155] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-blue-400" />
                Passo 1: Subir os arquivos para o repositório
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
                    <span>Copiar Comandos</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 bg-[#080d1a] rounded-lg text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed border border-slate-800">
              {gitCommands}
            </pre>
          </div>

          {/* Passo 2 */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-[#334155] space-y-2">
            <span className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              Passo 2: Configurar o GitHub Pages no Repositório
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              No seu repositório no GitHub:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-300 text-xs pl-1">
              <li>Acesse a aba <strong>Settings</strong> (Configurações) no topo.</li>
              <li>No menu lateral esquerdo, clique em <strong>Pages</strong>.</li>
              <li>
                Em <strong>Build and deployment &gt; Source</strong>, escolha: <strong className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">GitHub Actions</strong>.
              </li>
            </ol>
            <p className="text-[11px] text-slate-400 italic">
              Não precisa alterar mais nada: o arquivo de automação <code className="text-blue-400 font-mono">.github/workflows/deploy.yml</code> já foi criado no projeto.
            </p>
          </div>

          {/* Passo 3 */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-emerald-800/40 bg-emerald-950/10 space-y-2">
            <span className="font-bold text-emerald-300 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Passo 3: Acessar seu site online
            </span>
            <p className="text-slate-300 text-xs leading-relaxed">
              O GitHub irá compilar e colocar o site no ar automaticamente em cerca de 1 a 2 minutos. O link de acesso será:
            </p>
            <div className="p-2.5 bg-[#080d1a] rounded-lg border border-emerald-800/40 text-emerald-400 font-mono text-xs font-semibold">
              https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
            </div>
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
