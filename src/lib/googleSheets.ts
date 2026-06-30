import axios from 'axios';

export interface FormData {
  name: string;
  email: string;
  phone: string;
}

export interface GoogleSheetsResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Envia os dados do formulário para o Google Sheets
 * @param formData - Dados do formulário (nome, email, telefone)
 * @returns Promise com o resultado da operação
 */
export const sendToGoogleSheets = async (formData: FormData): Promise<GoogleSheetsResponse> => {
  try {
    const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    
    console.log('🔍 [DEBUG] Iniciando envio para Google Sheets');
    console.log('🔍 [DEBUG] URL configurada:', googleSheetsUrl);
    console.log('🔍 [DEBUG] Dados do formulário:', formData);
    
    if (!googleSheetsUrl) {
      console.error('❌ [ERROR] URL do Google Sheets não configurada');
      throw new Error('URL do Google Sheets não configurada');
    }

    if (googleSheetsUrl.includes('YOUR_SCRIPT_ID')) {
      console.error('❌ [ERROR] URL ainda contém placeholder YOUR_SCRIPT_ID');
      throw new Error('URL do Google Sheets ainda não foi configurada corretamente');
    }

    // Adiciona timestamp para controle
    const dataToSend = {
      ...formData,
      timestamp: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    console.log('🔍 [DEBUG] Dados a serem enviados:', dataToSend);
    console.log('🔍 [DEBUG] Fazendo requisição POST para:', googleSheetsUrl);

    const response = await axios.post(googleSheetsUrl, dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 segundos de timeout
    });

    console.log('✅ [SUCCESS] Resposta recebida:', response.status, response.statusText);
    console.log('✅ [SUCCESS] Dados da resposta:', response.data);

    if (response.data && response.data.success) {
      return {
        success: true,
        message: 'Dados salvos com sucesso!'
      };
    } else {
      console.error('❌ [ERROR] Resposta de erro do Google Sheets:', response.data);
      throw new Error(response.data?.error || 'Erro desconhecido ao salvar dados');
    }
  } catch (error) {
    console.error('❌ [ERROR] Erro ao enviar dados para Google Sheets:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('❌ [ERROR] Detalhes do erro Axios:');
      console.error('  - Status:', error.response?.status);
      console.error('  - Status Text:', error.response?.statusText);
      console.error('  - Data:', error.response?.data);
      console.error('  - Headers:', error.response?.headers);
      console.error('  - Config URL:', error.config?.url);
      console.error('  - Config Method:', error.config?.method);
      console.error('  - Config Data:', error.config?.data);
      
      if (error.code === 'ECONNABORTED') {
        console.error('❌ [ERROR] Timeout na requisição');
        return {
          success: false,
          error: 'Timeout: Verifique sua conexão com a internet'
        };
      }
      
      if (error.response?.status === 404) {
        console.error('❌ [ERROR] Endpoint não encontrado (404)');
        return {
          success: false,
          error: 'Serviço não encontrado. Verifique a configuração do Google Sheets'
        };
      }

      if (error.response?.status === 403) {
        console.error('❌ [ERROR] Acesso negado (403)');
        return {
          success: false,
          error: 'Acesso negado. Verifique as permissões do Google Apps Script'
        };
      }

      if (error.response?.status === 302) {
        console.error('❌ [ERROR] Redirecionamento (302) - possível problema de autenticação');
        return {
          success: false,
          error: 'Erro de redirecionamento. Verifique a publicação do Google Apps Script'
        };
      }
      
      return {
        success: false,
        error: `Erro de rede (${error.response?.status || error.code}): ${error.message}`
      };
    }
    
    console.error('❌ [ERROR] Erro não relacionado ao Axios:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};