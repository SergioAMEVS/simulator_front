import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Box,
  Typography,
  Grid,
  Button,
  useMediaQuery
} from '@mui/material'
import { palette } from '../../styles/palette'
import PropTypes from 'prop-types'
import { formatDate } from '../../helpers/conver-date'
import {
  useApiResponseDataStore,
  useCheckboxStore,
  useIsLoadScenario,
  // useCurrentEditingScenario,
  useScenarioId,
  useScenarioTitle,
  useSelectedScenario,
  useSelectedScenarioFilters
} from '../../store/store'
import useApi from '../../hooks/useCallApi'
import trashIcon from '../../assets/home/trash.svg'
import SmallModal from '../common/SmallModal'

const tableCellStyle = {
  fontWeight: '800',
  fontSize: '1em',
  borderBottom: 'none',
  paddingBottom: '0px',
  padding: '0px 40px 10px 30px'
}
const tableCellStyleMedia = {
  fontWeight: '800',
  fontSize: '0.9em',
  borderBottom: 'none',
  paddingBottom: '0px',
  padding: '0px 30px 10px 20px'
}

const tableCellColumStyle = {
  fontWeight: '500',
  fontSize: '1em',
  borderBottom: 'none',
  paddingBottom: '0px',
  padding: '0px 60px 0px 30px'
}

const tableCellColumStyleMedia = {
  fontWeight: '500',
  fontSize: '0.8em',
  borderBottom: 'none',
  paddingBottom: '0px',
  padding: '0px 40px 0px 20px'
}

function SmallTable({ rows: initialRows, refetch }) {
  const [rows, setRows] = useState(initialRows)
  const [selected, setSelected] = useState([])
  const [openModal, setOpenModal] = useState(null)
  const { data: selectedScenario, fetchData: fetchSelectedScenario } = useApi(
    `scenario/${selected}`
  )
  const { data: savedScenarios, del } = useApi('delete')
  const { saveSelectedScenario } = useSelectedScenario()
  const { saveSelectedScenarioFilters, resetSelectedScenarioFilters } =
    useSelectedScenarioFilters()
  const { setIsLoadScenario } = useIsLoadScenario()
  const { setCheckbox } = useCheckboxStore()
  const { resetScenarioTitle } = useScenarioTitle()
  const { resetApiResponse } = useApiResponseDataStore()
  const lScreen = useMediaQuery('(max-width:1919px)')
  const { saveScenarioId } = useScenarioId()

  useEffect(() => {
    setRows(initialRows)
  }, [initialRows])

  useEffect(() => {
    if (savedScenarios) {
      setRows(savedScenarios)
    }
  }, [savedScenarios])

  useEffect(() => {
    if (selectedScenario) {
      saveSelectedScenario(selectedScenario)
      saveSelectedScenarioFilters(selectedScenario?.state)
      saveScenarioId(selectedScenario?.id)
    }
  }, [selectedScenario])

  const handleOpenModal = (id) => {
    setOpenModal(id)
  }
  const handleCloseModal = () => setOpenModal(false)

  useEffect(() => {
    if (selected.length > 0) {
      fetchSelectedScenario(`scenario/${selected[0]}`)
    }
  }, [selected])

  const handleSelect = (id) => {
    const isSelected = selected.includes(id)
    const newSelected = isSelected ? [] : [id]
    setSelected(newSelected)
    setCheckbox(newSelected.length > 0)
    saveScenarioId(newSelected)
    setIsLoadScenario(true)
  }

  const handleDelete = async () => {
    try {
      await del(selected)

      refetch()
    } catch (error) {
      console.error('Error :', error)
    }
    resetApiResponse()
    resetSelectedScenarioFilters()
    resetScenarioTitle()
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyle} align='center'>
              Title
            </TableCell>
            <TableCell sx={tableCellStyle} align='center'>
              Date
            </TableCell>
            <TableCell sx={tableCellStyle} align='center'>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{
                  backgroundColor: selected.includes(row?.id)
                    ? palette.cisco.PrimaryMain
                    : ''
                }}
              >
                <TableCell
                  sx={{
                    ...(!lScreen
                      ? tableCellColumStyle
                      : tableCellColumStyleMedia),
                    color: selected.includes(row?.id)
                      ? 'white'
                      : 'defaultColor',
                    width: !lScreen ? '150px' : '100px'
                  }}
                >
                  <Checkbox
                    sx={{ borderRadius: '50px' }}
                    checked={selected.includes(row?.id)}
                    onChange={() => handleSelect(row?.id)}
                  />
                  {row?.title}
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    ...(!lScreen ? tableCellColumStyle : tableCellStyleMedia),
                    color: selected.includes(row.id) ? 'white' : 'defaultColor'
                  }}
                >
                  {formatDate(row.creation_date)}
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    ...tableCellColumStyle,
                    color: selected.includes(row?.title)
                      ? 'white'
                      : 'defaultColor'
                  }}
                >
                  <IconButton onClick={() => handleOpenModal(row.id)}>
                    <Box component={'img'} src={trashIcon} alt='trash' />
                  </IconButton>
                </TableCell>
                {openModal === row.id && (
                  <SmallModal
                    modalId='editTitle'
                    openModalId={'editTitle'}
                    handleClose={handleCloseModal}
                  >
                    <Grid
                      container
                      direction='column'
                      justifyContent='center'
                      alignItems='center'
                      mb={5}
                    >
                      <Typography>Are you sure you want to delete</Typography>
                      <Typography
                        color={palette.cisco.PrimaryMain}
                        fontWeight={700}
                        sx={{ textTransform: 'uppercase' }}
                      >
                        &quot;SCENARIO name&quot;
                      </Typography>
                    </Grid>
                    <Grid display={'flex'} justifyContent={'center'} gap={5}>
                      <Grid>
                        <Button
                          onClick={handleCloseModal}
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
                  </SmallModal>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SmallTable

SmallTable.propTypes = {
  rows: PropTypes.array,
  refetch: PropTypes.func
}
