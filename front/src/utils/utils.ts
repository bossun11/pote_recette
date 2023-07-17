// Place APIから取得した写真のURLを整形する関数
export const getPhotoUrl = (photoReference: string, maxWidth: number) => {
  const baseUrl = process.env.REACT_APP_GOOGLE_PLACE_PHOTO_URL;
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  return `${baseUrl}?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
};

// Place APIから取得した住所を整形する関数
export const formatAddress = (address: string) => {
  return address.replace(/日本、〒\d{3}-\d{4} /, "");
};
