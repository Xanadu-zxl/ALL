import http from './http'

export default {
  getAssets(params, status) {
    return http.get(`/v1/guotou/index1/?addr=${params}&status_quo=${status}`, '')
  },
  getWarning(params) {
    return http.get('/v1/guotou/index2', '', params)
  },
}
