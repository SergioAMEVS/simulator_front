import React, { useState, useEffect } from 'react'
import profiling from '../../../assets/glossary/profiling.png'
import { Box, Grid } from '@mui/material'

const ProfilingBackground = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = profiling
    img.onload = () => {
      setImageLoaded(true)
    }

    if (img.complete) {
      setImageLoaded(true)
    }
  }, [])

  if (!imageLoaded) {
    return null
  }

  return (
    <Grid>
      <Grid display={'flex'} justifyContent={'space-evenly'}>
        <Box height={650} width={500} component={'img'} src={profiling} />
      </Grid>
    </Grid>
  )
}

export default ProfilingBackground
