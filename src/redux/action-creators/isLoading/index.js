import { LOADED } from 'constants/action-types'

export const isLoading = () => {
  return {
    type: LOADED,
  }
}
