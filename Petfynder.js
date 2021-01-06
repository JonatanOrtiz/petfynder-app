import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import Routes from './src/Routes/routes'
import AsyncStorage from '@react-native-community/async-storage';
import ColorsSelection from './src/components/ColorsSelection/index'
import MyMap from './src/components/Map/index'
import Photos from './src/components/Photos/index'
import RadioSelection from './src/components/RadioSelection/index'
import Form from './src/components/Form/index'

export default Petfynder = () => {
  const dispatch = useDispatch();
  const appStore = useSelector(state => state.appReducer);
  const [renderControl, setRenderControl] = useState(false)

  useEffect(() => {
    async function getStorageID() {
      const storageID = await AsyncStorage.getItem('@userId')
      if (!storageID || storageID === null || storageID === '' || storageID === undefined || storageID === 'undefined') {
        setRenderControl(true)
      } else {
        dispatch({ type: 'SET_USER_ID', payload: storageID })
        setRenderControl(true)
      }
    }
    getStorageID()
  }, [])

  return (
    <>
      {renderControl &&
        <Routes />
      }
    </>
  );
};
