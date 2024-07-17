import React, { useState, useEffect } from 'react'
import multichartdata from '../../../assets/glossary/multichartdata.png'
import linechartdata from '../../../assets/glossary/linechartdata.png'
import piechartdata from '../../../assets/glossary/piechartdata.png'

import { Box, Grid } from '@mui/material'

const PriceSensitivityBackground = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const img1 = new Image()
    const img2 = new Image()
    const img3 = new Image()

    img1.src = multichartdata
    img2.src = linechartdata
    img3.src = piechartdata

    const checkIfAllImagesAreLoaded = () => {
      if (img1.complete && img2.complete && img3.complete) {
        setImagesLoaded(true)
      }
    }

    img1.onload = checkIfAllImagesAreLoaded
    img2.onload = checkIfAllImagesAreLoaded
    img3.onload = checkIfAllImagesAreLoaded

    // Check if images are already in the browser cache
    checkIfAllImagesAreLoaded()
  }, [])

  if (!imagesLoaded) {
    return null //  return a loading spinner
  }

  return (
    <Grid>
      <Grid
        display={'flex'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        gap={8}
      >
        <Box height={550} width={600} component={'img'} src={multichartdata} />
        <Grid
          display={'flex'}
          alignItems={'center'}
          flexDirection={'column'}
          gap={3}
        >
          <Box width={500}>
            <img
              style={{ objectFit: 'contain', height: '100%', width: '100%' }}
              src={linechartdata}
            />
          </Box>
          <Box width={500}>
            <img
              style={{ objectFit: 'contain', height: '100%', width: '100%' }}
              src={piechartdata}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PriceSensitivityBackground
