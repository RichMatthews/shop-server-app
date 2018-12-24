import { LOADED, LOADING } from 'constants/action-types'

export const loaded = () => {
  return {
    type: LOADED,
  }
}

export const loading = () => {
  return {
    type: LOADING,
  }
}
