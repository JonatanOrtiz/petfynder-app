import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { View, StatusBar, ScrollView, Alert, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import {
  Container, Logo, LogoTitle, EmailInputView, PasswordInputView, TextInputStyled, TextInputAndButtonView,
  ShowBlockPasswordButton, LoginButtonView, LoginButtonElevationView,
  LoginButton, LoginButtonText, LoadingView, LoadingText, ShowBlockPasswordIcon
} from '../../Login/styles'
import api from '../../../services/api';
import logo from '../../../assets/dogCat.png';

const deviceHeight = Dimensions.get("window").height

export default function UserRegistration() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
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

  async function handleRegistration() {
    if (!email || email === '' || !password || password === '') {
      alertMsg('Todos os campos devem ser preenchidos!')
      return
    }
    if (password.length < 10) {
      alertMsg('A nova senha deve ter ao menos 10 dígitos')
      return
    }
    setLoading(true)
    await api.post('user/', { email: email, password: password })
      .then(async (response) => {
        const id = response.data;

        await AsyncStorage.setItem('@notificationEnabled', JSON.stringify({ notificationEnabled: false }));
        await AsyncStorage.setItem('@stringFavorites', '000')
        await AsyncStorage.setItem('@userId', id)

        dispatch({ type: 'SET_USER_ID', payload: id })
      })
      .catch((error) => {
        setLoading(false)
        if (error.response.data.error) {
          alertMsg(error.response.data.error)
        } else {
          alertMsg('Erro ao registrar')
        }
        return
      });
  }

  return (
    <>
      <ScrollView keyboardShouldPersistTaps={"always"} >
        <StatusBar backgroundColor="white" barStyle={'dark-content'} />
        <Container>
          <View style={{ marginTop: deviceHeight * 0.12 }} />
          <Logo source={logo} />
          <LogoTitle>Petfynder</LogoTitle>
          <EmailInputView>
            <TextInputStyled
              autoCapitalize="none"
              clearTextOnFocus
              maxLength={60}
              fontSize={deviceHeight * 0.02}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#999999"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
              value={email}></TextInputStyled>
          </EmailInputView>
          <TextInputAndButtonView>
            <PasswordInputView>
              <TextInputStyled
                autoCapitalize="none"
                clearTextOnFocus
                secureTextEntry={passwordVisibility ? false : true}
                maxLength={20}
                fontSize={deviceHeight * 0.02}
                placeholder="Digite sua senha"
                placeholderTextColor="#999999"
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
                value={password}></TextInputStyled>
            </PasswordInputView>
            <ShowBlockPasswordButton
              onPress={() => setPasswordVisibility((previousState) => !previousState)}>
              <ShowBlockPasswordIcon source={passwordVisibility ? require('../../../assets/openedEyeIcon.png') : require('../../../assets/blockedEyeIcon.png')} />
            </ShowBlockPasswordButton>
          </TextInputAndButtonView>
          <LoginButtonView>
            <LoginButtonElevationView elevation={2}>
              <LoginButton
                onPress={() => handleRegistration()}
                activeOpacity={0.7}>
                <LoginButtonText>Cadastrar</LoginButtonText>
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
