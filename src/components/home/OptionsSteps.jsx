import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { palette } from '../../styles/palette'
import PropTypes from 'prop-types'

const backgroundCardStyle = {
  background: `${palette.common.white}`,
  borderRadius: '20px',
  padding: '30px',
  width: '30em',
  height: '26em',
  cursor: 'pointer'
}

const backgroundCardStyleMedia = {
  background: `${palette.common.white}`,
  borderRadius: '20px',
  padding: '20px',
  width: '24em',
  height: '20em',
  cursor: 'pointer'
}

const contentCardStyle = {
  background: `${palette.common.white}`,
  borderRadius: '20px',
  border: `2px dashed ${palette.cisco.Blue}`,
  padding: '20px',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px'
}

const contentCardMedia = {
  background: `${palette.common.white}`,
  borderRadius: '20px',
  border: `2px dashed ${palette.cisco.Blue}`,
  padding: '20px',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '10px'
}

const OptionsSteps = ({ title, icon, description, onClick }) => {
  const lScreen = useMediaQuery('(max-width:1919px)')

  return (
    <Grid
      sx={!lScreen ? backgroundCardStyle : backgroundCardStyleMedia}
      onClick={onClick}
    >
      <Grid sx={!lScreen ? contentCardStyle : contentCardMedia}>
        <Grid>
          <Typography
            fontWeight={700}
            fontSize={!lScreen ? '1.4em' : '1em'}
            color={`${palette.cisco.Blue}`}
          >
            {title}
          </Typography>
        </Grid>
        <Grid
          width={!lScreen ? '80px' : '60px'}
          height={!lScreen ? '80px' : '60px'}
        >
          <Box
            component={'img'}
            src={icon.src}
            alt='name'
            height={!lScreen ? '80px' : '60px'}
            width={!lScreen ? '80px' : '60px'}
          />
        </Grid>
        <Grid>
          <Typography
            fontWeight={400}
            fontSize={!lScreen ? '1.25em' : '1em'}
            color={`${palette.cisco.Blue}`}
          >
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OptionsSteps

OptionsSteps.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.instanceOf(Image),
  description: PropTypes.string,
  onClick: PropTypes.func
}
