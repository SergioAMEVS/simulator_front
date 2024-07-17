import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import PropTypes from 'prop-types'
import { Button, Grid, MobileStepper } from '@mui/material'
import React from 'react'
import { palette } from '../../styles/palette'
import { useNavigate } from 'react-router-dom'
import { useStepsStore } from '../../store/store'
import FilterBar from '../filterBar/FilterBar'
import Profiling from '../../pages/Profiling'

const StepperSmallComponent = () => {
  const { mainStep, subStep, setMainStep, setSubStep, stepsData, setActive } =
    useStepsStore()

  const navigate = useNavigate()

  let StepComponent
  if (stepsData && stepsData[mainStep]) {
    switch (stepsData[mainStep].label) {
      case 'Filters':
        StepComponent = FilterBar
        break
      case 'Profiling':
        StepComponent = Profiling
        break
      default:
        // eslint-disable-next-line no-unused-vars
        StepComponent = null
    }
  }

  const finish = () => {
    useStepsStore.setState({ mainStep: 0, subStep: 0, active: false })
    navigate(`${import.meta.env.VITE_BASE_URL2}glossary`)
    setActive(false)
  }

  const handleNext = () => {
    if (
      stepsData[mainStep] &&
      subStep >= stepsData[mainStep].subSteps.length - 1
    ) {
      if (stepsData[mainStep + 1]) {
        setMainStep(mainStep + 1)
        setSubStep(0)
        navigate(stepsData[mainStep + 1].url)
      } else {
        finish()
      }
    } else {
      setSubStep(subStep + 1)
      navigate(stepsData[mainStep].url)
    }
  }

  const handleBack = () => {
    let newMainStep = mainStep
    let newSubStep = subStep

    if (subStep > 0) {
      newSubStep = subStep - 1
    } else if (mainStep > 0) {
      newMainStep = mainStep - 1
      newSubStep = stepsData[newMainStep].subSteps.length - 1
    }

    setMainStep(newMainStep)
    setSubStep(newSubStep)

    if (stepsData[newMainStep]) {
      navigate(stepsData[newMainStep].url)
    }
  }

  return (
    <Grid
      display={'flex'}
      flexDirection={'column'}
      justifyItems={'center'}
      gap={2}
      sx={{
        backgroundColor: palette.cisco.PrimaryMain,
        borderRadius: '50px',
        padding: '20px 36px',
        color: 'white',
        boxShadow: '0px 3px 5px 2px rgba(0, 0, 0, 0.3)',
        '.MuiMobileStepper-dotActive': {
          backgroundColor: palette.analogousPurple.purple100
        }
      }}
    >
      <MobileStepper
        variant='dots'
        steps={
          stepsData && stepsData[mainStep]
            ? Math.min(stepsData[mainStep].subSteps.length, 3)
            : 0
        }
        position='static'
        activeStep={subStep}
        sx={{
          backgroundColor: palette.cisco.PrimaryMain,
          '.MuiMobileStepper-dotActive': {
            backgroundColor: palette.analogousPurple.purple100
          }
        }}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            sx={{ ml: 2 }}
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            {subStep ===
              (stepsData && stepsData[mainStep]
                ? stepsData[mainStep].subSteps.length - 1
                : 0) && mainStep === (stepsData ? stepsData.length - 1 : 0)
              ? 'Finish'
              : 'Next'}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size='small'
            onClick={handleBack}
            disabled={subStep === 0 && mainStep === 0}
            sx={{ mr: 2 }}
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />

      <Button
        onClick={finish}
        variant='text'
        sx={{
          // background: palette.common.white,
          textTransform: 'capitalize',
          borderRadius: '20px',
          padding: '12px 16px',
          border: `1px solid ${palette.common.white}`,
          color: palette.common.white,
          fontWeight: 700,
          fontSize: '1em',
          '&:hover': {
            background: palette.gray.gray40,
            color: palette.cisco.PrimaryMain,
            border: `1px solid ${palette.common.white}`
          }
        }}
      >
        Finish Navigation
      </Button>
    </Grid>
  )
}

export default StepperSmallComponent

StepperSmallComponent.propTypes = {
  stepsData: PropTypes.array
}
