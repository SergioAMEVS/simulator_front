import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
// import questionIcon from '../../assets/common/question.svg'
import PropTypes from 'prop-types'
import {
  useApiResponseDataStore,
  useCurrentEditingScenario,
  // useApiResponseDataStore,
  // useCurrentEditingScenario,
  useFiltersDataStore,
  useFiltersDataStoreComparison1,
  useFiltersDataStoreComparison2,
  useFiltersDataStoreComparison3,
  useModalStore,
  // useFiltersDataStoreComparison1,
  // useFiltersDataStoreComparison2,
  // useFiltersDataStoreComparison3,
  // useModalStore,
  // useScenarioId,
  useScenarioTitle,
  // useSelectedCountry,
  useSelectedScenarioFilters
} from '../../store/store'
// import useApi from '../../hooks/useCallApi'
import { useLocation } from 'react-router-dom'
import StyledRadio from './StyledRadio'
import {
  filterItems,
  filterTitleStyle,
  formControlStyle,
  formControlStyleComparison,
  formControlStyleMedia,
  mainDivStyle,
  mainDivStyleComparison
} from '../../styles/filterCategoryStyled'
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery
} from '@mui/material'
import { palette } from '../../styles/palette'

const NOT_EUROPE_GROUP = ['Asia', 'America']

