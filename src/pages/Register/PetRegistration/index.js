import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, ScrollView, Dimensions, Alert, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import Photos from '../../../components/Photos/index';
import Form from '../../../components/Form/index';
import ColorsSelection from '../../../components/ColorsSelection/index';
import MyMap from '../../../components/Map/index';
import About from '../../../components/TextArea/index';
import RadioSelection from '../../../components/RadioSelection/index';
import api from '../../../services/api';
import styles from './styles.scss';

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width
const s3Link = 'https://petfynderimages.s3-sa-east-1.amazonaws.com/'
const greyImage = 'https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/greyImage.png'

export default PetRegistration = ({ navigation, route }) => {
  const store = useSelector(state => state);
  const petStore = store.petReducer
  const appStore = store.appReducer
  const dispatch = useDispatch();
  const { lostOrFound, id } = route.params
  const [name, setName] = useState('')
  const [imgsUpdate, setImgsUpdate] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadPet() {
      const response = await api.get(`${lostOrFound}/${id}`)
      const loadedPet = response.data
      let photos = []
      for (let i = 0; i < 3; i++) {
        loadedPet.photos[i] ? photos.push(s3Link + loadedPet.photos[i]) : photos.push(greyImage)
      }
      loadedPet.photos = photos
      loadedPet.latitude = loadedPet.location.coordinates[1]
      loadedPet.longitude = loadedPet.location.coordinates[0]
      setName(loadedPet.name)
      setImgsUpdate(loadedPet.photos)
      dispatch({ type: 'SET_PET', payload: loadedPet });
    }

    const unsubscribe = navigation.addListener('focus', () => {

      if (appStore.nav === 'update') {
        loadPet();
      }
    });
    setLoading(false)
    return unsubscribe;
  }, [appStore.nav, navigation, route]);

  useEffect(() => {
    return () => { setInitialState() }
  }, [lostOrFound, appStore.nav])

  function hideName() {
    if (lostOrFound === 'lost')
      return styles.textInputView
    else return styles.hideName
  }

  function setInitialState() {
    setLoading(false)
    setName()
    dispatch({ type: 'SET_PET_INITIAL_STATE', payload: '' })
  }

  function alertMsg(text) {
    Alert.alert(
      'Alerta:',
      text,
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  }

  function checkValues(saveOrUpdate) {
    if (lostOrFound === 'lost' && name === '') {
      alertMsg('O campo "Nome" é obrigatório!')
      return
    }
    if (petStore.breed === '') {
      alertMsg('O campo "Raça" é obrigatório!')
      return
    }
    if (petStore.state === '') {
      alertMsg('O campo "Estado" é obrigatório!')
      return
    }
    if (petStore.city === '') {
      alertMsg('O campo "Cidade" é obrigatório!')
      return
    }
    if (petStore.district === '') {
      alertMsg('O campo "Bairro" é obrigatório!')
      return
    }
    if (petStore.street === '') {
      alertMsg('O campo "Rua/..." é obrigatório!')
      return
    }
    if (petStore.phone === '') {
      alertMsg('O campo "Telefone" é obrigatório!')
      return
    }
    if (petStore.contactName === '') {
      alertMsg('O campo "Nome do contato" é obrigatório!')
      return
    }
    if (petStore.gender === '') {
      alertMsg('Marque se o animal é Macho ou Fêmea')
      return
    }
    if (petStore.animal === '') {
      alertMsg('Marque se o animal é Cão, Gato ou Ave')
      return
    }
    let testPhotos
    petStore.photos.map((photo) => {
      if (photo !== greyImage) {
        testPhotos = true
      }
    });
    if (!testPhotos) {
      alertMsg('Envie ao menos uma foto')
      return
    }
    if (petStore.colors.length === 0) {
      alertMsg('Marque as cores do animalzinho')
      return
    }
    if (petStore.about === '') {
      if (lostOrFound === 'lost') {
        alertMsg('Descreva detalhes importantes.\nEx:\n"Animal arisco..."\n"Ofereço recompensa..."')
      } else {
        alertMsg('Descreva detalhes importantes.\nEx:\n"Animal arisco..."\n"Está machucado..."')
      }
      return
    }
    if (petStore.latitude === 0) {
      alertMsg('Marque a localização no mapa!')
      return
    }
    save(saveOrUpdate)
  }

  async function save(saveOrUpdate) {
    setLoading(true)
    const colors = petStore.colors.join();
    const newImgsUpdate = imgsUpdate.join();

    let newImgs = []

    const formData = new FormData()

    for (let i = 0; i < 3; i++) {
      if (petStore.photos[i] !== greyImage) {
        newImgs.push(petStore.photos[i])
        formData.append('file', {
          uri: petStore.photos[i],
          type: 'image/jpeg',
          name: `image${i}`
        })
      }
    }
    if (lostOrFound === 'lost') {
      formData.append('name', name)
    }
    formData.append('state', petStore.state)
    formData.append('breed', petStore.breed)
    formData.append('city', petStore.city)
    formData.append('district', petStore.district)
    formData.append('street', petStore.street)
    formData.append('phone', petStore.phone)
    formData.append('contactName', petStore.contactName)
    formData.append('animal', petStore.animal)
    formData.append('gender', petStore.gender)
    formData.append('about', petStore.about)
    formData.append('colors', colors)
    formData.append('latitude', petStore.latitude)
    formData.append('longitude', petStore.longitude)
    formData.append('user', appStore.userId)
    let _id = ''
    let newState
    let updatedAt

    if (saveOrUpdate === 'save') {
      await api.post(`${lostOrFound}/`, formData).then((response) => {
        _id = response.data._id;
        newImgs = response.data.photos
        newState = response.data.state;
        updatedAt = response.data.updatedAt
      }).catch((error) => {
        setLoading(false)
        console.log(error)
        return
      });
    } else {
      formData.append('photosForDelete', newImgsUpdate)
      await api.put(`${lostOrFound}/${id}`, formData).then((response) => {
        _id = response.data._id;
        newImgs = response.data.photos
        newState = response.data.state;
        updatedAt = response.data.updatedAt
      })
        .catch((error) => {
          setLoading(false)
          console.log(error)
          return
        });
    }
    if (_id !== '') {
      dispatch({ type: 'SET_NAV', payload: 'registration' })
      navigation.navigate('PetProfile', {
        lostOrFound: lostOrFound,
        id: _id,
        pet: {
          photos: newImgs,
          name: name,
          breed: petStore.breed,
          state: newState,
          city: petStore.city,
          district: petStore.district,
          street: petStore.street,
          phone: petStore.phone,
          contactName: petStore.contactName,
          animal: petStore.animal,
          gender: petStore.gender,
          about: petStore.about,
          colors: colors,
          latitude: petStore.latitude,
          longitude: petStore.longitude,
          user: appStore.userId,
          updatedAt: updatedAt,
        }
      })
      setInitialState()
    } else {
      Alert.alert(
        'Alerta:',
        'Erro ao salvar, tente novamente.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    }
  }

  return (
    <>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <View style={[styles.header, { height: deviceHeight * 0.12, paddingBottom: deviceHeight * 0.03 }]}>
        <Text style={styles.headerTitle}>
          {lostOrFound === 'lost' ? 'Cadastro de Pet Perdido' : 'Cadastro de Pet Encontrado'}
        </Text>
      </View>
      <ScrollView keyboardShouldPersistTaps="always" >
        <TouchableOpacity activeOpacity={1}
          style={{ marginTop: deviceHeight * 0.03, marginLeft: deviceWidth * 0.05, marginRight: deviceWidth * 0.05 }}
          onPress={Keyboard.dismiss}>
          <View style={hideName()}>
            <TextInput
              clearTextOnFocus
              maxLength={20}
              placeholder="Nome"
              style={styles.textInput}
              placeholderTextColor="#b3b3b3"
              autoCorrect={false}
              onChangeText={text => setName(text)}
              value={name}></TextInput>
          </View>
          <Form />
          <RadioSelection navigation={navigation} />
          <View style={styles.lineDivision} />
          <View style={styles.askView}>
            <Text style={styles.askText}>
              Envie fotos para vermos como é este Pet:
            </Text>
          </View>
          <Photos />
          <View style={styles.lineDivision} />
          <View style={styles.askView}>
            <Text style={styles.askText}>
              Marque as cores do animalzinho para facilitar a pesquisa nas
              buscas:
            </Text>
          </View>
          <ColorsSelection />
          <View style={styles.lineDivision} />
          <View style={styles.askView}>
            <Text style={styles.askText}>
              Descreva detalhes que você considera importantes:
            </Text>
          </View>
          <About />
          <View style={styles.lineDivision} />
          <View style={styles.askView}>
            <Text style={styles.askText}>
              Marque no mapa a última localização conhecida deste Pet:
            </Text>
          </View>
          <MyMap />
          {appStore.nav === 'update' ?
            <View style={styles.saveButtonView}>
              <View style={styles.saveButtonElevationView} elevation={4}>
                <TouchableOpacity
                  onPress={() => checkValues('update')}
                  style={styles.saveButton} activeOpacity={0.2}>
                  <Text style={styles.saveButtonText}>Atualizar</Text>
                </TouchableOpacity>
              </View>
            </View>
            :
            <View style={styles.saveButtonView}>
              <View style={styles.saveButtonElevationView} elevation={4}>
                <TouchableOpacity
                  onPress={() => checkValues('save')}
                  style={styles.saveButton} activeOpacity={0.2}>
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </TouchableOpacity>
      </ScrollView>
      {
        loading &&
        <>
          <StatusBar backgroundColor="#747474bb" barStyle={'white-content'} />
          <View style={styles.loadingView} >
            <Text style={styles.loadingText} >Carregando...</Text>
          </View>
        </>
      }
    </>
  )
}
