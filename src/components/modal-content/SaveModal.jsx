import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import {
  useApiResponseDataStore,
  useFiltersDataStore,
  useIsLoadScenario,
  useScenarioId,
  useScenarioTitle,
  useSelectedScenarioFilters
} from '../../store/store'
import useApi from '../../hooks/useCallApi'
import save from '../../assets/small-modals/save.svg'

const SaveModal = ({ handleClose }) => {
  const { filters } = useFiltersDataStore()
  const { saveApiResponseData, apiResponseData } = useApiResponseDataStore()
  const { post, refetch, put } = useApi(`scenario`)
  const { saveScenarioId, scenarioId } = useScenarioId()
  const { title } = useScenarioTitle()
  const { selectedScenarioFilters } = useSelectedScenarioFilters()
  const { isLoadScenario } = useIsLoadScenario()
  const { apiResponse } = useApiResponseDataStore()

  const handleSaveData = async () => {
    const body = {
      title,
      selected: filters.selected
    }

    try {
      if (
        isLoadScenario &&
        title === filters.title &&
        JSON.stringify(selectedScenarioFilters) !==
          JSON.stringify(filters.selected)
      ) {
        const response = await put(scenarioId, body)
        console.log('Data updated with PUT', response)
      } else {
        const response = await post(body)
        saveScenarioId(response.id)
        saveApiResponseData({ ...apiResponseData, id: response.id })
        console.log('Data saved with POST')
      }
    } catch (error) {
      console.error('Error :', error)
    }
    handleClose()
  }

  console.log('title', title)

  return (
    <Grid display={'grid'} gap={5}>
      <Grid display={'flex'} justifyContent={'center'}>
        <Box component={'img'} src={save} />
      </Grid>
      <Grid display={'flex'}>
        <Typography>Changes saved in</Typography>
        <Typography
          color={palette.cisco.PrimaryMain}
          fontWeight={700}
          sx={{ textTransform: 'uppercase', pl: '3px' }}
        >
          ``&quot;SCENARIO{' '}
          {apiResponse?.title === undefined ||
          apiResponse?.title.trim() === '' ||
          apiResponse?.title === undefined
            ? title
            : apiResponse?.title}
          &quot;``
        </Typography>
      </Grid>

      <Grid display={'flex'} justifyContent={'center'}>
        <Grid>
          <Button
            onClick={handleSaveData}
            variant='contained'
            sx={{
              textTransform: 'capitalize',
              borderRadius: '50px',
              padding: '12px 36px'
            }}
          >
            Accept
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SaveModal

SaveModal.propTypes = {
  handleClose: PropTypes.func.isRequired
}
