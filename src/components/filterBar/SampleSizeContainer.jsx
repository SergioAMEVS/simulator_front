import React from 'react'
import PropTypes from 'prop-types'
import { palette } from '../../styles/palette'
import { Grid } from '@mui/material'
import SampleSize from './SampleSize'
import { useApiResponseDataStore, useFilterNumber } from '../../store/store'

const SampleSizeContainer = ({ isActive = false }) => {
  const { apiResponse } = useApiResponseDataStore()
  const { filterSelectedNumber } = useFilterNumber()

  isActive = !!apiResponse?.size

  return (
    <Grid
      item
      xs={4}
      style={{
        backgroundColor: !isActive
          ? palette.gray.gray50
          : filterSelectedNumber === 4
            ? apiResponse?.size < 20
              ? '#EBA973'
              : palette.analogousCalypso.calypso100
            : apiResponse?.size < 25
              ? '#EBA973'
              : palette.analogousCalypso.calypso100,
        borderRadius: '0px 0px 0px 36px'
      }}
    >
      <SampleSize
        SampleSizeValue={
          !isActive
            ? '-'
            : filterSelectedNumber === 4
              ? apiResponse?.size < 20
              : apiResponse?.size < 25
        }
        isActive={isActive}
      />
    </Grid>
  )
}

SampleSizeContainer.propTypes = {
  isActive: PropTypes.bool,
  sampleSize: PropTypes.number
}

export default SampleSizeContainer
