import React, { FC, useState } from "react";
import {
  GoogleMap as GoogleMapComponent,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";

import { GoogleMapCenterType } from "../../types";
import { ShopType } from "../../types";
import { formatAddress } from "../../utils/utils";

type GoogleMapProps = {
  center: GoogleMapCenterType;
  zoom?: number;
  markers: ShopType[] | ShopType;
  infoWindow?: boolean;
};

type ContentStyleType = {
  width: string;
  height: string;
};

const containerStyle: ContentStyleType = {
  width: "100%",
  height: "100%",
};

const GoogleMap: FC<GoogleMapProps> = ({ center, zoom, markers, infoWindow = false }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  const [selectedShop, setSelectedShop] = useState<ShopType | null>(null);

  const defaultWindowContent = (shop: ShopType) => {
    const address = formatAddress(shop.formatted_address);
    return (
      <>
        <h2 className="text-center font-bold text-reddishBrown">{shop.name}</h2>
        <div className="text-reddishBrown">住所</div>
        <p className="text-xs mb-2">{address}</p>
      </>
    );
  };

  const renderWeekdays = (weekdayText: string[]) => {
    return weekdayText.map((day) => {
      return (
        <p className="text-xs" key={day}>
          {day}
        </p>
      );
    });
  };

  const infoWindowContent = (shop: ShopType) => {
    if (infoWindow)
      return (
        <div>
          {defaultWindowContent(shop)}
          <div className="text-reddishBrown">営業日時</div>
          {shop.current_opening_hours && renderWeekdays(shop.current_opening_hours.weekday_text)}
          <div className="text-reddishBrown mt-2">公式HP</div>
          {shop.website && (
            <a
              href={shop.website}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-xs"
            >
              ホームページを閲覧する
            </a>
          )}
        </div>
      );
    else return <div>{defaultWindowContent(shop)}</div>;
  };

  return isLoaded ? (
    <GoogleMapComponent mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {Array.isArray(markers) ? (
        markers.map((shop) => (
          <Marker
            key={shop.place_id}
            position={shop.geometry.location}
            onClick={() => setSelectedShop(shop)}
          />
        ))
      ) : (
        <Marker
          key={markers.place_id}
          position={markers.geometry.location}
          onClick={() => setSelectedShop(markers)}
        />
      )}

      {selectedShop && (
        <InfoWindow
          position={selectedShop.geometry.location}
          onCloseClick={() => setSelectedShop(null)}
          options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
        >
          {infoWindowContent(selectedShop)}
        </InfoWindow>
      )}
    </GoogleMapComponent>
  ) : (
    <></>
  );
};

export default GoogleMap;
