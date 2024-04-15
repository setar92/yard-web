import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import { CircularProgress } from '@mui/material';

import { AppRoute } from '../../common/enums';
import { PlaceOrderPage, LogInPage } from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
const Routing: FC = () => {
  // const { data: authData, isLoading, error } = useGetUserQuery();

  // if (isLoading && !error) return <CircularProgress color="primary" />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={false} />}>
          <Route path={AppRoute.ROOT} element={<PlaceOrderPage />} />
        </Route>
        <Route path={AppRoute.SIGN_IN} element={<LogInPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
