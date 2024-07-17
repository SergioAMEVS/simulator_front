import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// import queryString from 'query-string'

const Callback = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const userData = JSON.parse(decodeURIComponent(queryParams.get('userData')))

    localStorage.setItem('sessionToken', userData.token)
    localStorage.setItem('userName', userData.user.nameID)

    navigate(import.meta.env.VITE_BASE_URL2 + 'home')
  }, [location.search, navigate])

  return <div>Processing...</div>
}

export default Callback
