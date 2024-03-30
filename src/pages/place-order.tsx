import React, { FC } from 'react';

import { useGetLockersQuery } from '../store/market-api/market-api';

const PlaceOrderPage: FC = () => {
  const { data } = useGetLockersQuery();
  console.log(data && data[0]);

  return <div>place-order</div>;
};

export { PlaceOrderPage };
