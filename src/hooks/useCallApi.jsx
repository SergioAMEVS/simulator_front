import axios from 'axios'
import { useState } from 'react'

const useApi = (endpoint, params) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const url = `${import.meta.env.VITE_API_URL}/${endpoint}`

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const sessionToken = localStorage.getItem('sessionToken')
      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      })
      setData(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  // useEffect(() => {
  //   fetchData()
  // }, [url, params])

  const post = async (body) => {
    setIsLoading(true)
    try {
      const sessionToken = localStorage.getItem('sessionToken')
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      })

      return response.data
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const put = async (id, body) => {
    try {
      const sessionToken = localStorage.getItem('sessionToken')
      const response = await axios.put(`${url}/${id}`, body, {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const del = async (id) => {
    try {
      const sessionToken = localStorage.getItem('sessionToken')
      const response = await axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return { data, error, isLoading, post, put, del, fetchData }
}

export default useApi
