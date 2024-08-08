import React, { useEffect, useState } from 'react';
import './Main.scss';
import MyComponent from '../components/MyComponent';
import VisMap from '../components/VisMap';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import CustomMap from '../components/CustomMap';
import { Schedule, useTravelStore } from '../store/store';
import * as _ from "lodash";
import { MarkerWithInfowindow } from '../components/marker-with-infowindow';

interface Coordinates {
  lat: number;
  lng: number;
}


const TempMap: React.FC = () => {
  const defaultOrigin = {
    lat: 35.447676,
    lng: 135.294568
  };
  const defaultDestination = {
    lat: 35.486308,
    lng: 135.290720
  };
  const defaultCenter = {
    lat: 35.447676,
    lng: 135.294568
  };

  const [origin, setOrigin] =
    useState<Schedule>();
  const [destination, setDestination] =
    useState<Schedule>();

  const [center, setCenter] =
    useState<Coordinates>(defaultCenter);

  const [waypoints, setWaypoints] =
    useState<Schedule[]>([]);
  const [markers, setMarkers] =
    useState<any[]>([]);

  const [isLoad, setIsLoad] =
    useState<boolean>(false);

  const {
    startDate,
    duration,
    month,
    city,
    country,
    mapInfo,
    planList,
    selectedDay,
    setPlanList,
    setMapInfo,
    setSelectedDay
  } = useTravelStore();



  const calculateCenter = (coords: Coordinates[]): Coordinates => {
    const total = coords.length;

    const center = coords.reduce(
      (acc, coord) => {
        return {
          lat: acc.lat + coord.lat / total,
          lng: acc.lng + coord.lng / total,
        };
      },
      { lat: 0, lng: 0 }
    );

    return center;
  }


  useEffect(() => {
    console.log(mapInfo);
    setIsLoad(false);

    if (_.isEmpty(mapInfo)) return;

    setCenter(calculateCenter(mapInfo.map(({ lat, lng }) => { return { lat, lng } })));

    setOrigin(mapInfo[0]);

    setDestination(mapInfo[mapInfo.length - 1]);

    setWaypoints(mapInfo.slice(1, -1))




    // if (mapInfo.length > 2) {
    //   setWaypoints(mapInfo.map((x) => {
    //     return {
    //       location: {
    //         lat: x.lat,
    //         lng: x.lng
    //       },
    //       stopover: true,
    //     }
    //   }))
    // }
    delay(500).then((x) => {

      setIsLoad(true);
    });


  }, [mapInfo]);

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <div className='map-wrap'>
      {/* <VisMap></VisMap> */}
      {/* <CustomMap></CustomMap> */}
      {isLoad && (
        <APIProvider apiKey={"AIzaSyDUYkIRZgE_RNggyfQCu0qkVL_hbfG2q7U"} libraries={['marker']}>
          <Map
            mapId={'bf51a910020fa25a'}
            defaultCenter={center}
            defaultZoom={9}
            // gestureHandling={'greedy'}
            fullscreenControl={false}
            gestureHandling={'greedy'}
            disableDefaultUI
          >
            <Directions origin={origin} destination={destination} waypoints={waypoints} />
            {mapInfo && mapInfo.map((x)=>{
              return (
                <MarkerWithInfowindow lat={x.lat} lng={x.lng} title={x.name} content={x.description} ></MarkerWithInfowindow>
              )
            })}
          </Map>
        </APIProvider>
      )}
    </div>
  );
};
interface Props {
  origin?: Schedule;
  destination?: Schedule;
  waypoints?: Schedule[];
}

function Directions(props: Props) {
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


  const getCoordinatesForAddress = async (address: string) => {
    console.log(address)
    const apiKey = 'AIzaSyDUYkIRZgE_RNggyfQCu0qkVL_hbfG2q7U'; // 실제 API 키로 교체 필요
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
      return data.results[0].geometry.location; // { lat, lng } 객체 반환
    } else {
      throw new Error('Failed to geocode address');
    }
  }


  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  const getDirection = async(travelMode : google.maps.TravelMode)=>{
    if (!(directionsService && directionsRenderer)) return;
    if (!(props.origin && props.destination)) return;

    const response = await directionsService.route({
      origin: { lat: props.origin.lat, lng: props.origin.lng },
      destination: { lat: props.destination.lat, lng: props.destination.lng },
      travelMode,
      provideRouteAlternatives: false,
      waypoints: props.waypoints?.map((x) => {
        return {
          location: {
            lat: x.lat,
            lng: x.lng
          },
          stopover: true,
        }
      })

    });
    directionsRenderer.setDirections(response);
    directionsRenderer.setOptions(
      {
        suppressMarkers: true,
        // markerOptions: {
        //   title: "<code>test</code>"
        // }
      }
    );
    setRoutes([]);
    setRoutes(response.routes);
  }

  // Use directions service
  useEffect(() => {
    const fetchDirections = async () => {
      if (!(directionsService && directionsRenderer)) return;
      try {
        await getDirection(google.maps.TravelMode.DRIVING);
      } catch (error) {
        await getDirection(google.maps.TravelMode.WALKING);
        // try {
        //   alert("경로를 불러오는데 실패했습니다. 주소로 재시도 중입니다.")
        //   const originCoords = await getCoordinatesForAddress(props.origin?.engName || "");
        //   const destinationCoords = await getCoordinatesForAddress(props.destination?.engName || "");
        //   console.log("경로를 불러오는데 실패했습니다. 주소로 재시도 중입니다.")
        //   console.log(originCoords);
        //   console.log(destinationCoords);
        //   // 재조회한 좌표를 사용하여 경로를 다시 요청합니다.
        //   const retryResponse = await directionsService.route({
        //     origin: {lat: 45.4589863, lng: 12.3523452},
        //     destination: {lat: 31.26019, lng: 120.59167},
        //     travelMode: google.maps.TravelMode.DRIVING,
        //     provideRouteAlternatives: false,
            
        //     // optimizeWaypoints: true,
        //   });
        //   directionsRenderer.setDirections(retryResponse);
        //   setRoutes(retryResponse.routes);
        // } catch (retryError) {
        //   console.error("Retry routing error:", retryError);
        //   alert("경로를 불러오는데 실패했습니다. 주소 정보를 확인하고 나중에 다시 시도해주세요.");
        // }

      }
    };

    if (directionsService && directionsRenderer) {
      fetchDirections();
    }
  }, [directionsService, directionsRenderer, props.origin, props.destination, props.waypoints]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      {/* <h2>{selected.summary}</h2>
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
      </ul> */}
    </div>
  );
}

export default TempMap;
