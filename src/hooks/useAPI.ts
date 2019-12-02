import axios from 'axios'
import { GAME_FIXTURE } from 'fixtures'

const BASE_PATH = '/api'

export default () => {
  const url = `${BASE_PATH}`

  return {
    get(path: string, params?: object) {
      return axios.get(`${url}${path}`, { params }).then(({ data }) => data)
    },

    post(path, data?: object) {
      return axios.post(`${url}${path}`, { data }).then(({ data }) => data)
    }
  }
}
