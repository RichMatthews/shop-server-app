import { ADD_TO_BAG, INCREMENT_QUANTITY, DECREMENT_QUANTITY, REMOVE_ITEM, UPDATE_BAG } from 'constants/action-types'

const initialState = {
  products: [],
}

export default(state = initialState, action) => {
  switch(action.type){
    case ADD_TO_BAG:
      return {
        ...state,
        products: state.products.concat({...action.item, quantity: 1})
      }
    case INCREMENT_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) => product.id === action.item.id ? {...product, quantity: action.quantity} : product)
      }
    case DECREMENT_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) => product.id === action.updatedItem.item.id ? {...product, quantity: action.updatedItem.quantity} : product)
      }
    case REMOVE_ITEM:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.item.data.id)
      }
    case UPDATE_BAG:
      return {
        ...state,
        products: action.items
      }
    default:
      return state;
  }
}
