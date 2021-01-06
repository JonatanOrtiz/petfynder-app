import React from 'react';
import { StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header, HeaderTitle } from './../About/styles.js';

export default function PrivacyPolicy() {

  return (
    <>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <Header>
        <HeaderTitle>Política de Privacidade</HeaderTitle>
      </Header>
      <WebView
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.55, maximum-scale=0.55, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={true}
        source={{ uri: 'https://jonatanortiz.github.io/Politica-de-Privacidade-Petfynder/' }}
      />
    </>
  )
}
