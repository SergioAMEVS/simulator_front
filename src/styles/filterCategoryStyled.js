import { palette } from '../styles/palette'

export const mainDivStyle = {
  width: '90%',
  fontFamily: 'lato',
  borderBottom: `2px solid ${palette.gray.gray60}`,
  padding: '0px 0px 10px 0px'
}

export const mainDivStyleComparison = {
  fontFamily: 'lato',
  borderBottom: `2px solid ${palette.gray.gray60}`,
  padding: '0px 0px 10px 0px'
}
export const filterTitleStyle = {
  '.MuiButtonBase-root': {
    padding: '0 0 0 6px'
  },
  '.filterTitle .MuiTypography-root': {
    fontSize: '16px',
    fontWeight: 800,
    fontFamily: 'lato'
  }
}
export const filterItems = {
  display: 'grid',
  marginTop: '5px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
  '.childrenLabel .MuiTypography-root': {
    fontFamily: 'lato',
    fontSize: '14px',
    fontWeight: 400
  }
}

export const formControlStyle = {
  m: 1,
  width: 500,
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: `${palette.analogousCalypso.calypso100}`
  },
  '& .MuiInputLabel-outlined': {
    color: `${palette.analogousCalypso.calypso100}`
  }
}

export const formControlStyleComparison = {
  width: '450px',
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: `${palette.analogousCalypso.calypso100}`
  },
  '& .MuiInputLabel-outlined': {
    color: `${palette.analogousCalypso.calypso100}`
  }
}
export const formControlStyleMedia = {
  m: 1,
  width: 450,
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: `${palette.analogousCalypso.calypso100}`
  },
  '& .MuiInputLabel-outlined': {
    color: `${palette.analogousCalypso.calypso100}`
  }
}
