
import React from "react";
import { LoadScript } from "@react-google-maps/api";
import CustomMap from "../components/CustomMap";

const Map: React.FC = () => {
  const apiKey = "AIzaSyA_00X2sLpP6XCdmtmKaPI7RKd8u7GbPVc";

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <CustomMap />
    </LoadScript>
  );
};

export default Map;