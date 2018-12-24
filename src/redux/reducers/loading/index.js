import { LOADED, LOADING } from 'constants/action-types'

const initialState = true

export default(state = initialState, action) => {
  switch(action.type){
    case LOADING:
      return true
    case LOADED:
      return false
    default:
      return state;
  }
}
