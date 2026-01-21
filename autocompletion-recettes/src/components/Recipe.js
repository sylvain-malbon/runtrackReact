import React from 'react';
import { useParams } from 'react-router-dom';

function Recipe() {
  const { id } = useParams();

  return (
    <div style={{textAlign: 'center', marginTop: '3rem'}}>
      <h2>Détail de la recette</h2>
      <p>ID de la recette : <span style={{color: 'orange'}}>{id}</span></p>
      {/* Affichage des détails à venir */}
    </div>
  );
}

export default Recipe;
