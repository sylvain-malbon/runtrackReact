
import React from 'react';
import { useSearchParams } from 'react-router-dom';

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div>
      <h2>Résultats pour : <span style={{color: 'orange'}}>{query}</span></h2>
      {/* Résultats de recherche s'afficheront ici */}
    </div>
  );
}

export default SearchResults;
