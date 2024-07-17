import PropTypes from 'prop-types'
import { Grid, LinearProgress, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import { convertProfillingToPercentage } from '../../helpers/converter-numbers-to'

const ProgressChartStyle = {
  flex: 2,
  backgroundColor: `${palette.linearChart.base} `,
  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: palette.linearChart.advance
  }
}

const styles = {
  '&:first-of-type': {
    borderTop: `1px solid ${palette.gray.gray30}`,
    borderLeft: `1px solid ${palette.gray.gray40}`,
    borderRight: `1px solid ${palette.gray.gray40}`,
    borderBottom: `2px solid ${palette.gray.gray40}`,
    borderRadius: '8px 8px 0px 0px'
  },
  '&:not(:first-of-type):not(:last-child)': {
    borderBottom: `2px solid ${palette.gray.gray40}`,
    borderLeft: `1px solid ${palette.gray.gray40}`,
    borderRight: `1px solid ${palette.gray.gray40}`
  },
  '&:last-child': {
    borderBottom: `2px solid ${palette.gray.gray50}`,
    borderLeft: `1px solid ${palette.gray.gray40}`,
    borderRight: `1px solid ${palette.gray.gray40}`,
    borderRadius: '0px 0px 8px 8px'
  }
}

const ProgressChart = ({ category }) => {
  return (
    <Grid
      display={'flex'}
      alignItems={'center'}
      width={'100%'}
      padding={'10px 20px '}
      height={'52px'}
      bgcolor={palette.common.white}
      sx={styles}
    >
      <Grid flex={0.8}>
        <Typography>{category?.titleCategory}</Typography>
      </Grid>
      <Grid
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'50%'}
      >
        <LinearProgress
          variant='determinate'
          value={category?.value}
          sx={ProgressChartStyle}
        />
        <Grid ml={2}>
          <Typography>{`${convertProfillingToPercentage(
            category?.value
          )}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProgressChart

ProgressChart.propTypes = {
  category: PropTypes.object
}
