import { ADD_TO_BAG } from 'constants/action-types'
import { incrementQuantity } from '../quantity'
import { updateBasket } from '../update'

export const addToBag = (item) => {
  return (dispatch, getState) => {
    const itemInBasket = getState().bag.products.filter(itemToFind => itemToFind.id === item.id)
    if(itemInBasket.length > 0) {
      const newQuantity = itemInBasket[0].quantity += 1
      dispatch(incrementQuantity(item, newQuantity))
      dispatch(updateBasket(getState().bag.products))
    } else {
      dispatch(add(item))
      dispatch(updateBasket(getState().bag.products))
    }
  };
}

export const add = item => {
  return {
    type: ADD_TO_BAG,
    item,
  }
}
