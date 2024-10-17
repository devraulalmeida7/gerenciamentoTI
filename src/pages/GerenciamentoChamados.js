import React, { useState, useEffect } from 'react';
import { getChamadosWithResponsavel, deleteChamado, updateChamado } from '../services/api'; // Agora utilizando a nova rota
import ChamadoCard from '../components/ChamadoCard';
import ConfirmationModal from '../components/ConfirmationModal'; // Importar o modal de confirmação

const GerenciamentoChamados = () => {
  const [chamados, setChamados] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
  const [chamadoToDelete, setChamadoToDelete] = useState(null); // Armazena o ID do chamado a ser excluído

  useEffect(() => {
    fetchChamados();
  }, []);

  // Função para buscar os chamados com o nome do colaborador responsável
  const fetchChamados = async () => {
    try {
      const response = await getChamadosWithResponsavel(); // Usando a rota que traz o colaborador
      setChamados(response.data); // Atualiza os chamados
    } catch (error) {
      console.error('Erro ao buscar chamados:', error);
    }
  };

  // Função para abrir o modal de confirmação ao excluir
  const confirmDelete = (id) => {
    setChamadoToDelete(id); // Armazenar o chamado a ser deletado
    setShowModal(true); // Exibir o modal
  };

  // Função para realmente deletar o chamado após confirmação
  const handleDelete = async () => {
    try {
      await deleteChamado(chamadoToDelete); // Deleta o chamado armazenado
      fetchChamados(); // Atualiza a lista de chamados
      setShowModal(false); // Fecha o modal
      setChamadoToDelete(null); // Reseta o ID do chamado
    } catch (error) {
      console.error('Erro ao deletar chamado:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Encontrar o chamado original para manter os dados não alterados
      const chamadoOriginal = chamados.find(c => c.id_chamado === id);
  
      // Atualizar o chamado mantendo o campo 'responsavel_chamado' intacto
      await updateChamado(id, {
        status_chamado: newStatus,
        responsavel_chamado: chamadoOriginal.responsavel_chamado, // Garantir que o responsável não seja alterado        
      });
  
      // Atualizar a lista de chamados
      fetchChamados();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };
  

  const handleEdit = (id) => {
    window.location.href = `/editar-chamado/${id}`;
  };

  return (
    <div className="kanban">
      {/* Modal de confirmação */}
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)} // Fecha o modal sem deletar
        onConfirm={handleDelete} // Deleta após confirmação
        message="Tem certeza que deseja excluir este chamado?"
      />

      <div className="column">
        <h2>Em Aberto</h2>
        {chamados.filter(c => c.status_chamado === 'em_aberto').map(chamado => (
          <ChamadoCard
            key={chamado.id_chamado}
            chamado={chamado}
            onDelete={() => confirmDelete(chamado.id_chamado)} // Chama a função de confirmação
            onEdit={handleEdit}
            onChangeStatus={handleStatusChange}
          />
        ))}
      </div>

      <div className="column">
        <h2>Em Andamento</h2>
        {chamados.filter(c => c.status_chamado === 'em_atendimento').map(chamado => (
          <ChamadoCard
            key={chamado.id_chamado}
            chamado={chamado}
            onDelete={() => confirmDelete(chamado.id_chamado)} // Chama a função de confirmação
            onEdit={handleEdit}
            onChangeStatus={handleStatusChange}
          />
        ))}
      </div>

      <div className="column">
        <h2>Concluído</h2>
        {chamados.filter(c => c.status_chamado === 'concluido').map(chamado => (
          <ChamadoCard
            key={chamado.id_chamado}
            chamado={chamado}
            onDelete={() => confirmDelete(chamado.id_chamado)} // Chama a função de confirmação
            onEdit={handleEdit}
            onChangeStatus={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default GerenciamentoChamados;