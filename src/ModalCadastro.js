// ModalCadastro.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import PlacesAutocomplete from './PlacesAutoComplete';

const ModalCadastro = ({ isOpen, onRequestClose, onSave }) => {
  const [nomeLocal, setNomeLocal] = useState('');
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const handleSalvar = () => {
    // Lógica para salvar o novo local
    onSave({ nome: nomeLocal, termoPesquisa });

    // Limpar campos após salvar
    setNomeLocal('');
    setTermoPesquisa('');
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Cadastro de Local</h2>
      <label>Nome do Local:</label>
      <input
        type="text"
        value={nomeLocal}
        onChange={(e) => setNomeLocal(e.target.value)}
      />
      <label>Pesquisar Local no Google Maps:</label>
      <PlacesAutocomplete/>
      <button onClick={handleSalvar}>Salvar</button>
    </Modal>
  );
};

export default ModalCadastro;
