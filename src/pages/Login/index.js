import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LoginManager } from "react-native-fbsdk";
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { useDispatch } from 'react-redux'
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage'
import {
  Container, Logo, LogoTitle, EmailInputView, PasswordInputView, TextInputStyled, TextInputAndButtonView,
  ShowBlockPasswordButton, CheckBoxView, CheckBoxText, LoginButtonView, LoginButtonElevationView,
  LoginButton, LoginButtonText, ForgotPasswordLoginView, ForgotPasswordTLoginText, OrText, FacebookLoginButton,
  FacebookIcon, LoadingView, LoadingText, ShowBlockPasswordIcon
} from './styles'
import api from '../../services/api';
import logo from '../../assets/dogCat.png';

const deviceHeight = Dimensions.get("window").height

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getStorage() {
      const storage = JSON.parse(await AsyncStorage.getItem('@rememberMe'))
      if (!storage || storage === null || storage === '' || storage === undefined || storage === 'undefined') {
      } else {
        setToggleCheckBox(true)
        setEmail(storage.email)
        setPassword(storage.password)
      }
    }
    getStorage()
  }, [])

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

  async function sigIn(response) {
    const { id, user } = response;

    if (user.lostFavorites.length === 0 && user.foundFavorites.length === 0) {
      await AsyncStorage.setItem('@stringFavorites', '000')
    } else {
      const stringFavorites = user.lostFavorites.concat(user.foundFavorites).join()
      await AsyncStorage.setItem('@stringFavorites', stringFavorites)
    }
    if (user.location.coordinates[0] !== 0) {
      await AsyncStorage.setItem('@notificationEnabled', JSON.stringify({ notificationEnabled: true }));
    }
    if (toggleCheckBox) {
      await AsyncStorage.setItem('@rememberMe', JSON.stringify({ email: email, password: password }));
    } else {
      AsyncStorage.removeItem('@rememberMe')
    }
    await AsyncStorage.setItem('@userId', id)

    dispatch({ type: 'SET_USER_ID', payload: id })
  }

  async function handleLogin() {
    if (!email || email === '' || !password || password === '') {
      alertMsg('Todos os campos devem ser preenchidos!')
      return
    }
    setLoading(true)
    await api.post('authenticate/', { email: email, password: password })
      .then(async (response) => {
        sigIn(response.data)
      })
      .catch((error) => {
        setLoading(false)
        if (error.response.data.error) {
          alertMsg(error.response.data.error)
        } else {
          alertMsg('Erro ao fazer login')
        }
        return
      });
  }

  async function facebookLogin(email) {
    await api.post('user/facebook/', { email: email })
      .then(async (response) => {
        if (response.data.user) {
          sigIn(response.data)
          await AsyncStorage.setItem('@facebook', 'facebook')
        } else {
          const id = response.data;

          await AsyncStorage.setItem('@notificationEnabled', JSON.stringify({ notificationEnabled: false }));
          await AsyncStorage.setItem('@stringFavorites', '000')
          await AsyncStorage.setItem('@userId', id)
          await AsyncStorage.setItem('@facebook', 'facebook')

          dispatch({ type: 'SET_USER_ID', payload: id })
        }
      })
      .catch((error) => {
        setLoading(false)
        if (error.response.data.error) {
          alertMsg(error.response.data.error)
        } else {
          alertMsg('Erro ao fazer login')
        }
        return
      });
  }

  function _responseInfoCallback(error, result) {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      facebookLogin(result.email);
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

  async function handleFacebookLogin() {
    LoginManager.logInWithPermissions(["email"]).then(
      function (result) {
        if (result.isCancelled) {
          setLoading(false)
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
    <>
      <ScrollView keyboardShouldPersistTaps={"always"} >
        <StatusBar backgroundColor="white" barStyle={'dark-content'} />
        <Container>
          <Logo source={logo} />
          <LogoTitle>Petfynder</LogoTitle>
          <EmailInputView>
            <TextInputStyled
              caretHidden
              autoCapitalize="none"
              keyboardType='email-address'
              autoCompleteType='email'
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
              <ShowBlockPasswordIcon source={passwordVisibility ? require('../../assets/openedEyeIcon.png') : require('../../assets/blockedEyeIcon.png')} />
            </ShowBlockPasswordButton>
          </TextInputAndButtonView>
          <CheckBoxView>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <CheckBoxText>Lembrar-me</CheckBoxText>
          </CheckBoxView>
          <LoginButtonView>
            <LoginButtonElevationView elevation={2}>
              <LoginButton
                onPress={() => handleLogin()}
                activeOpacity={0.7}>
                <LoginButtonText>Entrar</LoginButtonText>
              </LoginButton>
            </LoginButtonElevationView>
          </LoginButtonView>
          <ForgotPasswordLoginView>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')} >
              <ForgotPasswordTLoginText>Esqueci minha senha</ForgotPasswordTLoginText>
            </TouchableOpacity>
            <ForgotPasswordTLoginText>|</ForgotPasswordTLoginText>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserRegistration')} >
              <ForgotPasswordTLoginText>Criar conta</ForgotPasswordTLoginText>
            </TouchableOpacity>
          </ForgotPasswordLoginView>
          <OrText>-- ou --</OrText>
          <LoginButtonView>
            <LoginButtonElevationView elevation={2}>
              <FacebookLoginButton
                onPress={() => { setLoading(true), handleFacebookLogin() }}
                activeOpacity={0.7}>
                <FacebookIcon source={require('../../assets/facebookIcon.png')} />
                <LoginButtonText>Entrar com o Facebook</LoginButtonText>
              </FacebookLoginButton>
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
