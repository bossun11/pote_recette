import React, { FC } from "react";
import { GoogleMap as GoogleMapComponent, Marker, useJsApiLoader } from "@react-google-maps/api";

import { GoogleMapCenterType, ShopType } from "../../types";

type Props = {
  center: GoogleMapCenterType;
  shops: ShopType[];
};

type ContentStyleType = {
  width: string;
  height: string;
};

const containerStyle: ContentStyleType = {
  width: "100%",
  height: "100%",
};

const GoogleMap: FC<Props> = ({ center, shops }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  return isLoaded ? (
    <GoogleMapComponent mapContainerStyle={containerStyle} center={center} zoom={11}>
      {shops.map((shop) => (
        <Marker key={shop.place_id} position={shop.geometry.location} />
      ))}
    </GoogleMapComponent>
  ) : (
    <></>
  );
};

export default GoogleMap;
