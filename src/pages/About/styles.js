import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const deviceHeight = Dimensions.get("window").height

export const Header = styled.View`
  height: ${deviceHeight * 0.12}px;
  padding-bottom: ${deviceHeight * 0.012}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 10px;
  background-color: white;
`

export const HeaderTitle = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: #515151;
  padding-bottom: 4px;
`