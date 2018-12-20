import { TOGGLE_MODAL, REMOVE_ITEM } from 'constants/action-types'

const initialState = {
  isOpen: false,
}

export default(state = initialState, action) => {
  switch(action.type){
    case TOGGLE_MODAL:
      return {
        ...state,
        isOpen: !state.isOpen
      }
    case REMOVE_ITEM:
      return {
        ...state,
        isOpen: false
      }
    default:
      return state;
  }
}
