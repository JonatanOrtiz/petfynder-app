import React, { useState, useEffect } from 'react';
import { View, Switch, StatusBar, PermissionsAndroid, Alert } from 'react-native';
import { useSelector } from 'react-redux'
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../../services/api';
const PushNotification = require("react-native-push-notification");
import {
  Header, LogoImageView, LogoImage, InformationButtonsContainer,
  ToggleSwitchView, ToggleText, Button, Icons, OptionsText,
} from './styles';

export default UserAccount = ({ navigation }) => {
  const appStore = useSelector(state => state.appReducer);
  const [notificationEnabled, setNotificationEnabled] = useState(false)
  const [facebook, setFacebook] = useState(false)

  useEffect(() => {
    async function getAsyncStorage() {
      const facebookStorage = await AsyncStorage.getItem('@facebook')
      if (facebookStorage) {
        setFacebook(true)
      }
      const storage = JSON.parse(await AsyncStorage.getItem('@notificationEnabled'))
      if (!storage || storage === null || storage === '' || storage === undefined || storage === 'undefined') { } else {
        setNotificationEnabled(storage.notificationEnabled)
      }
    }
    getAsyncStorage()
  }, [])

  async function loadLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted) {
        Geolocation.getCurrentPosition(
          (position) => {
            let { latitude, longitude } = position.coords
            enableNotification(latitude, longitude)
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        alert("Error on loading permission")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  function alertNotification() {
    Alert.alert(
      'Alerta:',
      'Será necessário ativar sua localização, ela será arquivada em nossos registros.',
      [
        { text: 'Cancelar' },
        { text: 'OK', onPress: () => loadLocation() },
      ],
      { cancelable: false },
    );
  }

  async function enableNotification(latitude, longitude) {
    let devToken
    setNotificationEnabled(true)
    PushNotification.configure({
      onRegister: async function (token) {
        devToken = await token.token
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    })
    await AsyncStorage.setItem('@notificationEnabled', JSON.stringify({ notificationEnabled: true }));
    await api.put(`user/notification/${appStore.userId}`, { deviceToken: devToken, latitude: latitude, longitude: longitude });
  }

  async function disableNotification() {
    setNotificationEnabled(false)
    await AsyncStorage.setItem('@notificationEnabled', JSON.stringify({ notificationEnabled: false }));
    await api.put(`user/notification/${appStore.userId}`, { deviceToken: '', latitude: 0, longitude: 0 })
  }

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle={'dark-content'} />
      <Header source={require('../../../assets/wallpaper.png')} />
      <InformationButtonsContainer>
        {facebook && <View style={{ height: 20 }} />}
        <ToggleSwitchView>
          <Switch
            trackColor={{ false: '#9a9a9a', true: '#93c9ac' }}
            thumbColor={notificationEnabled ? '#4b9976' : '#f4f3f4'}
            onValueChange={() => notificationEnabled ? disableNotification() : alertNotification()}
            value={notificationEnabled}
          />
          <ToggleText>Notificar-me sobre novas publicações</ToggleText>
        </ToggleSwitchView>
        {facebook && <View style={{ height: 10 }} />}
        <Button
          onPress={() => navigation.navigate('UserPets', { lostOrFound: 'lost' })}>
          <Icons source={require('../../../assets/lostIcon.png')} />
          <OptionsText>Meus Pets Perdidos</OptionsText>
        </Button>
        <Button
          onPress={() => navigation.navigate('UserPets', { lostOrFound: 'found' })}>
          <Icons source={require('../../../assets/foundIcon.png')} />
          <OptionsText>Meus Pets Encontrados</OptionsText>
        </Button>
        <Button
          onPress={() => navigation.navigate('FavoriteTabs')}>
          <Icons source={require('../../../assets/blackFavoriteIcon.png')} />
          <OptionsText>Favoritos</OptionsText>
        </Button>
        {!facebook &&
          <Button onPress={() => navigation.navigate('UserAccountUpdate')}>
            <Icons source={require('../../../assets/editPasswordIcon.png')} />
            <OptionsText>Alterar Senha</OptionsText>
          </Button>
        }
        <Button onPress={() => { facebook ? navigation.navigate('DeleteAccountFacebook') : navigation.navigate('DeleteAccount') }}>
          <Icons source={require('../../../assets/deleteUserIcon.png')} />
          <OptionsText>Excluir minha conta</OptionsText>
        </Button>
      </InformationButtonsContainer>
      <LogoImageView>
        <LogoImage source={require('../../../assets/dogCat.png')} />
      </LogoImageView>
    </>
  )
}
