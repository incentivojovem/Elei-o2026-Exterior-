# Apuração Exterior – 2º Turno Presidente 2026

Painel em tempo real de apuração dos Boletins de Urna (BUs) divulgados pelas seções eleitorais do exterior, com atualização automática periódica e compatibilidade total com **GitHub Pages**.

---

## ⚠️ Como resolver o erro de tela branca (`main.tsx 404`) no GitHub Pages

O erro `main.tsx:1 Failed to load resource: 404` acontece quando o GitHub Pages tenta carregar os arquivos de código-fonte não compilados da raiz (`/`) em vez dos arquivos compilados em JavaScript.

Você pode resolver isso em segundos escolhendo **uma das duas opções abaixo**:

### Opção 1: Via GitHub Actions (Recomendada — 1 clique)

1. No seu repositório no GitHub, clique na aba **Settings** (Configurações) no topo.
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment** > **Source**, altere de *"Deploy from a branch"* para:  
   👉 **GitHub Actions**
4. Pronto! O GitHub executará o workflow `.github/workflows/deploy.yml` que compila o projeto e coloca no ar a versão pronta sem nenhum erro.

---

### Opção 2: Se preferir manter "Deploy from a branch" (Pasta `/docs`)

Se preferir usar o método tradicional de branch sem GitHub Actions:

1. No terminal do seu projeto, gere a pasta compilada executando:
   ```bash
   npm run build
   git add .
   git commit -m "build: gerar pasta docs compilada"
   git push origin main
   ```
2. No GitHub, vá em **Settings** > **Pages**.
3. Em **Branch**, selecione `main` e a pasta 👉 **/docs** (em vez de `/root`).
4. Clique em **Save**.

---

## 🌐 Endereço do seu site

Assim que o deploy for concluído, o site estará acessível em:  
`https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`
