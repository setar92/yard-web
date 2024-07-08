import React, { FC } from 'react';
import { Provider } from 'react-redux';

import { Libraries, LoadScript } from '@react-google-maps/api';

import { Routing } from './navigation/routing/routing';
import { store } from './store/store';

const GOOGLE_MAPS_LIBRARIES = ['places'] as Libraries;

import './index.css';

const App: FC = () => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
      libraries={GOOGLE_MAPS_LIBRARIES}
    >
      <Provider store={store}>
        <Routing />
      </Provider>
    </LoadScript>
  );
};

export { App };
