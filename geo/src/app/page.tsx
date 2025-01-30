import GoogleMapComponent from "../app/googlemaps";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">World Map</h1>
      <GoogleMapComponent />
    </div>
  );
}
