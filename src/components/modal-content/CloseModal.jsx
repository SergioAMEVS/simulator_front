import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import { useNavigate } from 'react-router-dom'
import {
  useApiResponseDataStore,
  useIsLoadScenario,
  useModalStore,
  useScenarioId,
  useScenarioTitle,
  useSelectedScenarioFilters
} from '../../store/store'
import attention from '../../assets/small-modals/attention.svg'

const CloseModal = ({ handleClose }) => {
  const navigate = useNavigate()
  const { setOpenModal } = useModalStore()
  const { title } = useScenarioTitle()
  const { resetApiResponse } = useApiResponseDataStore()
  const { resetSelectedScenarioFilters } = useSelectedScenarioFilters()
  const { resetScenarioTitle } = useScenarioTitle()
  const { setIsLoadScenario } = useIsLoadScenario()
  const { resetSaveScanrioId } = useScenarioId()

  const handleCloseScenario = () => {
    navigate(import.meta.env.VITE_BASE_URL2 + 'scenario')
    setOpenModal(false)
    resetApiResponse()
    resetSelectedScenarioFilters()
    resetScenarioTitle()
    setIsLoadScenario(false)
    resetSaveScanrioId()
  }

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
          ATTENTION
        </Typography>
      </Grid>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Typography>Are you sure you want to close</Typography>
        <Typography
          color={palette.cisco.PrimaryMain}
          fontWeight={700}
          sx={{ textTransform: 'uppercase' }}
        >
          &quot;SCENARIO {title}&quot;
        </Typography>
      </Grid>

      <Grid display={'flex'} justifyContent={'center'} gap={5}>
        <Grid>
          <Button
            onClick={handleClose}
            variant='contained'
            sx={{
              textTransform: 'capitalize',
              borderRadius: '50px',
              padding: '12px 36px'
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button
            onClick={handleCloseScenario}
            variant='outlined'
            sx={{
              textTransform: 'capitalize',
              fontWeight: 700,
              borderRadius: '50px',
              padding: '12px 36px',
              border: `1px solid ${palette.common.error}`,
              color: palette.common.error,
              '&:hover': {
                border: `1px solid ${palette.common.error}`
              }
            }}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CloseModal

CloseModal.propTypes = {
  handleClose: PropTypes.func.isRequired
}
