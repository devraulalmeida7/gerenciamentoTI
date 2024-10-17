import React, { useState } from 'react';

const ChamadoCard = ({ chamado, onDelete, onEdit, onChangeStatus }) => {
  const [newStatus, setNewStatus] = useState(chamado.status_chamado); // Armazena o novo status selecionado

  // Função para alterar o status
  const handleStatusChange = (event) => {
    setNewStatus(event.target.value); // Atualiza o status conforme o select é alterado
  };

  // Função para confirmar a alteração de status
  const handleConfirmStatusChange = () => {
    onChangeStatus(chamado.id_chamado, newStatus); // Só altera o status quando o botão for clicado
  };

  return (
    <div className="card">
      <p>Responsável: {chamado.nome_suporte || 'Desconhecido'}</p> {/* Exibe o nome do colaborador diretamente da resposta */}
      <p>Status atual: {chamado.status_chamado}</p>
      <p>Data Abertura: {new Date(chamado.data_abertura).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })}</p>

      {/* Select para alterar o status */}
      <select value={newStatus} onChange={handleStatusChange}>
        <option value="em_aberto">Em Aberto</option>
        <option value="em_atendimento">Em Andamento</option>
        <option value="concluido">Concluído</option>
      </select>

      {/* Botão para confirmar a alteração de status */}
      <button onClick={handleConfirmStatusChange}>Alterar Status</button>

      {/* Botões para editar e excluir */}
      <button onClick={() => onEdit(chamado.id_chamado)}>Editar</button>
      <button onClick={() => onDelete(chamado.id_chamado)}>Excluir</button>
    </div>
  );
};

export default ChamadoCard;