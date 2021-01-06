import React from 'react';
import { Provider } from 'react-redux'
import store from './src/store'
import Petfynder from './Petfynder'

export default App = () => {

  return (
    < Provider store={store}>
      <Petfynder />
    </Provider >
  );
};
