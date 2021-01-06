import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, PermissionsAndroid, StatusBar, TextInput, YellowBox, Keyboard, Dimensions, LogBox } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { WebView } from 'react-native-webview';
import styles from './styles.scss';
import api from '../../../services/api';
LogBox.ignoreLogs([
  'Failed prop type: Invalid props.style key'
])

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width
const s3Link = 'https://petfynderimages.s3-sa-east-1.amazonaws.com/'

export default MyMap = ({ navigation, route }) => {
  const [pets, setPets] = useState()
  const [lostOrFound, setSLostOrFound] = useState()
  const [searchInput, setSearchInput] = useState()
  const [locationEnabled, setLocationEnabled] = useState()
  const [latitudeDelta, setLatitudeDelta] = useState(0.02)
  const [longitudeDelta, setLongitudeDelta] = useState(0.02)
  const [latitude, setLatitude] = useState(-23.5443697)
  const [longitude, setLongitude] = useState(-46.6327321)

  useEffect(() => {
    route.name === 'Perdidos' ? setSLostOrFound('lost') : setSLostOrFound('found')
  }, [])

  const PutMarkers = () => {
    return (
      <>
        {pets.map((pet, key) => {
          if (pet.location.coordinates[1] < latitude + 0.03
            && pet.location.coordinates[1] > latitude - 0.03
            && pet.location.coordinates[0] > longitude - 0.02
            && pet.location.coordinates[0] < longitude + 0.02
          ) {
            return (
              <Marker
                key={key}
                coordinate={{ latitude: pet.location.coordinates[1], longitude: pet.location.coordinates[0] }}
                image={require('../../../assets/smallHeartPinIcon.png')}>
                <Callout
                  onPress={() => navigation.navigate('PetProfile', {
                    lostOrFound: lostOrFound,
                    id: pet._id,
                    pet: {
                      photos: pet.photos,
                      name: pet.name,
                      breed: pet.breed,
                      state: pet.state,
                      city: pet.city,
                      district: pet.district,
                      street: pet.street,
                      phone: pet.phone,
                      contactName: pet.contactName,
                      animal: pet.animal,
                      gender: pet.gender,
                      about: pet.about,
                      colors: pet.colors,
                      latitude: pet.location.coordinates[1],
                      longitude: pet.location.coordinates[0],
                      user: pet.user,
                      updatedAt: pet.updatedAt,
                    }
                  })}
                  tooltip>
                  <View style={styles.bubble}>
                    <View style={styles.bubbleImageView} >
                      <WebView source={{ uri: `${s3Link}` + pet.photos[0] }} />
                    </View>
                    <Text style={styles.bubbleText}>{pet.street + ' - ' + pet.district}</Text>
                  </View>
                  <View style={styles.arrow} />
                </Callout>
              </Marker>
            )
          }
        })}
      </>
    )
  }

  async function loadPosition() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted) {
        Geolocation.getCurrentPosition(
          (position) => {
            let { latitude, longitude } = position.coords
            setLatitude(latitude);
            setLongitude(longitude);
            setLatitudeDelta(0.01)
            setLongitudeDelta(0.01)
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        alert("Error on loading permission")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  function RegionChange(region) {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
    setLatitudeDelta(region.latitudeDelta);
    setLongitudeDelta(region.longitudeDelta);
  }

  async function search() {
    Keyboard.dismiss()
    let response

    if (!searchInput) {
      response = await api.get(lostOrFound, {
        params: {
          searchInput: '',
        }
      })
      setPets(response.data)
    } else {
      response = await api.get(lostOrFound, {
        params: {
          searchInput: searchInput,
        }
      })
      setPets(response.data)
    }
  }

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle={'dark-content'} />
      {pets && pets.map((pet, key) => (
        <Image key={key} source={{ uri: `${s3Link}` + pet.photos[0] }} style={styles.hidden} />
      ))}
      <View style={styles.mapView}>
        <MapView
          moveOnMarkerPress={false}
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
          }}
          onRegionChangeComplete={RegionChange}>
          {pets && <PutMarkers />}
        </MapView>
        <View style={[styles.searchInputView, { height: deviceHeight * 0.1, marginTop: deviceHeight * 0.035 }]}>
          <TextInput
            clearTextOnFocus
            placeholder="Digite sua busca..."
            placeholderTextColor="#ababab"
            fontSize={deviceHeight * 0.02}
            style={[styles.searchInput, { height: deviceHeight * 0.06 }]}
            autoCorrect={false}
            onChangeText={(text) => setSearchInput(text)}
            value={searchInput}>
          </TextInput>
          <TouchableOpacity
            onPress={() => search()}>
            <View
              style={[styles.searchButtonView, { height: deviceHeight * 0.1, width: deviceWidth * 0.2 }]}>
              <Image source={require('../../../assets/targetIcon.png')} style={{ height: deviceHeight * 0.06, width: deviceHeight * 0.06 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.currentLocationAndZoomContainer}>
          <View style={styles.currentLocationView} elevation={5}>
            <Switch
              trackColor={{ false: '#9a9a9a', true: '#93c9ac' }}
              thumbColor={locationEnabled ? '#4b9976' : '#f4f3f4'}
              onValueChange={() => {
                locationEnabled ? null :
                  loadPosition(),
                  setLocationEnabled((previousState) => !previousState)
              }}
              value={locationEnabled}
            />
            <Text style={[styles.currentLocationText, { fontSize: deviceWidth * 0.04 }]}>Exibir localização atual</Text>
          </View>
          <View style={styles.zoomInButtonsView}>
            <TouchableOpacity style={styles.zoomInButton} activeOpacity={0.2}
              onPress={() => { setLatitudeDelta(latitudeDelta * 0.5), setLongitudeDelta(longitudeDelta * 0.5) }}>
              <Image source={require('../../../assets/blackZoomInIcon.png')} style={styles.icons} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.zoomOutButton} activeOpacity={0.2}
              onPress={() => { setLatitudeDelta(latitudeDelta / 0.5), setLongitudeDelta(longitudeDelta / 0.5) }}>
              <Image source={require('../../../assets/blackZoomOutIcon.png')} style={styles.icons} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}
