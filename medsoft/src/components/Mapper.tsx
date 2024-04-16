import './Mapper.css';
import "leaflet/dist/leaflet.css";
//import {useState} from 'react';
import Amogus from '../assets/images/mapmarker/amogus.png';

import '../assets/datasets/medical_facilities_osm.csv'

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon } from "leaflet";

function Mapper(){
  const markers = [
    {
      geocode: [14.6258,121.0617],
      popUp: "top of the world"
    }
  ]

  //attributes of leaflet marker
  const customIcon = new Icon({
    iconUrl: Amogus,
    iconSize: [20, 20]
  })

  const origin = [14.6258,121.0617]

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
  {/*

const [mapHeight, setMapHeight] = useState(400); 

  useEffect(() => {
    const handleResize = () => {
      setMapHeight(window.innerHeight * 0.8); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <div className='leaflet-container' style={{ height: `${mapHeight}px` }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={[51.505, -0.09]}></Marker>
        </div>
      </MapContainer>
    </>
  );
};


  */}

   /* type Dictionary = Record<string,string>;

  const tiers: Dictionary = {
    'primary':'#55eb34',
    'secondary':'#ecf005',
    'tertiary':'#f09205',
    'quarternay':'#ff2200',
  }*/