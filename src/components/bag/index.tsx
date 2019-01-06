import * as React from 'react'
import { bindActionCreators, Action, Dispatch } from 'redux'
import { connect } from 'react-redux'

import Modal from 'components/modal'

import { incrementQuantity, decrementQuantity } from 'redux/action-creators/bag/quantity'
import { applyCoupon, removeCoupon } from 'redux/action-creators/coupons'

interface Product {
  name: string,
  price: number,
  category: string,
  id: string,
  quantity: number
}

interface IBagProps {
  removeCoupon: ((product: { id: string }, couponCode: string) => void),
  applyCoupon: ((product: { id: string }, couponCode: string) => void),
  bag: {
    products: Product[]
  },
  incrementQuantity: ((product: { id: string }, quantity: number) => void),
  decrementQuantity: ((product: { id: string }) => void)
}

interface IBagState {
  couponCode:  string
}

class Bag extends React.Component<IBagProps, IBagState> {

  state = {
    couponCode: ''
  }

  bagTotal = () => {
    let total: number[] = []
    this.props.bag.products.forEach((product) => {
      const totalProductPrice: number = product.price * product.quantity
      total.push(totalProductPrice)
    })
    return total.reduce((a, b) => a + b, 0)
  }

  // setCouponCode = (event: React.MouseEvent<HTMLElement>) => {
  //   this.setState({ couponCode: event.target.value })
  // }

  // buttonComponent = (product: any) => {
  //   console.log(product, 'prod')
  //   let couponApplied = product.discounts.active === true
  //   if (couponApplied) {
  //     return <button onClick={() => this.props.removeCoupon(product.id, this.state.couponCode)}>Remove</button>
  //   }
  //   return <button onClick={() => this.props.applyCoupon(product.id, this.state.couponCode)}>Apply</button>
  // }

  // couponInformation = (product: { discounts: { active: boolean } }) => {
  //   return product.discounts.active ? <div> {this.state.couponCode} has been applied </div> : <input placeholder="discount code" onChange={this.setCouponCode} />
  // }

  render(){
    const { bag, incrementQuantity, decrementQuantity } = this.props
    return (
        <div>
          <h4> Bag </h4>
          <Modal />
          {bag.products.map((product: any, index: number) => (
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
          <p> Bag total: £{this.bagTotal()}</p>
        </div>
      )
  }
}

const mapStateToProps = ({ bag }: IBagProps) => ({
  bag,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({ incrementQuantity, decrementQuantity, applyCoupon, removeCoupon }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bag)
