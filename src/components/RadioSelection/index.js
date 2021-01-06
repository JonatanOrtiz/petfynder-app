import React from 'react';
import { TouchableOpacity, View, Text, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.scss';

export default RadioSelection = () => {
  const petStore = useSelector(state => state.petReducer);
  const dispatch = useDispatch();
  const borderSelected = styles.radioBorderSelected
  const borderUnselected = styles.radioBorderUnselected
  const centerSelected = styles.radioCenterSelected
  const centerUnselected = styles.radioCenterUnselected

  function dispatchAndKeyboardDismiss (type, payload) {
    dispatch({ type: type, payload: payload });
    Keyboard.dismiss();
  }

  return (
    <>
      <View style={styles.radioView}>
        <TouchableOpacity activeOpacity={1} onPress={() => dispatchAndKeyboardDismiss('SET_ANIMAL', 'Cão')}
          style={styles.touchable}>
          <View style={petStore.animal === 'Cão' ? borderSelected : borderUnselected}>
            <View style={petStore.animal === 'Cão' ? centerSelected : centerUnselected} />
          </View><Text style={styles.radioText}>Cão</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => dispatchAndKeyboardDismiss('SET_GENDER', 'Macho')}
          style={styles.touchable}>
          <View style={petStore.gender === 'Macho' ? borderSelected : borderUnselected}>
            <View style={petStore.gender === 'Macho' ? centerSelected : centerUnselected} />
          </View><Text style={styles.radioText}>Macho</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.radioView}>
        <TouchableOpacity activeOpacity={1} onPress={() => dispatchAndKeyboardDismiss('SET_ANIMAL', 'Gato')}
          style={styles.touchable}>
          <View style={petStore.animal === 'Gato' ? borderSelected : borderUnselected}>
            <View style={petStore.animal === 'Gato' ? centerSelected : centerUnselected} />
          </View><Text style={styles.radioText}>Gato</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => dispatchAndKeyboardDismiss('SET_GENDER', 'Fêmea')}
          style={styles.touchable}>
          <View style={petStore.gender === 'Fêmea' ? borderSelected : borderUnselected}>
            <View style={petStore.gender === 'Fêmea' ? centerSelected : centerUnselected} />
          </View><Text style={styles.radioText}>Fêmea</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.radioView}>
        <TouchableOpacity activeOpacity={1} onPress={() => dispatchAndKeyboardDismiss('SET_ANIMAL', 'Ave')}
          style={styles.touchable}>
          <View style={petStore.animal === 'Ave' ? borderSelected : borderUnselected}>
            <View style={petStore.animal === 'Ave' ? centerSelected : centerUnselected} />
          </View><Text style={styles.radioText}>Ave</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
