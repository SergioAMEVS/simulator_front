import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import background from '../assets/Background.jpg'
import { palette } from '../styles/palette'
import OptionsSteps from '../components/home/OptionsSteps'
import { useNavigate } from 'react-router-dom'
import detailView from '../assets/home/detail-view.svg'
import comparisonView from '../assets/home/comparison-view.svg'
import {
  useApiResponseDataStore,
  useComparisonScenarioTitle1,
  useComparisonScenarioTitle2,
  useComparisonScenarioTitle3,
  useScenarioTitle,
  useSelectedScenarioFilters
} from '../store/store'
import { useEffect, useState } from 'react'
import LoadingComponent from '../components/common/LoadingComponent'

function Home() {
  const navigate = useNavigate()
  const { resetApiResponse } = useApiResponseDataStore()
  const { resetSelectedScenarioFilters } = useSelectedScenarioFilters()
  const { resetApiResponse1 } = useComparisonScenarioTitle1()
  const { resetApiResponse2 } = useComparisonScenarioTitle2()
  const { resetApiResponse3 } = useComparisonScenarioTitle3()
  const { resetScenarioTitle } = useScenarioTitle()
  const [optionsSteps, setOptionsSteps] = useState([])
  const [backgroundImage, setBackgroundImage] = useState(null)
  const lScreen = useMediaQuery('(max-width:1919px)')

  useEffect(() => {
    if (location.pathname === import.meta.env.VITE_BASE_URL2) {
      resetApiResponse()
      resetSelectedScenarioFilters()
      resetApiResponse1()
      resetApiResponse2()
      resetApiResponse3()
      resetScenarioTitle()
    }
  }, [location.pathname])

  useEffect(() => {
    const loadImages = async () => {
      const detailViewImage = new Image()
      const comparisonViewImage = new Image()
      const backgroundImage = new Image()

      detailViewImage.src = detailView
      comparisonViewImage.src = comparisonView
      backgroundImage.src = background

      await Promise.all([
        new Promise((resolve) => {
          detailViewImage.onload = () => {
            setTimeout(resolve, 1500)
          }
        }),
        new Promise((resolve) => {
          comparisonViewImage.onload = () => {
            setTimeout(resolve, 1500)
          }
        }),
        new Promise((resolve) => {
          backgroundImage.onload = () => {
            setTimeout(resolve, 1500)
          }
        })
      ])
      setOptionsSteps([
        {
          title: 'Detailed View',
          icon: detailViewImage,
          description:
            'Allows you to create and visualize details based on your filter selection',
          onClick: () => {
            navigate(import.meta.env.VITE_BASE_URL2 + 'scenario')
          }
        },
        {
          title: 'Comparison View',
          icon: comparisonViewImage,
          description:
            'Allows you to compare multiple new and already saved scenarios',
          onClick: () => {
            navigate(import.meta.env.VITE_BASE_URL2 + 'comparison')
          }
        }
      ])
      setBackgroundImage(backgroundImage)
    }

    loadImages()
  }, [])

  if (!optionsSteps.length || !backgroundImage) {
    return <LoadingComponent />
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: 'calc(100vh - 78px)',
        '@media (max-width:600px)': {
          height: '100vh'
        },
        display: 'grid'
      }}
    >
      <Grid display={'grid'} justifyContent={'center'} alignItems={'center'}>
        <Grid>
          <Typography
            fontWeight={700}
            fontSize={!lScreen ? '2em' : '1.5em'}
            color={`${palette.common.white}`}
          >
            Welcome!
          </Typography>
          <Typography
            fontWeight={700}
            fontSize={!lScreen ? '2em' : '1.5em'}
            color={`${palette.common.white}`}
          >
            How can we assist you today?
          </Typography>
          <Typography
            fontWeight={700}
            fontSize={!lScreen ? '1.2em' : '1em'}
            color={`${palette.common.white}`}
          >
            Choose your next step by clicking one of the options below
          </Typography>
        </Grid>
      </Grid>
      <Grid display={'flex'} justifyContent={'center'} gap={'90px'}>
        {optionsSteps.map((option, index) => {
          return <OptionsSteps key={index} {...option} />
        })}
      </Grid>
    </Box>
  )
}

export default Home
