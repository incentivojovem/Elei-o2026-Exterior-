# Apuração Exterior – 2º Turno Presidente 2026

Painel em tempo real de apuração dos Boletins de Urna (BUs) divulgados pelas seções eleitorais do exterior, com atualização automática periódica e compatibilidade total com **GitHub Pages**.

---

## 🚀 Como Publicar no Servidor do GitHub Pages

O projeto já está 100% configurado para rodar diretamente online no GitHub Pages após você subir os arquivos.

### Passo 1: Subir os arquivos para o seu repositório no GitHub

Abra o terminal na pasta do projeto e execute:

```bash
git init
git add .
git commit -m "feat: configuracao para publicacao no github pages"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

---

### Passo 2: Ativar o GitHub Pages no Repositório

1. No GitHub, abra o repositório que você acabou de subir.
2. Clique na aba **Settings** (Configurações) no topo.
3. No menu lateral esquerdo, clique em **Pages**.
4. Em **Build and deployment** > **Source**, selecione:
   👉 **GitHub Actions**
   *(Não precisa alterar mais nada, o arquivo `.github/workflows/deploy.yml` já está pronto no projeto!)*

---

### Passo 3: Acessar seu site online

O GitHub Actions iniciará o deploy automaticamente (leva cerca de 1 a 2 minutos).
Você poderá acompanhar o progresso na aba **Actions** do seu repositório.

Assim que concluir, seu site estará no ar no endereço:
🌐 **`https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`**

---

## ⚙️ Ajustes Técnicos já Configurados:

1. **`vite.config.ts` com `base: './'`:** Garante que todos os arquivos `.js`, `.css` e imagens carreguem perfeitamente mesmo quando o site roda em subpastas de repositórios no GitHub Pages.
2. **Workflow Automatizado (`.github/workflows/deploy.yml`):** Compila o projeto (`npm run build`) e envia os arquivos prontos para o servidor do GitHub a cada novo `git push`.
3. **Suporte SPA e `.nojekyll`:** Criação automática de `404.html` e `.nojekyll` para evitar erros de roteamento ou bloqueio de arquivos.
