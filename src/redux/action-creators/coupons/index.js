import axios from 'axios'

export const applyCoupon = (productId, couponCode) => {
  return (dispatch, getState) => {
      axios({
        method: 'post',
        url: `http://localhost:3004/product/${productId}/coupons`,
        data: {
          'code': couponCode,
          'method': 'POST'
        }
      }).then(() => {
      axios.get('http://localhost:3004/basket').then(({ data }) => {
        dispatch({ type: 'UPDATE_BAG', items: data})
      })
    })
  }
}

export const removeCoupon = (productId, couponCode) => {
  return (dispatch, getState) => {
      axios({
        method: 'post',
        url: `http://localhost:3004/product/${productId}/coupons`,
        data: {
          'code': couponCode,
          'method': 'DELETE'
        }
      }).then(() => {
      axios.get('http://localhost:3004/basket').then(({ data }) => {
        dispatch({ type: 'UPDATE_BAG', items: data})
      })
    })
  }
}
