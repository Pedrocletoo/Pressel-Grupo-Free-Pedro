// Código correto para o Google Apps Script
// Este código deve ser copiado e colado no Google Apps Script
// VERSÃO ATUALIZADA: Sem CORS (formulário HTML nativo não precisa)

// Função principal para receber dados do formulário
function doPost(e) {
  try {
    console.log('Recebendo dados do formulário HTML:', e.parameter);
    
    // ID da sua planilha
    const SHEET_ID = '11A1GHRUeKbhxkFCBkxB7qHGLL867RYJ09hxL2ClK8GQ';
    
    // Abrir a planilha e pegar a primeira aba disponível
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet(); // Pega a aba ativa/primeira aba
    
    console.log('Usando aba:', sheet.getName());
    
    if (!sheet) {
      throw new Error('Nenhuma aba encontrada na planilha');
    }
    
    // Obter dados do formulário HTML (e.parameter em vez de e.postData.contents)
    const data = e.parameter;
    console.log('Dados recebidos:', data);
    
    // Validar dados obrigatórios
    if (!data.name || !data.email || !data.phone) {
      throw new Error('Dados obrigatórios não fornecidos');
    }
    
    // Adicionar nova linha com os dados
    const newRow = [
      data.name,
      data.email,
      data.phone,
      data.timestamp || new Date().toLocaleString('pt-BR')
    ];
    
    sheet.appendRow(newRow);
    console.log('Dados salvos com sucesso:', newRow);
    
    // Retornar página de sucesso com redirecionamento automático
    return HtmlService.createHtmlOutput(`
      <html>
        <head>
          <meta charset="utf-8">
          <title>Cadastro Realizado</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              margin: 0;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              background: rgba(255,255,255,0.1);
              padding: 40px;
              border-radius: 20px;
              backdrop-filter: blur(10px);
            }
            .success { 
              color: #4CAF50; 
              font-size: 28px; 
              margin-bottom: 20px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .message { 
              font-size: 18px; 
              margin-bottom: 30px;
              line-height: 1.5;
            }
            .countdown {
              font-size: 24px;
              font-weight: bold;
              color: #FFD700;
              margin: 20px 0;
            }
            .loading {
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 3px solid rgba(255,255,255,0.3);
              border-radius: 50%;
              border-top-color: #fff;
              animation: spin 1s ease-in-out infinite;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success">✅ Cadastro Realizado com Sucesso!</div>
            <div class="message">
              Seus dados foram salvos com segurança!<br>
              Redirecionando para o grupo do Telegram...
            </div>
            <div class="countdown">
              <div class="loading"></div>
              <span id="timer">3</span> segundos
            </div>
          </div>
          
          <script>
            let countdown = 3;
            const timerElement = document.getElementById('timer');
            
            // Atualizar contador a cada segundo
            const interval = setInterval(() => {
              countdown--;
              timerElement.textContent = countdown;
              
              if (countdown <= 0) {
                clearInterval(interval);
                // Redirecionar para o Telegram
                window.location.href = 'https://t.me/novofv';
              }
            }, 1000);
            
            // Fallback: fechar aba após 5 segundos se o redirecionamento falhar
            setTimeout(() => {
              window.close();
            }, 5000);
          </script>
        </body>
      </html>
    `);
      
  } catch (error) {
    console.error('Erro no doPost:', error.toString());
    
    // Retornar página de erro
    return HtmlService.createHtmlOutput(`
      <html>
        <head>
          <meta charset="utf-8">
          <title>Erro no Cadastro</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .error { color: #dc3545; font-size: 24px; margin-bottom: 20px; }
            .message { font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="error">❌ Erro no Cadastro</div>
          <div class="message">${error.toString()}</div>
          <script>
            setTimeout(() => {
              window.close();
            }, 5000);
          </script>
        </body>
      </html>
    `);
  }
}

// Função de teste (opcional)
function testarScript() {
  const dadosTeste = {
    parameter: {
      name: 'Teste',
      email: 'teste@email.com',
      phone: '11999999999',
      timestamp: new Date().toLocaleString('pt-BR')
    }
  };
  
  const resultado = doPost(dadosTeste);
  console.log('Resultado do teste:', resultado.getContent());
}