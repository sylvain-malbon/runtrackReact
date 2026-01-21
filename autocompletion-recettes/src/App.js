

import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Home />
    </div>
  );
}

export default App;
