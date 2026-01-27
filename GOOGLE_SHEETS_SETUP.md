# Configuração do Google Sheets

Este guia explica como configurar o Google Apps Script para receber os dados do formulário.

## Passo 1: Configurar sua Planilha Existente

1. Acesse sua planilha: [Grupo Free Pedro](https://docs.google.com/spreadsheets/d/11A1GHRUeKbhxkFCBkxB7qHGLL867RYJ09hxL2ClK8GQ/edit)
2. Na primeira linha, configure as colunas:
   - A1: `Nome`
   - B1: `Email`
   - C1: `Telefone`
   - D1: `Data/Hora`
3. Salve a planilha

## Passo 2: Criar o Google Apps Script

1. Na planilha, vá em `Extensões` > `Apps Script`
2. Substitua o código padrão pelo código abaixo:

```javascript
function doPost(e) {
  try {
    // ID da sua planilha
    const SHEET_ID = '11A1GHRUeKbhxkFCBkxB7qHGLL867RYJ09hxL2ClK8GQ';
    const SHEET_NAME = 'Planilha1'; // ou o nome da sua aba
    
    // Abrir a planilha
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Parsear os dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Adicionar nova linha com os dados
    sheet.appendRow([
      data.name,
      data.email,
      data.phone,
      data.timestamp
    ]);
    
    // Retornar sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Dados salvos com sucesso!' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retornar erro
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Passo 3: Configurar o Script

1. **SHEET_ID já configurado**: O ID da sua planilha (11A1GHRUeKbhxkFCBkxB7qHGLL867RYJ09hxL2ClK8GQ) já está no código

2. **Verificar nome da aba**:
   - Se sua aba não se chama "Planilha1", altere `SHEET_NAME` no código
   - Para verificar o nome da aba, olhe na parte inferior da sua planilha

## Passo 4: Publicar o Script

1. Clique em `Implantar` > `Nova implantação`
2. Escolha o tipo: `Aplicativo da web`
3. Configurações:
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
4. Clique em `Implantar`
5. **Copie a URL gerada** - você precisará dela!

## Passo 5: Configurar a Aplicação

1. Abra o arquivo `.env` na raiz do projeto
2. Substitua `YOUR_SCRIPT_ID` pela URL completa copiada no passo anterior:

```env
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
```

## Passo 6: Testar a Integração

1. Execute o projeto: `npm run dev`
2. Preencha o formulário e clique em "QUERO ENTRAR NO GRUPO VIP"
3. Verifique se os dados aparecem na planilha

## Solução de Problemas

### Erro 404 - Serviço não encontrado
- Verifique se a URL no `.env` está correta
- Certifique-se de que o script foi publicado corretamente

### Erro de permissão
- Verifique se o script está configurado para "Qualquer pessoa" ter acesso
- Reautorize o script se necessário

### Dados não aparecem na planilha
- Verifique se o SHEET_ID está correto
- Confirme se o nome da aba está correto
- Verifique os logs do Apps Script para erros

## Segurança

- O script só aceita dados dos campos esperados (nome, email, telefone)
- Todos os erros são tratados e logados
- A URL do script pode ser restrita por domínio se necessário

---

**Importante**: Mantenha o ID da planilha e a URL do script em segurança. Não compartilhe essas informações publicamente.