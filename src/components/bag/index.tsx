import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Modal from 'components/modal'

import { incrementQuantity, decrementQuantity } from 'redux/action-creators/bag/quantity'
import { applyCoupon, removeCoupon } from 'redux/action-creators/coupons'

class Bag extends React.Component {

  state = {
    couponCode: ''
  }

  bagTotal = products => {
    let total = []
    products.forEach((product) => {
      let a
      a = product.price * product.quantity
      total.push(a)
    })
    return total.reduce((a, b) => a + b, 0)
  }

  setCouponCode = e => {
    this.setState({ couponCode: e.target.value })
  }

  buttonComponent = (product) => {
    let couponApplied = product.discounts.active === true
    if (couponApplied) {
      return <button onClick={() => this.props.removeCoupon(product.id, this.state.couponCode)}>Remove</button>
    }
    return <button onClick={() => this.props.applyCoupon(product.id, this.state.couponCode)}>Apply</button>
  }

  couponInformation = (product) => {
    return product.discounts.active ? <div> {this.state.couponCode} has been applied </div> : <input placeholder="discount code" onChange={this.setCouponCode} />
  }

  render(){
    const { bag, incrementQuantity, decrementQuantity } = this.props

    return (
        <div>
          <h4> Bag </h4>
          <Modal />
          {bag.products.map((product, index) => (
            <div key={index}>
              <div>{product.name}</div>
              <div>£{product.price}</div>
              <div>
                <span> Quantity:{product.quantity} </span>
                <button onClick={() => incrementQuantity(product, product.quantity += 1)}> + </button>
                <button onClick={() => decrementQuantity(product)}> - </button>
                {this.couponInformation(product)}
                {this.buttonComponent(product)}
              </div>
            </div>
          ))}
          <p> Bag total: £{this.bagTotal(bag.products)}</p>
        </div>
      )
  }
}

const mapStateToProps = ({ bag }) => ({
  bag,
})

const mapDispatchToProps = dispatch => bindActionCreators({ incrementQuantity, decrementQuantity, applyCoupon, removeCoupon }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bag)
