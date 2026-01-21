import React from 'react';

function Home() {
  return (
    <div className="center-container">
      <form className="search-form">
        <h1>Bienvenue sur la page d'accueil</h1>
        <input type="text" placeholder="Rechercher une recette..." />
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
}

export default Home;
