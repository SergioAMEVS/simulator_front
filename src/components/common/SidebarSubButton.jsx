import { Box, Button, Grid, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const SidebarSubButton = ({
  title,
  icon,
  isSelected,
  onClickSelected,
  url,
  disabled
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    onClickSelected()
    navigate(url)
  }
  return (
    <Button
      onClick={handleClick}
      variant='text'
      sx={{
        backgroundColor: disabled
          ? null
          : isSelected
            ? palette.common.lightBlue
            : 'transparent',
        textTransform: 'capitalize',
        '&:hover': {
          backgroundColor: isSelected ? 'white' : 'transparent'
        },
        minWidth: '107px'
      }}
      disabled={disabled}
    >
      <Grid display={'flex'} alignItems={'center'} gap={1}>
        <Box component={'img'} src={icon} />
        <Grid>
          <Typography
            color={
              disabled
                ? '#FFFFFF66'
                : isSelected
                  ? palette.cisco.Blue
                  : palette.common.white
            }
            fontWeight={700}
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Button>
  )
}

export default SidebarSubButton

SidebarSubButton.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClickSelected: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  url: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}
