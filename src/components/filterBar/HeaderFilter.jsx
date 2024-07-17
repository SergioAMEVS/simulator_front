import React from 'react'
import PropTypes from 'prop-types'
import { palette } from '../../styles/palette'
import { Typography, useMediaQuery } from '@mui/material'

const surveyStyle = {
  color: palette.common.black,
  fontFamily: 'Lato',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '24px',
  display: 'inline'
}
const surveyStyleMedia = {
  color: palette.common.black,
  fontFamily: 'Lato',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  // lineHeight: '24px',
  display: 'inline'
}

const HeaderFilter = ({ date }) => {
  const lScreen = useMediaQuery('(max-width:1919px)')

  return (
    <>
      <Typography
        sx={lScreen ? surveyStyleMedia : surveyStyle}
        marginBottom={'8px'}
      >
        Survey Done in{' '}
      </Typography>
      <Typography fontWeight={lScreen ? 600 : 700} display={'inline'}>
        {date}
      </Typography>
    </>
  )
}

HeaderFilter.propTypes = {
  date: PropTypes.string
}

export default HeaderFilter
