import axios from 'axios'
import { UPDATE_BAG, REMOVE_ITEM } from 'constants/action-types'

export const updateBag = items => {
  return {
    type: UPDATE_BAG,
    items,
  }
}

export const removeItem = item => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_ITEM, item })
    dispatch(updateBasket(getState().bag.products))
  }
}

export const updateBasket = (products) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://localhost:3004/basket',
      data: products
    })
  }
}
