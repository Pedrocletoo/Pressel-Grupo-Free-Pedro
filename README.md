# Futebol Virtual – Grupo Free

Landing page feita em React + Vite + Tailwind para capturar leads e direcionar para o grupo gratuito no Telegram.

## Tecnologias
- Vite
- React (TypeScript)
- Tailwind CSS
- shadcn-ui

## Desenvolvimento
```bash
npm i
npm run dev
```
Servidor de desenvolvimento padrão: http://localhost:8080

## Build de produção
```bash
npm run build
```
Os arquivos gerados ficam em `dist/`.

## Deploy na HostGator (cPanel)
1. Abra o **File Manager** do cPanel.
2. Vá para `public_html` e crie a pasta `grupo-free` (se ainda não existir).
3. Faça upload do arquivo `grupo-free-dist.zip` para `public_html/grupo-free/`.
4. Selecione o ZIP e clique em **Extract** para extrair os arquivos.
   - Após extrair, verifique que há `index.html` e a pasta `assets/` dentro de `public_html/grupo-free/`.
5. Acesse: `https://pedro2t.com.br/grupo-free/`.

> Observação: o projeto usa `base="./"` no `vite.config.ts`, ideal para publicação em subpastas como `/grupo-free/`.

## Ajustes úteis
- Favicon: `public/favicon.svg` (tema dinheiro).
- Link do botão de entrada no Telegram: configurado em `src/components/PreSellForm.tsx`.
- Acessibilidade: animações respeitam `prefers-reduced-motion`.

## Licença
Projeto privado do Pedro. Uso e distribuição sob autorização.
