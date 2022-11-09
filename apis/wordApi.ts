import axios from 'axios'

const wordApi = axios.create({
    baseURL: '/api'
})

export default wordApi