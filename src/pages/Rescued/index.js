import React, { useState, useEffect } from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import api from '../../services/api';
import styles from './styles';

const deviceHeight = Dimensions.get("window").height

const s3Link = 'https://petfynderimages.s3-sa-east-1.amazonaws.com/'

export default Rescued = ({ navigation }) => {
  const [rescued, setRescued] = useState()

  useEffect(() => {
    let mounted = true
    async function getPets() {
      const response = await api.get('rescued')
      setRescued(response.data)
    }
    getPets()
    return () => mounted = false
  }, [])

  const Pets = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('RescuedProfile', {
            photo: item.photo,
            name: item.name,
            breed: item.breed,
            state: item.state,
            city: item.city,
            district: item.district,
            street: item.street,
            animal: item.animal,
            gender: item.gender,
            user: item.user,
            createdAt: item.createdAt,
          })}
          style={styles.touchable}>
          <Image
            style={{ height: Dimensions.get("window").height * 0.20, width: Dimensions.get("window").width * 0.45, borderRadius: 25 }}
            source={{ uri: `${s3Link}` + item.photo }}
          />
          {item.name !== 'undefined' ? <Text style={item.gender === 'Macho' ? styles.photoTextMale : styles.photoTextFemale}>{item.name}</Text> : <></> }
        </TouchableOpacity>
      </>
    )
  }

  return (
    <>
      <View style={[styles.header, { height: deviceHeight * 0.12, paddingBottom: deviceHeight * 0.012 } ]}>
        <Text style={styles.headerTitle}>
          {'Pets Resgatados'}
        </Text>
      </View>
      {rescued &&
        <>
          <FlatList
            style={styles.container}
            data={rescued}
            renderItem={Pets}
            keyExtractor={(item) => item._id}
            numColumns={2}
          />
        </>
      }
    </>
  )
}