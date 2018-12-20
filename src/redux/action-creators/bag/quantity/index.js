import { INCREMENT_QUANTITY, DECREMENT_QUANTITY } from 'constants/action-types'
import { updateBasket } from '../update'
import { updateCurrentProduct } from 'redux/action-creators/currentProduct'

export const incrementQuantity = (item, quantity) => {
  return (dispatch, getState) => {
    dispatch({ type: INCREMENT_QUANTITY, item, quantity })
    dispatch(updateBasket(getState().bag.products))
    dispatch(updateCurrentProduct(item))
  }
}

export const decrementQuantity = (item) => {
  return (dispatch, getState) => {
    const itemQuantity = getState().bag.products.filter(product => product.id === item.id)[0].quantity
    const newItemQuantity = itemQuantity - 1
    const updatedItem = {
      item,
      quantity: newItemQuantity
    }
    dispatch({ type: DECREMENT_QUANTITY, updatedItem })
    dispatch(updateBasket(getState().bag.products))
    dispatch(updateCurrentProduct(item))
  }
}
