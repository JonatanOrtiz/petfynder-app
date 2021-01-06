import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from './styles.scss';

export default Header = () => {

  return (
    <>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <View style={styles.header}>
        <Text></Text>
      </View>
    </>
  )
}
