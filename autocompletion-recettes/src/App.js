

import Recipe from './components/Recipe';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </div>
  );
}

export default App;
