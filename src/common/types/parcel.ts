interface CreateParcelBody {
  from_id?: string;
  from_city?: string;
  from_street?: string;
  from_apartment?: string;
  from_zip?: string;
  from_lat?: string;
  from_lng?: string;
  to_id?: string;
  to_city?: string;
  to_street?: string;
  to_apartment?: string;
  to_zip?: string;
  to_lat?: string;
  to_lng?: string;
  desc?: string;
  recipient: {
    phone: string;
    name: string;
  };
  sender: {
    phone: string;
    name: string;
  };
  photo_sender?: File;
  mover?: {
    comment: string;
  };
}

interface CreateParcelResponse {
  data: {
    number: number;
    status: string;
    amount: number;
  };
  message: string;
}

export type { CreateParcelBody, CreateParcelResponse };
