import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image, Modal, StatusBar, FlatList, Dimensions, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorsSelection from '../../../components/ColorsSelection/index';
import MyPicker from '../../../components/Picker/index';
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../services/api';
// import { InterstitialAd } from '@react-native-firebase/admob';
import {
  SearchInputView, SearchInput, SearchButtonView, FilterButtonView, FilterButtonViewDisable,
  AdjustsTouchableContainer, Arrow, AdjustsView,
  DateSearch, ColorsText, DateText, DateSearchInput, RadioView, Touchable, RadioBorderUnselected,
  RadioCenterUnselected, RadioBorderSelected, RadioCenterSelected, RadioText, SaveFilterButtonView,
  SaveFilterButtonElevation, SaveFilterButton, SaveFilterButtonText, LineDivision, LineDivisionSmall,
  FlatListView, TouchableImage, PhotoTextFemale, PhotoTextMale, LoadingView, LoadingText, Icon, FromToText
} from './styles.js';

// const admobId = 'ca-app-pub-1234677029959321/9441496356'
// const interstitial = InterstitialAd.createForAdRequest(admobId);
const deviceHeight = Dimensions.get("window").height
const s3Link = 'https://petfynderimages.s3-sa-east-1.amazonaws.com/'

export default LostFilterSearch = ({ navigation, route }) => {
  const petStore = useSelector(state => state.petReducer);
  const dispatch = useDispatch();
  const { lostOrFound } = route.params
  const [pets, setPets] = useState()
  const [petsFixedArray, setPetsFixedArray] = useState()
  const [searchInput, setSearchInput] = useState()
  const [dateController, setDateController] = useState()
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [show, setShow] = useState(false)
  const [dog, setDog] = useState(false)
  const [cat, setCat] = useState(false)
  const [bird, setBird] = useState(false)
  const [male, setMale] = useState(false)
  const [female, setFemale] = useState(false)
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false)
  const date = new Date()
  const mode = 'date'

  useEffect(() => {
    // interstitial.load();
    setInitialState();
    setPets();
    return () => setLoading(false)
  }, [lostOrFound])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (dateController === 'initial') {
      setInitialDate(currentDate.toISOString().substring(0, 10).split("-").reverse().join("/"));
    } else {
      setFinalDate(currentDate.toISOString().substring(0, 10).split("-").reverse().join("/"));
    }
  };

  const showCalendarDateController = dateController => {
    setShow(true);
    setDateController(dateController)
  };

  // function ads() {
  //   !loaded &&
  //     setTimeout(() => {
  //       interstitial.show();
  //     }, 15000);

  //   setLoaded(true);
  // }

  function setInitialState() {
    setDog(false)
    setCat(false)
    setBird(false)
    setMale(false)
    setFemale(false)
    setInitialDate('')
    setFinalDate('')
    setLoaded(false);
    dispatch({ type: 'SET_PET_INITIAL_STATE', payload: '' })
  }

  async function search() {
    setLoading(true)
    Keyboard.dismiss()
    setInitialState()

    let response

    if (!searchInput) {
      response = await api.get(lostOrFound, {
        params: {
          searchInput: '',
        }
      })
    } else {
      response = await api.get(lostOrFound, {
        params: {
          searchInput: searchInput,
        }
      })
    }
    setPetsFixedArray(response.data)
    setPets(response.data)
    // ads()
  }

  async function searchFilter() {
    const colorsString = petStore.colors.join()
    let newState, newCity, newAnimal, newMale, newFemale, newColorArray, newInicialDate, newFinalDate, petsFinalArray;
    !initialDate ? (newInicialDate = '20200802') : newInicialDate = initialDate.split("/").reverse().join("");
    !finalDate ? (newFinalDate = new Date().toISOString().substring(0, 10).split("-").join("")) : newFinalDate = finalDate.split("/").reverse().join("");

    petStore.state !== '' ? newState = petsFixedArray.filter((item) => item.state === petStore.state) : newState = petsFixedArray;
    petStore.city ? newCity = newState.filter((item) => item.city === petStore.city) : newCity = newState;
    if (dog && cat && bird || !dog && !cat && !bird) {
      newAnimal = newCity;
    } else {
      dog && !cat && !bird ? newAnimal = newCity.filter((item) => item.animal === 'Cão') :
        bird && !cat && !dog ? newAnimal = newCity.filter((item) => item.animal === 'Ave') :
          cat && !dog && !bird ? newAnimal = newCity.filter((item) => item.animal === 'Gato') :
            cat && dog && !bird ? newAnimal = newCity.filter((item) => item.animal === 'Gato' || item.animal === 'Cão') :
              cat && !dog && bird ? newAnimal = newCity.filter((item) => item.animal === 'Gato' || item.animal === 'Ave') :
                newAnimal = newCity.filter((item) => item.animal === 'Cão' || item.animal === 'Ave');
    }
    if (male !== female) {
      male ? newMale = newAnimal.filter((item) => item.gender === 'Macho') : newMale = newAnimal;
      female ? newFemale = newMale.filter((item) => item.gender === 'Fêmea') : newFemale = newMale;
    } else { newFemale = newAnimal }
    colorsString !== '' ? newColorArray = newFemale.filter((item) => item.colors.join() === colorsString) : newColorArray = newFemale;
    petsFinalArray = newColorArray.filter((item) => newInicialDate <= item.updatedAt.substring(0, 10).split("-").join("") && item.updatedAt.substring(0, 10).split("-").join("") <= newFinalDate);

    setPets(petsFinalArray)
  }

  const Pets = ({ item }) => {
    return (
      <>
        <TouchableImage
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
          })}>
          <Image
            style={{ height: Dimensions.get("window").height * 0.20, width: Dimensions.get("window").width * 0.45, borderRadius: 25 }}
            source={{ uri: `${s3Link}` + item.photos[0] }}
          />
          {lostOrFound === 'lost' ? item.gender === 'Macho' ? <PhotoTextMale>{item.name}</PhotoTextMale> : <PhotoTextFemale>{item.name}</PhotoTextFemale> : <></>}
        </TouchableImage>
      </>
    )
  }

  return (
    <>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <SearchInputView>
        <SearchInput
          clearTextOnFocus
          placeholder="Digite sua busca"
          placeholderTextColor="#bfbfbf"
          fontSize={deviceHeight * 0.02}
          autoCorrect={false}
          onChangeText={(text) => setSearchInput(text)}
          value={searchInput}>
        </SearchInput>
        <TouchableOpacity
          onPress={() => search()}>
          <SearchButtonView>
            <Icon source={require('../../../assets/whiteMagnifyingIcon.png')} />
          </SearchButtonView>
        </TouchableOpacity>
        {pets ?
          <TouchableOpacity
            onPress={() => setModalVisible(true)}>
            <FilterButtonView>
              <Icon source={require('../../../assets/adjustIcon.png')} />
            </FilterButtonView>
          </TouchableOpacity>
          :
          <View>
            <FilterButtonViewDisable>
              <Icon source={require('../../../assets/adjustIcon.png')} />
            </FilterButtonViewDisable>
          </View>
        }
        <Modal animationType='none' transparent={true} visible={modalVisible}>
          <AdjustsTouchableContainer onPress={() => { setModalVisible(!modalVisible) }} >
            {deviceHeight > 500 ? <Arrow /> : null}
            <AdjustsView
              onPress={() => Keyboard.dismiss()}
              activeOpacity={1}>
              <MyPicker />
              {deviceHeight > 500 ? <LineDivision /> : <LineDivisionSmall />}
              <DateText>Data da publicação:</DateText>
              <DateSearch>
                <FromToText>De:</FromToText>
                <DateSearchInput
                  clearTextOnFocus
                  placeholder="  __/__/____"
                  placeholderTextColor="#bfbfbf"
                  autoCorrect={false}
                  onFocus={() => { showCalendarDateController('initial'), Keyboard.dismiss() }}
                  value={initialDate}>
                </DateSearchInput>
                <FromToText>Até:</FromToText>
                <DateSearchInput
                  clearTextOnFocus
                  placeholder="  __/__/____"
                  placeholderTextColor="#bfbfbf"
                  autoCorrect={false}
                  onFocus={() => { showCalendarDateController('final'), Keyboard.dismiss() }}
                  value={finalDate}>
                </DateSearchInput>
              </DateSearch>
              {deviceHeight > 500 ? <LineDivision /> : <LineDivisionSmall />}
              <RadioView>
                <Touchable activeOpacity={1} onPress={() => [dog ? setDog(false) : setDog(true), Keyboard.dismiss()]}>
                  {dog ? <RadioBorderSelected><RadioCenterSelected /></RadioBorderSelected> :
                    <RadioBorderUnselected><RadioCenterUnselected /></RadioBorderUnselected>}
                  <RadioText>Cachorro</RadioText>
                </Touchable>
                <Touchable activeOpacity={1} onPress={() => [cat ? setCat(false) : setCat(true), Keyboard.dismiss()]}>
                  {cat ? <RadioBorderSelected><RadioCenterSelected /></RadioBorderSelected> :
                    <RadioBorderUnselected><RadioCenterUnselected /></RadioBorderUnselected>}
                  <RadioText>Gato</RadioText>
                </Touchable>
                <Touchable activeOpacity={1} onPress={() => [bird ? setBird(false) : setBird(true), Keyboard.dismiss()]}>
                  {bird ? <RadioBorderSelected><RadioCenterSelected /></RadioBorderSelected> :
                    <RadioBorderUnselected><RadioCenterUnselected /></RadioBorderUnselected>}
                  <RadioText>Ave</RadioText>
                </Touchable>
              </RadioView>
              <RadioView>
                <Touchable activeOpacity={1} onPress={() => [male ? setMale(false) : setMale(true), Keyboard.dismiss()]}>
                  {male ? <RadioBorderSelected><RadioCenterSelected /></RadioBorderSelected> :
                    <RadioBorderUnselected><RadioCenterUnselected /></RadioBorderUnselected>}
                  <RadioText>Macho</RadioText>
                </Touchable>
                <Touchable activeOpacity={1} onPress={() => [female ? setFemale(false) : setFemale(true), Keyboard.dismiss()]}>
                  {female ? <RadioBorderSelected><RadioCenterSelected /></RadioBorderSelected> :
                    <RadioBorderUnselected><RadioCenterUnselected /></RadioBorderUnselected>}
                  <RadioText>Fêmea</RadioText>
                </Touchable>
              </RadioView>
              {deviceHeight > 500 ? <LineDivision /> : <LineDivisionSmall />}
              <ColorsText>Cores:</ColorsText>
              <ColorsSelection />
              <SaveFilterButtonView>
                <SaveFilterButtonElevation elevation={4}>
                  <SaveFilterButton
                    onPress={() => { setModalVisible(!modalVisible), searchFilter() }}
                    activeOpacity={0.2}>
                    <SaveFilterButtonText>Filtrar</SaveFilterButtonText>
                  </SaveFilterButton>
                </SaveFilterButtonElevation>
              </SaveFilterButtonView>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </AdjustsView>
          </AdjustsTouchableContainer>
        </Modal>
      </SearchInputView>
      {
        loading && !pets &&
        <>
          <LoadingView>
            <LoadingText>Carregando...</LoadingText>
          </LoadingView>
        </>
      }
      <FlatListView>
        {pets &&
          <FlatList
            data={pets}
            renderItem={Pets}
            keyExtractor={(item) => item._id}
            numColumns={2}
          />
        }
      </FlatListView>
    </>
  );
};
