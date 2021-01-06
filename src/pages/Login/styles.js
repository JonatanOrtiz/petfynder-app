import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  padding: ${deviceHeight * 0.04}px ${deviceWidth * 0.1}px 0px ${deviceWidth * 0.1}px;
`
export const Logo = styled.Image`
  height: ${deviceHeight * 0.25}px;
  width: ${deviceHeight * 0.25}px;
  margin-top: 2%;
  margin-bottom: -5%;
`
export const LogoTitle = styled.Text`
  font-size: ${deviceHeight * 0.04}px;
  color: rgb(93, 93, 93);
  font-family: Pacifico;
  margin-bottom: 20px;
`
export const EmailInputView = styled.View`
  width: 100%;
  margin: 5px;
  border-width: 1.2px;
  border-radius: 5px;
  border-color: #dddddd;
  flex-direction: row;
  background-color: #fcfcfc;
  height: ${deviceHeight * 0.068}px;
`
export const PasswordInputView = styled.View`
  width: 82%;
  margin: 5px;
  border-width: 1.2px;
  border-radius: 5px;
  border-color: #dddddd;
  flex-direction: row;
  background-color: #fcfcfc;
  height: ${deviceHeight * 0.068}px;
`
export const TextInputStyled = styled.TextInput`
  height: 98%;
  width: 90%;
  color: black;
  margin-left: 10px;
  border-radius: 5px;
  padding-bottom: 9px;
  background-color: #fcfcfc;
`
export const TextInputAndButtonView = styled.View`
  flex-direction: row;
`
export const ShowBlockPasswordButton = styled.TouchableOpacity`
  width: 18%;
  align-items: center;
  justify-content: center;
`
export const ShowBlockPasswordIcon = styled.Image`
  height: ${deviceHeight * 0.05}px;
  width: ${deviceHeight * 0.05}px;
`
export const CheckBoxView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`
export const CheckBoxText = styled.Text`
  color: #515151;
`
export const LoginButtonView = styled.View`
  height: ${deviceHeight * 0.06}px;
  width: 100%;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`
export const LoginButtonElevationView = styled.View`
  height: ${deviceHeight * 0.06}px;
  align-self: stretch;
  border-radius: 12px;
  margin-bottom: 10px;
`
export const LoginButton = styled.TouchableOpacity`
  height: ${deviceHeight * 0.06}px;
  align-self: stretch;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: rgb(209, 73, 60);
`
export const LoginButtonText = styled.Text`
  font-size: ${deviceHeight * 0.02}px;
  color: #ffffff;
  font-weight: bold;
`
export const ForgotPasswordLoginView = styled.View`
  flex-direction: row;
`
export const ForgotPasswordTLoginText = styled.Text`
  font-size: ${deviceHeight * 0.025}px;
  font-weight: bold;
  color: rgb(209, 73, 60);
  margin: 0 3px 0 5px;
`
export const OrText = styled.Text`
  font-size: ${deviceHeight * 0.025}px;
  font-family: 'Courier New';
  color: #878787;
  font-style: italic;
`
export const FacebookLoginButton = styled.TouchableOpacity`
  height: ${deviceHeight * 0.06}px;
  flex-direction: row;
  align-self: stretch;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: rgb(59,89,153);
`
export const FacebookIcon = styled.Image`
  height: ${deviceHeight * 0.02}px;
  width: ${deviceHeight * 0.02}px;
  margin-right: 20px;
  margin-left: -10px;
`
export const LoadingView = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(64, 64, 64, 0.733);
`
export const LoadingText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`
