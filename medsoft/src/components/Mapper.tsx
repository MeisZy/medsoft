import './Mapper.css';
import "leaflet/dist/leaflet.css";
import DefaultPin from '../assets/images/mapmarker/default_pin.png';
import Amogus from '../assets/images/mapmarker/amogus.png';
import {useState, useEffect} from 'react'
import '../assets/datasets/medical_facilities_osm.csv'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";

function Mapper() {
  const [position, setPosition] = useState(null); 
  const markers = [
    {
      geocode: [14.6258, 121.0617],
      popUp: "your very first react leaflet marker",
    },
    {
      geocode: [14.6258, 121.0637],
      popUp: "your 2nd react leaflet marker",
    },
    {
      geocode: [14.6258, 121.0657],
      popUp: "your 3rd react leaflet marker",
    },
  ];

  const customIcon = new Icon({
    iconUrl: DefaultPin,
    iconSize: [20, 30],
  });
  const currentPositionIcon = new Icon({
    iconUrl: Amogus,
    iconSize: [20, 30],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.error("Error fetching location", err)
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []); // Empty dependency array to run only once on component mount

  return (
    <>
      <MapContainer center={position || [14.6258, 121.0617]} zoom={16}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {position && ( // Render markers only if position is available
          <Marker position={position} icon={currentPositionIcon}>
            <Popup>You are here!</Popup>
          </Marker>
        )}

        {markers.map((marker) => (
          <Marker key={marker.popUp} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default Mapper;
