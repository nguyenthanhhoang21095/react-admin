import { createStore } from 'redux'

const initialState = {
  sidebarShow: 'responsive',
  toastShow: {
    isShow: false,
    mess: "",
    type: "normal",
  },
  userInfo: {},
  productEdit: { 
    mode: "add",
    data: null,
  },
  userEdit: null,
}

const changeState = (state = initialState, { type = "", ...rest }) => {
  if (type) return {...state, ...rest}
  return {...state}
}

const store = createStore(changeState)
export default store