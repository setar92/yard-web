import React from 'react';

import axios from 'axios';

import parcels from './parcels.json';

const sendRequest = async (parcel: unknown): Promise<void> => {
  try {
    const response = await axios.post(
      'https://admin.yard.delivery/api/market/parcels',
      parcel,
      {
        headers: {
          'Market-Token': 'prod_550a58f1-851c-47ce-ae30-45119dd68e96',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error sending request:', error);
  }
};

const handleClick = async (): Promise<void> => {
  for (const parcel of parcels) {
    await sendRequest(parcel);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Затримка 500 мс
  }
};

const CreateManyParcels: React.FC = () => {
  return (
    <div>
      <button onClick={handleClick}>Send Parcels</button>
    </div>
  );
};

export { CreateManyParcels };
