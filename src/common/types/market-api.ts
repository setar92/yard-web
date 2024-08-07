interface Locker {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: string;
  extern_id: string;
}

interface DataResponse {
  data: Locker[];
}

interface UserInfo {
  phone: string;
  email: string;
  name: string;
  lastname: string;
  business: { market: { prod: { token: string } } };
}

interface GetUserInfoResponse {
  data: UserInfo;
}

interface ToLocation {
  to_city: string;
  to_street: string;
  to_apartment: string;
  to_zip: string;
  to_lat: string;
  to_lng: string;
}

export type { DataResponse, Locker, GetUserInfoResponse, UserInfo, ToLocation };
