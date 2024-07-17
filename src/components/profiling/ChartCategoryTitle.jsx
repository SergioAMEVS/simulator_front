import PropTypes from 'prop-types'
import { Box, Grid, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import { Icons, nameDictionary } from '../../styles/IconsDictionary'

const ChartCategoryTitle = ({ category, icon }) => {
  const iconName = nameDictionary[icon]

  return (
    <Grid
      height={'52px'}
      bgcolor={palette.cisco.PrimaryMain}
      padding={'8px 12px 8px 20px'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      borderRadius={'8px'}
      color={palette.common.white}
      marginBottom={1}
      width={'100%'}
    >
      <Grid>
        <Typography fontWeight={800}>{iconName}</Typography>
      </Grid>
      <Grid display={'flex'} alignItems={'center'}>
        <Box
          component='img'
          src={Icons[icon]}
          alt={icon}
          sx={{ width: '32px', height: '32px' }}
        />
      </Grid>
    </Grid>
  )
}

export default ChartCategoryTitle

ChartCategoryTitle.propTypes = {
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
