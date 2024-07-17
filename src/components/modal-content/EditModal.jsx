import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import useApi from '../../hooks/useCallApi'
import {
  useApiResponseDataStore,
  useComparisonScenarioTitle1,
  useComparisonScenarioTitle2,
  useComparisonScenarioTitle3,
  useCurrentEditingScenario,
  useDisabledButtons,
  useScenarioId,
  useScenarioTitle
} from '../../store/store'
import { useLocation } from 'react-router-dom'

const EditModal = ({ handleClose, isEdit }) => {
  const [error, setError] = useState()
  const { scenarioId } = useScenarioId()
  const { data: scenarioSelected, fetchData } = useApi(`scenario/${scenarioId}`)
  const { saveTitle, title } = useScenarioTitle()

  const location = useLocation()

  const { setDisabledButons } = useDisabledButtons()
  const { saveComparisonScenarioTitle1 } = useComparisonScenarioTitle1()
  const { saveComparisonScenarioTitle2 } = useComparisonScenarioTitle2()
  const { saveComparisonScenarioTitle3 } = useComparisonScenarioTitle3()
  const { currentEditingScenario } = useCurrentEditingScenario()

  const { put } = useApi(`scenario`)

  const handleInputChange = (event) => {
    const value = event.target.value
    if (!/(--|;|'|\/\*|\*\/)/g.test(value)) {
      saveTitle(value)
      if (location.pathname === import.meta.env.VITE_BASE_URL2 + 'comparison') {
        setDisabledButons(true)
      }
    } else {
      setError('*Invalid input')
    }
  }

  useEffect(() => {
    fetchData(`scenario/${scenarioId}`)
  }, [scenarioId])

  const handleEdit = async () => {
    try {
      saveTitle(title)
      const body = {
        title,
        selected: JSON.parse(scenarioSelected?.state)
      }
      await put(scenarioId, body)
    } catch (error) {
      console.error('Error :', error)
    }
    handleClose()
  }

  const handleCreate = () => {
    switch (currentEditingScenario) {
      case 1:
        saveComparisonScenarioTitle1(title)
        break
      case 2:
        saveComparisonScenarioTitle2(title)
        break
      case 3:
        saveComparisonScenarioTitle3(title)
        break
      default:
        console.error('Invalid scenario number')
    }
    handleClose()
  }

  return (
    <Grid display={'grid'} gap={3}>
      <Grid display={'flex'} justifyContent={'center'}>
        {isEdit ? (
          <Typography fontWeight={700} color={palette.cisco.PrimaryMain}>
            SCENARIO EDITION
          </Typography>
        ) : (
          <Typography fontWeight={700} color={palette.cisco.PrimaryMain}>
            Create Scenario
          </Typography>
        )}
      </Grid>
      <Grid width={'300px'}>
        <TextField
          id='outlined-basic'
          label='Scenario Title'
          variant='outlined'
          fullWidth
          focused
          value={title}
          onChange={handleInputChange}
        />
        {!isEdit && (
          <Typography ml={2} fontSize={'12px'}>
            Type your Scenario Name
          </Typography>
        )}
        {error && (
          <Typography variant='caption' style={{ color: palette.common.error }}>
            {error}
          </Typography>
        )}
      </Grid>

      <Grid display={'flex'} justifyContent={'space-between'}>
        <Grid>
          <Button
            variant='outlined'
            sx={{
              textTransform: 'capitalize',
              borderRadius: '50px',
              padding: '12px 36px',
              border: `1px solid ${palette.cisco.Blue}`,
              color: palette.cisco.Blue
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button
            variant='contained'
            sx={{
              textTransform: 'capitalize',
              borderRadius: '50px',
              padding: '12px 36px'
            }}
            onClick={isEdit ? handleEdit : handleCreate}
          >
            {isEdit ? 'Save' : 'Create'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default React.memo(EditModal)

EditModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  isDataReset: PropTypes.bool
}
