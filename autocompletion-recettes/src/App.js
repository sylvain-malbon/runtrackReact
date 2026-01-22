

import './App.css';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import RecipeDetail from './pages/RecipeDetail';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  );
}

export default App;
