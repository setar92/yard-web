import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '../../common/enums';
import { PlaceOrderPage, LogInPage } from '../../pages';
import { RootState } from '../../store/store';
import { ProtectedRoute } from '../protected-route/protected-route';
const Routing: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={!!token} />}>
          <Route path={AppRoute.ROOT} element={<PlaceOrderPage />} />
        </Route>
        <Route path={AppRoute.SIGN_IN} element={<LogInPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
