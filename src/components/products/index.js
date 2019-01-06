import React from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addToBag } from 'redux/action-creators/bag/add'
import { loaded } from 'redux/action-creators/loading'
import './index.css'

class Products extends React.Component {

  state = {
    products: [],
  }

  componentDidMount(){
    const category = this.props.match.params.id
    axios.get('http://localhost:3004/products/sport').then(({ data }) => {
      this.setState({ products: data.filter(product => product.category === category )})
    }).then(() => {
      this.props.loaded()
    })
  }

  render(){
    return(
      <div>
        <h4> Sport Products Page </h4>
        <div className="productsContainer">
          {this.state.products.map((product, index) => (
            <div className="productContainer" key={index}>
              <div>{product.name}</div>
              <div>£{product.basePrice}</div>
              <button onClick={() => this.props.addToBag(product, this.props.bag.products)}>Add To Basket</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ bag }) => ({
  bag,
})

const mapDispatchToProps = dispatch => bindActionCreators({ addToBag, loaded }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Products)
