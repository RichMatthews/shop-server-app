import { LOADED } from 'constants/action-types'

const initialState = false

export default(state = initialState, action) => {
  switch(action.type){
    case LOADED:
      return false
    default:
      return state;
  }
}
