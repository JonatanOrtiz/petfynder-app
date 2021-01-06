import React, { useState } from 'react';
import { View, ScrollView, Dimensions, StatusBar, Alert } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container, Logo, LogoTitle, PasswordInputView, TextInputStyled, TextInputAndButtonView,
  ShowBlockPasswordButton, LoginButtonView, LoginButtonElevationView,
  LoginButton, LoginButtonText, LoadingView, LoadingText, ShowBlockPasswordIcon
} from '../Login/styles'
import api from '../../services/api';
import logo from '../../assets/dogCat.png';

const deviceHeight = Dimensions.get("window").height

export default function DeleteAccount({ navigation }) {
  const dispatch = useDispatch();
  const appStore = useSelector(state => state.appReducer);
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState('');
  const [loading, setLoading] = useState(false)

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

  async function handleDelete() {
    if (!password || password === '') {
      alertMsg('Preencha a senha!')
      return
    }

    await api.delete(`user/${appStore.userId}`, { headers: { password: password } })
      .then(async () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        alertMsg('Conta excluída!')
        await AsyncStorage.removeItem('@userId')
        dispatch({ type: 'SET_USER_ID', payload: '' })
      })
      .catch((error) => {
        alertMsg(error.response.data.error)
        return
      });
  }

  return (
    <>
      <ScrollView keyboardShouldPersistTaps={"always"} >
        <StatusBar backgroundColor="white" barStyle={'dark-content'} />
        <Container>
          <View style={{ marginTop: deviceHeight * 0.18 }} />
          <Logo source={logo} />
          <LogoTitle>Petfynder</LogoTitle>
          <TextInputAndButtonView>
            <PasswordInputView>
              <TextInputStyled
                secureTextEntry={passwordVisibility ? false : true}
                maxLength={20}
                clearTextOnFocus
                placeholder="Digite sua senha atual"
                placeholderTextColor="#bfbfbf"
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
                value={password}>
              </TextInputStyled>
            </PasswordInputView>
            <ShowBlockPasswordButton
              onPress={() => setPasswordVisibility((previousState) => !previousState)}>
              <ShowBlockPasswordIcon source={passwordVisibility ? require('../../assets/openedEyeIcon.png') : require('../../assets/blockedEyeIcon.png')} />
            </ShowBlockPasswordButton>
          </TextInputAndButtonView>
          <LoginButtonView>
            <LoginButtonElevationView elevation={2}>
              <LoginButton
                onPress={() => handleDelete()}
                activeOpacity={0.7}>
                <LoginButtonText>Excluir conta</LoginButtonText>
              </LoginButton>
            </LoginButtonElevationView>
          </LoginButtonView>
        </Container>
      </ScrollView>
      {loading &&
        <>
          <StatusBar backgroundColor="rgba(64, 64, 64, 0.733)" barStyle={'white-content'} />
          <LoadingView>
            <LoadingText>Carregando...</LoadingText>
          </LoadingView>
        </>
      }
    </>
  );
}
