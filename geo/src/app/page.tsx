import { MapComponent } from "../app/googlemaps";
import { MapProvider } from "../providers/map-provider";
export default function Home() {
  return (
    <div>
      <MapProvider>
      <MapComponent/>
    </MapProvider>
     
    </div>
  );
}
