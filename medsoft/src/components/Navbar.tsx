import {useState,useEffect} from 'react';
import axios from 'axios';
import './Navbar.css'

function Navbar() {

  const [serverStatus, setServerStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4069')
      .then(response => {
        if (response.data.onlineMessage) {
          setServerStatus('Express server is running successfully.');
        }
      })
      .catch(error => {
        console.error('Error fetching server status:', error);
      });
  }, []); 

  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="https://facebook.com">
              Home 
            </a>
          </li>
          <li>
            <a>{serverStatus}</a> 
          </li>
          <li>
            <a href= "https://rzyrusg.vercel.app">About Dev</a> 
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar