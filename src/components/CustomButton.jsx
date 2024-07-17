import React from 'react'
import { palette } from '../styles/palette'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'

const CustomButton = ({
  text = 'Click Me',
  linkTo,
  textColor = '#fff',
  assignedColor = palette.cisco.Blue,
  isDisabled = false,
  filled = true,
  hasHover = false,
  clickFunction
}) => {
  const [hover, setHover] = React.useState(false)
  const lScreen = useMediaQuery('(max-width:1919px)')

  return linkTo !== undefined && !isDisabled ? (
    <Link
      to={linkTo ?? ''}
      onClick={!isDisabled ? clickFunction : null}
      style={{
        display: 'flex',
        padding: lScreen ? '6px 25px' : '12px 45px',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '50px',
        backgroundColor:
          filled & !isDisabled
            ? assignedColor
            : filled
              ? palette.gray.gray40
              : '#fff',
        cursor: 'pointer',
        textDecoration: 'none'
      }}
    >
      <span
        style={{
          color: !isDisabled ? textColor : palette.gray.gray50,
          fontSize: '16px',
          fontStyle: 'normal'
        }}
      >
        {text}
      </span>
    </Link>
  ) : (
    <div
      onClick={!isDisabled ? clickFunction : null}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={{
        display: 'flex',
        padding: '12px 45px',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '50px',
        backgroundColor: isDisabled
          ? palette.gray.gray40
          : hover
            ? hasHover
              ? palette.cisco.PrimaryMain
              : 'none'
            : filled & !isDisabled
              ? assignedColor
              : filled
                ? palette.gray.gray40
                : '#fff',
        cursor: 'pointer'
      }}
    >
      <span
        style={{
          color: !isDisabled ? textColor : palette.gray.gray50,
          fontSize: '16px',
          fontStyle: 'normal'
        }}
      >
        {text}
      </span>
    </div>
  )
}
CustomButton.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  linkTo: PropTypes.string,
  textColor: PropTypes.string,
  assignedColor: PropTypes.string,
  isDisabled: PropTypes.bool,
  filled: PropTypes.bool,
  hasHover: PropTypes.bool,
  clickFunction: PropTypes.func
}
export default CustomButton
