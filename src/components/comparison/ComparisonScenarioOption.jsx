import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { palette } from '../../styles/palette'
import {
  useComparisonScenarioTitle1,
  useComparisonScenarioTitle2,
  useComparisonScenarioTitle3,
  useCreatedScenario,
  useCurrentEditingScenario,
  useDeleteScenario,
  useModalStore,
  useScenarioId,
  useScenarioId2,
  useScenarioId3,
  useSelectedScenario
} from '../../store/store'
import EditModal from '../modal-content/EditModal'
import SmallModal from '../common/SmallModal'
import PropTypes from 'prop-types'
import useApi from '../../hooks/useCallApi'
import SavedScenarioComparison from './SavedScenarioComparison'

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: 'background.paper',
//   borderRadius: '24px',
//   boxShadow: 24
// }

const ComparisonScenarioOption = ({
  handleOpenModal,
  handleCloseModal,
  editingScenario
}) => {
  const { openModal } = useModalStore()
  const [openLoadScenario, setOpenLoadScenario] = useState(false)
  const { data: savedScenarios, fetchData } = useApi('scenario')
  const { currentEditingScenario, setCurrentEditingScenario } =
    useCurrentEditingScenario()
  const { selectedScenario } = useSelectedScenario()
  const { post: postData } = useApi('apply')
  const { data: dataSelectedScenarioSave } = useApi(
    `scenario/${selectedScenario?.id}`
  )

  const { savecomparisonResponseData1, saveComparisonScenarioTitle1 } =
    useComparisonScenarioTitle1()
  const { savecomparisonResponseData2, saveComparisonScenarioTitle2 } =
    useComparisonScenarioTitle2()
  const { savecomparisonResponseData3, saveComparisonScenarioTitle3 } =
    useComparisonScenarioTitle3()

  const MODAL_TITLES = ['editTitle1', 'editTitle2', 'editTitle3']

  const { deleteScenario, setDeleteScenario } = useDeleteScenario()
  const { createdScenario, setCreatedScenario } = useCreatedScenario()

  useEffect(() => {
    fetchData()
  }, [deleteScenario, createdScenario])

  useEffect(() => {
    setDeleteScenario(false)
    setCreatedScenario(false)
  }, [])

  const handleSelectedScenarioSave = async (scenarioNumber) => {
    if (editingScenario !== scenarioNumber) {
      return
    }

    try {
      const saveComparisonScenarioTitleFunctions = [
        saveComparisonScenarioTitle1,
        saveComparisonScenarioTitle2,
        saveComparisonScenarioTitle3
      ]

      const savecomparisonResponseDataFunctions = [
        savecomparisonResponseData1,
        savecomparisonResponseData2,
        savecomparisonResponseData3
      ]

      const saveComparisonScenarioTitle =
        saveComparisonScenarioTitleFunctions[scenarioNumber - 1]
      const savecomparisonResponseData =
        savecomparisonResponseDataFunctions[scenarioNumber - 1]

      saveComparisonScenarioTitle(selectedScenario.title)
      if (dataSelectedScenarioSave && dataSelectedScenarioSave.state) {
        const data = {
          selected: JSON.parse(dataSelectedScenarioSave.state)
        }
        console.log('data')
        const response = await postData(data)
        savecomparisonResponseData(response)
      } else {
        console.error('dataSelectedScenarioSave is null')
      }
    } catch (error) {
      console.error('Error :', error)
    }
  }

  const ModalContent = ({ scenarioNumber, handleClose }) => (
    <SmallModal
      modalId={MODAL_TITLES[scenarioNumber - 1]}
      openModalId={MODAL_TITLES[scenarioNumber - 1]}
      handleClose={handleClose}
    >
      <EditModal isEdit={false} handleClose={handleClose} />
    </SmallModal>
  )

  const handleOpenLoadScenario = (scenarioNumber) => {
    setOpenLoadScenario(true)
    setCurrentEditingScenario(scenarioNumber)
  }

  const handleCloseLoadScenario = () => setOpenLoadScenario(false)

  return (
    <Grid
      border={`1px dashed ${palette.gray.gray80}`}
      padding={'26px 32px'}
      mt={3}
      mb={20}
      width={'90%'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
    >
      <Grid>
        <Typography
          fontWeight={800}
          fontSize={'24px'}
          color={palette.gray.gray90}
          textAlign={'center'}
        >
          Comparison Scenario
        </Typography>
      </Grid>
      <Grid>
        <Typography
          fontWeight={400}
          fontSize={'14px'}
          color={palette.gray.gray90}
          textAlign={'center'}
        >
          To start comparing, please either create a
        </Typography>
      </Grid>
      <Grid
        display={'flex'}
        justifyContent={'center'}
        textAlign={'center'}
        mt={4}
      >
        <Grid display={'grid'} flexDirection={'column'} gap={1}>
          <Button
            onClick={handleOpenModal}
            variant='contained'
            bgcolor={palette.analogousCalypso.calypso100}
            style={{
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '16px',
              padding: '12px 36px'
            }}
          >
            New Scenario
          </Button>

          <Typography>or</Typography>
          <Button
            onClick={() => handleOpenLoadScenario(editingScenario)}
            variant='outlined'
            sx={{
              border: `1px solid ${palette.analogousCalypso.calypso100}`,
              color: palette.analogousCalypso.calypso100,
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '16px',
              padding: '12px 36px'
            }}
          >
            Load Scenario
          </Button>
        </Grid>
      </Grid>
      {openLoadScenario && (
        <SmallModal
          modalId={`modalLoad${openLoadScenario}`}
          openModalId={`modalLoad${openLoadScenario}`}
          handleClose={handleCloseModal}
        >
          <SavedScenarioComparison
            isNotComparison={false}
            savedScenario={savedScenarios}
            currentScenario={editingScenario}
            refetch={fetchData}
          />

          <Grid
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Button
              onClick={handleCloseLoadScenario}
              variant='outlined'
              sx={{
                textTransform: 'capitalize',
                borderRadius: '50px',
                padding: '12px 36px',
                border: `1px solid ${palette.cisco.Blue}`,
                color: palette.cisco.Blue
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={() => handleSelectedScenarioSave(currentEditingScenario)}
              variant='contained'
              sx={{
                textTransform: 'capitalize',
                borderRadius: '50px',
                padding: '12px 36px'
              }}
            >
              Load Scenario
            </Button>
          </Grid>
        </SmallModal>
      )}

      {openModal && (
        <ModalContent
          scenarioNumber={currentEditingScenario}
          handleClose={handleCloseModal}
        />
      )}
    </Grid>
  )
}

export default React.memo(ComparisonScenarioOption)

ComparisonScenarioOption.propTypes = {
  comparisonScenarioTitle: PropTypes.string,
  handleOpenModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
  scenarioNumber: PropTypes.number,
  handleClose: PropTypes.func,
  handleOpenLoadScenario: PropTypes.func,
  handleCloseLoadScenario: PropTypes.func,
  openLoadScenario: PropTypes.bool,
  editingScenario: PropTypes.number
}
