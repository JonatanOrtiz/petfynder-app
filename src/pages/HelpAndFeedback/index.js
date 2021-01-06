import React from 'react';
import { StatusBar, Text } from 'react-native';
import { Header, HeaderTitle } from './../About/styles.js';

export default function HelpAndFeedback() {

  return (
    <>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <Header>
        <HeaderTitle>Ajuda e Feedback</HeaderTitle>
      </Header>
      <Text style={{
        fontSize: 18,
        paddingTop: 50,
        paddingRight: 40,
        paddingBottom: 25,
        paddingLeft: 25,
      }}>
        Para entrar em contato conosco sobre qualquer assunto relacionado aos nossos serviços,
        utilize o email:
        {"\n\n"}petfynder.adm@gmail.com
      </Text>
    </>
  )
}
