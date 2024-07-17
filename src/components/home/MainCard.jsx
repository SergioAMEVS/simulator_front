import React from 'react'
import barChartHome from '../../assets/barChartHome.svg'
import { Box, Typography } from '@mui/material'
import { palette } from '../../styles/palette'

const MainCard = () => {
  return (
    <>
      <Box
        sx={{
          width: '460px',
          height: '460px',
          flexShrink: 0,
          borderRadius: '40px',
          border: `1px dashed ${palette.cisco.Blue}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img src={barChartHome} alt='barChartHome' />
        <Typography color={palette.cisco.Blue} fontSize={20}>
          Select <b>filters</b> to generate the graphs
        </Typography>
      </Box>
    </>
  )
}

export default MainCard
