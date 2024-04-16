import SearchBar from './navbar_components/SearchBar';
import SearchResultsList from './navbar_components/SearchResultsList';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [results, setResults] = useState<{name: string}[]>([]);

  return (
    <>
      <nav>
        <ul>
          <li className= "searchbar"><SearchBar setResults={setResults}/></li>
          <SearchResultsList  results={results}/>
          <li className='home'><a href="#">Home</a></li>
          <li className='devs'><Link to ="#">About Devs</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;