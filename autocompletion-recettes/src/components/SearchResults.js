
import React from 'react';
import { useSearchParams } from 'react-router-dom';

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.meals || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Erreur lors de la récupération des données.');
        setLoading(false);
      });
  }, [query]);

  return (
    <div>
      <h2>Résultats pour : <span style={{color: 'orange'}}>{query}</span></h2>
      {loading && <div>Chargement...</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      {/* Résultats de recherche s'afficheront ici */}
    </div>
  );
}

export default SearchResults;
