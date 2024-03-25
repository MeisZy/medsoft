import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
//import axios from 'axios';
import './Navbar.css';

function Navbar() {
// const [serverStatus, setServerStatus] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><Link to ="/aboutdevs">About Devs</Link></li> 
          <p><a>{time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</a></p>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;