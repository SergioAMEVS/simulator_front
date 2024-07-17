import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import attention from '../../assets/small-modals/attention.svg'
import { useScenarioTitle } from '../../store/store'

const WarningModal = ({ handleClose, leave }) => {
  const { title } = useScenarioTitle()

  return (
    <Grid display={'grid'} gap={4}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        gap={1}
      >
        <Box component={'img'} src={attention} />
        <Typography fontWeight={700} color={palette.cisco.PrimaryMain}>
          WARNING
        </Typography>
      </Grid>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Grid display={'flex'}>
          <Typography>You are about to leave </Typography>
          <Typography
            color={palette.cisco.PrimaryMain}
            fontWeight={700}
            sx={{ textTransform: 'uppercase' }}
          >
            &quot;SCENARIO {title}&quot;
          </Typography>
        </Grid>
        <Grid display={'flex'}>
          <Typography>
            this action will automatically close the Scenario without saving
          </Typography>
        </Grid>
      </Grid>

      <Grid display={'flex'} justifyContent={'center'} gap={5}>
        <Grid>
          <Button
            onClick={handleClose}
            variant='outlined'
            sx={{
              textTransform: 'capitalize',
              borderRadius: '50px',
              padding: '12px 36px',
              border: `1px solid ${palette.cisco.Blue}`,
              color: palette.cisco.Blue,
              '&:hover': {
                border: `1px solid ${palette.cisco.Blue}`
              }
            }}
          >
            Go back
          </Button>
        </Grid>
        <Grid>
          <Button
            onClick={leave}
            variant='contained'
            sx={{
              textTransform: 'capitalize',
              fontWeight: 700,
              borderRadius: '50px',
              padding: '12px 36px'
            }}
          >
            Leave
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default WarningModal

WarningModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  leave: PropTypes.func.isRequired
}
