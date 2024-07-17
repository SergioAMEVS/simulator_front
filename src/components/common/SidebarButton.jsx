import { Box, Grid, IconButton, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const SidebarButton = ({
  title,
  icon,
  isSelected,
  onClickSelected,
  url,
  isLast,
  isFirst,
  disabled,
  handleOpen,
  isApiResponseEmpty
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (title === 'Glossary' && !isApiResponseEmpty) {
      handleOpen()
    } else {
      navigate(url)
      onClickSelected()
    }
  }
  return (
    <Grid display={'grid'}>
      <IconButton
        onClick={handleClick}
        disabled={disabled}
        sx={{
          height: '56px',
          flexDirection: 'column',
          borderRadius: '0px 0px 0px 0px',
          backgroundColor: isSelected ? 'white' : 'transparent',
          '&:hover': {
            backgroundColor: isSelected ? 'white' : 'transparent'
          },
          borderBottom: isSelected
            ? 'none'
            : `1px solid ${palette.common.white}`,
          borderTop:
            isFirst || isSelected || isLast
              ? 'none'
              : `1px solid ${palette.common.white}`
        }}
      >
        <Box component={'img'} src={icon || undefined} />

        <Typography
          color={
            disabled
              ? '#FFFFFF66'
              : isSelected
                ? palette.cisco.Blue
                : palette.common.white
          }
          fontWeight={900}
        >
          {title}
        </Typography>
      </IconButton>
    </Grid>
  )
}

export default SidebarButton

SidebarButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.string,
  onClickSelected: PropTypes.func,
  isSelected: PropTypes.bool,
  url: PropTypes.string,
  subButtons: PropTypes.array,
  abbreviatedTitle: PropTypes.element,
  isLast: PropTypes.bool,
  isFirst: PropTypes.bool,
  disabled: PropTypes.bool,
  handleOpen: PropTypes.func,
  isApiResponseEmpty: PropTypes.bool
}
