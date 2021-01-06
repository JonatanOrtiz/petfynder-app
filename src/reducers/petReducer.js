const greyImage = 'https://raw.githubusercontent.com/JonatanOrtiz/Petfynder---Encontrar-animais-perdidos/master/greyImage.png'

const INITIAL_STATE = {
  photos: [greyImage, greyImage, greyImage],
  breed: '',
  state: '',
  city: '',
  district: '',
  street: '',
  phone: '',
  contactName: '',
  animal: '',
  gender: '',
  about: '',
  colors: [],
  latitude: 0,
  longitude: 0,
  user: '',
}

function petReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_LOSTORFOUND':
      return { ...state, lostOrFound: action.payload, }
    case 'SET_PHOTOS':
      return { ...state, photos: action.payload, }
    case 'SET_NAME':
      return { ...state, name: action.payload, }
    case 'SET_BREED':
      return { ...state, breed: action.payload, }
    case 'SET_STATE':
      return { ...state, state: action.payload, }
    case 'SET_CITY':
      return { ...state, city: action.payload, }
    case 'SET_DISTRICT':
      return { ...state, district: action.payload, }
    case 'SET_STREET':
      return { ...state, street: action.payload, }
    case 'SET_PHONE':
      return { ...state, phone: action.payload, }
    case 'SET_CONTACTNAME':
      return { ...state, contactName: action.payload, }
    case 'SET_ANIMAL':
      return { ...state, animal: action.payload, }
    case 'SET_GENDER':
      return { ...state, gender: action.payload, }
    case 'SET_ABOUT':
      return { ...state, about: action.payload, }
    case 'SET_COLORS':
      if (typeof (action.payload) !== 'string') {
        return { ...state, colors: action.payload }
      }
      else if (state.colors.includes(action.payload)) {
        let arr = state.colors.filter(e => e !== action.payload);
        return { ...state, colors: arr }
      } else {
        return { ...state, colors: [...state.colors, action.payload] }
      }
    case 'SET_LATITUDE':
      return { ...state, latitude: action.payload, }
    case 'SET_LONGITUDE':
      return { ...state, longitude: action.payload, }
    case 'SET_USER':
      return { ...state, user: action.payload, }
    case 'SET_NAV':
      return { ...state, nav: action.payload, }
    case 'SET_PET_INITIAL_STATE':
      return state = INITIAL_STATE
    case 'SET_PET':
      return state = action.payload
    default:
      return state;
  }
}

export default petReducer;
