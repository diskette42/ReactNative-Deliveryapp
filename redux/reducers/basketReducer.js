import {
  ADD_TO_BASKET,
  CLEAR_BASKET,
  REMOVE_FROM_BASKET,
} from '../actions/basketAction'

export const initState = {
  basket: [],
}

const basketReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        basket: action.payload,
      }
    case REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: action.payload,
      }
    case CLEAR_BASKET:
      return {
        ...state,
        basket: [],
      }
    default:
      return state
  }
}

export default basketReducer
