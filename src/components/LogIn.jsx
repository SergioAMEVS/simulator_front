import React from 'react'
import CiscoLogo from '../assets/ciscoLogo.svg'
import background from '../assets/Background.jpg'

const Login = () => {
  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_SAML_ENTRY_POINT
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const subcontainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh',
    width: '15vw',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '16px'
  }

  const buttonStyle = {
    backgroundColor: 'rgb(1, 130, 151)',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '34px 2px',
    cursor: 'pointer',
    borderRadius: '24px'
  }

  return (
    <div style={containerStyle}>
      <div style={subcontainerStyle}>
        <img width='150px' src={CiscoLogo} alt='cisco' />

        <button style={buttonStyle} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
