/**
 * Base da API (sem o sufixo /api).
 * - Dev: vazio → requisições relativas /api/* (proxy do Vite → localhost:3000).
 * - Produção no mesmo host: vazio → /api/* no mesmo domínio.
 * - API em outro domínio: VITE_API_URL=https://api.exemplo.com (rotas ficam /api/... nesse host).
 */
function resolveApiOrigin() {
  const env = import.meta.env.VITE_API_URL;
  if (env !== undefined && String(env).trim() !== '') {
    return String(env).replace(/\/$/, '');
  }
  return '';
}

export const API_URL = resolveApiOrigin();

const API_PREFIX = '/api';

export async function fetchDaApi(endpoint, options = {}) {
  const p = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_URL}${API_PREFIX}${p}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro no fetchDaApi:', error);
    throw error;
  }
}
