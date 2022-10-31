import axios from 'axios'

const wordApi = axios.create({
    baseURL: 'http://localhost:3000/api'
})

export default wordApi