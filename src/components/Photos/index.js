import React from "react";
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles.scss';
import addIcon from '../../assets/addIcon.png'
import deleteIcon from '../../assets/deleteIcon.png'

const deviceHeight = Dimensions.get("window").height
const deviceWidth = Dimensions.get("window").width
const greyImage = 'https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/greyImage.png'

export default Photos = () => {
  const petImages = useSelector(state => state.petReducer.photos);
  const dispatch = useDispatch();
  // const [imgsUpdate, setImgsUpdate] = useState([])

  function pickPhotos(index) {
    ImagePicker.clean().then(() => {
    }).catch(e => {
      console.log(e);
    });

    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      compressImageMaxWidth: deviceWidth,
    }).then(images => {
      // console.log(images) //verificar como organizar as fotos de acordo com a seleção do usuário
      let newImagesSelection = images.reduce((arr, image) => { return arr.concat([image.path]); }, []);
      let newImagesArray = [...petImages.slice(0, index)].concat([...newImagesSelection.slice(0, 3 - index)], [...petImages.slice(index + images.length, 3)])
      dispatch({ type: 'SET_PHOTOS', payload: newImagesArray })
    }).catch(e =>
      console.log('Usuário cancelou'))
  }

  function deletePhoto(index) {
    let newImagesArray = [...petImages.slice(0, index), greyImage, ...petImages.slice(index + 1, 6)]
    dispatch({ type: 'SET_PHOTOS', payload: newImagesArray })
  }

  return (
    <View style={styles.photosContainer}>
      {petImages.map((photo, index) => (
        <View key={index} style={[styles.photosView, { height: deviceHeight * 0.195 }]}>
          <TouchableOpacity
            onPress={() => pickPhotos(index)}
            style={[styles.photoViewButton, { height: deviceHeight * 0.19 }]}>
            <Image source={{ uri: photo }} style={styles.photoImg} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={photo === greyImage ? () => pickPhotos(index) : () => deletePhoto(index)}
            style={styles.addDeleteButton}>
            <Image source={photo === greyImage ? addIcon : deleteIcon} style={styles.addDeleteImg} />
          </TouchableOpacity>
        </View>))}
    </View>
  );
}
