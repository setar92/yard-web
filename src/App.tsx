import { FC } from 'react';
import { Provider } from 'react-redux';

import { PlaceOrderPage } from './pages';
import { store } from './store/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PlaceOrderPage />
    </Provider>
  );
};

export { App };
