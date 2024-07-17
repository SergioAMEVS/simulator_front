import React from 'react'
import PropTypes from 'prop-types'
import { Grid, List, ListItem, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { palette } from '../../styles/palette'

const OutcomesFeaturesComponent = React.forwardRef(
  ({ itLifecycleServices }, ref) => {
    return (
      <Grid width={'100%'} p={20} pt={15} pb={9}>
        <Grid
          height={'52px'}
          bgcolor={palette.cisco.PrimaryMain}
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
          <Typography fontSize={'24px'} fontWeight={700} ref={ref}>
            IT Lifecycle Services - Outcome features
          </Typography>
        </Grid>
        <Grid display={'flex'} alignItems={'center'} gap={6}>
          <Grid
            bgcolor={palette.cisco.Blue}
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
              textAlign={'center'}
            >
              {itLifecycleServices?.title}
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
              {itLifecycleServices?.subText}
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
              color={palette.cisco.PrimaryMain}
            >
              Access to teams of Experts
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
                Providing access to experts who understand your businesses,
                challenges, objectives, and timelines, to help you align your
                business priorities with clear, measurable, business outcomes to
                ensure your IT investments support your organization’s business
                goals.
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <AddIcon
              style={{ fontSize: 50, color: palette.cisco.PrimaryMain }}
            />
          </Grid>
          <Grid display={'grid'} gap={2}>
            <Typography fontWeight={900} fontSize={'20px'} color={'#31B349'}>
              Digital Insights
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
                Providing access to experts who understand your businesses,
                challenges, objectives, and timelines, to help you align your
                business priorities with clear, measurable, business outcomes to
                ensure your IT investments support your organization’s business
                goals.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          bgcolor={palette.common.white}
          borderRadius={'20px'}
          boxShadow={10}
          mt={4}
        >
          <Grid padding={'40px 40px'}>
            <List
              sx={{
                display: 'grid',
                fontWeight: '900',
                color: palette.cisco.PrimaryMain,
                gridTemplateColumns: '1fr 1fr',
                gap: '20px' // adjust as needed
              }}
            >
              {itLifecycleServices.listOfitems.map((item, index) => (
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
    )
  }
)

OutcomesFeaturesComponent.displayName = 'OutcomesFeaturesComponent'
export default OutcomesFeaturesComponent

OutcomesFeaturesComponent.propTypes = {
  title: PropTypes.string,
  itLifecycleServices: PropTypes.object
}
