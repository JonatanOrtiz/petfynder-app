import React, { useState, useEffect } from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useSelector } from 'react-redux'
import api from '../../../services/api';
import styles from './styles';

const deviceHeight = Dimensions.get("window").height
const s3Link = 'https://petfynderimages.s3-sa-east-1.amazonaws.com/'

export default UserPets = ({ navigation, route }) => {
  const appStore = useSelector(state => state.appReducer);
  const { lostOrFound } = route.params
  const [user, setUser] = useState()

  useEffect(() => {
    async function getPets() {
      const response = await api.get(`user/${lostOrFound}/${appStore.userId}`)
      setUser(response.data)
    }
    const unsubscribe = navigation.addListener('focus', () => {
      getPets()
    });

    return unsubscribe;
  }, [navigation, route])

  const Pets = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('PetProfile', {
            lostOrFound: lostOrFound,
            id: item._id,
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
          })}
          style={styles.touchable}>
          <Image
            style={{ height: Dimensions.get("window").height * 0.20, width: Dimensions.get("window").width * 0.45, borderRadius: 25 }}
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
          {lostOrFound === 'lost' ? 'Meus Pets Perdidos' : 'Meus Pets Encontrados'}
        </Text>
      </View>
      {user &&
        <>
          <FlatList
            style={styles.container}
            data={lostOrFound === 'lost' ? user.lostPets : user.foundPets}
            renderItem={Pets}
            keyExtractor={(item) => item._id}
            numColumns={2}
          />
        </>
      }
    </>
  )
}