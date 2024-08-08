import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import { useTravelStore } from "../store/store";
import { APIProvider,Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
interface pos {
  lat: number;
  lng: number;
}

const CustomMap = () => {
  // const [markerLocation, setMarkerLocation] = useState<pos[]>([
  //   { lat: 37.5115557, lng: 127.0595261 },
  //   { lat: 37.5062379, lng: 127.0050378 },
  //   { lat: 37.566596, lng: 127.007702 },
  //   { lat: 37.5251644, lng: 126.9255491 },
  //   { lat: 37.5125585, lng: 127.1025353 },
  //   { lat: 37.563692, lng: 126.9822107 },
  //   { lat: 37.5173108, lng: 126.9033793 },
  // ]);

  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  // useEffect(() => {
  //   if (!routesLibrary || !map) return;
  //   setDirectionsService(new routesLibrary.DirectionsService());
  //   setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
  // }, [routesLibrary, map]);

  // // Use directions service
  // useEffect(() => {
  //   if (!directionsService || !directionsRenderer) return;

  //   directionsService
  //     .route({
  //       origin: '100 Front St, Toronto ON',
  //       destination: '500 College St, Toronto ON',
  //       travelMode: google.maps.TravelMode.DRIVING,
  //       provideRouteAlternatives: true
  //     })
  //     .then(response => {
  //       directionsRenderer.setDirections(response);
  //       setRoutes(response.routes);
  //     });

  //   return () => directionsRenderer.setMap(null);
  // }, [directionsService, directionsRenderer]);

  // // Update direction route
  //   useEffect(() => {
  //     if (!directionsRenderer) return;
  //     directionsRenderer.setRouteIndex(routeIndex);
  //   }, [routeIndex, directionsRenderer]);

  //   if (!leg) return null;

    return (
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ''}>
        <Map
          defaultCenter={{lat: 43.65, lng: -79.38}}
          defaultZoom={9}
          gestureHandling={'greedy'}
          fullscreenControl={false}>
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
              <></>
              // <li key={route.summary}>
              //   <button onClick={() => setRouteIndex(index)}>
              //     {/* {route.summary} */}
              //   </button>
              // </li>
            ))}
          </ul>
        </div>
        </Map>
      </APIProvider>
    );
};

export default CustomMap;
