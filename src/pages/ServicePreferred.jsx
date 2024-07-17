import React, { useEffect, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import BgTabs from '../components/common/BgTabs'
import { Grid, Switch, Typography, useMediaQuery } from '@mui/material'
import StepperSelectedOption from '../components/service-preferred/StepperSelectedOption'
import OutcomesFeaturesComponent from '../components/service-preferred/OutcomesFeaturesComponent'
import AdditionalKPISComponent from '../components/service-preferred/AdditionalKPISComponent'
import { dataHeatmap, services, industry } from '../data/heatmapData'
import {
  itLifecycleServices,
  itLifecycleServicesKPI
} from '../data/it-lifecycle-services'
import { palette } from '../styles/palette'

const styleChart = {
  height: '50dvh',
  width: '70dvw',
  left: '90px',
  right: '50px'
}

const ServicePreferred = () => {
  const [currentStep, setCurrentStep] = useState(-1)
  const [toggleState, setToggleState] = useState(true)
  const typographyRef = useRef(null)
  const lScreen = useMediaQuery('(max-width:1919px)')

  const handleToggle = () => {
    setToggleState(!toggleState)
  }

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex)
    if (typographyRef.current) {
      typographyRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (currentStep !== -1 && typographyRef.current) {
      typographyRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentStep])

  const reversedIndustry = [...industry].reverse()
  const currentStepName = reversedIndustry[currentStep]
  const currentStepData = itLifecycleServices[currentStepName]
  const currentStepDataKpis = itLifecycleServicesKPI[currentStepName]

  const option = {
    tooltip: {
      position: 'top'
    },
    grid: {
      height: 'auto',
      left: '24%'
    },
    xAxis: {
      type: 'category',
      data: services,
      position: 'top',
      splitArea: {
        show: true
      },
      axisLabel: {
        fontSize: !lScreen ? 12 : 8
      }
    },
    yAxis: {
      type: 'category',
      data: industry,
      splitArea: {
        show: true
      },
      axisLabel: {
        fontSize: !lScreen ? 12 : 8
      }
    },
    visualMap: {
      min: 14,
      max: 42,
      calculable: true,
      orient: 'vertical',
      left: 'right',
      top: '20%',
      inRange: {
        color: ['#F8696B', '#FFEB84', '#63BE7B']
      },
      formatter: function (value) {
        return Math.floor(value) + '%'
      }
    },
    series: industry.map((industryName) => ({
      name: industryName,
      type: 'heatmap',
      data: dataHeatmap,
      label: {
        show: true,
        fontSize: !lScreen ? 12 : 8,
        color: 'rgba(0, 0, 0, 0.2)',
        formatter: function (params) {
          return params.value[2] + '%'
        }
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }))
  }

  return (
    <Grid
      display={'flex'}
      style={{ background: 'linear-gradient(to top, #005568, #03B9E0)' }}
      height={lScreen ? '89dvh' : '91.5vh'}
    >
      <BgTabs>
        <Grid
          display={'flex'}
          justifyContent={'space-around'}
          alignItems={'center'}
          bgcolor={'#F2FCFF'}
          width={!lScreen ? '100%' : '96.7%'}
          zIndex={1}
          position={'fixed'}
        >
          <StepperSelectedOption
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            steps={industry}
            handleStepChange={handleStepChange}
          />
          <Grid
            display={'grid'}
            alignItems={'center'}
            justifyContent={'center'}
            textAlign={'center'}
          >
            <Typography fontWeight={700} color={palette.gray.gray100}>
              KPIs
            </Typography>
            <Switch onClick={handleToggle} />
          </Grid>
        </Grid>

        <Grid
          width={'100%'}
          mt={15}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Grid
            bgcolor={palette.common.white}
            borderRadius={'20px'}
            boxShadow={10}
          >
            <Grid
              bgcolor={palette.cisco.Blue}
              height={'58px'}
              width={'437px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'10px 0px 35px 0px'}
            >
              <Typography color={palette.common.white} fontWeight={700}>
                Services Preferred vs. Industry
              </Typography>
            </Grid>

            <Grid justifyContent={'center'} padding={'0px 20px 0px 0px'}>
              <Grid width={'80vw'}>
                <ReactECharts style={styleChart} option={option} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {currentStep !== -1 && (
          <>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
              <path
                fill='#ffff'
                fillOpacity='1'
                d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
              ></path>
            </svg>
            <Grid
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
              bgcolor={palette.common.white}
              mt={-1}
            >
              {toggleState ? (
                <OutcomesFeaturesComponent
                  ref={typographyRef}
                  itLifecycleServices={currentStepData}
                />
              ) : (
                <AdditionalKPISComponent
                  ref={typographyRef}
                  itLifecycleServicesKPI={currentStepDataKpis}
                />
              )}
            </Grid>
          </>
        )}
      </BgTabs>
    </Grid>
  )
}

export default ServicePreferred
