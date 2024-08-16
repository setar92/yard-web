import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '../../common/enums';
import {
  PlaceOrderPage,
  SignInPage,
  CreateManyParcels,
  Scanner,
} from '../../pages';
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
        <Route path={AppRoute.SIGN_IN} element={<SignInPage />} />
        <Route path={AppRoute.MANY} element={<CreateManyParcels />} />
        <Route path={AppRoute.SCANNER} element={<Scanner />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
