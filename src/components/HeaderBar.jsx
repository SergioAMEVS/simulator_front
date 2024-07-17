import { useEffect, useRef, useState } from 'react'
import CiscoLogo from '../assets/ciscoLogo.svg'
import UserLogo from '../assets/icons/user.svg'
import { palette } from '../styles/palette'
import {
  Avatar,
  Box,
  Chip,
  Fade,
  Grid,
  IconButton,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  useApiResponseDataStore,
  useComparisonScenarioTitle1,
  useComparisonScenarioTitle2,
  useComparisonScenarioTitle3,
  useIsLoadScenario,
  useIsLoadScenario1,
  useModalStore,
  useScenarioId,
  useScenarioId2,
  useScenarioId3,
  useScenarioTitle,
  useSelectedScenarioFilters,
  useStepsStore
} from '../store/store'

function HeaderBar() {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const buttonRef = useRef(null)
  const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 })
  const lScreen = useMediaQuery('(max-width:1919px)')
  const { setOpenModal } = useModalStore()
  const { resetApiResponse } = useApiResponseDataStore()
  const { resetSelectedScenarioFilters } = useSelectedScenarioFilters()
  const { resetScenarioTitle } = useScenarioTitle()
  const { resetApiResponse1 } = useComparisonScenarioTitle1()
  const { resetApiResponse2 } = useComparisonScenarioTitle2()
  const { resetApiResponse3 } = useComparisonScenarioTitle3()
  const { resetSaveScanrioId } = useScenarioId()
  const { setIsLoadScenario } = useIsLoadScenario()
  const { resetSaveScanrioId2 } = useScenarioId2()
  const { resetSaveScanrioId3 } = useScenarioId3()
  const { setIsLoadScenario1 } = useIsLoadScenario1()

  const { setActive } = useStepsStore()

  const userName = localStorage.getItem('userName')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((previousOpen) => !previousOpen)
  }

  const handleClose = (event) => {
    if (anchorEl.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  const handleReturn = () => {
    setOpenModal(false)
    resetApiResponse()
    resetSelectedScenarioFilters()
    resetScenarioTitle()
    resetApiResponse1()
    resetApiResponse2()
    resetApiResponse3()
    resetSaveScanrioId()
    setIsLoadScenario(false)
    setActive(false)
    resetSaveScanrioId2()
    resetSaveScanrioId3()
    setIsLoadScenario1(false)
  }

  // clean data when return back
  useEffect(() => {
    const handlePopState = () => {
      handleReturn()
      localStorage.removeItem('filterSelected')
      localStorage.removeItem('apiResponseDataStore')
    }

    window.addEventListener('popstate', handlePopState)

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = import.meta.env.VITE_BASE_URL2
  }

  const canBeOpen = open && Boolean(anchorEl)
  const id = canBeOpen ? 'transition-popper' : undefined

  useEffect(() => {
    if (buttonRef.current) {
      setButtonSize({
        width: buttonRef.current.offsetWidth,
        height: buttonRef.current.offsetHeight
      })
    }
  }, [])

  return (
    <Grid
      container
      display={'flex'}
      alignItems={'center'}
      bgcolor={palette.common.white}
      width={lScreen ? '100vw' : 'auto'}
      // padding={'0px'}
    >
      <Grid item xs={1}></Grid>
      <Grid item xs={8}>
        <Link
          to={import.meta.env.VITE_BASE_URL2 + 'home'}
          onClick={handleReturn}
        >
          <img src={CiscoLogo} alt='cisco' />
        </Link>
      </Grid>
      <Grid item xs={3} display={'flex'} alignItems={'center'}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          // gap={2}
          // height={'100%'}
        >
          <IconButton
            ref={buttonRef}
            onClick={handleClick}
            sx={{
              backgroundColor: open
                ? palette.cisco.PrimaryMain
                : palette.analogousCalypso.calypso100,
              color: palette.common.white,

              padding: '2px 10px',
              gap: '5px',
              borderRadius: '50px',
              '&:hover': {
                background: palette.cisco.PrimaryMain
              }
            }}
          >
            <Avatar alt='user' src={UserLogo} />
            <Typography fontSize={'14px'}>{userName ?? 'User name'}</Typography>
            <Grid color={palette.common.white} marginLeft={'20px'}>
              <ExpandLessIcon />
            </Grid>
          </IconButton>
          <ClickAwayListener onClickAway={handleClose}>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              sx={{ zIndex: 5 }}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Chip
                    clickable
                    avatar={
                      <PowerSettingsNewIcon
                        style={{ color: palette.cisco.PrimaryMain }}
                      />
                    }
                    sx={{
                      backgroundColor: palette.common.white,
                      color: palette.cisco.PrimaryMain,
                      border: `1px solid ${palette.cisco.PrimaryMain}`,
                      marginTop: '5px',
                      padding: '20px',
                      borderRadius: '30px',
                      minWidth: buttonSize.width,
                      height: buttonSize.height
                    }}
                    label='Logout'
                    onClick={handleLogout}
                  />
                </Fade>
              )}
            </Popper>
          </ClickAwayListener>
        </Box>
      </Grid>
    </Grid>
  )
}
export default HeaderBar

HeaderBar.propTypes = {
  userName: PropTypes.string
}
