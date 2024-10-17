import React, { useState, useEffect } from 'react';
import { createChamado, getColaboradores } from '../services/api';

const CadastrarChamado = () => {
  const [form, setForm] = useState({
    status_chamado: 'em_aberto',
    responsavel_chamado: ''
  });
  
  const [colaboradores, setColaboradores] = useState([]); // Estado para armazenar os colaboradores

  // useEffect para buscar os colaboradores ao carregar o componente
  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const response = await getColaboradores(); // Busca todos os colaboradores
        setColaboradores(response.data); // Armazena no estado
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
      }
    };

    fetchColaboradores(); // Chama a função para buscar os colaboradores
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createChamado(form);
    window.location.href = '/'; // Redireciona após o cadastro
  };

  // Função para lidar com a alteração dos campos do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Cadastrar Chamado</h1>
      <form onSubmit={handleSubmit}>
        {/* Select para status do chamado */}
        <label>Status:</label>
        <select name="status_chamado" value={form.status_chamado} onChange={handleChange}>
          <option value="em_aberto">Em Aberto</option>
          <option value="em_atendimento">Em Atendimento</option>
          <option value="concluido">Concluído</option>
        </select>

        {/* Select para responsável pelo chamado */}
        <label>Responsável:</label>
        <select name="responsavel_chamado" value={form.responsavel_chamado} onChange={handleChange}>
          <option value="">Selecione o responsável</option>
          {colaboradores.map(colaborador => (
            <option key={colaborador.id_suporte} value={colaborador.id_suporte}>
              {colaborador.nome_suporte}
            </option>
          ))}
        </select>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarChamado;