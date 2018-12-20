import React from 'react'
import { Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import axios from 'axios'
import { bindActionCreators } from 'redux'

import HomePage from 'components/homepage'
import Nav from 'components/nav'
import Products from 'components/products'
import Bag from 'components/bag'
import NoMatch from 'components/noMatch'
import WithLoading from 'components/hocs/withLoading'

import { updateBag } from 'redux/action-creators/bag/update'
import { isLoading } from 'redux/action-creators/isLoading'

const BASKET_ENDPOINT = 'http://localhost:3004/basket'

const HomePageWithLoading = WithLoading(HomePage)
const ProductPageWithLoading = WithLoading(Products)
const BagWithLoading = WithLoading(Bag)

class Routes extends React.Component {

  constructor(props) {
    super(props)

    this.props.history.listen(() => {
      axios.get(BASKET_ENDPOINT).then(({ data }) => {
        this.props.updateBag(data)
      })
    });
  }

  componentDidMount() {
    axios.get(BASKET_ENDPOINT).then(({ data }) => {
      this.props.updateBag(data)
    }).then(() => {
      this.props.isLoading()
    })
  }

  render(){
    return(
      <div>
        <Nav />
        <Switch>
            <Route path="/" exact={true} component={HomePageWithLoading} />
            <Route
              path="/products/:id"
              exact={true}
              render={props => (
                <ProductPageWithLoading
                  {...props}
                />
              )}
            />
            <Route path="/bag" exact={true} component={BagWithLoading} />
            <Route exact={true} component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ bag }) => ({
  bag,
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateBag, isLoading }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))
