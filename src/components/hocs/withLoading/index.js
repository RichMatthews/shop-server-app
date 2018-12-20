import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

const Loading = WrappedComponent => props => (
  props.loading ? <div> Loading... </div> : <WrappedComponent {...props} />
)

const mapStateToProps = ({ loading }) => ({
    loading,
})

export default compose(connect(mapStateToProps, null), Loading)
