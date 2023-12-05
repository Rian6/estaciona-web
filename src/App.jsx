// App.js
import React, { useState, useEffect } from 'react';
import firebase from './components/firebase';
import Mapa from './components/Mapa';
import Pesquisa from './components/Pesquisa';
import { getDatabase, ref, push, onValue, get, set } from 'firebase/database';
import './App.css';

const App = () => {
  const [locais, setLocais] = useState([]);
  const [locaisFiltrados, setLocaisFiltrados] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState({});

  useEffect(() => {
    const db = getDatabase(firebase);

    getMarcadores(db);
  }, []);

  const getMarcadores = () => {
    console.log("TESTE NOVO")
    const marcadoresRef = ref(getDatabase(firebase), 'marcadores');

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
  }

  const handleSelecionarLocal = (locaisSelecionados) => {
    setLocaisFiltrados(locaisSelecionados);
  };

  function handlerItem(item) {
    setItemSelecionado(item)
  }

  return (
    <div className='btn-wrap'>
      <Mapa locais={locais} itemSelecionado={itemSelecionado}/>
      <div className='btn-wrap-button'>
        <Pesquisa locais={locais} handlerItem={handlerItem} onSelecionarLocal={handleSelecionarLocal} getMarcadores={getMarcadores}/>
      </div>
    </div>
  );
};

export default App;