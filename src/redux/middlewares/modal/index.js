import { DECREMENT_QUANTITY, TOGGLE_MODAL } from 'constants/action-types'

const modalMiddleware = store => next => action => {
  if (action.type === DECREMENT_QUANTITY && action.updatedItem.quantity === 0){
      store.dispatch({ type: TOGGLE_MODAL })
    } else {
    next(action)
  }
}

export default modalMiddleware
