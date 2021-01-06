import React, { useState, useEffect } from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import api from '../../services/api';
import styles from './styles';

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width
const s3Link = 'https://petfynderimages.s3-sa-east-1.amazonaws.com/'

export default Favorites = ({ navigation, route }) => {
  const appStore = useSelector(state => state.appReducer);
  const dispatch = useDispatch();
  const routeName = route.name
  const [lostFavorites, setLostFavorites] = useState()
  const [foundFavorites, setFoundFavorites] = useState()
  const [lostOrFound, setLostOrFound] = useState()

  useEffect(() => {
    async function getPets() {
      if (routeName === 'Perdidos') {
        setLostOrFound('lost')
        const response = await api.get(`user/favorites/lost/${appStore.userId}`)
        setLostFavorites(response.data)
      } else {
        setLostOrFound('found')
        const response = await api.get(`user/favorites/found/${appStore.userId}`)
        setFoundFavorites(response.data)
      }
    }
    const unsubscribe = navigation.addListener('focus', () => {
      getPets()
    });
    return unsubscribe;
  }, [navigation])

  const Pets = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => [dispatch({ type: 'SET_NAV', payload: 'favoritesToProfile' }),
          navigation.navigate('PetProfile', {
            id: item._id,
            lostOrFound: lostOrFound,
            pet: {
              photos: item.photos,
              name: item.name,
              breed: item.breed,
              state: item.state,
              city: item.city,
              district: item.district,
              street: item.street,
              phone: item.phone,
              contactName: item.contactName,
              animal: item.animal,
              gender: item.gender,
              about: item.about,
              colors: item.colors,
              latitude: item.location.coordinates[1],
              longitude: item.location.coordinates[0],
              user: item.user,
              updatedAt: item.updatedAt,
            }
          })]}
          style={styles.touchable}>
          <Image
            style={{ height: deviceHeight * 0.2, width: deviceWidth * 0.45, borderRadius: 25 }}
            source={{ uri: `${s3Link}` + item.photos[0] }}
          />
          {lostOrFound === 'lost' ? <Text style={item.gender === 'Macho' ? styles.photoTextMale : styles.photoTextFemale}>{item.name}</Text> : <></>}
        </TouchableOpacity>
      </>
    )
  }

  return (
    <>
      <View style={[styles.header, { height: deviceHeight * 0.12, paddingBottom: deviceHeight * 0.012 }]}>
        <Text style={styles.headerTitle}>
          {'Meus Pets Favoritos'}
        </Text>
      </View>
      {lostFavorites ?
        <>
          <FlatList
            style={styles.container}
            data={lostFavorites}
            renderItem={Pets}
            keyExtractor={(item) => item._id}
            numColumns={2}
          />
        </>
        :
        <>
          <FlatList
            style={styles.container}
            data={foundFavorites}
            renderItem={Pets}
            keyExtractor={(item) => item._id}
            numColumns={2}
          />
        </>
      }
    </>
  )
}