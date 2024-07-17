import React from 'react'
import { styled } from '@mui/material/styles'
import { palette } from '../../styles/palette'
import { Checkbox } from '@mui/material'
import { useApiResponseDataStore, useModalStore } from '../../store/store'
import { useLocation } from 'react-router-dom'

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 15,
  height: 15,
  boxShadow: `0 0 0 1px ${palette.analogousCalypso.calypso100}`,
  backgroundColor: palette.common.white,
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5'
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark'
        ? 'rgba(57,75,89,.5)'
        : 'rgba(206,217,224,.5)'
  }
}))

const StyledCheckbox = (props) => {
  const { apiResponse, isLoading } = useApiResponseDataStore()
  const { openModal } = useModalStore()
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' }
      }}
      disableRipple
      color='default'
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      indeterminateIcon={<BpIndeterminateIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
      disabled={
        (!!isLoading || apiResponse === null) &&
        !openModal &&
        currentPath !== import.meta.env.VITE_BASE_URL2 + 'comparison'
      }
    />
  )
}

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: palette.analogousCalypso.calypso100,
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 15,
    height: 15,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""'
  },
  'input:hover ~ &': {
    backgroundColor: palette.analogousCalypso.calypso90
  }
})
const BpIndeterminateIcon = styled(BpIcon)({
  backgroundColor: palette.analogousCalypso.calypso100,
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 15,
    height: 15,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='4 1 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M19 10H7v-2h10v2z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""'
  },
  'input:hover ~ &': {
    backgroundColor: palette.analogousCalypso.calypso90
  }
})
export default StyledCheckbox
