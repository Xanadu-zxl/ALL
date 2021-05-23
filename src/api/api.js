import http from './http'

export default {
  getAssets(params) {
    return http.get('/v1/guotou/index1', '', params)
  },
  getWarning(params) {
    return http.get('/v1/guotou/index2', '', params)
  },
}
