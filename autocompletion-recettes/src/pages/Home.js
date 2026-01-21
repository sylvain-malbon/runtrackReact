

import React from 'react';
import '../pages/Home.css';
import SearchBar from '../components/SearchBar';

function Home() {
  return (
    <div className="center-container">
      <div className="google-title">
        Goût<span className="orange-gle">gle</span>
      </div>
      <SearchBar />
    </div>
  );
}

export default Home;
