import { Box, Grid, useMediaQuery } from '@mui/material'
import React, { useState, useEffect } from 'react'
import BaseCard from '../components/BaseCard'
import FilterBar from '../components/filterBar/FilterBar'
import { filterCardStyle, filterCardStyleMedia } from '../styles/MainCardStyles'
import ProgresChart from '../components/profiling/ProgressChart'
import ChartCategoryTitle from '../components/profiling/ChartCategoryTitle'
import BgTabs from '../components/common/BgTabs'
import ParametersTitle from '../components/profiling/ParametersTitle'
import TopActionBar from '../components/common/TopActionBar'
import { useApiResponseDataStore, useStepsStore } from '../store/store'
import StepperSmallComponent from '../components/glosarry/StepperSmallComponent'
import { wizardData } from '../data/navigation-wizard-data'
import TooltipComponent from '../components/common/TooltipComponent'

export const Profiling = () => {
  const [profillingData, setProfillingData] = useState([])
  const { apiResponse } = useApiResponseDataStore()
  const { mainStep, subStep, stepsData, active } = useStepsStore()
  const lScreen = useMediaQuery('(max-width:1919px)')

  useEffect(() => {
    setProfillingData(apiResponse?.profiling)
  }, [apiResponse])

  function transformData(data) {
    const transformed = data?.reduce((acc, item) => {
      if (!acc[item.filter_type]) {
        acc[item.filter_type] = []
      }

      acc[item.filter_type].push({
        title: item.filter_id,
        categories: item.filter_values.map((value) => ({
          titleCategory: value.label,
          value: Math.round(value.percentage * 100)
        }))
      })

      return acc
    }, {})

    return transformed
  }

  const transformedData = transformData(profillingData)
  const transformedWizarData = transformData(wizardData.profiling)

  // function to order values

  function getOrderValue(label) {
    switch (label) {
      case '250 - 499 Mn':
        return 1
      case '500 - 749 Mn':
        return 2
      case '750 Mn - 1 Bn':
        return 3
      case '> 1 Bn':
        return 4
      case '601 K - 2 Mn':
        return 1
      case '2.1 - 8 Mn':
        return 2
      case '8.1 - 65 Mn':
        return 3
      case '> 65 Mn':
        return 4
      default:
        return 5
    }
  }
  function sortFilterValues(filterValues) {
    return filterValues.sort(
      (a, b) => getOrderValue(a.titleCategory) - getOrderValue(b.titleCategory)
    )
  }

  return (
    <>
      <Grid display={'flex'}>
        <BgTabs>
          <TopActionBar />
          <Grid padding={'80px 60px 20px 60px'}>
            {transformedData ? (
              Object.keys(transformedData).map((key, index) => {
                transformedData[key].forEach((item) => {
                  item.categories = sortFilterValues(item.categories)
                })

                const hasData = transformedData[key]?.some(
                  (item) => item.title && item.categories.length > 0
                )

                if (!hasData) {
                  return null
                }

                return (
                  <div key={index}>
                    <ParametersTitle parameterTitle={key} />
                    {transformedData[key].map((item, subIndex) => {
                      if (item.categories.length === 0 || !item.title) {
                        return null
                      }

                      return (
                        <Grid key={`${index}-${subIndex}`} mb={4}>
                          <ChartCategoryTitle
                            category={item.title}
                            icon={item.title}
                          />
                          <Grid>
                            {item.categories.map((category, categoryIndex) => (
                              <ProgresChart
                                key={categoryIndex}
                                category={category}
                              />
                            ))}
                          </Grid>
                        </Grid>
                      )
                    })}
                  </div>
                )
              })
            ) : (
              <>
                {stepsData[mainStep] &&
                  stepsData[mainStep].label === 'Profiling' &&
                  stepsData[mainStep].subSteps[subStep] &&
                  stepsData[mainStep].subSteps[subStep].step === 16 && (
                    <TooltipComponent
                      data={stepsData[mainStep].subSteps[subStep].tooltip}
                      placement='top'
                    >
                      <Grid />
                    </TooltipComponent>
                  )}
                {Object.keys(transformedWizarData).map((key, index) => {
                  const hasData = transformedWizarData[key]?.some(
                    (item) => item.title && item.categories.length > 0
                  )

                  if (!hasData) {
                    return null
                  }

                  return (
                    <div key={index}>
                      <ParametersTitle parameterTitle={key} />
                      {transformedWizarData[key].map((item, subIndex) => {
                        if (item.categories.length === 0 || !item.title) {
                          return null
                        }

                        return (
                          <Grid key={`${index}-${subIndex}`} mb={4}>
                            <ChartCategoryTitle
                              category={item.title}
                              icon={item.title}
                            />
                            <Grid>
                              {item.categories.map(
                                (category, categoryIndex) => (
                                  <ProgresChart
                                    key={categoryIndex}
                                    category={category}
                                  />
                                )
                              )}
                            </Grid>
                          </Grid>
                        )
                      })}
                    </div>
                  )
                })}
              </>
            )}
          </Grid>
        </BgTabs>
        <Grid
          display='flex'
          justifyContent='flex-end'
          marginLeft={'40px'}
          alignItems='center'
          paddingTop={lScreen ? 10 : undefined}
        >
          <BaseCard
            cardStyle={lScreen ? filterCardStyleMedia : filterCardStyle}
            isHidden={false}
          >
            <FilterBar />
          </BaseCard>
        </Grid>
      </Grid>
      {active && (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          position='fixed'
          bottom={20}
          left={0}
          right={0}
        >
          <StepperSmallComponent />
        </Box>
      )}
    </>
  )
}
export default Profiling
