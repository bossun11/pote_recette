import React, { FC } from "react";
import { GoogleMap as GoogleMapComponent, LoadScript, MarkerF } from "@react-google-maps/api";

type CenterType = {
  lat: number;
  lng: number;
};

type ContentStyleType = {
  width: string;
  height: string;
};

const GoogleMap: FC = () => {
  const containerStyle: ContentStyleType = {
    width: "100%",
    height: "100%",
  };

  // とりあえず名古屋城を中心に表示
  const center: CenterType = {
    lat: 35.182253007459444,
    lng: 136.90534328438358,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ""}>
      <GoogleMapComponent mapContainerStyle={containerStyle} center={center} zoom={15}>
        <MarkerF position={center} />
      </GoogleMapComponent>
    </LoadScript>
  );
};

export default GoogleMap;
