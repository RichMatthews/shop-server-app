import { UPDATE_CURRENT_EDITING_PRODUCT } from 'constants/action-types'

const initialState = {
  data: '',
}

export default(state = initialState, action) => {
  switch(action.type){
    case UPDATE_CURRENT_EDITING_PRODUCT:
      return {
        ...state,
        data: action.data
      }
    default:
      return state;
  }
}
