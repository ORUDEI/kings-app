import axios from 'axios'

interface FormData {
  name: string
  comment: string
}

const getData = async () => {
  try {
    const response = await axios.get(
      'https://kings-back.onrender.com/api/comments'
    )
    const data = response.data
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const sendData = async (formData: FormData) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/comments/',
      formData
    )
    return response.data
  } catch (error) {
    return error
  }
}

export { getData, sendData }
