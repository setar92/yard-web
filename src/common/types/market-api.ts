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

export type { DataResponse, Locker };
