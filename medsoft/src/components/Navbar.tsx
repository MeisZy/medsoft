import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';

function Navbar() {
  const [serverStatus, setServerStatus] = useState('');
  const [time, setTime] = useState(new Date());

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

    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a>{serverStatus}</a>
          </li>
          <li>
            <a href="https://rzyrusg.vercel.app">About Dev</a>
          </li> 
          <p>
            <a>{time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</a>
          </p>
        </ul>
       
      </nav>
    </>
  );
}

export default Navbar;