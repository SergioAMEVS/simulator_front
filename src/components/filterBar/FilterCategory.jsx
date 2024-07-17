import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
// import questionIcon from '../../assets/common/question.svg'
import PropTypes from 'prop-types'
import {
  useApiResponseDataStore,
  useCurrentEditingScenario,
  useFiltersDataStore,
  useModalStore,
  useScenarioTitle,
  useSelectedScenarioFilters
} from '../../store/store'

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

const FilterCategory = ({
  filterData = [{ filterName: 'No Data', filterValues: ['ND', 'ND'] }],
  isComparison = false,
  isCleared
}) => {
  const [selectedRadioValue, setSelectedRadioValue] = useState({})
  const [outcomes, setOutcomes] = useState([])
  const [selectedOutcomeValue, setSelectedOutcomeValue] = useState('')

  const { selectedScenarioFilters } = useSelectedScenarioFilters()
  const lScreen = useMediaQuery('(max-width:1919px)')

  const { saveFiltersData } = useFiltersDataStore()
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

    saveFiltersData(selectedValues)

    return selectedValues
  }

  useEffect(() => {
    getSelectedValues()
  }, [selectedRadioValue, outcomes, currentEditingScenario])

  // To auto selected check, radio and select
  useEffect(() => {
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
      const initialSelectedRadioValue = {}
      const initialOutcomes = []

      filters.forEach((filter) => {
        if (filter && filter.filter === '6') {
          initialOutcomes.push({
            filter: filter.filter,
            selected: filter.selected
          })
        } else if (filter && filter.selected) {
          initialSelectedRadioValue[filter.filter] = filter.selected[0]
        }
      })

      setSelectedRadioValue(initialSelectedRadioValue)
      setOutcomes(initialOutcomes)

      if (outcomesFilterData) {
        const matchingOutcome = initialOutcomes.find(
          (outcome) => Number(outcome.filter) === Number(outcomesFilterData.id)
        )

        const selectedOutcome = matchingOutcome?.selected[0]

        setSelectedOutcomeValue(selectedOutcome || '')
      }
    } else {
      console.error('selectedScenarioFilters is not an array')
    }
  }, [selectedScenarioFilters, outcomesFilterData])

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

export default FilterCategory

FilterCategory.propTypes = {
  filterData: PropTypes.array,
  isComparison: PropTypes.bool,
  isCleared: PropTypes.bool
}
