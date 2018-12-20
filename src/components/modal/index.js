import React from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { toggleModal } from 'redux/action-creators/modal'
import { removeItem } from 'redux/action-creators/bag/update'

const Modal = ({ modal, toggleModal, removeItem, currentProduct }) => (
  <ReactModal
          isOpen={modal.isOpen}
          style={{
            content: {
              background: '#fff',
              padding: 0,
              inset: '0px',
              border: 'none',
              top: '40px',
              bottom: '40px',
              left: '40px',
              right: '40px',
              maxWidth: '960px',
              margin: 'auto',
              height: '250px',
              width: '250px',
            },
            overlay: {
              position: 'fixed',
              zIndex: 99999999,
              margin: 'auto',
              borderRadius: '4px',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgb(0,0,0,0.35)'
            }
          }}
        >
          <div className="modalContainer">
            <div>
              <p>Are you sure you want to remove this item from your basket?</p>
              <button onClick={() => removeItem(currentProduct)}>Yes</button>
              <button onClick={toggleModal}>No</button>
            </div>
          </div>
        </ReactModal>
)

const mapStateToProps = ({ modal, currentProduct }) => ({
    modal,
    currentProduct,
})

const mapDispatchToProps = dispatch => bindActionCreators({ toggleModal, removeItem }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
