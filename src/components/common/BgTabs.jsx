import { Grid, useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types'
// import { palette } from '../../styles/palette'

const scrollbar = {
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    width: '10px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'transparent'
  }
}

const BgTabs = ({ children }) => {
  const lScreen = useMediaQuery('(max-width:1919px)')

  return (
    <Grid
      sx={scrollbar}
      height={lScreen ? '87.54dvh' : '91.5dvh'}
      width={'250%'}
    >
      {children}
    </Grid>
  )
}

export default BgTabs

BgTabs.propTypes = {
  children: PropTypes.node
}
