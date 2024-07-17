import { Grid, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { palette } from '../../styles/palette'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import {
  formatDollar,
  formatPercentage
} from '../../helpers/converter-numbers-to'
import { useStepsStore } from '../../store/store'
import TooltipComponent from '../common/TooltipComponent'

const SmallCard = ({ smallCardData }) => {
  const { mainStep, subStep, stepsData, active } = useStepsStore()
  const autoScrollLineChartRef = useRef(null)

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

  const additionalPremiumPrice =
    (smallCardData?.optimal * smallCardData?.premium) / 100

  const totalAdditionalPremiumPrice =
    smallCardData?.optimal + additionalPremiumPrice

  return (
    <Grid justifyContent={'center'} mt={4} mb={4}>
      <Grid>
        <Grid
          padding={'5px 0px 5px 24px'}
          borderRadius={'20px 20px 0px 0px'}
          bgcolor={palette.gray.menu.green}
          textAlign={'center'}
          border={`1px solid ${palette.gray.gray50}`}
        >
          <Typography
            color={palette.cisco.PrimaryMain}
            fontSize={'14px'}
            fontWeight={700}
          >
            Acceptable Price Range
          </Typography>
        </Grid>
        <Grid
          bgcolor={palette.common.white}
          borderRadius={'0px 0px 6px 6px'}
          border={`1px solid ${palette.cisco.lightGray}`}
        >
          <Grid
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-around'}
            mb={1}
            mt={1}
          >
            <Grid
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexWrap='wrap'
              flexDirection='column'
            >
              <Grid
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'4px'}
              >
                {active &&
                stepsData[mainStep] &&
                stepsData[mainStep].label === 'Filters' &&
                stepsData[mainStep].subSteps[subStep] &&
                stepsData[mainStep].subSteps[subStep].step === 9 ? (
                  <TooltipComponent
                    data={stepsData[mainStep].subSteps[subStep].tooltip}
                    placement='top'
                  >
                    <Typography
                      fontSize={'0.75em'}
                      fontWeight={700}
                      ref={autoScrollLineChartRef}
                    >
                      Upper Bound
                    </Typography>
                  </TooltipComponent>
                ) : (
                  <Typography fontSize={'0.75em'} fontWeight={700}>
                    Upper Bound
                  </Typography>
                )}
                <Grid color={`${palette.analogousCalypso.calypso100}`}>
                  <ArrowUpwardIcon />
                </Grid>
              </Grid>
              <Grid
                width={'100%'}
                display={'flex'}
                justifyContent={'flex-start'}
              >
                <Typography fontSize={'0.75em'}>
                  {formatDollar(smallCardData?.upper)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={2}
            >
              <Grid
                textAlign={'center'}
                display={'flex'}
                flexDirection={'column'}
                gap={'5px'}
              >
                {active &&
                stepsData[mainStep] &&
                stepsData[mainStep].label === 'Filters' &&
                stepsData[mainStep].subSteps[subStep] &&
                stepsData[mainStep].subSteps[subStep].step === 11 ? (
                  <TooltipComponent
                    data={stepsData[mainStep].subSteps[subStep].tooltip}
                    placement='top'
                  >
                    <Typography
                      fontSize={'0.75em'}
                      paddingTop={'5px'}
                      ref={autoScrollLineChartRef}
                    >
                      Optimal Price Point
                    </Typography>
                  </TooltipComponent>
                ) : (
                  <Typography fontSize={'0.75em'} paddingTop={'5px'}>
                    Optimal Price Point
                  </Typography>
                )}

                <Typography fontSize={'0.75em'} color={palette.gray.gray80}>
                  {formatDollar(smallCardData?.optimal)}
                </Typography>
              </Grid>
              <Grid color={palette.secondary.green100}>
                <FiberManualRecordIcon />
              </Grid>
              <Grid
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Grid
                  textAlign={'center'}
                  display={'flex'}
                  flexDirection={'column'}
                  gap={'5px'}
                >
                  <Typography fontSize={'0.75em'} paddingTop={'5px'}>
                    Additional KPI Premium
                  </Typography>
                  <Typography fontSize={'0.75em'} color={palette.gray.gray80}>
                    {formatPercentage(smallCardData?.premium)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexWrap='wrap'
              flexDirection='column'
            >
              <Grid
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'4pxgit add'}
              >
                {active &&
                stepsData[mainStep] &&
                stepsData[mainStep].label === 'Filters' &&
                stepsData[mainStep].subSteps[subStep] &&
                stepsData[mainStep].subSteps[subStep].step === 10 ? (
                  <TooltipComponent
                    data={stepsData[mainStep].subSteps[subStep].tooltip}
                    placement='top'
                  >
                    <Typography
                      fontSize={'0.75em'}
                      fontWeight={700}
                      ref={autoScrollLineChartRef}
                    >
                      Lower Bound
                    </Typography>
                  </TooltipComponent>
                ) : (
                  <Typography fontSize={'0.75em'} fontWeight={700}>
                    Lower Bound
                  </Typography>
                )}

                <Grid color={`${palette.common.error}`}>
                  <ArrowDownwardIcon />
                </Grid>
              </Grid>
              <Grid
                width={'100%'}
                display={'flex'}
                justifyContent={'flex-start'}
              >
                <Typography fontSize={'0.75em'}>
                  {formatDollar(smallCardData?.lower)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid display={'flex'} justifyContent={'center'}>
            <Grid display={'flex'}>
              <Typography
                fontWeight={700}
                color={palette.analogousCalypso.calypso90}
                mr={1}
                fontSize={'0.75em'}
              >
                Total pricing
              </Typography>
              <Typography
                color={palette.analogousCalypso.calypso90}
                fontSize={'0.75em'}
              >
                (Optimal Price + Additional Premium Price)
              </Typography>
            </Grid>
          </Grid>
          <Grid display={'flex'} justifyContent={'center'} mb={1}>
            <Typography color={palette.secondary.green100} fontSize={'0.75em'}>
              {formatDollar(totalAdditionalPremiumPrice)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SmallCard

SmallCard.propTypes = {
  smallCardData: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
