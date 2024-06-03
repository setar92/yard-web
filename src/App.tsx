import { FC } from 'react';
import { Provider } from 'react-redux';

import { Routing } from './navigation/routing/routing';
import { store } from './store/store';
import './index.css';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export { App };
