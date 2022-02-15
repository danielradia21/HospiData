import maekerIcon from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { MapContainer , TileLayer, Marker, Popup } from 'react-leaflet'
export function HealthSection() {
    return (
     
        <div className="about-us-section health-section-container">
            <div className="section-content">
                <h1>Welcome to Your Health Center</h1>
                <p>
                    The Hospi Data Health System has dozens of locations in
                    several states. Thousands of patients from around the world
                    travel to Hospi Data locations, and Hospi Data's
                    International Patient Offices help ensure that distance and
                    language are not obstacles to receiving world-class care.
                </p>
            </div>
            <MapContainer className="map" center={[42.08853550492383, -71.4054935980649]} zoom={17} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[42.08853550492383, -71.4054935980649]} icon={new Icon({iconUrl:maekerIcon , iconSize:[25,41],iconAnchor:[12,41]})}>
        <Popup>
        HospiData Health Center
        </Popup>
      </Marker>
    </MapContainer>
        </div>

    );
}
