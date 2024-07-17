import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { palette } from '../../styles/palette'
import SearchIcon from '@mui/icons-material/Search'
import FilterBar from '../filterBar/FilterBar'
import PropTypes from 'prop-types'
import SmallTable from './SmallTable'
import {
  useApiResponseDataStore,
  useFiltersDataStore,
  useIsLoadScenario,
  useModalStore,
  useScenarioId,
  useSelectedScenarioFilters
} from '../../store/store'
import { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '24px',
  boxShadow: 24
}

export const scrollbar = {
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    width: '10px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'transparent'
  }
}

const SavedScenarios = ({ savedScenario, refetch, isNotComparison = true }) => {
  const { openModal, setOpenModal } = useModalStore()
  const [searchTerm, setSearchTerm] = useState('')
  const { resetApiResponse } = useApiResponseDataStore()
  const [filteredScenarios, setFilteredScenarios] = useState(savedScenario)
  const { resetSelectedScenarioFilters } = useSelectedScenarioFilters()
  const { resetFilters } = useFiltersDataStore()
  const { resetSaveScanrioId } = useScenarioId()
  const { setIsLoadScenario } = useIsLoadScenario()

  const lScreen = useMediaQuery('(max-width:1919px)')

  const handleOpenModal = () => {
    resetSelectedScenarioFilters()
    resetApiResponse()
    setOpenModal(true)
    resetFilters()
    setIsLoadScenario(false)
    resetSaveScanrioId()
  }
  const handleCloseModal = () => setOpenModal(false)

  const handleSearch = (event) => {
    event.preventDefault()
    setFilteredScenarios(
      savedScenario.filter((scenario) =>
        scenario.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  return (
    <Grid display={'grid'} justifyContent={'center'} alignItems={'center'}>
      <Grid
        bgcolor={'white'}
        padding={
          isNotComparison ? (!lScreen ? '30px 20px' : '20px 10px') : '0px'
        }
        borderRadius={'20px'}
        borderBottom={
          isNotComparison ? `20px solid ${palette.cisco.Blue}` : 'none'
        }
      >
        <Grid display={'flex'} justifyContent={'space-between'} gap={6}>
          <Grid>
            <Typography
              fontSize={!lScreen ? '1.8em' : '1.2em'}
              color={palette.gray.gray90}
              fontWeight={700}
            >
              Saved Scenarios
            </Typography>
          </Grid>
          {isNotComparison && (
            <Grid>
              <Grid>
                <Button
                  sx={{
                    borderRadius: '50px',
                    padding: !lScreen ? '12px 36px' : '10px 30px',
                    textTransform: 'capitalize'
                  }}
                  variant='contained'
                  onClick={handleOpenModal}
                >
                  New Scenario
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid display={'grid'} gap={'28px'} padding={'10px'}>
          <Grid
            display={'flex'}
            justifyContent={'space-between'}
            justifyItems={'center'}
          >
            <Grid width={'100%'}>
              <form onSubmit={handleSearch}>
                <TextField
                  id='standard-basic'
                  label='Search a Scenario'
                  variant='standard'
                  size='medium'
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='start'>
                        <IconButton onClick={handleSearch}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </form>
            </Grid>
          </Grid>
          <Grid height={lScreen ? '250px' : '500px'} sx={scrollbar}>
            <SmallTable rows={filteredScenarios} refetch={refetch} />
          </Grid>
        </Grid>

        {openModal && (
          <Modal
            open={open}
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

export default SavedScenarios

SavedScenarios.propTypes = {
  savedScenario: PropTypes.array,
  refetch: PropTypes.func,
  isNotComparison: PropTypes.bool
}
