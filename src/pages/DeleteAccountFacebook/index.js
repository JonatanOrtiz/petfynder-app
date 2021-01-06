import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { LoginManager } from "react-native-fbsdk";
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles.scss'
import api from '../../services/api';
import logo from '../../assets/dogCat.png';

export default function DeleteAccount({ navigation }) {
  const dispatch = useDispatch();
  const appStore = useSelector(state => state.appReducer);

  function alertMsg(text) {
    Alert.alert(
      'Alerta:',
      text,
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }

  async function deleteAccount() {

    await api.delete(`user/${appStore.userId}`)
      .then(async () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        alertMsg('Conta excluída!')
        await AsyncStorage.removeItem('@userId')
        await AsyncStorage.removeItem('@facebook')
        dispatch({ type: 'SET_USER_ID', payload: '' })
      })
      .catch((error) => {
        alertMsg(error.response.data.error)
        return
      });
  }

  function _responseInfoCallback(error, result) {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      deleteAccount();
    }
  }

  function requestGraphAPI() {
    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email'
          }
        }
      },
      _responseInfoCallback
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  async function handleDelete() {
    LoginManager.logInWithPermissions(["email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          requestGraphAPI()
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoTitle}>Petfynder</Text>
        <View style={styles.facebookButtonView}>
          <View style={styles.facebookButtonElevationView} elevation={2}>
            <TouchableOpacity
              onPress={() => handleDelete() }
              style={styles.facebookButton} activeOpacity={0.7}>
              <Image style={styles.facebookIcon} source={require('../../assets/facebookIcon.png')} />
              <Text style={styles.facebookButtonText}>Confirmar exclusão</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
}
