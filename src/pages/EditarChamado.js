import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obter o ID da URL
import { getChamadoById, updateChamado, getColaboradores } from '../services/api'; 

const EditarChamado = () => {
  const { id } = useParams(); // Obtemos o ID diretamente da URL com useParams
  const [form, setForm] = useState({
    status_chamado: '',
    responsavel_chamado: ''
  });

  const [colaboradores, setColaboradores] = useState([]); 

  // useEffect para buscar dados do chamado e colaboradores
  
  useEffect(() => {
    const fetchChamado = async () => {
      try {
        const response = await getChamadoById(id); // Usa o ID do useParams
        setForm(response.data[0]);
      } catch (error) {
        console.error('Erro ao buscar chamado:', error);
      }
    };
  
    const fetchColaboradores = async () => {
      try {
        const response = await getColaboradores();
        setColaboradores(response.data);
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
      }
    };

    fetchChamado();
    fetchColaboradores();
  }, [id]); // id é a dependência para recarregar os dados quando mudar

  // Função para lidar com a submissão
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateChamado(id, form); // Atualiza o chamado com o ID correto
    window.location.href = '/'; // Redireciona após a atualização
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Editar Chamado</h1>
      <form onSubmit={handleSubmit}>
        <label>Status:</label>
        <select name="status_chamado" value={form.status_chamado} onChange={handleChange}>
          <option value="em_aberto">Em Aberto</option>
          <option value="em_atendimento">Em Atendimento</option>
          <option value="concluido">Concluído</option>
        </select>

        <label>Responsável:</label>
        <select name="responsavel_chamado" value={form?.responsavel_chamado} onChange={handleChange}>
          <option value="">Selecione o responsável</option>
          {colaboradores.map(colaborador => (
            <option key={colaborador.id_suporte} value={colaborador.id_suporte}>
              {colaborador.nome_suporte}
            </option>
          ))}
        </select>

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default EditarChamado;