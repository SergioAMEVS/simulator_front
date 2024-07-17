import { Box, Grid, Skeleton, useMediaQuery } from '@mui/material'
import ReactECharts from 'echarts-for-react'
import React, { useEffect, useRef } from 'react'
import BaseCard from '../components/BaseCard'
import FilterBar from '../components/filterBar/FilterBar'
import { filterCardStyle, filterCardStyleMedia } from '../styles/MainCardStyles'
import CardChartContainer from '../components/card-chart/CardChartContainer'
import {
  createLineStyleChart,
  createLinechart
} from '../helpers/chart-convert-data'
import BgTabs from '../components/common/BgTabs'
import TopActionBar from '../components/common/TopActionBar'
import { BarLegends } from '../components/card-chart/BarLegends'
import { useApiResponseDataStore, useStepsStore } from '../store/store'
import { convertToPercentage } from '../helpers/converter-numbers-to'
import SmallSampleSize from '../components/common/SmallSampleSize'
import { wizardData } from '../data/navigation-wizard-data'
import StepperSmallComponent from '../components/glosarry/StepperSmallComponent'
import TooltipComponent from '../components/common/TooltipComponent'

const styleChart = {
  height: '250px',
  left: '20px'
}

export const Pricing = () => {
  const chartRef = useRef(null)
  const [option, setOption] = React.useState(null)
  const [lineChartData, setLineChartData] = React.useState(null)
  const [lineStyleChartData, setLineStyleChartData] = React.useState(null)
  const { apiResponse, isLoading, setIsLoading } = useApiResponseDataStore()
  const lScreen = useMediaQuery('(max-width:1919px)')
  const { mainStep, subStep, stepsData, active } = useStepsStore()

  const chartRef1 = useRef(null)
  const chartRef2 = useRef(null)
  const autoScrollLineChartRef = useRef(null)

  const businessPersona = {
    color: ['#8064A2', '#BCCCDA', '#CDBCE2'],
    title: {
      text: 'Value Perceived by Business Persona',
      left: 'center'
    },
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
        data: !active
          ? apiResponse?.barChart?.business?.series?.data
          : wizardData?.barChart?.business?.series?.data,
        label: {
          show: true,
          formatter: (params) => `${Math.round(params.value)} %`
        }
      }
    ]
  }

  const technologyPersona = {
    color: ['#8064A2', '#BCCCDA', '#CDBCE2'],

    title: {
      text: 'Value Perceived by Technology Persona',
      left: 'center'
    },
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
        data: !active
          ? apiResponse?.barChart?.technology?.series?.data
          : wizardData?.barChart?.technology?.series?.data,
        label: {
          show: true,
          formatter: (params) => `${Math.round(params.value)} %`
        }
      }
    ]
  }

  const chartsData = [lineChartData, lineStyleChartData]

  useEffect(() => {
    if (apiResponse) {
      const newLineChartData = createLinechart(apiResponse.multiLineChart)
      setLineChartData(newLineChartData)
      const newLineStyleChartData = createLineStyleChart(apiResponse.lineChart)
      setLineStyleChartData(newLineStyleChartData)
      setOption([newLineChartData, newLineStyleChartData])
      setIsLoading(false)
    }
  }, [apiResponse])

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

  useEffect(() => {
    if (
      stepsData[mainStep] &&
      stepsData[mainStep].label === 'Filters' &&
      stepsData[mainStep].subSteps[subStep] &&
      stepsData[mainStep].subSteps[subStep].step === subStep + 1 &&
      autoScrollLineChartRef.current
    ) {
      autoScrollLineChartRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [stepsData, mainStep, subStep])

  const legendData = ['Highly Valuable', 'Neutral', 'Limited Value']

  return (
    <>
      <Grid display={'flex'}>
        <BgTabs>
          <TopActionBar />
          <Grid
            padding={
              active
                ? '80px 60px 20px 60px'
                : isLoading || apiResponse === null
                  ? '0px 60px 0px 60px'
                  : '80px 60px 20px 60px'
            }
          >
            {isLoading || apiResponse === null ? (
              <Skeleton
                height={!active ? '529px' : 0}
                width={'100%'}
                sx={{ borderRadius: '20px' }}
              />
            ) : (
              chartsData.map(
                (chartData, index) =>
                  option && (
                    <CardChartContainer
                      key={index}
                      title={chartData?.title?.title}
                      hasSmallCard={chartData?.hasSmallCard}
                      smallCardData={apiResponse?.multiLineChart?.kpi}
                    >
                      <ReactECharts
                        key={index}
                        style={styleChart}
                        ref={chartRef}
                        option={chartData}
                      />
                    </CardChartContainer>
                  )
              )
            )}

            {active && (
              <Grid display={'flex'} flexDirection={'column'} gap={3}>
                <Grid>
                  <CardChartContainer
                    title={'Dummy Data - Multi Line Chart'}
                    hasSmallCard={true}
                  >
                    {stepsData[mainStep] &&
                      stepsData[mainStep].label === 'Filters' &&
                      stepsData[mainStep].subSteps[subStep] &&
                      stepsData[mainStep].subSteps[subStep].step === 7 && (
                        <TooltipComponent
                          data={stepsData[mainStep].subSteps[subStep].tooltip}
                          placement='left'
                        >
                          <Grid ref={autoScrollLineChartRef} />
                        </TooltipComponent>
                      )}

                    <ReactECharts
                      style={styleChart}
                      option={
                        wizardData?.multiLineChart
                          ? createLinechart(wizardData.multiLineChart)
                          : {}
                      }
                    />
                    {stepsData[mainStep] &&
                      stepsData[mainStep].label === 'Filters' &&
                      stepsData[mainStep].subSteps[subStep] &&
                      stepsData[mainStep].subSteps[subStep].step === 8 && (
                        <TooltipComponent
                          data={stepsData[mainStep].subSteps[subStep].tooltip}
                          placement='bottom'
                        >
                          <Grid ref={autoScrollLineChartRef} />
                        </TooltipComponent>
                      )}
                  </CardChartContainer>
                </Grid>

                <Grid>
                  <CardChartContainer
                    title={'Dummy Data - Line Chart'}
                    hasSmallCard={false}
                  >
                    {stepsData[mainStep] &&
                      stepsData[mainStep].label === 'Filters' &&
                      stepsData[mainStep].subSteps[subStep] &&
                      stepsData[mainStep].subSteps[subStep].step === 13 && (
                        <TooltipComponent
                          data={stepsData[mainStep].subSteps[subStep].tooltip}
                          placement='top'
                        >
                          <Grid ref={autoScrollLineChartRef} />
                        </TooltipComponent>
                      )}
                    <ReactECharts
                      style={styleChart}
                      option={createLineStyleChart(wizardData?.lineChart)}
                    />
                  </CardChartContainer>
                  {stepsData[mainStep] &&
                    stepsData[mainStep].label === 'Filters' &&
                    stepsData[mainStep].subSteps[subStep] &&
                    stepsData[mainStep].subSteps[subStep].step === 12 && (
                      <TooltipComponent
                        data={stepsData[mainStep].subSteps[subStep].tooltip}
                        placement='bottom'
                      >
                        <Grid ref={autoScrollLineChartRef} />
                      </TooltipComponent>
                    )}
                </Grid>
              </Grid>
            )}

            <Grid mt={isLoading || apiResponse === null ? -15 : 4} />
            {isLoading || apiResponse === null ? (
              <Skeleton
                height={!active ? '229px' : 0}
                width={'100%'}
                sx={{ borderRadius: '20px' }}
              />
            ) : lScreen ? (
              <CardChartContainer
                title={'Value Perceived'}
                hasSmallCard={false}
              >
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
                <Grid mb={3} display={'flex'} justifyContent={'center'}>
                  <SmallSampleSize
                    apiResponse={apiResponse}
                    chartType='business'
                  />
                </Grid>
                <Grid
                  display={'flex'}
                  justifyContent={'center'}
                  flexDirection={'column'}
                >
                  <ReactECharts
                    ref={chartRef1}
                    option={{
                      ...businessPersona,
                      series: [
                        {
                          ...businessPersona?.series[0],
                          data: convertToPercentage(
                            apiResponse?.barChart?.business?.series?.data
                          ).map((value, index) => ({
                            value,
                            itemStyle: {
                              color: ['#8064A2', '#BCCCDA', '#CDBCE2'][index]
                            }
                          }))
                        }
                      ]
                    }}
                  />
                  <Grid mb={3} display={'flex'} justifyContent={'center'}>
                    <SmallSampleSize
                      apiResponse={apiResponse}
                      chartType='technology'
                    />
                  </Grid>
                  <ReactECharts
                    ref={chartRef2}
                    option={{
                      ...technologyPersona,
                      series: [
                        {
                          ...technologyPersona?.series[0],
                          data: convertToPercentage(
                            apiResponse?.barChart?.technology?.series?.data
                          ).map((value, index) => ({
                            value,
                            itemStyle: {
                              color: ['#8064A2', '#BCCCDA', '#CDBCE2'][index]
                            }
                          }))
                        }
                      ]
                    }}
                  />
                </Grid>
              </CardChartContainer>
            ) : (
              <CardChartContainer
                title={'Value Perceived'}
                hasSmallCard={false}
              >
                <Grid
                  display={'flex'}
                  justifyContent={'space-around'}
                  alignItems={'center'}
                >
                  <Grid mb={3}>
                    <SmallSampleSize
                      apiResponse={apiResponse}
                      chartType='business'
                    />
                  </Grid>
                  <Grid>
                    <BarLegends
                      chartRefs={[chartRef1, chartRef2]}
                      toggleSeries={toggleSeries}
                      legendData={legendData}
                    />
                  </Grid>
                  <Grid mb={3}>
                    <SmallSampleSize
                      apiResponse={apiResponse}
                      chartType='technology'
                    />
                  </Grid>
                </Grid>
                <Grid display={'flex'} justifyContent={'center'}>
                  <ReactECharts
                    ref={chartRef1}
                    option={{
                      ...businessPersona,
                      series: [
                        {
                          ...businessPersona?.series[0],
                          data: convertToPercentage(
                            apiResponse?.barChart?.business?.series?.data
                          ).map((value, index) => ({
                            value,
                            itemStyle: {
                              color: ['#8064A2', '#BCCCDA', '#CDBCE2'][index]
                            }
                          }))
                        }
                      ]
                    }}
                    style={{ width: '45%', height: '350px' }}
                  />
                  <ReactECharts
                    ref={chartRef2}
                    option={{
                      ...technologyPersona,
                      series: [
                        {
                          ...technologyPersona?.series[0],
                          data: convertToPercentage(
                            apiResponse?.barChart?.technology?.series?.data
                          ).map((value, index) => ({
                            value,
                            itemStyle: {
                              color: ['#8064A2', '#BCCCDA', '#CDBCE2'][index]
                            }
                          }))
                        }
                      ]
                    }}
                    style={{ width: '45%', height: '350px' }}
                  />
                </Grid>
              </CardChartContainer>
            )}
            {active && (
              <Grid mt={20}>
                <CardChartContainer
                  title={'Value Perceived'}
                  hasSmallCard={false}
                >
                  <Grid
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                  >
                    <Grid mb={3}>
                      {stepsData[mainStep] &&
                        stepsData[mainStep].label === 'Filters' &&
                        stepsData[mainStep].subSteps[subStep] &&
                        stepsData[mainStep].subSteps[subStep].step === 14 && (
                          <TooltipComponent
                            data={stepsData[mainStep].subSteps[subStep].tooltip}
                            placement='top'
                          >
                            <Grid ref={autoScrollLineChartRef} />
                          </TooltipComponent>
                        )}
                      <SmallSampleSize
                        apiResponse={wizardData || apiResponse}
                        chartType='business'
                      />
                    </Grid>
                    <Grid>
                      <BarLegends
                        chartRefs={[chartRef1, chartRef2]}
                        toggleSeries={toggleSeries}
                        legendData={legendData}
                      />
                    </Grid>
                    <Grid mb={3}>
                      {stepsData[mainStep] &&
                        stepsData[mainStep].label === 'Filters' &&
                        stepsData[mainStep].subSteps[subStep] &&
                        stepsData[mainStep].subSteps[subStep].step === 15 && (
                          <TooltipComponent
                            data={stepsData[mainStep].subSteps[subStep].tooltip}
                            placement='top'
                          >
                            <Grid ref={autoScrollLineChartRef} />
                          </TooltipComponent>
                        )}

                      <SmallSampleSize
                        apiResponse={wizardData || apiResponse}
                        chartType='technology'
                      />
                    </Grid>
                  </Grid>
                  <Grid display={'flex'} justifyContent={'center'}>
                    <ReactECharts
                      ref={chartRef1}
                      option={{
                        ...businessPersona,
                        series: [
                          {
                            ...businessPersona?.series[0],
                            data: convertToPercentage(
                              wizardData?.barChart?.business?.series?.data
                            ).map((value, index) => ({
                              value,
                              itemStyle: {
                                color: ['#8064A2', '#BCCCDA', '#CDBCE2'][index]
                              }
                            }))
                          }
                        ]
                      }}
                      style={{ width: '45%', height: '350px' }}
                    />

                    <ReactECharts
                      ref={chartRef2}
                      option={{
                        ...technologyPersona,
                        series: [
                          {
                            ...technologyPersona?.series[0],
                            data: convertToPercentage(
                              wizardData?.barChart?.technology?.series?.data
                            ).map((value, index) => ({
                              value,
                              itemStyle: {
                                color: ['#8064A2', '#BCCCDA', '#CDBCE2'][index]
                              }
                            }))
                          }
                        ]
                      }}
                      style={{ width: '45%', height: '350px' }}
                    />
                  </Grid>
                </CardChartContainer>
              </Grid>
            )}
            {isLoading || apiResponse === null || active ? (
              <>
                <Grid mt={-15}>
                  <Skeleton
                    height={!active ? '529px' : 0}
                    width={'100%'}
                    sx={{ borderRadius: '20px' }}
                  />
                </Grid>
                <Grid mt={-15}>
                  <Skeleton
                    height={!active ? '529px' : 0}
                    width={'100%'}
                    sx={{ borderRadius: '20px' }}
                  />
                </Grid>
              </>
            ) : null}
          </Grid>
        </BgTabs>

        <Grid
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          paddingTop={lScreen ? 10 : null}
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
export default Pricing
