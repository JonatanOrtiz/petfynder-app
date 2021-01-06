import React, { useState,useEffect } from 'react';
import { TextInput, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.scss';

export default About = () => {
  const petStore = useSelector(state => state.petReducer);
  const dispatch = useDispatch();

  return (
    <>
      <TextInput
        maxLength={500}
        maxHeight={200}
        multiline={true}
        numberOfLines={1}
        style={styles.textArea}
        autoCapitalize={'sentences'}
        onChangeText={text => dispatch({ type: 'SET_ABOUT', payload: text })}
        value={petStore.about} />
      <View style={styles.maxCharView}>
        <Text style={styles.maxCharText}>{petStore.about.length}/500</Text>
      </View>
    </>
  )
}
