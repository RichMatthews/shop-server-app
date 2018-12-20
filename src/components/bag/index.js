import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Modal from 'components/modal'

import { incrementQuantity, decrementQuantity } from 'redux/action-creators/bag/quantity'

class Bag extends React.Component {

  bagTotal = products => {
    let total = []
    products.forEach((product) => {
      let a
      a = product.price * product.quantity
      total.push(a)
    })
    return total.reduce((a, b) => a + b, 0)
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

const mapDispatchToProps = dispatch => bindActionCreators({ incrementQuantity, decrementQuantity }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bag)
