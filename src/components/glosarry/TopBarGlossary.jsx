import React from 'react'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
import { palette } from '../../styles/palette'

const TopBarGlossary = ({ children }) => {
  return (
    <Grid
      position={'absolute'}
      display={'flex'}
      justifyContent={'space-between'}
      alignContent={'center'}
      padding={'10px 0px 5px 0px'}
      color={palette.common.black}
      bgcolor={palette.gray.menu.green}
      borderRadius={'0px 5px 5px 0px'}
      width={'97vw'}
      zIndex={2}
    >
      {children}
    </Grid>
  )
}

export default TopBarGlossary

TopBarGlossary.propTypes = {
  children: PropTypes.node
}
