import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width

export const SearchInputView = styled.View`
  height: ${deviceHeight * 0.065}px;
  margin: ${deviceHeight * 0.05}px ${deviceWidth * 0.01}px ${deviceHeight * 0.01}px ${deviceWidth * 0.09}px;
  flex-direction: row;
`

export const SearchInput = styled.TextInput`
  height: 100%;
  width: ${deviceWidth * 0.56}px;
  color: black;
  padding: 1px;
  padding-left: 15px;
  margin-left: 10px;
  border-width: 1px;
  border-color: #dfdfdf;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
`

export const SearchButtonView = styled.View`
  height: 100%;
  width: ${deviceWidth * 0.15}px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: rgb(216, 72, 58);
`

export const FilterButtonView = styled.View`
  height: 100%;
  width: ${deviceWidth * 0.14}px;
  margin-left: 5px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: rgb(216, 72, 58);
`
export const Icon = styled.Image`
  height: ${deviceWidth * deviceWidth * 0.00013}px;
  width: ${deviceWidth * deviceWidth * 0.00013}px;
`

export const FilterButtonViewDisable = styled.View`
  height: 100%;
  width: ${deviceWidth * 0.14}px;
  margin-left: 5px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: rgb(167, 167, 167);
`

export const AdjustsTouchableContainer = styled.TouchableOpacity`
  padding-top: ${deviceHeight > 500 ? deviceHeight * 0.08 : 2}px;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(147, 147, 147, 0.456);
`

export const Arrow = styled.View`
  width: 10%;
  margin-right: ${deviceWidth * 0.05}px;
  margin-top: ${deviceWidth * 0.001}px;
  border-right-width: 20px;
  border-left-width: 20px;
  border-color: transparent;
  align-self: flex-end;
  border-bottom-color: white;
  border-bottom-width: 15px;
`

export const AdjustsView = styled.TouchableOpacity`
  width: 90%;
  padding: 15px;
  padding-top: 10px;
  margin-right: ${deviceWidth * 0.02}px;
  align-self: flex-end;
  border-radius: 12px;
  background-color: white;
`

export const StatePickerView = styled.View`
  height: ${deviceHeight * 0.06}px;
  margin: 5px;
  border-width: 1px;
  border-radius: 5px;
  padding-left: 15px;
  border-color: #ededed;
  flex-direction: row;
  align-items: center;
  background-color: #fcfcfc;
`

export const StatePicker = styled.Picker`
  margin-left: 10px;
  height: 50px;
  width: 100px;
`

export const CityPickerView = styled.View`
  height: ${deviceHeight * 0.13}px;
  margin: 5px;
  border-width: 1px;
  border-radius: 5px;
  border-color: #ededed;
  background-color: #fcfcfc;
`

export const CityInputText = styled.TextInput`
  height: ${deviceHeight * 0.06}px;
  color: black;
  margin-left: 10px;
`

export const CityPicker = styled.Picker`
  margin-left: 5px;
`

export const DateSearch = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 1px;
`

export const DateText = styled.Text`
  margin-left: 10px;
  margin-bottom: ${deviceHeight > 500 ? deviceHeight * 0.01 : 2}px;
  color: #5c5c5c;
`

export const ColorsText = styled.Text`
  margin-left: 10px;
  margin-bottom: ${deviceHeight > 500 ? deviceHeight * 0.03 : 2}px;
  color: #5c5c5c;
`

export const FromToText = styled.Text`
  margin-left: 10px;
  color: #5c5c5c;
`

export const DateSearchInput = styled.TextInput`
  flex: 1;
  color: black;
  padding: 1px;
  padding-left: 10px;
  margin-left: 5px;
  margin-top: 5px;
  border-width: 1px;
  border-color: #dfdfdf;
  border-radius: 5px;
`

export const RadioView = styled.View`
  flex-direction: row;
`

export const Touchable = styled.TouchableOpacity`
  margin: 1px;
  height: 30px;
  width: 30%;
  margin-left: 10px;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`

export const RadioBorderUnselected = styled.View`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-width: 3px;
  border-radius: 12px;
  border-color: rgb(216, 216, 216);
`

export const RadioCenterUnselected = styled.View`
  width: 10px;
  height: 10px;
  margin-top: 2px;
  margin-left: 2px;
  border-radius: 10px;
  background-color: white;
  ;
`

export const RadioBorderSelected = styled.View`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-width: 3px;
  border-radius: 12px;
  border-color: rgb(37, 226, 129);
`

export const RadioCenterSelected = styled.View`
  width: 10px;
  height: 10px;
  margin-top: 2px;
  margin-left: 2px;
  border-radius: 10px;
  background-color: rgb(37, 226, 129);
`

export const RadioText = styled.Text`
  color: rgb(90, 90, 90);
`

export const ColorsTouchable = styled.TouchableOpacity`
  height: ${deviceWidth * 0.1}px;
  width: ${deviceWidth * 0.1}px;
  border-Width: ${deviceHeight * 0.003}px;
  border-right-width: 0px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  border-color: ${props => props.borderColor};
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

export const SaveFilterButtonView = styled.View`
  height: 40px;
  margin-top: 20px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${deviceHeight * 0.03}px;
`

export const SaveFilterButtonElevation = styled.View`
  height: 40px;
  width: 50%;
  border-color: white;
  border-radius: 12px;
  background-color: white;
  margin-top: ${deviceHeight > 500 ? deviceHeight * 0.02 : -20}px;
`

export const SaveFilterButton = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: rgb(248, 248, 248);
`

export const SaveFilterButtonText = styled.Text`
  color: #5b5b5b;
  font-size: 15px;
  font-weight: bold;
`

export const LineDivision = styled.View`
  margin: ${deviceHeight * 0.01}px ${deviceWidth * 0.01}px ${deviceHeight * 0.01}px ${deviceWidth * 0.01}px;
  border-color: #f5f5f5;
  border-top-width: 2px;
`

export const LineDivisionSmall = styled.View`
  margin: 1px 15px 1px 15px;
  border-color: #f5f5f5;
  border-top-width: 2px;
`

export const FlatListView = styled.View`
  flex: 1;
  align-items: center;
`

export const TouchableImage = styled.TouchableOpacity`
  margin: 0px 5px 5px 0px;
  border-width: 1px;
  border-radius: 25px;
  border-color: #b9b9b9;
`

export const PhotoTextFemale = styled.Text`
  padding: 3px;
  padding-right: 10px;
  border-bottom-left-radius: 10px;
  font-weight: bold;
  position: absolute;
  align-self: flex-end;
  background-color: rgba(255, 255, 255, 0.578);
  margin-right: 10px;
  color: rgb(140, 0, 0);
`

export const PhotoTextMale = styled.Text`
  padding: 3px;
  padding-right: 10px;
  border-bottom-left-radius: 10px;
  font-weight: bold;
  position: absolute;
  align-self: flex-end;
  background-color: rgba(255, 255, 255, 0.578);
  margin-right: 10px;
  color: rgb(4, 0, 110);
`

export const LoadingView = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #fefefe;
`

export const LoadingText = styled.Text`
  font-size: 18px;
  color: black;
  font-weight: bold;
`
