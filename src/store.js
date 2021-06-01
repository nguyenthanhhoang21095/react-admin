import { createStore } from 'redux'

const initialState = {
  sidebarShow: 'responsive',
  toastShow: {
    isShow: false,
    mess: "",
    type: "normal",
  }
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    case 'SHOW_TOAST': 
      return {...state, ...rest }  
    default:
      return state
  }
}

const store = createStore(changeState)
export default store