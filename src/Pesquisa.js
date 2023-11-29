// Pesquisa.js
import React, { useState } from 'react';

const Pesquisa = ({ locais, onSelecionarLocal }) => {
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const handlePesquisa = () => {
    // Lógica para filtrar locais com base no termo de pesquisa
    const locaisFiltrados = locais.filter((local) =>
      local.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

    // Callback para informar ao pai sobre os locais filtrados
    onSelecionarLocal(locaisFiltrados);
  };

  return (
    <div>
      <input
        type="text"
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
      />
      <button onClick={handlePesquisa}>Pesquisar</button>
    </div>
  );
};

export default Pesquisa;
