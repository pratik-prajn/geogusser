import { MapComponent } from "../../app/googlemaps";
import { MapProvider } from "../../providers/map-provider";
import Navbar from "../components/Navbar";

export default function GamePage() {
  return (
    <div>
      <Navbar />
      <MapProvider>
        <MapComponent/>
      </MapProvider>
    </div>
  );
}