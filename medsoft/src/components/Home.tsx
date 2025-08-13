import './Home.css';
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import DefaultPin from '../assets/images/mapmarker/default_pin.png';
import PrimaryPin from '../assets/images/mapmarker/primary_pin.png';
import SecondaryPin from '../assets/images/mapmarker/secondary_pin.png';
import TertiaryPin from '../assets/images/mapmarker/tertiary_pin.png';
import { Icon } from 'leaflet';

interface Location {
  latitude: number;
  longitude: number;
}

interface Hospital {
  name: string;
  latitude: number;
  longitude: number;
  HospitalsType: 'Primary' | 'Secondary' | 'Tertiary';
  city?: string;
  location: Location;
}

function RoutingControl({ start, end }: { start: L.LatLng; end: L.LatLng }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [start, end],
      routeWhileDragging: true,
      showAlternatives: true,
      fitSelectedRoute: true,
      lineOptions: {
        styles: [
          { color: '#2196f3', opacity: 0.8, weight: 4 }
        ]
      }
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, start, end]);

  return null;
}

function LocationMarker({ onLocationSelect }: { onLocationSelect: (latlng: L.LatLng) => void }) {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate({
      watch: true,
      enableHighAccuracy: true
    });

    map.on('locationfound', (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });

    return () => {
      map.stopLocate();
    };
  }, [map]);

  const userIcon = new Icon({
    iconUrl: DefaultPin,
    iconSize: [25, 35],
    iconAnchor: [12, 35],
    popupAnchor: [0, -35],
  });

  return position === null ? null : (
    <Marker 
      position={position} 
      icon={userIcon}
      eventHandlers={{
        click: () => onLocationSelect(position)
      }}
    >
      <Popup>
        <div>
          <h4>Your Location</h4>
          <p>Latitude: {position.lat.toFixed(6)}</p>
          <p>Longitude: {position.lng.toFixed(6)}</p>
          <p>Click to set as starting point</p>
        </div>
      </Popup>
    </Marker>
  );
}

function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvContent, setCsvContent] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospitals, setSelectedHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<L.LatLng | null>(null);

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

  const handleMarkerClick = (hospital: Hospital) => {
    if (userLocation) {
      setSelectedHospitals([
        { ...hospital, latitude: hospital.latitude, longitude: hospital.longitude }
      ]);
    } else {
      setSelectedHospitals(prev => {
        if (prev.length === 2) {
          return [hospital];
        }
        return [...prev, hospital];
      });
    }
  };

  const handleUserLocationSelect = (latlng: L.LatLng) => {
    setUserLocation(latlng);
    setSelectedHospitals([]);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvContent(text);
    };
    reader.readAsText(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('http://localhost:5000/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setUploadStatus(`Successfully imported ${response.data.imported} of ${response.data.total} records`);
      fetchHospitals();

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload failed:', error);
      setUploadStatus(error.message || 'Upload failed. Please try again.');
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/hospitals');
      setHospitals(response.data);
    } catch (error) {
      console.error('Failed to fetch hospitals:', error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <>
<nav className="navigation">
  <ul>
    <li className="nav-title">
      <p>Medsoft</p>
    </li>
    <li>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="upload-button"
      >
        Upload CSV
      </button>
    </li>
    {uploadStatus && (
      <li className="status-message">{uploadStatus}</li>
    )}
  </ul>
</nav>

      {csvContent && (
        <div className="csv-debug">
          <h3>CSV Content Preview:</h3>
          <pre>{csvContent}</pre>
        </div>
      )}

      <MapContainer center={[14.6258, 121.0617]} zoom={16}>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        <LocationMarker onLocationSelect={handleUserLocationSelect} />

        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            position={[hospital.latitude, hospital.longitude]}
            icon={
              hospital.HospitalsType === 'Primary'
                ? primaryIcon
                : hospital.HospitalsType === 'Secondary'
                ? secondaryIcon
                : tertiaryIcon
            }
            eventHandlers={{
              click: () => handleMarkerClick(hospital)
            }}
          >
            <Popup>
              <h3>{hospital.name}</h3>
              <p>Type: {hospital.HospitalsType}</p>
              {hospital.city && <p>City: {hospital.city}</p>}
            </Popup>
          </Marker>
        ))}

        {userLocation && selectedHospitals.length === 1 && (
          <RoutingControl
            start={userLocation}
            end={L.latLng(selectedHospitals[0].latitude, selectedHospitals[0].longitude)}
          />
        )}

        {!userLocation && selectedHospitals.length === 2 && (
          <RoutingControl
            start={L.latLng(selectedHospitals[0].latitude, selectedHospitals[0].longitude)}
            end={L.latLng(selectedHospitals[1].latitude, selectedHospitals[1].longitude)}
          />
        )}
      </MapContainer>
    </>
  );
}

export default Home;