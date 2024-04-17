import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SettingsIcon from '../assets/images/settings.png';
import Settings from './navbar_components/Settings';
//import SearchResultsList from './navbar_components/SearchResultsList';

function Navbar({ onFilterChange }) {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <>
      <nav>
        <ul>
          <li className="searchbar">...</li>
          <li>
            {showSettings && <Settings onFilterChange={onFilterChange} />}
            <img src={SettingsIcon} style={{ width: '25px', height: '25px' }} onClick={toggleSettings} className='settingsrotate'/>
          </li>
          <li className='home'><a href="#">Home</a></li>
          <li className='devs'><Link to="#">About Devs</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
