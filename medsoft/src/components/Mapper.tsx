  import './Mapper.css';
  import "leaflet/dist/leaflet.css";
  import DefaultPin from '../assets/images/mapmarker/default_pin.png';
  import PrimaryPin from '../assets/images/mapmarker/primary_pin.png';
  import SecondaryPin from '../assets/images/mapmarker/secondary_pin.png';
  import TertiaryPin from '../assets/images/mapmarker/tertiary_pin.png';
  import Amogus from '../assets/images/mapmarker/amogus.png';
  import { useState, useEffect, useRef } from 'react';

  import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
  import { Icon } from "leaflet";

  function Mapper() {
    const origin = [14.6258, 121.0617];
    const [position, setPosition] = useState(null); 
    const [selectedMarkers, setSelectedMarkers] = useState([]);
    const markers = [
      {
        geocode: [14.5241939, 120.9965839],
        popUp: "Protacio Hospital",
        tier: "Tertiary"
      },
      {
        geocode: [14.6579206, 120.9919955],
        popUp: "Ronn Carmel Hospital",
        tier: "Tertiary"
      },
      {
        geocode: [14.6122477, 120.9898193],
        popUp: "UST Hospital Clinical Division",
        tier: "Tertiary"
      },
      {
        geocode: [14.719531, 121.007156],
        popUp: "Lady Of Lourdes Hospital Of Kaybiga",
        tier: "Tertiary"
      },
      {
        geocode: [14.721521, 121.0397952],
        popUp: "Our Lady Of Mercy Hospital",
        tier: "Tertiary"
      },
      {
        geocode: [14.7303, 121.043441],
        popUp: "A. R. Bautista Children And General Hospital",
        tier: "Primary"
      },
      {
        geocode: [14.6931601, 120.9656248],
        popUp: "St. John Hospital",
        tier: "Tertiary"
      },
      {
        geocode: [14.659791, 120.991958],
        popUp: "John-paul Hospital",
        tier: "Tertiary"
      },
      {
        geocode: [14.7370013, 121.070637],
        popUp: "Casual General Hospital",
        tier: "Primary"
      },
      {
        geocode: [14.6599034, 121.0250945],
        popUp: "J. P. Sioson General Hospital And Colleges",
        tier: "Primary"
      },
      {
        geocode: [14.646813, 120.9838197],
        popUp: "Hernandez General Hospital",
        tier: "Primary"
      },
      {
        geocode: [14.6171582, 121.0018723],
        popUp: "United Doctors Medical Center",
        tier: "Tertiary"
      },
      {
        geocode: [14.62762, 120.984481],
        popUp: "Mt. Carmel Maternity And Children's Clinic",
        tier: "Tertiary"
      },
      {
        geocode: [14.729371, 121.04251],
        popUp: "Fairview Polymedic Hospital",
        tier: "Tertiary"
      },
      {
        geocode: [14.653471, 120.989372],
        popUp: "Hernandez General Hospital",
        tier: "Primary"
      },
      {
        geocode: [14.58352, 121.085128],
        popUp: "Mother Regina",
        tier: "Tertiary"
      },
      {
        geocode: [14.6876655, 120.9575002],
        popUp: "A. P. Cruz Community Hospital",
        tier: "Tertiary"
      },
      {
        geocode: [14.6595215, 121.0235618],
        popUp: "Dr. Montano G. Ramos General Hospital",
        tier: "Primary"
      },
      {
        geocode: [14.7187774, 121.005167],
        popUp: "Bagbaguin Family Hospital",
        tier: "Tertiary"
      }  ];

      const primaryIcon = new Icon({
        iconUrl: PrimaryPin,
        iconSize: [20, 30],
        iconAnchor: [10, 30],
        popupAnchor: [0, -30],
      });
    
      const secondaryIcon = new Icon({
        iconUrl: SecondaryPin,
        iconSize: [20, 30],
        iconAnchor: [10, 30],
        popupAnchor: [0, -30],
      });
    
      const tertiaryIcon = new Icon({
        iconUrl: TertiaryPin,
        iconSize: [20, 30],
        iconAnchor: [10, 30],
        popupAnchor: [0, -30],
      });
    
      const currentPositionIcon = new Icon({
        iconUrl: Amogus,
        iconSize: [20, 30],
        iconAnchor: [10, 30],
        popupAnchor: [0, -30],
      });
    
      const polylineRef = useRef();
    
      useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
          (pos) => {
            setPosition([pos.coords.latitude, pos.coords.longitude]);
          },
          (err) => console.error("Error fetching location", err)
        );
    
        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      }, []);
    
      const handleMarkerClick = (marker) => {
        if (selectedMarkers.length === 2) {
          setSelectedMarkers([selectedMarkers[0], marker]);
        } else {
          setSelectedMarkers([...selectedMarkers, marker]);
        }
      };
    
      const calculateDistance = (coord1, coord2) => {
        const R = 6371; // Earth's radius in kilometers
        const φ1 = (coord1[0] * Math.PI) / 180;
        const φ2 = (coord2[0] * Math.PI) / 180;
        const Δφ = ((coord2[0] - coord1[0]) * Math.PI) / 180;
        const Δλ = ((coord2[1] - coord1[1]) * Math.PI) / 180;
    
        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        return R * c;
      };
    
      const renderPolyline = () => {
        if (selectedMarkers.length === 2) {
          const distance = calculateDistance(selectedMarkers[0].geocode, selectedMarkers[1].geocode);
          return (
            <>
              <Polyline positions={[selectedMarkers[0].geocode, selectedMarkers[1].geocode]} ref={polylineRef} />
              <Popup position={[
                (selectedMarkers[0].geocode[0] + selectedMarkers[1].geocode[0]) / 2,
                (selectedMarkers[0].geocode[1] + selectedMarkers[1].geocode[1]) / 2
              ]}>
                Distance: {distance.toFixed(2)} km
              </Popup>
            </>
          );
        }
        return null;
      };
    
      return (
        <>
          <MapContainer center={position || origin} zoom={16}>
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
    
            {position && (
              <Marker position={position} icon={currentPositionIcon}>
                <Popup>You are here!</Popup>
              </Marker>
            )}
    
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.geocode}
                icon={
                  marker.tier === 'Primary'
                    ? primaryIcon
                    : marker.tier === 'Secondary'
                    ? secondaryIcon
                    : tertiaryIcon
                }
                onClick={() => handleMarkerClick(marker)}
              >
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}
    
            {renderPolyline()}
          </MapContainer>
        </>
      );
    }
    
    export default Mapper;
