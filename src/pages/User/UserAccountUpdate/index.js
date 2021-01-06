import React, { useState } from 'react';
import { View, ScrollView, Dimensions, StatusBar, Alert, LogBox } from 'react-native';
import { useSelector } from 'react-redux'
import api from '../../../services/api';
import {
  Container, Logo, LogoTitle, PasswordInputView, TextInputStyled, TextInputAndButtonView,
  ShowBlockPasswordButton, LoginButtonView, LoginButtonElevationView,
  LoginButton, LoginButtonText, LoadingView, LoadingText, ShowBlockPasswordIcon
} from '../../Login/styles'
LogBox.ignoreLogs([
  'No task registered for key'
])
import logo from '../../../assets/dogCat.png';
const deviceHeight = Dimensions.get("window").height

export default UserAccountUpdate = ({ navigation }) => {
  const appStore = useSelector(state => state.appReducer);
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState()
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false)
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false)
  const [newPasswordConfirmationVisibility, setNewPasswordConfirmationVisibility] = useState(false)
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

  async function updatePassword() {
    if (!oldPassword || oldPassword === '' || !newPassword || newPassword === '' || !newPasswordConfirmation || newPasswordConfirmation === '') {
      alertMsg('Todos os campos devem ser preenchidos!')
      return
    }
    if (newPassword !== newPasswordConfirmation) {
      alertMsg('A nova senha não coincide com a confirmação de senha!')
      return
    }
    if (newPassword.length < 10) {
      alertMsg('A nova senha deve ter ao menos 10 dígitos')
      return
    }
    setLoading(true)
    await api.put(`authenticate/${appStore.userId}`, { newPassword: newPassword, oldPassword: oldPassword })
      .then((response) => {
        setLoading(false)
        setOldPassword('')
        setNewPassword('')
        setNewPasswordConfirmation('')
        Alert.alert(
          'Alerta:',
          response.data.success,
          [
            { text: 'OK', onPress: () => navigation.navigate('UserAccount') },
          ],
          { cancelable: false },
        );
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
          <View style={{ marginTop: deviceHeight * 0.1 }} />
          <Logo source={logo} />
          <LogoTitle>Petfynder</LogoTitle>
          <TextInputAndButtonView>
            <PasswordInputView>
              <TextInputStyled
                secureTextEntry={oldPasswordVisibility ? false : true}
                maxLength={20}
                clearTextOnFocus
                placeholder="Digite sua senha atual"
                placeholderTextColor="#bfbfbf"
                autoCorrect={false}
                onChangeText={(text) => setOldPassword(text)}
                value={oldPassword}>
              </TextInputStyled>
            </PasswordInputView>
            <ShowBlockPasswordButton
              onPress={() => setOldPasswordVisibility((previousState) => !previousState)}>
              <ShowBlockPasswordIcon source={oldPasswordVisibility ? require('../../../assets/openedEyeIcon.png') : require('../../../assets/blockedEyeIcon.png')} />
            </ShowBlockPasswordButton>
          </TextInputAndButtonView>
          <TextInputAndButtonView>
            <PasswordInputView>
              <TextInputStyled
                secureTextEntry={newPasswordVisibility ? false : true}
                maxLength={20}
                clearTextOnFocus
                placeholder="Digite a nova senha"
                placeholderTextColor="#bfbfbf"
                autoCorrect={false}
                onChangeText={(text) => setNewPassword(text)}
                value={newPassword}>
              </TextInputStyled>
            </PasswordInputView>
            <ShowBlockPasswordButton
              onPress={() => setNewPasswordVisibility((previousState) => !previousState)}>
              <ShowBlockPasswordIcon source={newPasswordVisibility ? require('../../../assets/openedEyeIcon.png') : require('../../../assets/blockedEyeIcon.png')} />
            </ShowBlockPasswordButton>
          </TextInputAndButtonView>
          <TextInputAndButtonView>
            <PasswordInputView>
              <TextInputStyled
                secureTextEntry={newPasswordConfirmationVisibility ? false : true}
                maxLength={20}
                clearTextOnFocus
                placeholder="Confirme a nova senha"
                placeholderTextColor="#bfbfbf"
                autoCorrect={false}
                onChangeText={(text) => setNewPasswordConfirmation(text)}
                value={newPasswordConfirmation}>
              </TextInputStyled>
            </PasswordInputView>
            <ShowBlockPasswordButton
              onPress={() => setNewPasswordConfirmationVisibility((previousState) => !previousState)}>
              <ShowBlockPasswordIcon source={newPasswordConfirmationVisibility ? require('../../../assets/openedEyeIcon.png') : require('../../../assets/blockedEyeIcon.png')} />
            </ShowBlockPasswordButton>
          </TextInputAndButtonView>
          <LoginButtonView>
            <LoginButtonElevationView elevation={2}>
              <LoginButton
                onPress={updatePassword}
                activeOpacity={0.7}>
                <LoginButtonText>Atualizar</LoginButtonText>
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
  )
}
