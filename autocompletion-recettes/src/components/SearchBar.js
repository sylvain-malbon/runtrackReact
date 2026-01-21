

import React from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';


	const [query, setQuery] = React.useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSearch) {
			onSearch(query);
		}
		if (query.trim() !== '') {
			navigate(`/search?q=${encodeURIComponent(query)}`);
		}
	};

	return (
		<form className="search-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Rechercher une recette..."
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
			<button type="submit">Rechercher</button>
		</form>
	);
}

export default SearchBar;
