interface Mover {
  comment: string;
}

interface Sender {
  name: string;
  phone: string;
}

interface Recipient {
  name: string;
  phone: string;
}

interface Added {
  mover: Mover;
  sender: Sender;
  recipient: Recipient;
}

interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  is_favorite: number;
  owner: string;
  type: string;
}

interface Photo {
  id: string;
  name: string;
  size: number;
  url: string;
}

interface Person {
  fullname: string;
  phone: string;
}

interface Cell {
  id: string;
  name: string;
}

interface ParcelObject {
  id: string;
  number: number;
  amount: number;
  appraised_amount: number;
  desc: string;
  status: string;
  type: string;
  payment_status: string;
  payer: string;
  added: Added;
  from: Location;
  to: Location;
  photo_sender: Photo;
  photo_mover: Photo;
  sender: Person;
  recipient: Person;
  cell: Cell;
}

interface senderPutResponse {
  parcel: number;
  status: string;
}

type ParcelStatus =
  | 'awaiting'
  | 'sender_confirmed'
  | 'shipment_registered'
  | 'sender_put'
  | 'mover_accepted'
  | 'mover_confirmed'
  | 'shipping'
  | 'delivery'
  | 'completed';

export type { ParcelObject, senderPutResponse, ParcelStatus };
