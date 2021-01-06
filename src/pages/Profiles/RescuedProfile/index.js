import React from "react";
import { View, ScrollView, StatusBar, Text, Image, Dimensions } from "react-native";
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

export default RescuedProfile = ({ route }) => {
  const { photo, name, breed, state, city, district, street, gender, createdAt } = route.params

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle={'white-content'} />
      <ScrollView>
        <View style={styles.container}>
          <View style={{ height: deviceHeight * 0.7 }}>
            <View style={styles.photoView}>
              <View>
                <Image style={[styles.backgroundImage, { width: deviceWidth }]} source={{ uri: `${s3Link}` + photo }} />
              </View>
            </View>
          </View>
          <View style={{ margin: 15, marginRight: deviceHeight * 0.1 }}>
            {name !== 'undefined' ? <Text style={[styles.nameText, { fontSize: deviceHeight * 0.040 }]}>{name} </Text> : <></>}
            <View style={styles.phoneGenderBreedContent}>
              <Image style={[styles.phonePawIcon, iconStyle]} source={require('../../../assets/pawIcon.png')} />
              <Text style={[styles.genderBreedText, { fontSize: deviceWidth * 0.04 }]}>{gender}, {breed}</Text>
            </View>
            <View style={styles.locationContent}>
              <Image style={{ height: deviceHeight * 0.05, width: deviceHeight * 0.05, marginRight: deviceWidth * 0.015, alignSelf: 'center' }} source={require('../../../assets/heartPinIcon.png')} />
              <View style={styles.locationTextView}>
                <Text style={[styles.cityStateText, { fontSize: deviceWidth * 0.04 }]}>{city}, {state}</Text>
                <Text style={[styles.addressText, { fontSize: deviceWidth * 0.04 }]}>{district}, {street}</Text>
              </View>
            </View>
            <Text style={{ color: '#656565', marginTop: deviceWidth * 0.03, marginLeft: deviceWidth * 0.05, fontSize: deviceWidth * 0.04 }}>Data do resgate: {createdAt.substring(0, 10).split("-").reverse().join("/")}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
