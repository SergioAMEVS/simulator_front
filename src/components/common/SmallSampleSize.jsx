import { Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { palette } from '../../styles/palette'
import { useFilterNumber } from '../../store/store'

const SmallSampleSize = ({ apiResponse, chartType }) => {
  const chartData = apiResponse?.barChart?.[chartType]
  const { filterSelectedNumber, setFilterSelectedNumber } = useFilterNumber()

  useEffect(() => {
    const selectedFilters = apiResponse?.selected

    if (selectedFilters) {
      const filter1 = selectedFilters.find((filter) => filter.filter === '1')
      const selectedNumber = filter1 ? parseInt(filter1.selected[0]) : null
      setFilterSelectedNumber(selectedNumber)
    }
  }, [apiResponse])

  return (
    <Grid mb={3}>
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
            : chartData?.size < 30
              ? '#EBA973'
              : palette.analogousCalypso.calypso100
        }
        borderRadius={'8px 36px'}
        padding={'8px 16px'}
      >
        <Typography
          fontWeight={700}
          fontSize={!chartData?.size ? '12px' : '16px'}
          color={!chartData?.size ? palette.common.white : palette.common.white}
        >
          {chartData?.size ?? '-'}
        </Typography>
        <Typography
          fontWeight={700}
          fontSize={!chartData?.size ? '12px' : '16px'}
          color={!chartData?.size ? palette.common.white : palette.common.white}
        >
          Sample Size
        </Typography>
      </Grid>
    </Grid>
  )
}

export default SmallSampleSize

SmallSampleSize.propTypes = {
  apiResponse: PropTypes.shape({
    barChart: PropTypes.object,
    selected: PropTypes.array
  }),
  chartType: PropTypes.string
}
