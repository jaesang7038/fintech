import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { MarkerWithInfowindow } from './marker-with-infowindow';


function Directions() {
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
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: '100 Front St, Toronto ON',
        destination: '500 College St, Toronto ON',
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      })
      .then((response: any) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="w">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route: any, index: number) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


const VisMap: React.FC = () => {

  return (
    // <APIProvider apiKey={"AIzaSyA_00X2sLpP6XCdmtmKaPI7RKd8u7GbPVc"}>
    //   <Map
    //     mapId={'bf51a910020fa25a'}
    //     defaultCenter={{ lat: 43.65, lng: -79.38 }}
    //     defaultZoom={9}
    //     gestureHandling={'greedy'}
    //     fullscreenControl={false}>
    //     {/* <Directions /> */}

    //     <MarkerWithInfowindow lat={43.65} lng={-79.38} infoWindowContent={""} />
    //   </Map>
    // </APIProvider>
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ''}>
      <Map
        mapId={'bf51a910020fa25a'}
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={'greedy'}
        disableDefaultUI={true} >

      </Map>
    </APIProvider>
  );
};

export default VisMap;