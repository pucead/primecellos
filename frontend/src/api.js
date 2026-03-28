export const API_URL = 'http://localhost:3000';

export async function fetchDaApi(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    // Tratamento básico de resposta para manter simplicidade
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erro no fetchDaApi:", error);
    throw error;
  }
}
