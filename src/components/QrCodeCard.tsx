import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Smartphone, Copy, Check, ExternalLink, Download } from 'lucide-react';

interface QrCodeCardProps {
  url?: string;
}

export const QrCodeCard: React.FC<QrCodeCardProps> = ({
  url = 'https://incentivojovem.github.io/Elei-o2026-Exterior-/',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 280,
      margin: 1.5,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((dataUrl) => {
        setQrDataUrl(dataUrl);
      })
      .catch((err) => {
        console.error('Falha ao gerar QR Code:', err);
      });
  }, [url]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = 'qrcode-apuracao-exterior-2026.png';
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <section className="bg-[#1e293b] rounded-2xl p-5 sm:p-6 mb-8 border border-[#334155] shadow-xl text-center max-w-xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-[#0f172a] text-blue-400 border border-[#334155] px-3 py-1 rounded-full text-xs font-semibold mb-3">
        <Smartphone className="w-3.5 h-3.5 text-blue-400" />
        <span>Acesso Rápido no Celular</span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-1">
        Acompanhe pelo Celular ou Outro Dispositivo
      </h3>
      <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
        Aponte a câmera do seu smartphone para o QR Code abaixo para abrir o site instantaneamente.
      </p>

      {/* QR Code Container */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="p-3 bg-white rounded-2xl shadow-lg border border-slate-700/50 inline-block transition-transform hover:scale-105">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QR Code para o site de apuração no exterior"
              className="w-44 h-44 sm:w-48 sm:h-48 rounded-lg block"
            />
          ) : (
            <div className="w-44 h-44 flex items-center justify-center text-slate-400 text-xs">
              Gerando QR Code...
            </div>
          )}
        </div>

        {/* Link direto clicável */}
        <div className="w-full max-w-md bg-[#0f172a] border border-[#334155] rounded-lg p-2.5 flex items-center justify-between gap-2 mt-2">
          <span className="font-mono text-xs text-blue-300 truncate select-all text-left">
            {url}
          </span>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 bg-[#1e293b] hover:bg-[#334155] text-slate-200 text-xs font-semibold px-2.5 py-1 rounded border border-[#334155] shrink-0 transition-colors cursor-pointer"
            title="Copiar link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir no Navegador</span>
          </a>

          <button
            onClick={handleDownloadQr}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] hover:bg-[#334155] text-slate-300 text-xs font-medium border border-[#334155] transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Baixar Imagem QR</span>
          </button>
        </div>
      </div>
    </section>
  );
};
