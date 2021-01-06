import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles.scss'
import api from '../../services/api';
import logo from '../../assets/dogCat.png';

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState(route.params.email);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState('');

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

  async function handleLogin() {
    if (!email || email === '' || !token || token === '' || !password || password === '') {
      alertMsg('Todos os campos devem ser preenchidos!')
      return
    }
    if (password.length < 10) {
      alertMsg('A nova senha deve ter ao menos 10 dígitos')
      return
    }

    await api.post('reset_password/', { email: email, token: token, password: password })
      .then(async (response) => {
        alertMsg('Nova senha cadastrada com sucesso!\nEntre com sua nova senha.')
        navigation.navigate('Login');
      })
      .catch((error) => {
        alertMsg(error.response.data.error)
        return
      });
  }

  return (
    <ScrollView keyboardShouldPersistTaps={"always"} >
      <View
        style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoTitle}>Petfynder</Text>
        <View style={styles.emailInputView}>
          <TextInput
            autoCapitalize="none"
            clearTextOnFocus
            maxLength={60}
            placeholder="Digite seu e-mail"
            style={styles.textInput}
            placeholderTextColor="#999999"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
            value={email}></TextInput>
        </View>
        <View style={styles.emailInputView}>
          <TextInput
            autoCapitalize="none"
            clearTextOnFocus
            maxLength={60}
            placeholder="Digite o token recebido"
            style={styles.textInput}
            placeholderTextColor="#999999"
            autoCorrect={false}
            onChangeText={(text) => setToken(text)}
            value={token}></TextInput>
        </View>
        <View style={styles.textInputAndButtonView}>
          <View style={styles.passwordInputView}>
            <TextInput
              autoCapitalize="none"
              clearTextOnFocus
              secureTextEntry={passwordVisibility ? false : true}
              maxLength={20}
              placeholder="Digite a nova senha"
              style={styles.textInput}
              placeholderTextColor="#999999"
              autoCorrect={false}
              onChangeText={(text) => setPassword(text)}
              value={password}></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => setPasswordVisibility((previousState) => !previousState)}
            style={styles.showBlockPasswordButton}>
            <Image style={styles.showBlockPasswordIcon} source={passwordVisibility ? require('../../assets/openedEyeIcon.png') : require('../../assets/blockedEyeIcon.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.saveButtonView}>
          <View style={styles.saveButtonElevationView} elevation={4}>
            <TouchableOpacity
              onPress={() => handleLogin()}
              style={styles.saveButton} activeOpacity={0.2}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
