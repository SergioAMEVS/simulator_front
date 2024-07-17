import React from 'react'
import PropTypes from 'prop-types'
import { Grid, IconButton, useMediaQuery } from '@mui/material'
import { palette } from '../styles/palette'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useLocation } from 'react-router-dom'
import { useToggleStore } from '../store/store'

const buttonTab = {
  marginTop: '285px',
  width: '30px',
  height: '80px',
  borderRadius: '20px 0px 0px 20px',
  bgcolor: palette.analogousCalypso.calypso100,
  '&:hover': {
    backgroundColor: palette.analogousCalypso.calypso100
  },
  paddingLeft: '15px'
}

const buttonTabMedia = {
  marginTop: '200px',
  width: '30px',
  height: '80px',
  borderRadius: '20px 0px 0px 20px',
  bgcolor: palette.analogousCalypso.calypso100,
  '&:hover': {
    backgroundColor: palette.analogousCalypso.calypso100
  },
  paddingLeft: '15px'
}

const BaseCard = ({ children, cardStyle }) => {
  // const [isHidden, setHidden] = useState(false)
  const location = useLocation()
  const { isHidden, toggleHidden } = useToggleStore((state) => ({
    isHidden: state.isHidden,
    toggleHidden: state.toggleHidden
  }))
  const lScreen = useMediaQuery('(max-width:1919px)')

  return (
    <>
      {location.pathname !== import.meta.env.VITE_BASE_URL2 + 'scenario' && (
        <Grid height={'100%'}>
          <IconButton
            variant='contained'
            onClick={toggleHidden}
            sx={!lScreen ? buttonTab : buttonTabMedia}
          >
            {isHidden ? (
              <Grid color={palette.common.white}>
                <ArrowBackIosIcon />
              </Grid>
            ) : (
              <Grid color={palette.common.white}>
                <ArrowForwardIosIcon />
              </Grid>
            )}
          </IconButton>
        </Grid>
      )}
      {!isHidden && <div style={cardStyle}>{children}</div>}
    </>
  )
}

export default BaseCard

BaseCard.propTypes = {
  text: PropTypes.string,
  cardStyle: PropTypes.object,
  children: PropTypes.node,
  isHidden: PropTypes.bool
}
