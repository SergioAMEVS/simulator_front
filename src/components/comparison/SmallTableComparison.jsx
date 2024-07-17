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
  useDeleteScenario,
  useIsLoadScenario1,
  useIsLoadScenario2,
  useIsLoadScenario3,
  // useCurrentEditingScenario,
  useScenarioId,
  useScenarioId2,
  useScenarioId3,
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

function SmallTableComparison({ rows: initialRows, refetch, currentScenario }) {
  const [rows, setRows] = useState(initialRows)
  const [selected, setSelected] = useState([])
  const [openModal, setOpenModal] = useState(null)
  const [scenarioFilters, setScenarioFilters] = useState({})
  const { data: selectedScenario, fetchData: fetchSelectedScenario } = useApi(
    `scenario/${selected}`
  )

  const { data: savedScenarios, del } = useApi('delete')
  const { saveSelectedScenario } = useSelectedScenario()
  const { saveSelectedScenarioFilters, resetSelectedScenarioFilters } =
    useSelectedScenarioFilters()
  const { setCheckbox } = useCheckboxStore()
  const { resetScenarioTitle } = useScenarioTitle()
  const { resetApiResponse } = useApiResponseDataStore()
  const { setDeleteScenario } = useDeleteScenario()
  const { setIsLoadScenario1 } = useIsLoadScenario1()
  const { setIsLoadScenario2 } = useIsLoadScenario2()
  const { setIsLoadScenario3 } = useIsLoadScenario3()

  const lScreen = useMediaQuery('(max-width:1919px)')
  const { saveScenarioId } = useScenarioId()
  const { saveScenarioId2 } = useScenarioId2()
  const { saveScenarioId3 } = useScenarioId3()

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

    if (!isSelected) {
      const selectedScenario = initialRows.find(
        (scenario) => scenario.id === id
      )
      const filtersForScenario = JSON.parse(selectedScenario?.state)

      setScenarioFilters((prevFilters) => ({
        ...prevFilters,
        [id]: filtersForScenario
      }))

      switch (currentScenario) {
        case 1:
          setIsLoadScenario1(true)
          saveScenarioId(newSelected)
          break
        case 2:
          setIsLoadScenario2(true)
          saveScenarioId2(newSelected)
          break
        case 3:
          setIsLoadScenario3(true)
          saveScenarioId3(newSelected)
          break
        default:
          console.log('No scenario')
      }
    }
  }

  const handleDelete = async () => {
    try {
      await del(selected)
      setRows(rows.filter((row) => !selected.includes(row.id)))
      refetch()
      setDeleteScenario(true)
    } catch (error) {
      console.error('Error :', error)
    }
    resetApiResponse()
    resetSelectedScenarioFilters()
    resetScenarioTitle()
  }

  useEffect(() => {
    if (selected.length > 0) {
      const filtersForSelectedScenario = scenarioFilters[selected[0]]
      saveSelectedScenarioFilters(filtersForSelectedScenario)
    }
  }, [selected, scenarioFilters])

  if (rows && rows.length === 0) {
    return (
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        style={{ width: '100%', height: '100%' }}
      >
        <Typography align='center' style={{ color: palette.cisco.PrimaryMain }}>
          No scenarios created
        </Typography>
      </Grid>
    )
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
            rows.map((row, index) => (
              <TableRow
                key={index}
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
                        THIS SCENARIO
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

export default SmallTableComparison

SmallTableComparison.propTypes = {
  rows: PropTypes.array,
  refetch: PropTypes.func
}
