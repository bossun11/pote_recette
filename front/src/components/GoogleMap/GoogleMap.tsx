import React, { FC } from "react";
import { GoogleMap as GoogleMapComponent, Marker, useJsApiLoader } from "@react-google-maps/api";

import { GoogleMapCenterType } from "../../types";
import { ShopType } from "../../types";

type GoogleMapProps = {
  center: GoogleMapCenterType;
  zoom?: number;
  markers: ShopType[] | ShopType;
};

type ContentStyleType = {
  width: string;
  height: string;
};

const containerStyle: ContentStyleType = {
  width: "100%",
  height: "100%",
};

const GoogleMap: FC<GoogleMapProps> = ({ center, zoom, markers }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  return isLoaded ? (
    <GoogleMapComponent mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {Array.isArray(markers) ? (
        markers.map((shop) => <Marker key={shop.place_id} position={shop.geometry.location} />)
      ) : (
        <Marker key={markers.place_id} position={markers.geometry.location} />
      )}
    </GoogleMapComponent>
  ) : (
    <></>
  );
};

export default GoogleMap;
