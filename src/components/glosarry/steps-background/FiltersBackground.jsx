import React, { useState, useEffect } from 'react'
import filtersMainCard from '../../../assets/glossary/filtersMainCard.png'
import topBarActions from '../../../assets/glossary/topBarActions.png'
import loadScenario from '../../../assets/glossary/loadScenario.png'

import { Box, Grid } from '@mui/material'

const FiltersBackground = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const img1 = new Image()
    const img2 = new Image()
    const img3 = new Image()

    img1.src = filtersMainCard
    img2.src = topBarActions
    img3.src = loadScenario

    const checkIfAllImagesAreLoaded = () => {
      if (img1.complete && img2.complete && img3.complete) {
        setImagesLoaded(true)
      }
    }

    img1.onload = checkIfAllImagesAreLoaded
    img2.onload = checkIfAllImagesAreLoaded
    img3.onload = checkIfAllImagesAreLoaded

    checkIfAllImagesAreLoaded()
  }, [])

  if (!imagesLoaded) {
    return null //  return a loading spinner
  }

  return (
    <Grid>
      <Grid display={'flex'} justifyContent={'center'} mb={2}>
        <Box component={'img'} src={topBarActions} />
      </Grid>
      <Grid display={'flex'} justifyContent={'space-evenly'}>
        <Box height={550} component={'img'} src={filtersMainCard} />
        <Box height={550} component={'img'} src={loadScenario} />
      </Grid>
    </Grid>
  )
}

export default FiltersBackground
