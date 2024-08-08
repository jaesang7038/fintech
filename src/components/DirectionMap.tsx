import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer, Marker, MarkerF } from "@react-google-maps/api";
import { useTravelStore } from "../store/store";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const mapContainerStyle = {
  width: "800px",
  height: "600px",
};
const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const DirectionMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '' ,
    libraries: ["places"],
  });

  const { mapInfo } = useTravelStore();

  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];

  const mapRef = useRef<google.maps.Map | null>(null);
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);


  // Use directions service
  useEffect(() => {
    if (!isLoaded || mapInfo.length === 0) return;
    if (!directionsService || !directionsRenderer) return;

    // const markers = mapInfo.slice(1, -1).map(({ lat, lng }) => ({
    //   lat, lng
    // }));

    const waypoints = mapInfo.slice(1, -1).map(({ lat, lng }) => ({
      location: new google.maps.LatLng(lat, lng),
      stopover: false,
    }));

    directionsService
      .route({
        origin: new google.maps.LatLng(mapInfo[0].lat, mapInfo[0].lng),
        destination: new google.maps.LatLng(mapInfo[mapInfo.length - 1].lat, mapInfo[mapInfo.length - 1].lng),
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints,
        provideRouteAlternatives: false
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    // directionsService.route(
    //   {
    //     origin: new google.maps.LatLng(mapInfo[0].lat, mapInfo[0].lng),
    //     destination: new google.maps.LatLng(mapInfo[mapInfo.length - 1].lat, mapInfo[mapInfo.length - 1].lng),
    //     travelMode: google.maps.TravelMode.DRIVING,
    //     waypoints,
    //     provideRouteAlternatives: false
    //   },
    //   (result, status) => {
    //     console.log(result)
    //     if (status === google.maps.DirectionsStatus.OK) {

    //       directionsRenderer.setDirections(response);
    //       setMarkers(markers);
    //     } else {
    //       console.error(`error fetching directions ${result}`);
    //     }
    //   }
    // );
    return () => directionsRenderer.setMap(null);
  }, [isLoaded, mapInfo]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  // if (loadError) return <div>Error loading maps</div>;
  // if (!isLoaded) return <div>Loading Maps</div>;

  if (!leg) return null;

  return (

    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={8}
      onLoad={(map) => {
        mapRef.current = map;
        return undefined; // 명시적으로 void 반환
      }}
    >
      <div className="directions">
        <h2>{selected.summary}</h2>
        <p>
          {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
        </p>
        <p>Distance: {leg.distance?.text}</p>
        <p>Duration: {leg.duration?.text}</p>

        <h2>Other Routes</h2>
        <ul>
          {routes.map((route, index) => (
            <li key={route.summary}>
              <button onClick={() => setRouteIndex(index)}>
                {route.summary}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* {markers.map((marker, index) => (
        <MarkerF
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          // icon={{
          //   url: "path_to_custom_icon.png", // 커스텀 아이콘 URL
          //   scaledSize: new google.maps.Size(50, 50), // 아이콘 크기
          // }}
        />
      ))} */}
    </GoogleMap>
  );
};

export default DirectionMap;
