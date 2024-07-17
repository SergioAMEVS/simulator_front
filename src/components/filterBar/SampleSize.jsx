import React, { useEffect } from 'react'
import { palette } from '../../styles/palette'
import { useApiResponseDataStore, useFilterNumber } from '../../store/store'
import { useMediaQuery } from '@mui/material'

const sampleSizeStyle = {
  fontFamily: 'Lato',
  fontSize: '44px',
  fontStyle: 'normal',
  fontWeight: 700,
  marginBottom: '25px',
  lineHeight: '0px'
}

const sampleSizeStyleMedia = {
  fontFamily: 'Lato',
  fontSize: '36px',
  fontStyle: 'normal',
  fontWeight: 700,
  marginBottom: '2px',
  lineHeight: '0px'
}

const sampleTextStyle = {
  fontFamily: 'Lato',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '0px',
  marginTop: '35px'
}

const sampleTextStyleMedia = {
  fontFamily: 'Lato',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '0px',
  marginTop: '35px'
}

const SampleSize = () => {
  const lScreen = useMediaQuery('(max-width:1919px)')
  const { filterSelectedNumber, setFilterSelectedNumber } = useFilterNumber()
  const { apiResponse } = useApiResponseDataStore()

  useEffect(() => {
    const selectedFilters = apiResponse?.selected

    if (selectedFilters) {
      const filter1 = selectedFilters.find((filter) => filter.filter === '1')
      const selectedNumber = filter1 ? parseInt(filter1.selected[0]) : null
      setFilterSelectedNumber(selectedNumber)
    }
  }, [apiResponse])

  return (
    <div style={{ textAlign: 'center', color: palette.common.white }}>
      <p style={lScreen ? sampleSizeStyleMedia : sampleSizeStyle}>
        {apiResponse?.size}
      </p>
      <p style={lScreen ? sampleTextStyleMedia : sampleTextStyle}>
        {filterSelectedNumber === 4
          ? apiResponse?.size < 20
            ? 'Directional'
            : 'Sample Size'
          : apiResponse?.size < 25
            ? 'Directional'
            : 'Sample Size'}
      </p>
    </div>
  )
}

export default SampleSize
