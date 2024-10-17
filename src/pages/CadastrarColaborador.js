import React, { useState } from 'react';
import { createColaborador } from '../services/api';

const CadastrarColaborador = () => {
  const [form, setForm] = useState({
    nome_suporte: '',
    cargo_suporte: ''
  });

  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!form.nome_suporte || !form.cargo_suporte) {
      setError('Por favor, preencha todos os campos.'); // Mensagem de erro se algum campo estiver vazio
      return; // Interrompe o envio do formulário
    }

    try {
      await createColaborador(form);
      window.location.href = '/';
    } catch (err) {
      setError('Erro ao cadastrar colaborador. Tente novamente.'); // Mensagem de erro em caso de falha na criação
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Limpa a mensagem de erro ao digitar
  };

  return (
    <div>
      <h1>Cadastrar Colaborador</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe a mensagem de erro se houver */}
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="nome_suporte" onChange={handleChange} value={form.nome_suporte} />

        <label>Cargo:</label>
        <input type="text" name="cargo_suporte" onChange={handleChange} value={form.cargo_suporte} />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarColaborador;