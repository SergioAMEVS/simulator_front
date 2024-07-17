import React, { useEffect } from 'react'
import background from '../assets/Background.jpg'
import NewScenario from '../components/home/NewScenario'
import { Box, Grid, useMediaQuery } from '@mui/material'
import SavedScenarios from '../components/home/SavedScenarios'
import FilterBar from '../components/filterBar/FilterBar'
import BaseCard from '../components/BaseCard'
import { filterCardStyle, filterCardStyleMedia } from '../styles/MainCardStyles'
import useApi from '../hooks/useCallApi'
import LoadingComponent from '../components/common/LoadingComponent'

const Scenario = () => {
  const { data: savedScenarios, isLoading, fetchData } = useApi('scenario')
  const lScreen = useMediaQuery('(max-width:1919px)')

  useEffect(() => {
    fetchData()
  }, [])

  // DELETE
  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: lScreen ? 'calc(100vh - 77px)' : 'calc(100vh - 78px)',
        display: 'grid'
      }}
    >
      {savedScenarios?.length <= 0 ? (
        <NewScenario savedScenario={savedScenarios} />
      ) : (
        <Grid container display='flex' justifyContent={'center'}>
          <Grid
            flex={1}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <SavedScenarios
              savedScenario={savedScenarios}
              refetch={fetchData}
            />
          </Grid>

          <Grid display='flex' justifyContent='flex-end' alignItems='center'>
            <BaseCard
              cardStyle={lScreen ? filterCardStyleMedia : filterCardStyle}
              isHidden={false}
            >
              <FilterBar />
            </BaseCard>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default Scenario
