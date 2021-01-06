import React from 'react';
import { Dimensions, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { ColorsTouchable, BoxColorsView, BoxColorIcon } from './styles.js';
import checkIcon from '../../assets/checkIcon.png'

const deviceHeight = Dimensions.get("window").height

export default ColorsSelection = () => {
  const petColors = useSelector(state => state.petReducer.colors);
  const dispatch = useDispatch();

  return (
    <>
      <BoxColorsView>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'preto' }), Keyboard.dismiss()]}
          backgroundColor={'#222222'} style={{ borderTopLeftRadius: deviceHeight * 0.02 }}>
          <BoxColorIcon source={petColors.includes('preto') ? checkIcon : null} />
        </ColorsTouchable>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'cinza' }), Keyboard.dismiss()]}
          backgroundColor={'#999999'} >
          <BoxColorIcon source={petColors.includes('cinza') ? checkIcon : null} />
        </ColorsTouchable>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'branco' }), Keyboard.dismiss()]}
          backgroundColor={'white'} >
          <BoxColorIcon source={petColors.includes('branco') ? require('../../assets/checkBlackIcon.png') : null} />
        </ColorsTouchable>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'marrom' }), Keyboard.dismiss()]}
          backgroundColor={'#6A3600'} >
          <BoxColorIcon source={petColors.includes('marrom') ? checkIcon : null} />
        </ColorsTouchable>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'bege' }), Keyboard.dismiss()]}
          backgroundColor={'#E3B079'} >
          <BoxColorIcon source={petColors.includes('bege') ? checkIcon : null} />
        </ColorsTouchable>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'amarelo' }), Keyboard.dismiss()]}
          backgroundColor={'#F9F500'}
          style={{ borderRightWidth: deviceHeight * 0.003, borderTopRightRadius: deviceHeight * 0.02 }}>
          <BoxColorIcon source={petColors.includes('amarelo') ? checkIcon : null} />
        </ColorsTouchable>
      </BoxColorsView>
      <BoxColorsView>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'laranja' }), Keyboard.dismiss()]}
          backgroundColor={'orange'} style={{ borderBottomLeftRadius: deviceHeight * 0.02 }}>
          <BoxColorIcon source={petColors.includes('laranja') ? checkIcon : null} />
        </ColorsTouchable>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'vermelho' }), Keyboard.dismiss()]}
          backgroundColor={'#D30E0E'} >
          <BoxColorIcon source={petColors.includes('vermelho') ? checkIcon : null} />
        </ColorsTouchable>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'rosa' }), Keyboard.dismiss()]} backgroundColor={'pink'} >
          <BoxColorIcon source={petColors.includes('rosa') ? checkIcon : null} />
        </ColorsTouchable>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'roxo' }), Keyboard.dismiss()]} backgroundColor={'#BBA3DD'} >
          <BoxColorIcon source={petColors.includes('roxo') ? checkIcon : null} />
        </ColorsTouchable>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'azul' }), Keyboard.dismiss()]} backgroundColor={'#316EE3'} >
          <BoxColorIcon source={petColors.includes('azul') ? checkIcon : null} />
        </ColorsTouchable>
        <ColorsTouchable activeOpacity={1}
          onPress={() => [dispatch({ type: 'SET_COLORS', payload: 'verde' }), Keyboard.dismiss()]}
          backgroundColor={'#009D0A'}
          style={{ borderRightWidth: deviceHeight * 0.003, borderBottomRightRadius: deviceHeight * 0.02 }}>
          <BoxColorIcon source={petColors.includes('verde') ? checkIcon : null} />
        </ColorsTouchable>
      </BoxColorsView>
    </>
  )
}