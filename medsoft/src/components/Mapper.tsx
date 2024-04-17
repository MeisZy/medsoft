import './Mapper.css';
import "leaflet/dist/leaflet.css";
import Amogus from '../assets/images/mapmarker/amogus.png';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon } from "leaflet";

function Mapper(){

  const markers = [
    {
      geocode: [14.6258, 121.0617],
      popUp: "your very first react leaflet marker"
    },
    {
      geocode: [14.6258, 121.0637],
      popUp: "your 2nd react leaflet marker"
    },
    {
      geocode: [14.6258, 121.0657],
      popUp: "your 3rd react leaflet marker"
    },
  ]

  const customIcon = new Icon({
    iconUrl: Amogus,
    iconSize: [20, 20]
  })

  const origin = [14.6258, 121.0617]

  return(
    <>
      <MapContainer
      //@ts-expect-error ignore squiggly
        center={origin}
        zoom={13}
      >
        <TileLayer 
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {markers.map(marker => (         
          <Marker 
          //@ts-expect-error ignore position squggly
            position={marker.geocode}
            icon={customIcon}
          >
            <Popup>{marker.popUp}</Popup>  
          </Marker>
        ))}
      </MapContainer>
    </>
  ) 
}
  

export default Mapper;