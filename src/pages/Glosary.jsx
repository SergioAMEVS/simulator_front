import React, { useEffect } from 'react'

import { Button, Grid, Typography, useMediaQuery } from '@mui/material'
import {
  useApiResponseDataStore,
  useComparisonScenarioTitle1,
  useComparisonScenarioTitle2,
  useComparisonScenarioTitle3,
  useScenarioTitle,
  useSelectedScenarioFilters,
  useStepsStore
} from '../store/store'
import { useNavigate } from 'react-router-dom'
import { palette } from '../styles/palette'

const Glosary = () => {
  const navigate = useNavigate()
  const { resetApiResponse } = useApiResponseDataStore()
  const { resetSelectedScenarioFilters } = useSelectedScenarioFilters()
  const { resetApiResponse1 } = useComparisonScenarioTitle1()
  const { resetApiResponse2 } = useComparisonScenarioTitle2()
  const { resetApiResponse3 } = useComparisonScenarioTitle3()
  const { resetScenarioTitle } = useScenarioTitle()
  const { setActive } = useStepsStore()
  const lScreen = useMediaQuery('(max-width:1919px)')

  const handleNavigationClick = () => {
    setActive(true)
    navigate(`${import.meta.env.VITE_BASE_URL2}pricing`)
  }

  // Reset all filters to default and clear the data
  useEffect(() => {
    resetApiResponse()
    resetSelectedScenarioFilters()
    resetApiResponse1()
    resetApiResponse2()
    resetApiResponse3()
    resetScenarioTitle()
  }, [])

  return (
    <Grid
      display={'flex'}
      style={{ background: 'linear-gradient(to top, #005568, #03B9E0)' }}
      height={lScreen ? '89dvh' : '91.5vh'}
      justifyContent={'center'}
    >
      {/* <BgTabs> */}
      <Grid
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        height={'80vh'}
      >
        <Grid display={'flex'} flexDirection={'column'} gap={4}>
          <Typography
            fontWeight={700}
            fontSize={'3em'}
            color={`${palette.common.white}`}
          >
            Need some help?
          </Typography>
          <Typography
            fontWeight={700}
            fontSize={'2.5em'}
            color={`${palette.common.white}`}
          >
            Let&apos;s start the navigation ...
          </Typography>
          <Button
            onClick={handleNavigationClick}
            variant='contained'
            sx={{
              background: palette.common.white,
              textTransform: 'capitalize',
              borderRadius: '50px',
              padding: '12px 36px',
              border: `1px solid ${palette.cisco.Blue}`,
              color: palette.cisco.PrimaryMain,
              fontWeight: 700,
              fontSize: '1.2em',
              '&:hover': {
                background: `1px solid ${palette.gray.gray40}`,
                color: palette.common.white,
                border: `1px solid ${palette.common.white}`
              }
            }}
          >
            Start Navigation
          </Button>
        </Grid>
      </Grid>
      {/* </BgTabs> */}
    </Grid>
  )
}

export default Glosary
