import * as React from 'react'
import Box from '@mui/material/Box'
import { palette } from '../../styles/palette'
import { Button, Typography, useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types'

export const steps = [
  'Reduce Risk',
  'Reduce Cost',
  'Enhance Security',
  'Demonstrate Compliance',
  'Optimize Productivity',
  'Manage Reputation ',
  'Enable Business',
  'Digital Transformation',
  'Grow Revenues',
  'Improve End User',
  'Improve Customer '
]

export default function StepperSelectedOption({
  currentStep,
  setCurrentStep,
  handleStepChange
}) {
  const lScreen = useMediaQuery('(max-width:1919px)')
  const handleStep = (step) => () => {
    setCurrentStep(step)
    handleStepChange(step)
  }

  return (
    <Box
      display={'flex'}
      flexWrap={lScreen ? 'wrap' : null}
      gap={2}
      justifyContent={'center'}
    >
      {steps.map((label, index) => (
        <Button key={label} onClick={handleStep(index)} variant={'text'}>
          <Typography
            color={
              currentStep === index
                ? palette.cisco.PrimaryMain
                : palette.analogousCalypso.calypso100
            }
            fontSize={'14px'}
            fontWeight={'600'}
            textTransform={'capitalize'}
          >
            {label}
          </Typography>
        </Button>
      ))}
    </Box>
  )
}

StepperSelectedOption.propTypes = {
  currentStep: PropTypes.number,
  setCurrentStep: PropTypes.func,
  handleStepChange: PropTypes.func
}
