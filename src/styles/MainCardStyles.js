import { palette } from './palette'

export const mainCardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '40px',
  backgroundColor: palette.common.white,
  width: '100%',
  height: '759px',
  flexShrink: 0,
  marginTop: '100px',
  flexDirection: 'column'
}

export const filterCardStyle = {
  borderRadius: '25px 0px 0px 25px',
  backgroundColor: palette.common.white,
  zIndex: 1,
  flexShrink: 0,
  boxShadow: '2px 2px 15px 0px rgba(0, 0, 0, 0.25)'
}

export const filterCardStyleMedia = {
  borderRadius: '25px 0px 0px 25px',
  backgroundColor: palette.common.white,
  zIndex: 1,
  flexShrink: 0,
  boxShadow: '2px 2px 15px 0px rgba(0, 0, 0, 0.25)',
  width: '550px'
}
