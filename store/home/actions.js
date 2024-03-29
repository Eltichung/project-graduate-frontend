import api from '~/ultis/api'
import helper from '~/ultis/helper'
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
          helper.callApiErr()
        })
    })
  },
  deleteType({ commit }, slug) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`${api.API_DELETE_TYPE}/${slug}`)
        .then((response) => {
          resolve(response)
          helper.callApiSusscess()
        })
        .catch((error) => {
          reject(error)
          console.log(error)
          helper.callApiErr("You can't delete type because product exit belong it")
        })
    })
  },
  addType({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${api.API_ADD_TYPE}`, data)
        .then((response) => {
          resolve(response)
          helper.callApiSusscess()
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
        })
    })
  },
  updateType({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${api.API_UPDATE_TYPE}`, data)
        .then((response) => {
          resolve(response)
          helper.callApiSusscess()
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
        })
    })
  },
  // product
  getProduct({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(api.API_GET_PRODUCT)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
        })
    })
  },
  getAllProduct({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(api.API_GET_ALL_PRODUCT)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
        })
    })
  },
  searchProduct({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_SEARCH_PRODUCT}/${data}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
        })
    })
  },
  filterProductByType({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_FILTER_PRODUCT_BY_TYPE}/${data}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
        })
    })
  },
  deleteProduct({ commit }, slug) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`${api.API_DELETE_PRODUCT}/${slug}`)
        .then((response) => {
          resolve(response)
          helper.callApiSusscess()
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr(error.message)
        })
    })
  },
  updateProduct({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${api.API_UPDATE_PRODUCT}`, data)
        .then((response) => {
          resolve(response)
          helper.callApiSusscess()
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
        })
    })
  },
  addProduct({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${api.API_ADD_PRODUCT}`, data)
        .then((response) => {
          resolve(response)
          helper.callApiSusscess()
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
        })
    })
  },
  // bill
  createBill({ state, commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(api.API_CREATE_BILL, data)
        .then((response) => {
          if (state.isAdmin === 0) {
            this.$axios
              .get(api.API_NOTI)
              .then((response) => {
                resolve(response)
              })
              .catch((error) => {
                reject(error)
                helper.callApiErr('noti fails')
              })
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
        })
    })
  },
  getBill({ commit }, status) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_GET_BILL}/status=${status}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
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
          helper.callApiErr()
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
          helper.callApiErr()
        })
    })
  },
  getBillByMethod({ commit }, method) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_GET_BILL_BY_METHOD}/method=${method}`)
        .then((response) => {
          resolve(response)
          // commit('GET_BILL_BY_METHOD', response.data.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateStatusBill({ commit }, param) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(api.API_UPDATE_STATUS_BILL, param)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
