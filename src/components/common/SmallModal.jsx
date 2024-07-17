import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Modal } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  padding: '36px'
}

const SmallModal = ({ openModalId, modalId, handleClose, children }) => {
  return (
    <Modal open={openModalId === modalId} onClose={handleClose}>
      <Grid sx={style}>{children}</Grid>
    </Modal>
  )
}

export default SmallModal

SmallModal.propTypes = {
  openModalId: PropTypes.string,
  modalId: PropTypes.string,
  handleClose: PropTypes.func,
  children: PropTypes.node
}
