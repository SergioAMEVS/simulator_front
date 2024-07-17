import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import {
  useApiResponseDataStore,
  useComparisonScenarioTitle1,
  useComparisonScenarioTitle2,
  useComparisonScenarioTitle3,
  useCreatedScenario,
  useFiltersDataStoreComparison1,
  useFiltersDataStoreComparison2,
  useFiltersDataStoreComparison3,
  useIsLoadScenario1,
  useIsLoadScenario2,
  useIsLoadScenario3,
  useScenarioId,
  useScenarioId2,
  useScenarioId3,
  useSelectedScenarioFilters
} from '../../store/store'
import useApi from '../../hooks/useCallApi'
import save from '../../assets/small-modals/save.svg'

const SaveModalComparison = ({ handleClose, editingScenario }) => {
  const { filters1 } = useFiltersDataStoreComparison1()
  const { filters2 } = useFiltersDataStoreComparison2()
  const { filters3 } = useFiltersDataStoreComparison3()

  const { saveApiResponseData, apiResponseData } = useApiResponseDataStore()
  const { post, refetch, put } = useApi(`scenario`)
  const { comparisonScenarioTitle1 } = useComparisonScenarioTitle1()
  const { comparisonScenarioTitle2 } = useComparisonScenarioTitle2()
  const { comparisonScenarioTitle3 } = useComparisonScenarioTitle3()
  const { setCreatedScenario } = useCreatedScenario()
  const { isLoadScenario1 } = useIsLoadScenario1()
  const { isLoadScenario2 } = useIsLoadScenario2()
  const { isLoadScenario3 } = useIsLoadScenario3()
  const { selectedScenarioFilters } = useSelectedScenarioFilters()
  const { scenarioId, saveScenarioId } = useScenarioId()
  const { scenarioId2, saveScenarioId2 } = useScenarioId2()
  const { scenarioId3, saveScenarioId3 } = useScenarioId3()

  const handleSaveData = async () => {
    let body
    let isLoadScenario
    let currentTitle
    let scenarioPostId
    switch (editingScenario) {
      case 1:
        body = {
          ...filters1,
          title: comparisonScenarioTitle1
        }
        isLoadScenario = isLoadScenario1
        currentTitle = comparisonScenarioTitle1
        scenarioPostId = scenarioId
        break
      case 2:
        body = {
          ...filters2,
          title: comparisonScenarioTitle2
        }
        isLoadScenario = isLoadScenario2
        currentTitle = comparisonScenarioTitle2
        scenarioPostId = scenarioId2
        break
      case 3:
        body = {
          ...filters3,
          title: comparisonScenarioTitle3
        }
        isLoadScenario = isLoadScenario3
        currentTitle = comparisonScenarioTitle3
        scenarioPostId = scenarioId3

        break
      default:
        console.log('No scenario')
        return
    }
    try {
      if (
        isLoadScenario &&
        currentTitle === body.title &&
        JSON.stringify(selectedScenarioFilters) !==
          JSON.stringify(body.selected)
      ) {
        const response = await put(scenarioPostId, body)
        console.log('Data updated with PUT', response)
      } else {
        const response = await post(body)
        switch (editingScenario) {
          case 1:
            saveScenarioId(response.id)
            break
          case 2:
            saveScenarioId2(response.id)
            break
          case 3:
            saveScenarioId3(response.id)
            break
          default:
            console.log('No scenario')
        }
        saveApiResponseData({ ...apiResponseData, id: response.id })
        console.log('Data saved with POST')
      }

      setCreatedScenario(true)
      refetch()
    } catch (error) {
      console.error('Error :', error)
    }
    handleClose()
  }

  let scenarioTitle
  switch (editingScenario) {
    case 1:
      scenarioTitle = comparisonScenarioTitle1
      break
    case 2:
      scenarioTitle = comparisonScenarioTitle2
      break
    case 3:
      scenarioTitle = comparisonScenarioTitle3
      break
    default:
      console.log('No scenario')
      return
  }

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
          ``&quot;SCENARIO {scenarioTitle}&quot;``
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

export default SaveModalComparison

SaveModalComparison.propTypes = {
  handleClose: PropTypes.func.isRequired,
  editingScenario: PropTypes.number
}
