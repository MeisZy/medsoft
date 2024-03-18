import './Mapper.css';
import "leaflet/dist/leaflet.css";

import Amogus from '../assets/images/mapmarker/amogus.png'

import { MapContainer,TileLayer, Marker, Popup} from 'react-leaflet';
import {Icon} from "leaflet";

function Mapper(){

  //named "markers" by default. DO NOT change the variable name.
  const markers = [
    {
      geocode:[14.617290,121.059311],
      popUp: "your very first react leaflet marker"
    },
    {
      geocode:[14.618290,121.059311],
      popUp: "your 2nd react leaflet marker"
    },
    {
      geocode:[14.613290,121.059311],
      popUp: "your 3rd react leaflet marker"
    },
  ]

  const customIcon = new Icon({
    /*
    iconUrl: require("path/of/image") works too.
    */
    iconUrl:(Amogus),
    iconSize:[20,20]
  })


  return(
    <>
      <MapContainer
        center={[14.617290,121.059311]}
        zoom={13}>
        
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {markers.map(marker => (         
          <Marker 
          //@ts-expect-error ignore squiggly at attribute 'position'
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