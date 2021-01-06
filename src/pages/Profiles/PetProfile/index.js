import React, { useState, useEffect } from "react";
import { View, ScrollView, StatusBar, Text, Image, Dimensions, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../../services/api';
import styles from './styles.scss';

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width
const iconStyle = {
  alignSelf: 'center',
  height: deviceHeight * 0.035,
  width: deviceHeight * 0.035,
  marginRight: deviceWidth * 0.03,
  marginLeft: deviceWidth * 0.01
}
const s3Link = 'https://petfynderimages.s3-sa-east-1.amazonaws.com/'

export default PetProfile = ({ navigation, route }) => {
  const { lostOrFound, id } = route.params
  const appStore = useSelector(state => state.appReducer);
  const dispatch = useDispatch();
  const [pet, setPet] = useState('')
  const [storageFavorites, setStorageFavorites] = useState([])
  const [favorite, setFavorite] = useState(false)
  const [renderController, setRenderController] = useState(false)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const latitudeDelta = 0.002
  const longitudeDelta = 0.002

  useEffect(() => {
    async function getPet() {
      const response = await api.get(`${lostOrFound}/${id}`);
      setPet(response.data);
      setLatitude(response.data.location.coordinates[1]);
      setLongitude(response.data.location.coordinates[0]);
    }
    if (appStore.nav === 'notification') {
      getPet()
    } else {
      setPet(route.params.pet)
      setLatitude(route.params.pet.latitude);
      setLongitude(route.params.pet.longitude);
    }
  }, [route])

  useEffect(() => {
    async function getAsyncStorage() {
      const stringFavorites = await AsyncStorage.getItem('@stringFavorites')
      if (stringFavorites === '000') { setStorageFavorites(stringFavorites) } else {
        const arrayFavorites = stringFavorites.split(',')
        setStorageFavorites(arrayFavorites)
        arrayFavorites.map((petId) => {
          if (petId === id) {
            setFavorite(true)
          }
        });
      }
    }
    const unsubscribe = navigation.addListener('focus', () => {
      getAsyncStorage()
      // setRenderController(true)
    });

    return unsubscribe;
  }, [appStore.nav, navigation, route])

  // useEffect(() => {
  //   return () => { setInitialState() }
  // }, [lostOrFound, appStore.nav])

  // function setInitialState() {
  //   setPet('');
  //   setLatitude(0);
  //   setLongitude(0);
  //   dispatch({ type: 'SET_NAV', payload: 'initialStatePetProfile' });
  // }

  function deleteAlert() {
    Alert.alert(
      'Alerta:',
      'Tem certeza que deseja excluir este Pet?',
      [
        { text: 'Cancelar' },
        { text: 'OK', onPress: () => deletePet() },
      ],
      { cancelable: false },
    );
  }

  function deletePet() {
    if (favorite) {
      undoFavorite()
    }
    api.delete(`${lostOrFound}/${id}`);
    Alert.alert(
      'Alerta:',
      'Pet Excluído das buscas!',
      [
        {
          text: 'OK', onPress: () => [navigation.navigate('UserAccount'),
          dispatch({ type: 'SET_NAV', payload: 'deletePet' })]
        },
      ],
      { cancelable: false },
    );
  }

  async function updatePet() {
    navigation.navigate('PetRegistration', {
      lostOrFound: lostOrFound,
      id: id,
    })
    dispatch({ type: 'SET_NAV', payload: 'update' });
  }

  function alreadyRescuedAlert() {
    Alert.alert(
      'Alerta:',
      'Ao marcar o Pet como "Já resgatado" ele será excluído de todas as buscas.',
      [
        { text: 'Cancelar' },
        { text: 'OK', onPress: () => alreadyRescued() },
      ],
      { cancelable: false },
    );
  }

  async function alreadyRescued() {
    const formData = new FormData()

    formData.append('file', {
      uri: s3Link + pet.photos[0],
      type: 'image/jpeg',
      name: `rescued`
    })
    formData.append('name', pet.name)
    formData.append('breed', pet.breed)
    formData.append('state', pet.state)
    formData.append('city', pet.city)
    formData.append('district', pet.district)
    formData.append('street', pet.street)
    formData.append('animal', pet.animal)
    formData.append('gender', pet.gender)
    formData.append('about', pet.about)
    formData.append('user', appStore.userId)
    await api.post('rescued', formData)
    deletePet()
  }

  async function makeFavorite() {
    api.put(`user/${lostOrFound}/${appStore.userId}`, { petId: id, favorite: 'makeFavorite' });

    if (storageFavorites === '000') {
      await AsyncStorage.setItem('@stringFavorites', id)
    } else {
      const newFavorites = [...storageFavorites, id]
      setStorageFavorites(newFavorites)
      const stringFavorites = newFavorites.join()
      await AsyncStorage.setItem('@stringFavorites', stringFavorites)
    }
  }

  async function undoFavorite() {
    api.put(`user/${lostOrFound}/${appStore.userId}`, { petId: id, favorite: 'undoFavorite' });

    const newArrayFavorites = storageFavorites.filter((item) => item !== id);
    setStorageFavorites(newArrayFavorites)
    const stringFavorites = newArrayFavorites.join()
    if (stringFavorites !== '') {
      await AsyncStorage.setItem('@stringFavorites', stringFavorites)
    } else {
      await AsyncStorage.setItem('@stringFavorites', '000')
    }
  }

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle={'white-content'} />
      {pet !== '' &&
        <ScrollView>
          <View style={styles.container}>
            <View style={{ height: deviceHeight * 0.7 }}>
              <View style={styles.photoView}>
                <ScrollView keyboardShouldPersistTaps={"always"}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                >
                  {(pet.photos).map((image, indexImage) => (
                    <View key={indexImage}>
                      <Image
                        style={[styles.backgroundImage, { width: deviceWidth }]}
                        source={{ uri: `${s3Link}` + image }}
                      />
                      <View style={styles.circleDiv}>
                        {(pet.photos).map((circle, indexCircle) => (
                          <View
                            style={[
                              styles.whiteCircle,
                              {
                                opacity: indexCircle === indexImage ? 1 : 0.5,
                                height: indexCircle === indexImage ? 10 : 6,
                                width: indexCircle === indexImage ? 10 : 6
                              }
                            ]}
                            key={indexCircle}
                          />
                        ))}
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
            <View style={[styles.favoriteView, { width: deviceWidth * 0.95 }]}>
              {favorite ?
                <TouchableOpacity
                  onPress={() => { setFavorite(false), undoFavorite() }}
                  style={styles.favoriteButton}>
                  <Image style={styles.favoriteIcon} source={require('../../../assets/favoriteIcon.png')} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => { setFavorite(true), makeFavorite() }}
                  style={styles.favoriteButton}>
                  <Image style={styles.favoriteIcon} source={require('../../../assets/emptyFavoriteIcon.png')} />
                </TouchableOpacity>
              }
            </View>
            <View style={{ margin: 15, marginRight: deviceHeight * 0.1 }}>
              {lostOrFound === 'lost' ? <Text style={[styles.nameText, { fontSize: deviceHeight * 0.040 }]}>{pet.name} </Text> : <></>}
              <View style={styles.phoneGenderBreedContent}>
                <Image style={[styles.phonePawIcon, iconStyle]} source={require('../../../assets/pawIcon.png')} />
                <Text style={[styles.genderBreedText, { fontSize: deviceWidth * 0.04 }]}>{pet.gender}, {pet.breed}</Text>
              </View>
              <View style={styles.locationContent}>
                <Image style={{ height: deviceHeight * 0.05, width: deviceHeight * 0.05, marginRight: deviceWidth * 0.015, alignSelf: 'center' }} source={require('../../../assets/heartPinIcon.png')} />
                <View style={styles.locationTextView}>
                  <Text style={[styles.cityStateText, { fontSize: deviceWidth * 0.04 }]}>{pet.city}, {pet.state}</Text>
                  <Text style={[styles.addressText, { fontSize: deviceWidth * 0.04 }]}>{pet.district}, {pet.street}</Text>
                </View>
              </View>
              <View style={styles.phoneGenderBreedContent}>
                <Image style={[styles.phonePawIcon, iconStyle]} source={require('../../../assets/phoneIcon.png')} />
                <Text style={[styles.phoneText, { fontSize: deviceWidth * 0.04 }]}>{pet.phone}</Text>
                <Text style={[styles.phoneText, { fontSize: deviceWidth * 0.04 }]}> - {pet.contactName}</Text>
              </View>
            </View>
            <View style={styles.lineDivision} />
            <View style={styles.aboutContainer}>
              <Text style={[styles.breedDateAboutText, { fontSize: deviceWidth * 0.04 }]}>Data da publicação: {pet.updatedAt.substring(0, 10).split("-").reverse().join("/")}</Text>
              <Text style={[styles.breedDateAboutText, { fontSize: deviceWidth * 0.04 }]}>{pet.about}</Text>
              <Text style={[styles.lastLocationText, { fontSize: deviceWidth * 0.04 }]}>Última localização conhecida:</Text>
              <View style={styles.mapContainer}>
                <View style={styles.mapView}>
                  <MapView
                    style={styles.map}
                    region={{
                      latitude,
                      longitude,
                      latitudeDelta,
                      longitudeDelta
                    }}>
                    <Marker
                      coordinate={{ latitude: latitude, longitude: longitude }}
                      image={require('../../../assets/smallHeartPinIcon.png')}>
                    </Marker>
                  </MapView>
                </View>
              </View>
              {pet.user === appStore.userId &&
                <>
                  <View style={styles.editDeleteContainer}>
                    <View style={styles.editDeleteView} elevation={4}>
                      <TouchableOpacity
                        onPress={deleteAlert}
                        style={styles.editDeleteTouchable}>
                        <Image style={styles.editDeleteIcon} source={require('../../../assets/deleteIcon.png')} />
                        <Text style={styles.deleteText}>Excluir</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.editDeleteView} elevation={4}>
                      <TouchableOpacity
                        onPress={updatePet}
                        style={styles.editDeleteTouchable}>
                        <Image style={styles.editDeleteIcon} source={require('../../../assets/profileEditIcon.png')} />
                        <Text style={styles.editText}>Editar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.alreadyRescuedView} elevation={4}>
                    <TouchableOpacity
                      onPress={alreadyRescuedAlert}
                      style={styles.alreadyRescuedTouchable}>
                      <Image style={styles.alreadyRescuedIcon} source={require('../../../assets/checkedIcon.png')} />
                      <Text style={styles.alreadyRescuedText}>Marcar como "Já resgatado"</Text>
                    </TouchableOpacity>
                  </View>
                </>
              }
            </View>
          </View>
        </ScrollView>
      }
    </>
  );
}
