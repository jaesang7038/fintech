import React, { useState } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

interface Props {
  lat: number,
  lng: number,
  title: string,
  content: string
}

export const MarkerWithInfowindow = (props: Props) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const {lat, lng, title, content} = props;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat, lng }}
      // title={'AdvancedMarker that opens an Infowindow when clicked.'}
      >
        <Pin
          background={'#22ccff'}
          borderColor={'#1e89a1'}
          glyphColor={'#0f677a'}>
        </Pin>

      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}>


          <p style={{ fontWeight: 700 }}>{title}</p>
          {content}
        </InfoWindow>
      )}
    </>
  );
};
