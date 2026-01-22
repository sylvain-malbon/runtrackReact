import React from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
	const [query, setQuery] = React.useState('');
	const [suggestions, setSuggestions] = React.useState([]); // Ajout du state suggestions
	const [startsWithSuggestions, setStartsWithSuggestions] = React.useState([]); // Suggestions qui commencent par
	const [includesSuggestions, setIncludesSuggestions] = React.useState([]); // Suggestions qui contiennent
	const navigate = useNavigate();

	React.useEffect(() => {
		if (query.length < 2) {
			setSuggestions([]);
			setStartsWithSuggestions([]);
			setIncludesSuggestions([]);
			return;
		}
		const handler = setTimeout(() => {
			const fetchSuggestions = async () => {
				try {
					const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
					const data = await res.json();
					if (data.meals) {
						const all = data.meals.map(meal => meal.strMeal);
						const starts = all.filter(name => name.toLowerCase().startsWith(query.toLowerCase()));
						const includes = all.filter(name => !name.toLowerCase().startsWith(query.toLowerCase()) && name.toLowerCase().includes(query.toLowerCase()));
						setStartsWithSuggestions(starts.slice(0, 10));
						setIncludesSuggestions(includes.slice(0, 10 - starts.length));
						setSuggestions([...starts.slice(0, 10), ...includes.slice(0, 10 - starts.length)]);
					} else {
						setSuggestions([]);
						setStartsWithSuggestions([]);
						setIncludesSuggestions([]);
					}
				} catch (e) {
					setSuggestions([]);
					setStartsWithSuggestions([]);
					setIncludesSuggestions([]);
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
			{(startsWithSuggestions.length > 0 || includesSuggestions.length > 0) && (
				<ul className="suggestions-list">
					{startsWithSuggestions.map((sugg, idx) => (
						<li key={"start-"+idx} onClick={() => {
							setQuery(sugg);
							setSuggestions([]);
							setStartsWithSuggestions([]);
							setIncludesSuggestions([]);
							if (onSearch) onSearch(sugg);
							navigate(`/search?q=${encodeURIComponent(sugg)}`);
						}}><b>{sugg}</b></li>
					))}
					{startsWithSuggestions.length > 0 && includesSuggestions.length > 0 && (
						<li className="suggestion-separator"><em>Autres résultats</em></li>
					)}
					{includesSuggestions.map((sugg, idx) => (
						<li key={"inc-"+idx} onClick={() => {
							setQuery(sugg);
							setSuggestions([]);
							setStartsWithSuggestions([]);
							setIncludesSuggestions([]);
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
