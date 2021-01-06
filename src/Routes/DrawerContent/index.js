import React, { useState } from 'react';
import { Image, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles.scss'

const deviceHeight = Dimensions.get("window").height

export default DrawerContent = (props) => {
  const [dropRegister, setDropRegister] = useState(false)
  const [dropSearch, setDropSearch] = useState(false)
  const dispatch = useDispatch();

  const DropDownRegister = props => {
    return (
      <>
        <View style={styles.viewTopicButton} elevation={2}>
          <TouchableOpacity style={styles.topicButton}
            onPress={() => {
              dispatch({ type: 'SET_NAV', payload: 'RoutesToPetRegistrationLost' }),
                setDropRegister(false),
                props.navigation.navigate('PetRegistration', { lostOrFound: 'lost' })
            }}>
            <Text style={styles.topicText}>Perdido</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewTopicButton} elevation={2}>
          <TouchableOpacity style={styles.topicButton}
            onPress={() => {
              dispatch({ type: 'SET_NAV', payload: 'RoutesToPetRegistrationFound' }),
                setDropRegister(false),
                props.navigation.navigate('PetRegistration', { lostOrFound: 'found' })
            }}>
            <Text style={styles.topicText}>Encontrado</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }

  const DropDownSearch = props => {
    return (
      <>
        <View style={styles.viewTopicButton} elevation={2}>
          <TouchableOpacity style={styles.topicButton}
            onPress={() => {
              dispatch({
                type: 'SET_NAV',
                payload: 'RoutesToFilterSearchLost'
              }), setDropSearch(false),
                props.navigation.navigate('FilterSearch', { lostOrFound: 'lost' })
            }}>
            <Text style={styles.topicText}>Perdidos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewTopicButton} elevation={2}>
          <TouchableOpacity style={styles.topicButton}
            onPress={() => {
              dispatch({
                type: 'SET_NAV',
                payload: 'RoutesToFilterSearchFound'
              }),
                setDropSearch(false), props.navigation.navigate('FilterSearch', { lostOrFound: 'found' })
            }}>
            <Text style={styles.topicText}>Encontrados</Text>
          </TouchableOpacity>
        </View >
      </>
    )
  }

  function closeDrops() {
    if (dropSearch) { setDropSearch(false) }
    if (dropRegister) { setDropRegister(false) }
  }

  async function logout() {
    await AsyncStorage.removeItem('@userId')
    await AsyncStorage.removeItem('@facebook')
    props.navigation.dispatch(DrawerActions.closeDrawer());
    dispatch({ type: 'SET_USER_ID', payload: '' })
  }

  return (
    <DrawerContentScrollView {...props} scrollEnabled={true}>
      <View style={[styles.logoView,
      {
        marginTop: deviceHeight * deviceHeight * deviceHeight * deviceHeight * deviceHeight * 0.0000000000001,
        marginBottom: deviceHeight * deviceHeight * deviceHeight * deviceHeight * deviceHeight * 0.0000000000001
      }]}>
        <Image source={require('../../assets/dogCat.png')}
          style={{
            height: deviceHeight * 0.2,
            width: deviceHeight * 0.2
          }} />
        <Text style={[styles.logoTitle, { fontSize: deviceHeight * 0.03 }]}>Petfynder</Text>
      </View>
      <View style={styles.lineDivision} />
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { closeDrops(), props.navigation.navigate('UserAccount') }}>
        <Image source={require('../../assets/profileIcon.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Minha Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { closeDrops(), props.navigation.navigate('FavoriteTabs') }}>
        <Image source={require('../../assets/favoriteIconDrawer.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Favoritos</Text>
      </TouchableOpacity>
      <View style={styles.lineDivision} />
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { setDropRegister((previousState) => !previousState), closeDrops() }}>
        <Image source={require('../../assets/memoIcon.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Cadastro de Pet</Text>
      </TouchableOpacity>
      {dropRegister && <DropDownRegister {...props} />}
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { setDropSearch((previousState) => !previousState), closeDrops() }}>
        <Image source={require('../../assets/magnifyingIcon.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Busca de Pets</Text>
      </TouchableOpacity>
      {dropSearch && <DropDownSearch {...props} />}
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { closeDrops(), props.navigation.navigate('MapSearchTabs') }}>
        <Image source={require('../../assets/locationIcon.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Busca por Mapa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { closeDrops(), props.navigation.navigate('Rescued') }}>
        <Image source={require('../../assets/rescuedIcon.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Pets já resgatados</Text>
      </TouchableOpacity>
      <View style={styles.lineDivision} />
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { closeDrops(), props.navigation.navigate('About') }}>
        <Image source={require('../../assets/informationIcon.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Sobre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { closeDrops(), props.navigation.navigate('TermsOfUse') }}>
        <Image source={require('../../assets/termsOfUseIcon.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Termos de Uso</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { closeDrops(), props.navigation.navigate('HelpAndFeedback') }}>
        <Image source={require('../../assets/helpIcon.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Ajuda e Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { closeDrops(), props.navigation.navigate('PrivacyPolicy') }}>
        <Image source={require('../../assets/privacyPolicyIcon.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Política de Privacidade</Text>
      </TouchableOpacity>
      <View style={styles.lineDivision} />
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => { closeDrops(), logout() }}>
        <Image source={require('../../assets/logoutIcon.png')} style={styles.icons} />
        <Text style={styles.sectionButtonText}>Sair</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};