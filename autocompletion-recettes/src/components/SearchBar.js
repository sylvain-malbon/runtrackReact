import React from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
	const [query, setQuery] = React.useState('');
	const [suggestions, setSuggestions] = React.useState([]); // Ajout du state suggestions
	const navigate = useNavigate();

	React.useEffect(() => {
		if (query.length < 2) {
			setSuggestions([]);
			return;
		}
		const handler = setTimeout(() => {
			const fetchSuggestions = async () => {
				try {
					const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
					const data = await res.json();
					if (data.meals) {
						setSuggestions(data.meals.map(meal => meal.strMeal).slice(0, 10));
					} else {
						setSuggestions([]);
					}
				} catch (e) {
					setSuggestions([]);
				}
			};
			fetchSuggestions();
		}, 300);
		return () => clearTimeout(handler);
	}, [query]);

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
		<form className="search-form" onSubmit={handleSubmit} autoComplete="off">
			<input
				type="text"
				placeholder="Rechercher une recette..."
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
			<button type="submit">Rechercher</button>

			{/* Suggestions */}
			{suggestions.length > 0 && (
				<ul className="suggestions-list">
					{suggestions.map((sugg, idx) => (
						<li key={idx} onClick={() => {
							setQuery(sugg);
							setSuggestions([]);
							if (onSearch) onSearch(sugg);
							navigate(`/search?q=${encodeURIComponent(sugg)}`);
						}}>{sugg}</li>
					))}
				</ul>
			)}
		</form>
	);
}

export default SearchBar;
