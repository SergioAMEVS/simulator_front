import { Box, Dialog, DialogContent, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ciscoLogo from '../../assets/common/cisco-logo.png'
import LinearProgress from '@mui/material/LinearProgress'
import { palette } from '../../styles/palette'

const LoadingComponent = () => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Dialog open={open} fullScreen>
      <DialogContent>
        <Grid
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          height={'90dvh'}
        >
          <Box component={'img'} src={ciscoLogo} />
          <Grid width={'200px'} mt={2}>
            <LinearProgress sx={{ color: palette.cisco.Blue }} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default LoadingComponent
