import React, { FC } from 'react';

import { MySelect } from '../components/my-select/my-select';
import { useGetLockersQuery } from '../store/market-api/market-api';

const PlaceOrderPage: FC = () => {
  const { data: lockers } = useGetLockersQuery();

  return lockers ? <MySelect options={lockers} /> : <div>Loading...</div>;
};

export { PlaceOrderPage };
