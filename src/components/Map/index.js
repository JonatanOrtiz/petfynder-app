import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.scss';
import Geolocation from 'react-native-geolocation-service';

export default MyMap = () => {
  const store = useSelector(state => state);
  const petStore = store.petReducer
  const appStore = store.appReducer
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [locationEnabled, setLocationEnabled] = useState();
  const [latitudeDelta, setLatitudeDelta] = useState();
  const [longitudeDelta, setLongitudeDelta] = useState();
  const [marker, setMarker] = useState();

  useEffect(() => {
    function loadPetPosition() {
      setLatitudeDelta(0.002)
      setLongitudeDelta(0.002)
      setLatitude(petStore.latitude)
      setLongitude(petStore.longitude)
      setMarker({ latitude: petStore.latitude, longitude: petStore.longitude })
    }

    if (appStore.nav === 'update') {
      loadPetPosition()
    } else if (appStore.nav !== 'update') {
      setLatitudeDelta(35)
      setLongitudeDelta(35)
      setLatitude(-15.0649292)
      setLongitude(-51.9985226)
      setMarker()
    }
  }, [petStore.breed])

  const PutMarker = () => {
    return (
      <Marker
        coordinate={marker}
        image={require('../../assets/smallHeartPinIcon.png')}>
      </Marker>
    )
  }

  function putMarkerAndDispatchLocation(latitude, longitude) {
    setMarker({ latitude, longitude })
    dispatch({ type: 'SET_LATITUDE', payload: latitude })
    dispatch({ type: 'SET_LONGITUDE', payload: longitude })
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
            putMarkerAndDispatchLocation(latitude, longitude)
            setLatitude(latitude)
            setLongitude(longitude)
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

  return (
    <>
      <View style={styles.currentLocationView}>
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
        <Text style={styles.currentLocationText}>Utilizar minha localização atual</Text>
      </View>
      {longitude !== 0 &&
        <View style={styles.mapContainer}>
          <View style={styles.mapView}>
            <MapView
              style={styles.map}
              onPress={(e) => putMarkerAndDispatchLocation(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
              region={{
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta
              }}
              onRegionChangeComplete={RegionChange}>
              {marker && <PutMarker />}
            </MapView>
            <TouchableOpacity style={styles.zoomInButton} activeOpacity={0.6}
              onPress={() => { setLatitudeDelta(latitudeDelta * 0.5), setLongitudeDelta(longitudeDelta * 0.5) }}>
              <Image source={require('../../assets/zoomInIcon.png')} style={styles.icons} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.zoomOutButton} activeOpacity={0.6}
              onPress={() => { setLatitudeDelta(latitudeDelta / 0.5), setLongitudeDelta(longitudeDelta / 0.5) }}>
              <Image source={require('../../assets/zoomOutIcon.png')} style={styles.icons} />
            </TouchableOpacity>
          </View>
        </View>
      }
    </>
  )
}
