import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import BaseCardComparison from './BaseCardComparison'
import {
  CircularProgress,
  Fade,
  Grid,
  Typography,
  useMediaQuery
} from '@mui/material'
import ComparisonScenarioOption from './ComparisonScenarioOption'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PropTypes from 'prop-types'
import useApi from '../../hooks/useCallApi'
import CustomButton from '../CustomButton'
import ReactECharts from 'echarts-for-react'
import { convertToPercentage } from '../../helpers/converter-numbers-to'
import { BarLegends } from '../card-chart/BarLegends'
import { palette } from '../../styles/palette'
import SmallSampleSizeComparison from './SmallSampleSizeComparison'
import SmallCard from '../card-chart/SmallCard'
import FilterCategoryComparison from '../filterBar/FilterCategoryComparison'

const styleChart = {
  left: '0px',
  right: '0px'
}

const ComparisonScenario = ({
  comparisonScenarioTitle,
  handleOpenModal,
  handleCloseModal,
  handleOpenScenarioAPI,
  multiLineChartData,
  lineChartData,
  barChart,
  sampleSize,
  handleSaveScenario,
  handleCloseScenario,
  isDataReset,
  isLoading,
  editingScenario,
  kpiData
}) => {
  const [expanded, setExpanded] = useState(false)
  const [filtersData, setFiltersData] = useState([])
  const { data, error, fetchData } = useApi('filters')
  const chartRef = useRef(null)
  const chartRef1 = useRef(null)
  const chartRef2 = useRef(null)
  const lScreen = useMediaQuery('(max-width:1919px)')

  const accordionStyled = {
    '& .MuiAccordion-region': {
      height: expanded ? 'auto' : 0
    },
    '& .MuiAccordionDetails-root': {
      display: expanded ? 'block' : 'none'
    },
    '& .MuiAccordion-root': {
      border: 'none',
      boxShadow: 'none'
    },
    '& .MuiAccordion-root.Mui-expanded': {
      margin: '0px'
    },
    '&& .MuiPaper-root.MuiAccordion-root': {
      backgroundColor: 'red',
      boxShadow: 'none'
    },
    '&.Mui-disabled': {
      backgroundColor: '#f5f5f5',
      boxShadow: 'none'
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (data && data !== filtersData) {
      setFiltersData(data)
    }

    if (error) {
      console.error('Error fetching filters:', error)
    }
  }, [data, error, filtersData])

  const handleExpansion = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded)
  }, [])

  useEffect(() => {
    if (comparisonScenarioTitle) {
      setExpanded(true)
    }
  }, [comparisonScenarioTitle])

  if (multiLineChartData && !multiLineChartData?.series) {
    multiLineChartData.series = []
  }

  const businessPersona = useMemo(
    () => ({
      color: ['#8064A2', '#BCCCDA', '#CDBCE2'],
      xAxis: {
        data: ['Highly Valuable', 'Neutral', 'Limited Value'],
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        axisLabel: {
          formatter: '{value} %'
        }
      },
      series: [
        {
          name: 'Value',
          type: 'pie',
          radius: '70%',
          data: barChart?.business?.series?.data,
          label: {
            show: true,

            formatter: (params) => `${Math.round(params.value)} %`,
            fontSize: !lScreen ? 14 : 10
          }
        }
      ]
    }),
    [barChart]
  )

  const technologyPersona = useMemo(
    () => ({
      color: ['#8064A2', '#BCCCDA', '#CDBCE2'],
      xAxis: {
        data: ['Highly Valuable', 'Neutral', 'Limited Value'],
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        axisLabel: {
          formatter: '{value} %'
        }
      },
      series: [
        {
          name: 'Value',
          type: 'pie',
          radius: '70%',
          data: barChart?.technology?.series?.data,
          label: {
            show: true,
            // position: 'top',
            formatter: (params) => `${Math.round(params.value)} %`,
            fontSize: !lScreen ? 14 : 10
          }
        }
      ]
    }),
    [barChart]
  )

  const toggleSeries = (seriesName) => {
    const seriesIndex = ['Highly Valuable', 'Neutral', 'Limited Value'].indexOf(
      seriesName
    )
    if (seriesIndex !== -1) {
      const chartInstance1 = chartRef1.current.getEchartsInstance()
      const chartInstance2 = chartRef2.current.getEchartsInstance()
      const isSeriesVisible1 = chartInstance1.isSeriesInView(seriesIndex)
      const isSeriesVisible2 = chartInstance2.isSeriesInView(seriesIndex)

      if (isSeriesVisible1 && isSeriesVisible2) {
        chartInstance1.dispatchAction({
          type: 'legendToggleSelect',
          name: seriesName
        })
        chartInstance2.dispatchAction({
          type: 'legendToggleSelect',
          name: seriesName
        })
      } else {
        chartInstance1.dispatchAction({
          type: 'legendSelect',
          name: seriesName
        })
        chartInstance2.dispatchAction({
          type: 'legendSelect',
          name: seriesName
        })
      }
    }
  }

  const legendData = ['Highly Valuable', 'Neutral', 'Limited Value']

  return (
    <BaseCardComparison
      comparisonScenarioTitle={comparisonScenarioTitle}
      handleSaveScenario={handleSaveScenario}
      handleCloseScenario={handleCloseScenario}
      isDataReset={isDataReset}
      editingScenario={editingScenario}
    >
      <Grid padding={'20px 0px 22px 0px'}>
        {!comparisonScenarioTitle || isDataReset ? (
          <Grid display={'flex'} justifyContent={'center'}>
            <ComparisonScenarioOption
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              editingScenario={editingScenario}
            />
          </Grid>
        ) : (
          <Grid>
            <Accordion
              expanded={expanded}
              onChange={handleExpansion}
              slots={{ transition: Fade }}
              slotprops={{ transition: { timeout: 400 } }}
              sx={accordionStyled}
              style={{ boxShadow: 'none', width: '100%' }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
              >
                <Typography fontWeight={800} fontSize={'1.25rem'}>
                  Filters
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FilterCategoryComparison
                  filterData={filtersData}
                  isComparison={true}
                />
                <Grid
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  mt={2}
                >
                  <Grid
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    border={
                      !sampleSize
                        ? '1px solid #C9CACC'
                        : sampleSize <= 30
                          ? `2px solid '#EBA973'`
                          : `2px solid ${palette.analogousCalypso.calypso100}`
                    }
                    backgroundColor={
                      sampleSize <= 30
                        ? '#EBA973'
                        : palette.analogousCalypso.calypso100
                    }
                    borderRadius={'8px 36px'}
                    padding={'8px 16px'}
                  >
                    <Typography
                      fontWeight={700}
                      fontSize={!sampleSize ? '12px' : '16px'}
                      color={
                        !sampleSize
                          ? palette.common.white
                          : palette.common.white
                      }
                    >
                      {sampleSize ?? '-'}
                    </Typography>
                    <Typography
                      fontWeight={700}
                      fontSize={!sampleSize ? '12px' : '16px'}
                      color={
                        !sampleSize
                          ? palette.common.white
                          : palette.common.white
                      }
                    >
                      Sample Size
                    </Typography>
                  </Grid>
                  <Grid>
                    <CustomButton
                      filled
                      text={
                        isLoading ? (
                          <CircularProgress
                            size={24}
                            style={{ color: '#fff' }}
                          />
                        ) : (
                          'Open'
                        )
                      }
                      clickFunction={handleOpenScenarioAPI}
                      linkTo={import.meta.env.VITE_BASE_URL2 + 'comparison'}
                      hasHover={true}
                      isDisabled={isLoading}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              disabled={
                !!isLoading ||
                !multiLineChartData ||
                Object.keys(multiLineChartData).length === 0
              }
              sx={accordionStyled}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls='panel2-content'
                id='panel2-header'
              >
                <Typography fontWeight={800} fontSize={'1.25rem'}>
                  Price Sensitity Analysis (IT Lifecycle Service)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <ReactECharts
                    style={styleChart}
                    ref={chartRef}
                    option={multiLineChartData || {}}
                  />
                )}
                {isLoading ? (
                  <div>Loading ...</div>
                ) : (
                  <SmallCard smallCardData={kpiData} />
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              disabled={
                !!isLoading ||
                !multiLineChartData ||
                Object.keys(multiLineChartData).length === 0
              }
              sx={accordionStyled}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls='panel2-content'
                id='panel2-header'
              >
                <Typography fontWeight={800} fontSize={'1.25rem'}>
                  Price Sensitity (Demand Curve)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <ReactECharts
                    style={styleChart}
                    ref={chartRef}
                    option={lineChartData || {}}
                  />
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion
              disabled={
                !!isLoading ||
                !multiLineChartData ||
                Object.keys(multiLineChartData).length === 0
              }
              sx={accordionStyled}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownIcon />}
                aria-controls='panel2-content'
                id='panel2-header'
              >
                <Typography fontWeight={800} fontSize={'1.25rem'}>
                  Value Perceived
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  display={'flex'}
                  justifyContent={'space-around'}
                  alignItems={'center'}
                >
                  <Grid>
                    <BarLegends
                      chartRefs={[chartRef1, chartRef2]}
                      toggleSeries={toggleSeries}
                      legendData={legendData}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction='column'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Typography fontSize={'14px'} fontWeight={'700'}>
                    Value Perceived by Business Persona
                  </Typography>
                  <SmallSampleSizeComparison
                    barChart={barChart}
                    chartType='business'
                  />
                  <ReactECharts
                    ref={chartRef1}
                    option={{
                      ...businessPersona,
                      series: [
                        {
                          ...businessPersona?.series[0],
                          data: convertToPercentage(
                            barChart?.business?.series?.data
                          ).map((value, index) => ({
                            value,
                            itemStyle: {
                              color: ['#8064A2', '#BCCCDA', '#CDBCE2'][index]
                            }
                          }))
                        }
                      ]
                    }}
                    style={{
                      width: '400px',
                      height: '300px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  />
                  <Typography fontSize={'14px'} fontWeight={'700'}>
                    Value Perceived by Technology Persona
                  </Typography>
                  <SmallSampleSizeComparison
                    barChart={barChart}
                    chartType='technology'
                  />
                  <ReactECharts
                    ref={chartRef2}
                    option={{
                      ...technologyPersona,
                      series: [
                        {
                          ...technologyPersona?.series[0],
                          data: convertToPercentage(
                            barChart?.technology?.series?.data
                          ).map((value, index) => ({
                            value,
                            itemStyle: {
                              color: ['#8064A2', '#BCCCDA', '#CDBCE2'][index]
                            }
                          }))
                        }
                      ]
                    }}
                    style={{
                      width: '400px',
                      height: '300px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  />
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}
      </Grid>
    </BaseCardComparison>
  )
}

export default React.memo(ComparisonScenario)

ComparisonScenario.propTypes = {
  comparisonScenarioTitle: PropTypes.string,
  handleOpenModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
  handleOpenScenarioAPI: PropTypes.func,
  multiLineChartData: PropTypes.object,
  lineChartData: PropTypes.object,
  barChart: PropTypes.object,
  sampleSize: PropTypes.number,
  handleSaveScenario: PropTypes.func,
  handleCloseScenario: PropTypes.func,
  isDataReset: PropTypes.bool,
  isLoading: PropTypes.bool,
  editingScenario: PropTypes.number,
  kpiData: PropTypes.object
}
