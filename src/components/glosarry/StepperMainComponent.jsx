import {
  Grid,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material'
import pricingBlue from '../../assets/sidebar/pricingblue.svg'
import profilingBlue from '../../assets/sidebar/profilingblue.svg'
import PropTypes from 'prop-types'
import React from 'react'
import { palette } from '../../styles/palette'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { PlaylistAddCheck as CheckIcon } from '@mui/icons-material'

function MyStepIcon(props) {
  const { active, completed, index } = props

  const icons = {
    0: <CheckIcon />,
    1: <img src={pricingBlue} alt='' />,
    2: <img src={profilingBlue} alt='' />
  }

  const Icon = icons[index]

  return (
    <div>
      {completed ? <CheckCircleIcon /> : active ? Icon : <RemoveCircleIcon />}
    </div>
  )
}

const StepperMainComponent = ({ stepsData, mainStep }) => {
  return (
    <Grid width={'100%'}>
      <Stepper
        alternativeLabel
        activeStep={mainStep}
        style={{ flex: 1, color: palette.cisco.PrimaryMain }}
        connector={<StepConnector style={{ color: 'red' }} />}
      >
        {stepsData.map((step, index) => (
          <Step key={index} style={{ flex: 1 }}>
            <StepLabel
              StepIconComponent={(props) => (
                <MyStepIcon {...props} index={index} />
              )}
            >
              <Typography fontWeight={800}>{step.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Grid>
  )
}

export default StepperMainComponent

StepperMainComponent.propTypes = {
  stepsData: PropTypes.array,
  mainStep: PropTypes.number
}

MyStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  index: PropTypes.number
}
