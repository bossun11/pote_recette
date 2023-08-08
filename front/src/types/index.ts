import { z } from "zod";
import {
  inputSearchValidationSchema,
  loginValidationSchema,
  profileValidationSchema,
  registerValidationSchema,
} from "../utils/validationSchema";

export type SignUpParams = z.infer<typeof registerValidationSchema>;

export type LoginParams = z.infer<typeof loginValidationSchema>;

export type InputSearchParams = z.infer<typeof inputSearchValidationSchema>;

export type ProfileParams = z.infer<typeof profileValidationSchema>;

export type User = {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
};

export type RailsShopType = {
  business_status?: string;
  place_id: string;
  name: string;
  formatted_address: string;
  photos: {
    url: string;
  };
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

export type ShopType = {
  business_status?: string;
  place_id: string;
  name: string;
  formatted_address: string;
  photos: {
    photo_reference: string;
  }[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  current_opening_hours?: {
    weekday_text: string[];
  };
  website?: string;
};

export type GoogleMapCenterType = {
  lat: number;
  lng: number;
};
