import axios from 'axios'

export default axios.create({
    baseURL : 'https://noconnection-mysql.herokuapp.com/'
})