import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const locations = [
  { lat: -3.745, lng: -38.523 },
  { lat: -3.745, lng: -37.523 },
  { lat: -3.745, lng: -36.523 }
];

const MyComponent = () => {
  const [directions, setDirections] = useState(null);

  const fetchDirections = (origin, destinations) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destinations.pop(),
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: destinations.map(destination => ({ location: destination, stopover: true })),
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  useEffect(() => {
    const firstLocation = locations[0];
    const otherLocations = locations.slice(1);
    fetchDirections(firstLocation, otherLocations);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} // 여기에 실제 API 키를 넣으세요.
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {locations.map((loc, idx) => (
          <Marker key={idx} position={loc} />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyComponent;
