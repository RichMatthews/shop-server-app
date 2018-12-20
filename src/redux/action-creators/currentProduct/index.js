import { UPDATE_CURRENT_EDITING_PRODUCT } from 'constants/action-types'

export const updateCurrentProduct = data => {
  return {
    type: UPDATE_CURRENT_EDITING_PRODUCT,
    data,
  }
}
