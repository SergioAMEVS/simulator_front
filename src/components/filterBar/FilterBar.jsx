import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { palette } from '../../styles/palette'
import HeaderFilter from './HeaderFilter'
import DividerLine from './DividerLine'
import CustomButton from '../CustomButton'
import FilterCategory from './FilterCategory'
import { FlexBox } from '../../styles/flexBox'
import SampleSizeContainer from './SampleSizeContainer'
import { useLocation } from 'react-router-dom'
import {
  useApiResponseDataStore,
  useCheckboxStore,
  useDisabledButtons,
  useFiltersDataStore,
  useModalStore,
  useScenarioTitle,
  useSelectedScenario,
  useSelectedScenarioFilters,
  useStepsStore
} from '../../store/store'
import useApi from '../../hooks/useCallApi'
import TooltipComponent from '../common/TooltipComponent'
import SampleSize from './SampleSize'

const filterStyle = {
  color: palette.common.black,
  fontFamily: 'Lato',
  fontSize: '28px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '34px',
  marginBottom: '8px'
}

const filterStyleLgScreen = {
  color: palette.common.black,
  fontFamily: 'Lato',
  fontSize: '22px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '34px',
  marginBottom: '8px'
}

const FilterBar = ({ isCreate = false }) => {
  const location = useLocation()
  const [filtersData, setFiltersData] = useState([])
  const [showSampleSize, setShowSampleSize] = useState(true)
  const [isCleared, setIsCleared] = useState(false)
  const { filters } = useFiltersDataStore()
  const [isLoading, setIsLoading] = useState(false)
  const { saveApiResponseData } = useApiResponseDataStore()
  const { title, saveTitle } = useScenarioTitle()
  const { selectedScenario } = useSelectedScenario()
  const { saveSelectedScenarioFilters } = useSelectedScenarioFilters()
  const { setDisabledButons } = useDisabledButtons()
  const [errorType, setErrorType] = useState('')
  const { openModal } = useModalStore()
  const { data, error, fetchData } = useApi('filters')
  const { post: postData } = useApi('apply')
  const { data: dataSelectedScenarioSave, fetchData: fetchSelectedScenario } =
    useApi(`scenario/${selectedScenario?.id}`)
  const { checkbox } = useCheckboxStore()
  const lScreen = useMediaQuery('(max-width:1919px)')
  const { mainStep, subStep, stepsData, active } = useStepsStore()

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedScenario?.id) {
      fetchSelectedScenario()
    }
  }, [selectedScenario?.id])

  useEffect(() => {
    if (data) {
      setFiltersData(data)
    }

    if (error) {
      console.error('Error fetching filters:', error)
    }
  }, [data, error])

  function clearAll() {
    localStorage.removeItem('filterSelected')
    setIsCleared((prevState) => !prevState)
  }

  const handleSelectedScenarioSave = async () => {
    setIsLoading(true)
    try {
      saveTitle(dataSelectedScenarioSave.title)
      const data = {
        selected: JSON.parse(dataSelectedScenarioSave.state)
      }
      const response = await postData(data)
      saveApiResponseData(response)
    } catch (error) {
      console.error('Error :', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApply = async () => {
    setIsLoading(true)
    try {
      const response = await postData(filters)

      saveApiResponseData(response)
      setDisabledButons(false)
      saveSelectedScenarioFilters(JSON.stringify(filters.selected))
    } catch (error) {
      console.error('Error :', error)
    } finally {
      setIsLoading(false)
    }
  }
  const { saveFiltersData } = useFiltersDataStore()

  const handleOpen = async () => {
    setIsLoading(true)
    try {
      const response = await postData(filters)

      saveApiResponseData(response)
      saveFiltersData(filters)
      setDisabledButons(false)
      saveSelectedScenarioFilters(JSON.stringify(filters.selected))
    } catch (error) {
      console.error('Error :', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (
      location.pathname === import.meta.env.VITE_BASE_URL2 + 'scenario' &&
      openModal
    ) {
      setShowSampleSize(false)
    } else {
      setShowSampleSize(true)
    }
  }, [location.pathname, openModal])

  return (
    <>
      <Grid container sx={{ marginBottom: '5px' }}>
        {isCreate ? (
          <Grid
            item
            xs={8}
            paddingLeft={'38px'}
            display={'flex'}
            justifyContent={'end'}
            flexDirection={'column'}
          >
            <Grid mt={4} width={'80%'}>
              <TextField
                id='outlined-basic'
                label='Scenario Title'
                variant='outlined'
                fullWidth
                focused
                value={title}
                onChange={(e) => {
                  const value = e.target.value
                  if (/(--|;|'|\/\*|\*\/)/g.test(value)) {
                    setErrorType('Invalid input')
                  } else {
                    setErrorType('')
                    saveTitle(value)
                  }
                }}
              />
              {errorType && (
                <Typography
                  variant='caption'
                  style={{ color: palette.common.error }}
                >
                  {errorType}
                </Typography>
              )}
            </Grid>

            <Grid>
              <HeaderFilter date='Q4 2023' />
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={8} paddingLeft={'38px'}>
            {active &&
            stepsData[mainStep] &&
            stepsData[mainStep].label === 'Filters' &&
            stepsData[mainStep].subSteps[subStep] &&
            stepsData[mainStep].subSteps[subStep].step === 1 ? (
              <TooltipComponent
                data={stepsData[mainStep].subSteps[subStep].tooltip}
                placement='left'
              >
                <p style={lScreen ? filterStyleLgScreen : filterStyle}>
                  Filters Selected
                </p>
              </TooltipComponent>
            ) : (
              <p style={lScreen ? filterStyleLgScreen : filterStyle}>
                Filters Selected
              </p>
            )}

            {<HeaderFilter date='Q4 2023' />}
          </Grid>
        )}
        {showSampleSize &&
        stepsData[mainStep] &&
        stepsData[mainStep].label === 'Filters' &&
        stepsData[mainStep].subSteps[subStep] &&
        stepsData[mainStep].subSteps[subStep].step === 6 ? (
          <TooltipComponent
            data={stepsData[mainStep].subSteps[subStep].tooltip}
            placement='left'
          >
            <Grid
              item
              xs={4}
              style={{
                backgroundColor: palette.gray.gray50,
                borderRadius: '0px 0px 0px 36px'
              }}
            >
              <SampleSize SampleSizeValue={'230'} isActive={true} />
            </Grid>
          </TooltipComponent>
        ) : (
          <SampleSizeContainer isActive={true} />
        )}
      </Grid>
      <DividerLine marginAssing={'18px 0 11px 0'} />
      <Box {...FlexBox} marginBottom={'12px'}>
        {location.pathname !== import.meta.env.VITE_BASE_URL2 + 'scenario' && (
          <Grid
            container
            width={'100%'}
            display={'flex'}
            justifyContent={'flex-end'}
          >
            <Grid
              item
              xs={8}
              display={'flex'}
              justifyContent={'flex-end'}
              marginRight={'55px'}
            >
              <CustomButton
                text='Clear All'
                filled={false}
                textColor={palette.cisco.Blue}
                assignedColor={palette.common.white}
                clickFunction={clearAll}
              />
            </Grid>
          </Grid>
        )}
        <Grid mt={2} />
      </Box>
      <Box {...FlexBox}>
        <Grid container {...FlexBox} gap={'15px'} pl={4}>
          <FilterCategory filterData={filtersData} isCleared={isCleared} />
        </Grid>
      </Box>
      <Grid
        {...FlexBox}
        justifyContent={'flex-end'}
        margin={lScreen ? '2px 7% 5px 0' : '25px 7% 15px 0'}
      >
        <CustomButton
          filled
          text={
            isLoading ? (
              <CircularProgress size={24} style={{ color: '#fff' }} />
            ) : location.pathname !==
              import.meta.env.VITE_BASE_URL2 + 'scenario' ? (
              'Apply'
            ) : (
              'Open'
            )
          }
          clickFunction={
            checkbox &&
            location.pathname === import.meta.env.VITE_BASE_URL2 + 'scenario' &&
            !openModal
              ? handleSelectedScenarioSave
              : location.pathname !==
                  import.meta.env.VITE_BASE_URL2 + 'scenario'
                ? handleApply
                : handleOpen
          }
          linkTo={import.meta.env.VITE_BASE_URL2 + 'pricing'}
          hasHover={false}
        />
      </Grid>
    </>
  )
}

export default FilterBar

FilterBar.propTypes = {
  isCreate: PropTypes.bool,
  refetch: PropTypes.func
}
