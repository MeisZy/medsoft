  import './Home.css';
  import "leaflet/dist/leaflet.css";
  import DefaultPin from '../assets/images/mapmarker/default_pin.png';
  import PrimaryPin from '../assets/images/mapmarker/primary_pin.png';
  import SecondaryPin from '../assets/images/mapmarker/secondary_pin.png';
  import TertiaryPin from '../assets/images/mapmarker/tertiary_pin.png';
  import Amogus from '../assets/images/mapmarker/amogus.png';
  import { useState, useEffect, useRef } from 'react';

  import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
  import { Icon } from "leaflet";

  function Home() {

    
      return (
        <>
          <nav>
            <ul>
              <li>test</li>
            </ul>
          </nav>
 
        </>
      );
    }
    
    export default Home;
