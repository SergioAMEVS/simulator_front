import React from 'react'
import { Box, Grid, List, ListItem, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { palette } from '../../styles/palette'
import kpis from '../../assets/kpis.png'

const AdditionalKPISComponent = React.forwardRef(
  ({ itLifecycleServicesKPI }, ref) => {
    return (
      <Grid width={'100%'} p={20} pt={7} pb={0}>
        <Grid
          height={'52px'}
          bgcolor={palette.analogousPurple.purple100}
          padding={'8px 12px 8px 20px'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          borderRadius={'8px'}
          color={palette.common.white}
          marginBottom={3}
          boxShadow={8}
          width={'100%'}
        >
          <Typography fontSize={'24px'} fontWeight={700}>
            IT Lifecycle Services - Additional KPIs
          </Typography>
        </Grid>
        <Grid display={'flex'} alignItems={'center'} gap={6}>
          <Grid
            bgcolor={palette.analogousPurple.purple60}
            height={'57px'}
            width={'437px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={'10px 0px 35px 0px'}
            boxShadow={10}
          >
            <Typography
              color={palette.common.white}
              fontWeight={700}
              textTransform={'capitalize'}
            >
              {itLifecycleServicesKPI.title}
            </Typography>
          </Grid>
          <Grid
            bgcolor={palette.common.white}
            borderRadius={'20px'}
            boxShadow={10}
          >
            <Grid
              justifyContent={'center'}
              padding={'20px 20px '}
              fontWeight={'700'}
            >
              {itLifecycleServicesKPI.subText}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          mt={4}
          display={'flex'}
          alignItems={'center'}
          textAlign={'center'}
          gap={10}
        >
          <Grid display={'grid'} gap={2}>
            <Typography
              fontWeight={900}
              fontSize={'20px'}
              color={palette.analogousPurple.purple80}
              ref={ref}
            >
              Measurement and Reporting by KPI’s
            </Typography>
            <Grid
              bgcolor={palette.common.white}
              borderRadius={'20px'}
              boxShadow={10}
            >
              <Typography
                textAlign={'start'}
                padding={'40px 40px'}
                fontWeight={700}
              >
                In addition to providing digital analytics specific to your
                unique environment, we also use AI and ML to translate insights
                into actions and automation. So, you can maximize the value of
                your technology investment and achieve the business outcomes you
                desire – faster.
              </Typography>
            </Grid>
          </Grid>

          <Grid display={'grid'} gap={2}>
            <Box component={'img'} src={kpis} />
          </Grid>
        </Grid>
        <Grid mt={4}>
          <Typography
            fontWeight={900}
            fontSize={'20px'}
            color={palette.analogousPurple.purple80}
            textAlign={'center'}
          >
            KPIs measured / tracked
          </Typography>
          <Grid
            bgcolor={palette.common.white}
            borderRadius={'20px'}
            boxShadow={10}
            mt={2}
          >
            <Grid justifyContent={'center'} padding={'40px 40px'}>
              <List
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  fontWeight: '900',
                  color: palette.cisco.PrimaryMain
                }}
              >
                {itLifecycleServicesKPI.KPIsmeasured &&
                  itLifecycleServicesKPI.KPIsmeasured.map((item, index) => (
                    <ListItem key={index}>
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 9,
                          content: '•',
                          color: palette.cisco.PrimaryMain,
                          fontWeight: 'bold',
                          fontSize: '1.2em',
                          lineHeight: '1em'
                        }}
                      >
                        •
                      </span>
                      {item}
                    </ListItem>
                  ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
)

AdditionalKPISComponent.displayName = 'AdditionalKPISComponent'
export default AdditionalKPISComponent

AdditionalKPISComponent.propTypes = {
  itLifecycleServicesKPI: PropTypes.object
}
