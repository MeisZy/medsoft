import SearchBar from './navbar_components/SearchBar';
import SearchResultsList from './navbar_components/SearchResultsList';

import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
//import axios from 'axios';
import './Navbar.css';

function Navbar() {
// const [serverStatus, setServerStatus] = useState('');
  const [time, setTime] = useState(new Date());
  const [results, setResults] = useState<{name: string}[]>([]);


  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><Link to ="#">About Devs</Link></li> 
          <p><a>{time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</a></p>
          <li className= "searchbar"><SearchBar setResults={setResults}/></li>
          <SearchResultsList  results={results}/>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;