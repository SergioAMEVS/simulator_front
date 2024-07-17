import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import {
  useApiResponseDataStore,
  useModalStore,
  useScenarioId,
  useScenarioTitle,
  useSelectedScenarioFilters
} from '../../store/store'
import useApi from '../../hooks/useCallApi'
import { useNavigate } from 'react-router-dom'
import deleteIcon from '../../assets/small-modals/delete.svg'

const DeleteModal = ({ handleClose }) => {
  const navigate = useNavigate()
  const { del } = useApi('delete')

  const { resetApiResponse } = useApiResponseDataStore()
  const { setOpenModal } = useModalStore()
  const { resetSelectedScenarioFilters } = useSelectedScenarioFilters()
  const { resetScenarioTitle } = useScenarioTitle()
  const { scenarioId } = useScenarioId()
  const { title } = useScenarioTitle()

  const handleDelete = async () => {
    try {
      await del(scenarioId)
      navigate(import.meta.env.VITE_BASE_URL2 + 'scenario')
      handleClose()
      setOpenModal(false)
    } catch (error) {
      console.error('Error :', error)
    }
    resetApiResponse()
    resetSelectedScenarioFilters()
    resetScenarioTitle()
  }

  return (
    <Grid display={'grid'} gap={3}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        gap={1}
      >
        <Box component={'img'} src={deleteIcon} />
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
        <Typography>Are you sure you want to delete</Typography>
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
            onClick={handleDelete}
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
            Delete
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DeleteModal

DeleteModal.propTypes = {
  handleClose: PropTypes.func.isRequired
}
