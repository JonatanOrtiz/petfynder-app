import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.scss';

export default MyPicker = () => {
  const store = useSelector(state => state);
  const petStore = store.petReducer
  const appStore = store.appReducer
  const dispatch = useDispatch();
  const [state, setState] = useState();
  const [cities, setCities] = useState([]);
  const [citiesPicker, setCitiesPicker] = useState([]);
  const [cityTextInput, setCityTextInput] = useState('');
  const [stateFromUpdate, setStateFromUpdate] = useState('');

  useEffect(() => {
    function setPickerFromUpload() {
      const newState = appStore.states.filter((item) => item.sigla === petStore.state);
      if (newState.length > 0) {
        setState(newState[0]);
        setCityTextInput(petStore.city);
        setCities(newState[0].cidades);
        setCitiesPicker(newState[0].cidades);
        setStateFromUpdate(petStore.state);
      } else {
        setState('');
        setCityTextInput(petStore.city);
        setCities([]);
        setCitiesPicker([]);
        setStateFromUpdate(petStore.state);
      }
    }
    if (appStore.states.length > 0) {
      setPickerFromUpload();
    }
  }, [petStore.breed])

  function newCitiesArrayForPicker(text) {
    if (cities === undefined) {
      setCitiesPicker([])
      dispatch({ type: 'SET_CITY', payload: '' });
    }
    else if (text === '') {
      setCitiesPicker(cities)
      dispatch({ type: 'SET_CITY', payload: '' });
    }
    else {
      const newCitiesArray = []
      cities.map((city) => {
        if (city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
          .includes(text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))) {
          newCitiesArray.push(city)
        }
      }
      )
      setCitiesPicker(newCitiesArray)
      dispatch({ type: 'SET_CITY', payload: newCitiesArray[0] })
    }
  }

  function stateChange(itemValue) {
    setStateFromUpdate('');
    dispatch({ type: 'SET_STATE', payload: itemValue.sigla !== "" ? itemValue.sigla : '' });
    setCities(itemValue.cidades ? itemValue.cidades : []);
    dispatch({ type: 'SET_CITY', payload: '' });
    setCityTextInput('');
    setState(itemValue)
    setCitiesPicker(itemValue.cidades ? itemValue.cidades : []);
    itemValue.sigla !== undefined ?
      onBlurDispatch('SET_STATE', itemValue.sigla) :
      (onBlurDispatch('SET_STATE', ''),
        onBlurDispatch('SET_CITY', ''));
  }

  const onBlurDispatch = (type, payload) => {
    dispatch({ type: type, payload: payload });
  }

  return (
    <>
      <View style={styles.statePickerView}>
        <Text>Estado:</Text>
        <Picker
          mode='dropdown'
          selectedValue={state}
          style={styles.statePicker}
          onValueChange={itemValue => stateChange(itemValue)}>
          <Picker.Item label={stateFromUpdate ? stateFromUpdate : ''} value={stateFromUpdate ? stateFromUpdate : ''} />
          <Picker.Item label={''} value={''} />
          {appStore.states.map((state, id) => (
            <Picker.Item key={id} label={state.sigla} value={state} />
          ))}
        </Picker>
      </View>
      <View style={styles.cityPickerView}>
        <TextInput style={{ height: 10 }}
          clearTextOnFocus
          placeholder="Digite para buscar a cidade"
          style={styles.cityInputText}
          placeholderTextColor="#bfbfbf"
          autoCorrect={false}
          onChangeText={text => { dispatch({ type: 'SET_CITY', payload: text }), setCityTextInput(text), newCitiesArrayForPicker(text) }}
          value={cityTextInput}></TextInput>
        <Picker
          selectedValue={petStore.city}
          style={styles.cityPicker}
          onValueChange={itemValue => dispatch({ type: 'SET_CITY', payload: itemValue })}>
          <Picker.Item label='Selecione a cidade' value={null} />
          {citiesPicker.map((city, id) => (
            <Picker.Item key={id} label={city} value={city} />
          ))}
        </Picker>
      </View>
    </>
  )
}