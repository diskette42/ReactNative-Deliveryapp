export const ADD_TO_BASKET = 'ADD_TO_BASKET'
export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET'
export const CLEAR_BASKET = 'CLEAR_BASKET'

export const addToBasket = (basketState, payload, key) => async (dispatch) => {
  try {
    console.log(payload)
    const index = basketState.findIndex(
      (item) =>
        item.requestMessage === payload.requestMessage &&
        item._id === payload._id,
    )
    const notRepeatedRestaurant = basketState.findIndex(
      (item) => item.restaurantName === payload.restaurantName,
    )
    const newBasket = [...basketState]
    console.log({ notRepeatedRestaurant, newBasket, index })

    if (index >= 0 && key === 'added') {
      newBasket[index].count += payload.count
    } else if (index >= 0 && key === 'updated') {
      if (payload.count == 0) {
        newBasket.splice(index, 1)
      } else {
        newBasket[index].count = payload.count
      }
    } else if (newBasket.length > 0 && notRepeatedRestaurant == -1) {
      return { message: 'clear' }
    } else {
      newBasket.push(payload)
    }

    return await dispatch({
      type: ADD_TO_BASKET,
      payload: newBasket,
    })
  } catch (e) {
    console.log(e)
  }
}

export const removeFromBasket = (basketState, payload) => async (dispatch) => {
  try {
    const index = basketState.findIndex(
      (item) =>
        item.requestMessage === payload.requestMessage &&
        item._id === payload._id,
    )
    const newBasket = [...basketState]
    console.log({ newBasket, index })

    if (index >= 0) {
      newBasket.splice(index, 1)
      return await dispatch({ type: REMOVE_FROM_BASKET, payload: newBasket })
    }
    return
  } catch (e) {
    console.log(e)
  }
}

export const clearBasket = () => async (dispatch) => {
  try {
    await dispatch({ type: CLEAR_BASKET })
  } catch (e) {
    console.log(e)
  }
}
