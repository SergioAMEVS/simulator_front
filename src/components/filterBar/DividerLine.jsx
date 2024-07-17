import React from 'react'
import { palette } from '../../styles/palette'
import PropTypes from 'prop-types'

const DividerLine = ({ marginAssing = '0px' }) => {
  return (
    <div
      style={{
        margin: marginAssing,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          borderBottom: `2px solid ${palette.gray.gray60}`,
          width: '100%'
        }}
      />
    </div>
  )
}

DividerLine.propTypes = {
  marginAssing: PropTypes.string
}

export default DividerLine
