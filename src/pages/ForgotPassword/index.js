import React, { useState } from 'react';
import { View, StatusBar, ScrollView, Alert, Dimensions } from 'react-native';
import {
  Container, Logo, LogoTitle, EmailInputView, TextInputStyled, LoginButtonView, LoginButtonElevationView,
  LoginButton, LoginButtonText, LoadingView, LoadingText
} from './../Login/styles'
import api from '../../services/api';
import logo from '../../assets/dogCat.png';

const deviceHeight = Dimensions.get("window").height

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
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

  async function sendMail() {
    if (!email || email === '') {
      alertMsg('Digite o email de cadastro!')
      return
    }
    setLoading(true)
    await api.post('forgot_password/', { email: email })
      .then((response) => {
        setLoading(false)
        setEmail('')
        navigation.navigate('ResetPassword', { email: email });
      })
      .catch((error) => {
        setLoading(false)
        alertMsg(error.response.data.error)
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
          <LoginButtonView>
            <LoginButtonElevationView elevation={2}>
              <LoginButton
                onPress={() => sendMail()}
                activeOpacity={0.7}>
                <LoginButtonText>Enviar</LoginButtonText>
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
