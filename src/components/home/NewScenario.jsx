import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import { palette } from '../../styles/palette'
import FilterBar from '../filterBar/FilterBar'
import PropTypes from 'prop-types'
import {
  useIsLoadScenario,
  useModalStore,
  useScenarioId
} from '../../store/store'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '24px',
  boxShadow: 24
}

const NewScenario = () => {
  const { openModal, setOpenModal } = useModalStore()
  const { resetSaveScanrioId } = useScenarioId()
  const { setIsLoadScenario } = useIsLoadScenario()

  const handleOpenModal = () => {
    resetSaveScanrioId()
    setIsLoadScenario(false)
    setOpenModal(true)
  }
  const handleCloseModal = () => setOpenModal(false)

  return (
    <Grid display={'grid'} justifyContent={'center'} alignItems={'center'}>
      <Grid
        bgcolor={'white'}
        height={'85%'}
        padding={'30px 20px'}
        borderRadius={'20px'}
        borderBottom={`20px solid ${palette.cisco.Blue}`}
      >
        <Grid>
          <Typography
            fontSize={'1.8em'}
            color={palette.gray.gray90}
            fontWeight={700}
          >
            Hello there!
          </Typography>
        </Grid>
        <Grid display={'grid'} gap={'28px'} padding={'10px'}>
          <Grid
            display={'flex'}
            justifyContent={'space-between'}
            justifyItems={'center'}
            mb={'50px'}
          ></Grid>
          <Grid
            display={'grid'}
            justifyContent={'center'}
            alignItems={'center'}
            border={`2px dashed ${palette.gray.gray60}`}
            borderRadius={'10px'}
            padding={'48px 24px'}
            gap={'30px'}
          >
            <Grid height={'48px'} width={'340px'} textAlign={'center'}>
              <Typography color={palette.gray.gray90}>
                You don&apos;t have any scenarios created yet. Click on
                &quot;New Scenario&quot; button below to start
              </Typography>
            </Grid>
            <Grid display={'flex'} justifyContent={'center'}>
              <Button
                sx={{
                  borderRadius: '50px',
                  padding: '12px 36px',
                  textTransform: 'capitalize'
                }}
                variant='contained'
                onClick={handleOpenModal}
              >
                New Scenario +
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {openModal && (
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Grid>
                <FilterBar isCreate={true} />
              </Grid>
            </Box>
          </Modal>
        )}
      </Grid>
    </Grid>
  )
}

export default NewScenario

NewScenario.propTypes = {
  savedScenario: PropTypes.array
}
