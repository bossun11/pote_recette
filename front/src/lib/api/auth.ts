import client from "./client";
import Cookies from "js-cookie";
import { LoginParams, SignUpParams } from "../../types/index";

// サインアップ
export const signUp = (params: SignUpParams) => {
  return client.post("/auth", params);
};

// ログイン
export const login = (params: LoginParams) => {
  return client.post("/auth/sign_in", params);
};

// ログアウト
export const logout = () => {
  return client.delete("/auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// ログインユーザーの取得
export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return;

  return client.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
