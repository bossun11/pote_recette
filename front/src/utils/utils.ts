import Cookies from "js-cookie";

// Places APIから取得した写真の参照を使用して画像のURLを作成する関数
export const getPhotoUrl = (photoReference: string, maxWidth: number) => {
  const baseUrl = `${process.env.REACT_APP_GOOGLE_MAP_BASE_URL}/place/photo`;
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  return `${baseUrl}?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
};

// Place APIから取得した住所を整形する関数
export const formatAddress = (address: string) => {
  return address.replace(/日本、〒\d{3}-\d{4} /, "");
};

// 認証情報を取得する関数
export const getAuthHeaders = () => ({
  "access-token": Cookies.get("_access_token"),
  client: Cookies.get("_client"),
  uid: Cookies.get("_uid"),
});
