import React, { FC } from "react";
import { GoogleMap as GoogleMapComponent, Marker, useJsApiLoader } from "@react-google-maps/api";

type CenterType = {
  lat: number;
  lng: number;
};

type ContentStyleType = {
  width: string;
  height: string;
};

const containerStyle: ContentStyleType = {
  width: "100%",
  height: "100%",
};

// とりあえず名古屋城を中心に表示
const center: CenterType = {
  lat: 35.182253007459444,
  lng: 136.90534328438358,
};

const GoogleMap: FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  return isLoaded ? (
    <GoogleMapComponent mapContainerStyle={containerStyle} center={center} zoom={15}>
      <Marker position={center} />
    </GoogleMapComponent>
  ) : (
    <></>
  );
};

export default GoogleMap;
