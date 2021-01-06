import React from 'react';
import { View, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import MyPicker from '../Picker/index';
import styles from './styles.scss';

export default Form = () => {
  const petStore = useSelector(state => state.petReducer);
  const dispatch = useDispatch();

  function phoneFormat(phoneValue) {
    phoneValue = phoneValue.replace(/\D/g, '');
    phoneValue = phoneValue.replace(/\b(?=(\d))/g, '(');
    phoneValue = phoneValue.replace(/^(\D\d{2})(\d)/g, '($1) $2');
    phoneValue = phoneValue.replace(/^(\D{2})/g, '(');
    phoneValue = phoneValue.replace(/(\d)(\d{4})$/g, '$1-$2');
    phoneValue = phoneValue.replace(/(\d)(\d{4})/g, '$1-$2');
    dispatch({ type: 'SET_PHONE', payload: phoneValue })
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.textInputView}>
        <TextInput
          clearTextOnFocus
          maxLength={30}
          placeholder="Raça"
          style={styles.textInput}
          placeholderTextColor="#bfbfbf"
          autoCorrect={false}
          onChangeText={text => dispatch({ type: 'SET_BREED', payload: text })}
          value={petStore.breed}></TextInput>
      </View>
      <MyPicker />
      <View style={styles.textInputView}>
        <TextInput
          clearTextOnFocus
          maxLength={40}
          placeholder="Bairro"
          style={styles.textInput}
          placeholderTextColor="#bfbfbf"
          autoCorrect={false}
          onChangeText={text => dispatch({ type: 'SET_DISTRICT', payload: text })}
          value={petStore.district}></TextInput>
      </View>
      <View style={styles.textInputView}>
        <TextInput
          clearTextOnFocus
          maxLength={40}
          placeholder="Rua/Avenida/Lote... N°"
          style={styles.textInput}
          placeholderTextColor="#bfbfbf"
          autoCorrect={false}
          onChangeText={text => dispatch({ type: 'SET_STREET', payload: text })}
          value={petStore.street}></TextInput>
      </View>
      <View style={styles.textInputView}>
        <TextInput
          maxLength={16}
          clearTextOnFocus
          placeholder="Telefone para contato"
          style={styles.textInput}
          placeholderTextColor="#bfbfbf"
          autoCorrect={false}
          onChangeText={text => phoneFormat(text)}
          value={petStore.phone}></TextInput>
      </View>
      <View style={styles.textInputView}>
        <TextInput
          maxLength={30}
          clearTextOnFocus
          placeholder="Nome do contato"
          style={styles.textInput}
          placeholderTextColor="#bfbfbf"
          autoCorrect={false}
          onChangeText={text => dispatch({ type: 'SET_CONTACTNAME', payload: text })}
          value={petStore.contactName}></TextInput>
      </View>
    </View>
  )
}