const FilterCategoryComparison = ({
  filterData = [{ filterName: 'No Data', filterValues: ['ND', 'ND'] }],
  isComparison = false,
  isCleared
}) => {
  const [selectedRadioValue, setSelectedRadioValue] = useState({})
  const [outcomes, setOutcomes] = useState([])
  const [selectedOutcomeValue, setSelectedOutcomeValue] = useState('')
  const { selectedScenarioFilters } = useSelectedScenarioFilters()
  const lScreen = useMediaQuery('(max-width:1919px)')

  // GLOBAL STATE MANAGMENT
  const { saveFiltersData } = useFiltersDataStore()
  const { saveFiltersData1 } = useFiltersDataStoreComparison1()
  const { saveFiltersData2 } = useFiltersDataStoreComparison2()
  const { saveFiltersData3 } = useFiltersDataStoreComparison3()
  const { currentEditingScenario } = useCurrentEditingScenario()
  const { apiResponse, isLoading } = useApiResponseDataStore()
  const { openModal } = useModalStore()
  const location = useLocation()
  const currentPath = location.pathname

  const { title } = useScenarioTitle()

  const FILTER_COUNTRY_CATEGORY = 'Country'

  const handleChildChange = (category, childValue) => {
    setSelectedRadioValue((prevState) => {
      const newValues = {
        ...prevState,
        [category]: childValue
      }
      return newValues
    })
  }

  const handleOutcomeSelected = (id) => (event) => {
    const selectedValue = Array.isArray(event.target.value)
      ? event.target.value
      : [event.target.value]

    const stringId = String(id)

    setOutcomes((prevState) => {
      const existingOutcomeIndex = prevState.findIndex(
        (outcome) => outcome.filter === stringId
      )

      if (existingOutcomeIndex !== -1) {
        const newOutcomes = [...prevState]
        newOutcomes[existingOutcomeIndex] = {
          filter: stringId,
          selected: selectedValue
        }
        return newOutcomes
      } else {
        return [
          ...prevState,
          {
            filter: stringId,
            selected: selectedValue
          }
        ]
      }
    })

    setSelectedOutcomeValue(selectedValue[0])
  }
  const outcomesFilterData = filterData.find((item) => item.Name === 'Outcomes')

  // Transform the selected values into the format that the API expects
  const getSelectedValues = () => {
    const radioValues = Object.keys(selectedRadioValue).map((key) => ({
      filter: key,
      selected: [selectedRadioValue[key]]
    }))

    const selectValues = outcomes

    const selectedValues = {
      title,
      selected: [...radioValues, ...selectValues]
    }

    if (currentEditingScenario === 1) {
      saveFiltersData1(selectedValues)
    } else if (currentEditingScenario === 2) {
      saveFiltersData2(selectedValues)
    } else if (currentEditingScenario === 3) {
      saveFiltersData3(selectedValues)
    } else if (currentPath !== import.meta.env.VITE_BASE_URL2 + 'comparison') {
      saveFiltersData(selectedValues)
    }

    return selectedValues
  }

  useEffect(() => {
    getSelectedValues()
  }, [selectedRadioValue, outcomes, currentEditingScenario])

  // To auto selected check, radio and select
  const [filtersInitialized, setFiltersInitialized] = useState(false)
  useEffect(() => {
    if (!filtersInitialized) {
      let filters = selectedScenarioFilters
      if (typeof selectedScenarioFilters === 'string') {
        try {
          filters = JSON.parse(selectedScenarioFilters)
        } catch (error) {
          console.error('Error parsing selectedScenarioFilters:', error)
          return
        }
      } else if (
        typeof selectedScenarioFilters === 'object' &&
        !Array.isArray(selectedScenarioFilters)
      ) {
        filters = [selectedScenarioFilters]
      }

      if (Array.isArray(filters)) {
        const newSelectedRadioValue = {}
        const newOutcomes = []

        filters.forEach((filter) => {
          if (filter && filter.filter === '6') {
            newOutcomes.push({
              filter: filter.filter,
              selected: filter.selected
            })
          } else if (filter && filter.selected) {
            newSelectedRadioValue[filter.filter] = filter.selected[0]
          }
        })

        setSelectedRadioValue(newSelectedRadioValue)
        setOutcomes(newOutcomes)

        if (outcomesFilterData) {
          const matchingOutcome = newOutcomes.find(
            (outcome) =>
              Number(outcome.filter) === Number(outcomesFilterData.id)
          )

          const selectedOutcome = matchingOutcome?.selected[0]

          setSelectedOutcomeValue(selectedOutcome || '')
        }

        setFiltersInitialized(true)
      } else {
        console.error('selectedScenarioFilters is not an array')
      }
    }
  }, [selectedScenarioFilters, outcomesFilterData, filtersInitialized])

  useEffect(() => {
    if (isCleared) {
      setSelectedRadioValue({})
      setOutcomes([])
      setSelectedOutcomeValue('')
    }
  }, [isCleared])

  return (
    <>
      <Grid
        width={isComparison ? '450px' : '650px'}
        padding={isComparison ? '0 0 0 0' : '0 0 0 10px'}
      >
        {filterData
          .sort((a, b) => a.order - b.order)
          .map((filter, parentIndex) => {
            if (filter.Name === 'Outcomes') {
              return null
            }

            const sortedFilterValues = filter.filterValues.sort((a, b) => {
              if (
                NOT_EUROPE_GROUP.includes(a.group) &&
                !NOT_EUROPE_GROUP.includes(b.group)
              ) {
                return -1
              }
              if (
                !NOT_EUROPE_GROUP.includes(a.group) &&
                NOT_EUROPE_GROUP.includes(b.group)
              ) {
                return 1
              }
              return 0
            })

            return (
              <Box
                key={parentIndex}
                sx={isComparison ? mainDivStyleComparison : mainDivStyle}
              >
                <Grid
                  item
                  margin={lScreen ? null : '6px 0px 6px 16px'}
                  sx={filterTitleStyle}
                >
                  <FormControlLabel
                    className='filterTitle'
                    sx={{ fontFamily: 'lato' }}
                    label={
                      filter.Name === FILTER_COUNTRY_CATEGORY
                        ? 'Region'
                        : filter.Name
                    }
                    control={
                      <>
                        <KeyboardArrowRightIcon />
                      </>
                    }
                  />

                  <Grid container paddingLeft={'var(--2, 16px)'}>
                    {sortedFilterValues.map((child, childIndex) => (
                      <Grid key={childIndex} sx={filterItems}>
                        <FormControlLabel
                          label={child.label}
                          className='childrenLabel'
                          style={{ paddingRight: '8px' }}
                          control={
                            <StyledRadio
                              key={
                                selectedRadioValue[filter.id] === child.value
                              }
                              checked={
                                selectedRadioValue[filter.id] === child.value
                              }
                              onChange={() =>
                                handleChildChange(
                                  filter.id,
                                  child.value,
                                  child.group,
                                  'radio'
                                )
                              }
                              value={child.value}
                              name='radioGroup'
                              style={{ paddingRight: '8px' }}
                            />
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Box>
            )
          })}
        <Grid
          marginTop={lScreen ? '5px' : '15px'}
          width={lScreen ? '50%' : isComparison ? '90%' : '100%'}
          border={palette.common.warning}
          display={isComparison ? 'flex' : null}
          justifyContent={isComparison ? 'center' : null}
        >
          <FormControl
            sx={
              lScreen
                ? formControlStyleMedia
                : isComparison
                  ? formControlStyleComparison
                  : formControlStyle
            }
            focused
          >
            <InputLabel id='select-label'>Outcomes</InputLabel>
            {outcomesFilterData ? (
              <Select
                labelId='select-label'
                id='simple-select'
                label={'Outcomes'}
                displayEmpty
                value={selectedOutcomeValue}
                onChange={handleOutcomeSelected(outcomesFilterData.id)}
                inputProps={{ 'aria-label': 'Without label' }}
                IconComponent={KeyboardArrowDownIcon}
                disabled={
                  (!!isLoading || apiResponse === null) &&
                  !openModal &&
                  currentPath !== import.meta.env.VITE_BASE_URL2 + 'comparison'
                }
              >
                <MenuItem value=''>Select one Outcome</MenuItem>
                {outcomesFilterData.filterValues.map((filterValue) => (
                  <MenuItem key={filterValue.id} value={filterValue.value}>
                    {filterValue.label}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <div>Loading...</div>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default FilterCategoryComparison

FilterCategoryComparison.propTypes = {
  filterData: PropTypes.arrayOf(
    PropTypes.shape({
      filterName: PropTypes.string,
      filterValues: PropTypes.arrayOf(PropTypes.object)
    })
  ),
  checked: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
  setChecked: PropTypes.func,
  selectedRadioValue: PropTypes.string,
  setSelectedRadioValue: PropTypes.func,
  isComparison: PropTypes.bool,
  isCleared: PropTypes.bool
}
