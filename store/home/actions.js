import api from '~/ultis/api'
export default {
  getType({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(api.API_GET_TYPE)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getProduct({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(api.API_GET_PRODUCT)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  createBill({ commit },data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(api.API_CREATE_BILL,data)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  searchProduct({ commit },data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_SEARCH_PRODUCT}/${data}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  filterProductByType({ commit },data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_FILTER_PRODUCT_BY_TYPE}/${data}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getBill({ commit },status) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_GET_BILL}/status=${status}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getDetailBill({ commit }, idBill) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_GET_DETAIL_BILL}/id_bill=${idBill}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getBillByStatus({ commit }, status) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_GET_BILL_BY_STATUS}/status=${status}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
