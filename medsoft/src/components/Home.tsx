import './Home.css';
import "leaflet/dist/leaflet.css";
import DefaultPin from '../assets/images/mapmarker/default_pin.png';
import PrimaryPin from '../assets/images/mapmarker/primary_pin.png';
import SecondaryPin from '../assets/images/mapmarker/secondary_pin.png';
import TertiaryPin from '../assets/images/mapmarker/tertiary_pin.png';
import Amogus from '../assets/images/mapmarker/amogus.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon } from "leaflet";

// Type definitions for Hospital data
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

function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvContent, setCsvContent] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Preview CSV content
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvContent(text);
    };
    reader.readAsText(file);

    // Upload to server
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
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload failed:', error);
      setUploadStatus(error.message || 'Upload failed. Please try again.');
    }
  };

  // Fetch existing hospitals on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/hospitals');
        setHospitals(response.data);
      } catch (error) {
        console.error('Failed to fetch hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <>
      <nav className="navigation">
        <ul>
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
            <li className="status-message">
              {uploadStatus}
            </li>
          )}
        </ul>
      </nav>

      {/* Debug panel for CSV content */}
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
        >
          <Popup>
            <h3>{hospital.name}</h3>
            <p>Type: {hospital.HospitalsType}</p>
            {hospital.city && <p>City: {hospital.city}</p>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </>
  );
}

export default Home;