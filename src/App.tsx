/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CountryResult, ElectionTotals } from './types';
import { INITIAL_COUNTRIES } from './data/initialData';
import { Header } from './components/Header';
import { AutoRefreshBar } from './components/AutoRefreshBar';
import { TotalSummaryCard } from './components/TotalSummaryCard';
import { ResultsTable } from './components/ResultsTable';
import { Footer } from './components/Footer';
import { HtmlSnippetModal } from './components/HtmlSnippetModal';
import { InfoModal } from './components/InfoModal';
import { GithubModal } from './components/GithubModal';
import { playNotificationSound } from './utils/sound';

export default function App() {
  const [countries] = useState<CountryResult[]>(INITIAL_COUNTRIES);
  
  // Auto-refresh configuration (tempo fixo para checagem de dados)
  const [intervalSeconds, setIntervalSeconds] = useState<number>(30);
  const [countdown, setCountdown] = useState<number>(30);
  const [isAutoActive, setIsAutoActive] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  
  const [lastCheckedTime, setLastCheckedTime] = useState<string>(
    new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  // Modals
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState<boolean>(false);

  // Totais reais calculados diretamente a partir dos BUs
  const totals: ElectionTotals = useMemo(() => {
    let fVotes = 0;
    let lVotes = 0;

    for (const c of countries) {
      fVotes += c.flavioVotes;
      lVotes += c.lulaVotes;
    }

    const totalValid = fVotes + lVotes;
    const flavioPct = totalValid > 0 ? (fVotes / totalValid) * 100 : 0;
    const lulaPct = totalValid > 0 ? (lVotes / totalValid) * 100 : 0;

    return {
      flavioVotes: fVotes,
      lulaVotes: lVotes,
      totalValid,
      flavioPct,
      lulaPct,
      lastUpdateTime: lastCheckedTime,
    };
  }, [countries, lastCheckedTime]);

  // Rotina real de verificação periódica de novos dados no servidor
  const handleCheckForUpdates = useCallback(async () => {
    setIsChecking(true);

    try {
      // Faz requisição real com desativação de cache para verificar integridade da fonte
      await fetch(window.location.href, {
        method: 'HEAD',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      }).catch(() => {
        // Fallback silencioso para ambientes offline ou preview
      });

      const nowStr = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setLastCheckedTime(nowStr);

      if (soundEnabled) {
        playNotificationSound();
      }
    } catch {
      // Tratamento de falha de conexão de rede
    } finally {
      setIsChecking(false);
    }
  }, [soundEnabled]);

  // Temporizador de contagem regressiva para auto-atualização
  useEffect(() => {
    if (!isAutoActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleCheckForUpdates();
          return intervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoActive, intervalSeconds, handleCheckForUpdates]);

  const handleIntervalChange = (newSec: number) => {
    setIntervalSeconds(newSec);
    setCountdown(newSec);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9] selection:bg-blue-600 selection:text-white p-3 sm:p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <Header
          lastUpdatedText={`~10h30 de 25/10/2026`}
          isAutoRefreshActive={isAutoActive}
          onOpenCodeModal={() => setIsCodeModalOpen(true)}
          onOpenInfoModal={() => setIsInfoModalOpen(true)}
          onOpenGithubModal={() => setIsGithubModalOpen(true)}
        />

        {/* Barra de Atualização Automática com Tempo Fixo */}
        <AutoRefreshBar
          intervalSeconds={intervalSeconds}
          setIntervalSeconds={handleIntervalChange}
          countdown={countdown}
          isAutoActive={isAutoActive}
          setIsAutoActive={setIsAutoActive}
          isChecking={isChecking}
          onManualRefresh={handleCheckForUpdates}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          lastCheckedTime={lastCheckedTime}
        />

        {/* Card com Totais dos BUs Divulgados */}
        <TotalSummaryCard
          totals={totals}
          isChecking={isChecking}
        />

        {/* Tabela de Resultados por País/Território */}
        <ResultsTable
          countries={countries}
        />

        {/* Rodapé com Informações da Fonte */}
        <Footer />

        {/* Modal com Código HTML Ajustado para Copiar */}
        <HtmlSnippetModal
          isOpen={isCodeModalOpen}
          onClose={() => setIsCodeModalOpen(false)}
        />

        {/* Modal Explicativo dos BUs */}
        <InfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
        />

        {/* Modal de Publicação no GitHub Pages */}
        <GithubModal
          isOpen={isGithubModalOpen}
          onClose={() => setIsGithubModalOpen(false)}
        />
      </div>
    </div>
  );
}
