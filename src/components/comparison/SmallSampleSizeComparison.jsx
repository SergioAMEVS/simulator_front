import React from 'react'
import PropTypes from 'prop-types'
import { palette } from '../../styles/palette'
import { Grid, Typography } from '@mui/material'
import { useFilterNumber } from '../../store/store'

const SmallSampleSizeComparison = ({ barChart, chartType }) => {
  const chartData = barChart?.[chartType]
  const { filterSelectedNumber } = useFilterNumber()

  return (
    <Grid
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      border={
        !chartData?.size
          ? '1px solid #C9CACC'
          : filterSelectedNumber === 4
            ? chartData?.size < 20
              ? `2px solid '#EBA973'`
              : `2px solid ${palette.analogousCalypso.calypso100}`
            : chartData?.size < 25
              ? `2px solid '#EBA973'`
              : `2px solid ${palette.analogousCalypso.calypso100}`
      }
      backgroundColor={
        filterSelectedNumber === 4
          ? chartData?.size < 20
            ? '#EBA973'
            : palette.analogousCalypso.calypso100
          : chartData?.size < 25
            ? '#EBA973'
            : palette.analogousCalypso.calypso100
      }
      borderRadius={'8px 36px'}
      padding={'8px 16px'}
      margin={'15px 0px 0px 0px'}
    >
      <Typography
        fontWeight={700}
        fontSize={!chartData?.size ? '12px' : '14px'}
        color={!chartData?.size ? palette.common.white : palette.common.white}
      >
        {chartData?.size ?? '-'}
      </Typography>
      <Typography
        fontWeight={700}
        fontSize={!chartData?.size ? '12px' : '14px'}
        color={!chartData?.size ? palette.common.white : palette.common.white}
      >
        Sample Size
      </Typography>
    </Grid>
  )
}

export default SmallSampleSizeComparison

SmallSampleSizeComparison.propTypes = {
  barChart: PropTypes.shape({
    barChart: PropTypes.object
  }),
  chartType: PropTypes.string
}
