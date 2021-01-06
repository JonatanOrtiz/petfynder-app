const INITIAL_STATE = {
  userId: '',
  nav: '',
  states: '',
}

function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: action.payload }
    case 'SET_NAV':
      return { ...state, nav: action.payload }
    case 'SET_STATES':
      return { ...state, states: action.payload }
    case 'SET_APP_INITIAL_STATE':
      return state = INITIAL_STATE
    default:
      return state;
  }
}

export default appReducer;
