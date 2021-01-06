import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

export const Header = styled.ImageBackground`
  height: ${deviceHeight * 0.2}px;
`

export const LogoImageView = styled.View`
  width: ${deviceHeight * 0.22}px;
  height: ${deviceHeight * 0.22}px;
  margin-top: ${deviceHeight * 0.09}px;
  align-self: center;
  position: absolute;
  background-color: transparent;
`

export const LogoImage = styled.Image`
  flex: 1;
  width: ${deviceHeight * 0.22}px;
  height: ${deviceHeight * 0.22}px;
  background-color: transparent;
`

export const InformationButtonsContainer = styled.View`
  flex: 1;
  background-color: rgb(255, 255, 255);
`

export const ToggleSwitchView = styled.View`
  flex-direction: row;
  align-items: center;
  margin: ${deviceHeight * deviceHeight * 0.0002}px 0px ${deviceHeight * deviceHeight * 0.00009}px ${deviceWidth * 0.1}px;
`

export const ToggleText = styled.Text`
  font-size: ${deviceWidth * 0.038}px;
  color: #707070;
`

export const Button = styled.TouchableOpacity`
  height: ${deviceHeight * 0.072}px;
  width: ${deviceWidth * 0.75}px;
  border-radius: 20px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  border-bottom-width: ${deviceHeight / 400}px;;
  border-right-width: ${deviceHeight / 400}px;;
  border-color: #d8d8d8;
  margin-bottom: 10px;
  justify-content: flex-start;
  background-color: rgb(246, 246, 246);
`

export const Icons = styled.Image`
  height: 20px;
  width: 20px;
  margin-right: ${deviceWidth * deviceWidth * 0.0001}px;
  margin-left: 20px;
`

export const OptionsText = styled.Text`
  font-size: ${deviceHeight * 0.023}px;
`