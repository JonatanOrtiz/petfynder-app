import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { shade } from 'polished'

const deviceHeight = Dimensions.get("window").height

export const ColorsTouchable = styled.TouchableOpacity`
  height: ${deviceHeight * 0.07}px;
  width: ${deviceHeight * 0.07}px;
  border-width: ${deviceHeight * 0.003}px;
  border-right-width: 0;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  border-color: ${props => shade(0.2, props.backgroundColor)};
` 
export const BoxColorsView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const BoxColorIcon = styled.Image`
  height: ${deviceHeight * 0.03}px;
  width: ${deviceHeight * 0.03}px;
`
