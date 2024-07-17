import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { palette } from '../../styles/palette'

const ParametersTitle = ({ parameterTitle }) => {
  return (
    <Grid borderRadius={'10px'} padding={'2px 0px'} mb={3}>
      <Typography fontSize={'24px'} fontWeight={700} color={palette.cisco.Blue}>
        {parameterTitle}
      </Typography>
    </Grid>
  )
}

export default ParametersTitle

ParametersTitle.propTypes = {
  parameterTitle: PropTypes.string
}
