import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // altere a URL se necessário
});

// Chamados
export const getChamados = () => api.get('/chamados');
export const getChamadoById = (id) => api.get(`/chamados/${id}`);
export const createChamado = (data) => api.post('/chamados/insert', data);
export const updateChamado = (id, data) => api.put(`/chamados/update/${id}`, data);
export const deleteChamado = (id) => api.delete(`/chamados/del/${id}`);

// Chamados com responsável (usando LEFT JOIN)
export const getChamadosWithResponsavel = () => api.get('/chamados/responsavel');
export const getChamadoWithResponsavelById = (id) => api.get(`/chamados/responsavel/${id}`);
export const getChamadosWithResponsavelByStatus = (status) => api.get(`/chamados/responsavel/status/${status}`);

// Colaboradores
export const getColaboradores = () => api.get('/suporte');
export const getColaboradoresById = (id) => api.get(`/suporte/${id}`);
export const createColaborador = (data) => api.post('/suporte/insert', data);

export default api;