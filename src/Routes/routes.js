import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import DrawerContent from './DrawerContent/index'
import Screens from './Screens/index'
import axios from 'axios';
LogBox.ignoreLogs([
  'Cannot record touch end without a touch start',
  'Ended a touch event which was not counted in',
  'Warning: Cannot update'
])

const Drawer = createDrawerNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default () => {
  const appStore = useSelector(state => state.appReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true

    async function loadStatesAndCities() {
      const response =
        await axios.get('https://gist.githubusercontent.com/JonatanOrtiz/27c13903f019f8821bd31e80bb83be2b/raw/32bf8c9653433e4fba5ed0ac544be2c3a902e820/estados-cidades.json');
      if (mounted) {
        dispatch({ type: 'SET_STATES', payload: response.data.estados })
        mounted = false
      }
    }
    if (appStore.states.length === 0) {
      loadStatesAndCities();
    }
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator
        drawerStyle={{ width: '65%' }}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Screens">{props => <Screens {...props} />}</Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
