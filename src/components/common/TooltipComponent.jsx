import { Tooltip, styled } from '@mui/material'
import { palette } from '../../styles/palette'
import PropTypes from 'prop-types'

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: palette.cisco.PrimaryMain,
    color: 'white',
    fontSize: '1.2em',
    padding: '12px 36px',
    borderRadius: '50px',
    textAlign: 'center'
  },
  [`& .MuiTooltip-arrow`]: {
    color: palette.cisco.PrimaryMain
  }
}))

const TooltipComponent = ({ children, data, placement }) => {
  return (
    <StyledTooltip
      title={data}
      placement={placement}
      open
      arrow
      PopperProps={{
        popperOptions: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 30]
              }
            }
          ]
        }
      }}
    >
      {children}
    </StyledTooltip>
  )
}

export default TooltipComponent

TooltipComponent.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.string.isRequired,
  placement: PropTypes.string.isRequired
}
