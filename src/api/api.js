import http from './http'

export default {
  getAssets(params, status) {
    return http.get(`/v1/guotou/index1/?addr=${params}&status_quo=${status}`, '')
  },
  getWarning(params, status) {
    return http.get(`/v1/guotou/index2/?addr=${params}&status_quo=${status}`, '')
  },
  getPaging(page, limit, status) {
    return http.get(`/v1/guotou/paging/?page=${page}&limit=${limit}&status_quo=${status}`, '')
  },
}
