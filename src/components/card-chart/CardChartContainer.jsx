import { Grid, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import { palette } from '../../styles/palette'
import SmallCard from './SmallCard'

const CardChartContainer = ({
  children,
  title,
  hasSmallCard = false,
  smallCardData,
  style
}) => {
  return (
    <>
      <Grid
        bgcolor={palette.common.white}
        borderRadius={'20px'}
        zIndex={-9999}
        boxShadow={10}
        sx={{
          ...style
        }}
      >
        <Grid
          bgcolor={palette.cisco.Blue}
          height={'57px'}
          width={'437px'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={'10px 0px 35px 0px'}
        >
          <Typography color={palette.common.white} fontWeight={700}>
            {title}
          </Typography>
        </Grid>
        <Grid justifyContent={'center'} padding={'20px 30px 0px 0px'}>
          {children}
        </Grid>
      </Grid>
      {hasSmallCard && <SmallCard smallCardData={smallCardData} />}
    </>
  )
}

export default CardChartContainer

CardChartContainer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  hasSmallCard: PropTypes.bool,
  style: PropTypes.object,
  smallCardData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
