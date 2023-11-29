// App.js
import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Mapa from '../Mapa';
import Pesquisa from '../Pesquisa';
import ModalCadastro from '../ModalCadastro';
import { getDatabase, ref, push, onValue, get, set } from 'firebase/database';


const Home = () => {
  const [locais, setLocais] = useState([]);
  const [locaisFiltrados, setLocaisFiltrados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const db = getDatabase(firebase);
    
    const marcadoresRef = ref(db, 'marcadores');

    onValue(marcadoresRef, (snapshot) => {
      const marcadores = snapshot.val();
      const listaMarcadores = [];

      for (let id in marcadores) {
        listaMarcadores.push({
          id,
          ...marcadores[id],
        });
      }

      setLocais(listaMarcadores);
    });
  }, []);

  const handleSelecionarLocal = (locaisSelecionados) => {
    setLocaisFiltrados(locaisSelecionados);
  };

  const handleSalvarLocal = (novoLocal) => {
    // Lógica para salvar o novo local no Firebase
    const locaisRef = firebase.database().ref('locais');
    locaisRef.push(novoLocal);

    // Fechar o modal após salvar
    setModalAberto(false);
  };

  return (
    <div>
      <Mapa locais={locaisFiltrados.length > 0 ? locaisFiltrados : locais} />
      <Pesquisa locais={locais} onSelecionarLocal={handleSelecionarLocal} />
      <button onClick={() => setModalAberto(true)}>Novo Local</button>
      <ModalCadastro
        isOpen={modalAberto}
        onRequestClose={() => setModalAberto(false)}
        onSave={handleSalvarLocal}
      />
    </div>
  );
};

export default Home;
