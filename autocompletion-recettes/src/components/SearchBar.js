import React from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
	const [query, setQuery] = React.useState('');
	const [suggestions, setSuggestions] = React.useState([]);
	const [startsWithSuggestions, setStartsWithSuggestions] = React.useState([]);
	const [includesSuggestions, setIncludesSuggestions] = React.useState([]);
	const [activeIndex, setActiveIndex] = React.useState(-1);
	const [loading, setLoading] = React.useState(false); // Ajout du state loading
	const navigate = useNavigate();
	const formRef = React.useRef(null);

	const allSuggestions = [...startsWithSuggestions, ...includesSuggestions];

	React.useEffect(() => {
		setActiveIndex(-1);
	}, [startsWithSuggestions, includesSuggestions]);

	React.useEffect(() => {
		if (query.length < 2) {
			setSuggestions([]);
			setStartsWithSuggestions([]);
			setIncludesSuggestions([]);
			setLoading(false);
			return;
		}
		setLoading(true);
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
				setLoading(false);
			};
			fetchSuggestions();
		}, 300);
		return () => {
			clearTimeout(handler);
			setLoading(false);
		};
	}, [query]);

	React.useEffect(() => {
		function handleClickOutside(event) {
			if (formRef.current && !formRef.current.contains(event.target)) {
				setSuggestions([]);
				setStartsWithSuggestions([]);
				setIncludesSuggestions([]);
				setActiveIndex(-1);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSearch) {
			onSearch(query);
		}
		if (query.trim() !== '') {
			navigate(`/search?q=${encodeURIComponent(query)}`);
		}
	};

	const handleKeyDown = (e) => {
		if (allSuggestions.length === 0) return;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setActiveIndex(idx => (idx < allSuggestions.length - 1 ? idx + 1 : 0));
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setActiveIndex(idx => (idx > 0 ? idx - 1 : allSuggestions.length - 1));
		} else if (e.key === 'Enter' && activeIndex >= 0) {
			e.preventDefault();
			const sugg = allSuggestions[activeIndex];
			setQuery(sugg);
			setSuggestions([]);
			setStartsWithSuggestions([]);
			setIncludesSuggestions([]);
			if (onSearch) onSearch(sugg);
			navigate(`/search?q=${encodeURIComponent(sugg)}`);
		} else if (e.key === 'Escape') {
			setSuggestions([]);
			setStartsWithSuggestions([]);
			setIncludesSuggestions([]);
			setActiveIndex(-1);
		}
	};

	return (
		<form ref={formRef} className="search-form" onSubmit={handleSubmit} autoComplete="off">
			<div className="search-input-wrapper">
				<span className="search-icon" aria-label="Rechercher">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<circle cx="9" cy="9" r="7" stroke="#bbb" strokeWidth="2"/>
						<line x1="14.2" y1="14.2" x2="18" y2="18" stroke="#bbb" strokeWidth="2" strokeLinecap="round"/>
					</svg>
				</span>
				<input
					type="text"
					placeholder="Rechercher une recette..."
					value={query}
					onChange={e => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				{loading && <span className="loading-spinner"></span>}
			</div>
			<button type="submit">Rechercher</button>

			{/* Suggestions */}
			{(startsWithSuggestions.length > 0 || includesSuggestions.length > 0) && (
				<ul className="suggestions-list">
					{startsWithSuggestions.map((sugg, idx) => (
						<li key={"start-"+idx}
							className={activeIndex === idx ? 'active-suggestion' : ''}
							onClick={() => {
							setQuery(sugg);
							setSuggestions([]);
							setStartsWithSuggestions([]);
							setIncludesSuggestions([]);
							if (onSearch) onSearch(sugg);
							navigate(`/search?q=${encodeURIComponent(sugg)}`);
						}}
					><b>{sugg}</b></li>
					))}
					{startsWithSuggestions.length > 0 && includesSuggestions.length > 0 && (
						<li className="suggestion-separator"><span>Autres résultats</span></li>
					)}
					{includesSuggestions.map((sugg, idx) => (
						<li key={"inc-"+idx}
							className={activeIndex === (idx + startsWithSuggestions.length) ? 'active-suggestion' : ''}
							onClick={() => {
							setQuery(sugg);
							setSuggestions([]);
							setStartsWithSuggestions([]);
							setIncludesSuggestions([]);
							if (onSearch) onSearch(sugg);
							navigate(`/search?q=${encodeURIComponent(sugg)}`);
						}}
					>{sugg}</li>
					))}
				</ul>
			)}
		</form>
	);
}

export default SearchBar;
