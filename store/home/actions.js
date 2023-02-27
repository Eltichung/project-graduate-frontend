import api from '~/ultis/api'
import  helper  from '~/ultis/helper'
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
  deleteType({ commit },slug) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`${api.API_DELETE_TYPE}/${slug}`)
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
  addType({ commit },data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`${api.API_ADD_TYPE}`, data)
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
  updateType({ commit },data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${api.API_UPDATE_TYPE}`,data)
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
           helper.callApiSusscess()
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
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
          helper.callApiErr()
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
          helper.callApiErr()
        })
    })
  },
  deleteProduct({ commit },slug) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`${api.API_DELETE_PRODUCT}/${slug}`)
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
  updateProduct({ commit },data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${api.API_UPDATE_PRODUCT}`,data)
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
  addProduct({ commit },data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${api.API_ADD_PRODUCT}`,data)
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
  createBill({ commit },data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(api.API_CREATE_BILL,data)
        .then((response) => {
          this.$axios
          .get(api.API_NOTI)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
            helper.callApiErr('noti fails')
          })
          
          resolve(response)
           helper.callApiSusscess()
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
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
           helper.callApiSusscess()
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
           helper.callApiSusscess()
        })
        .catch((error) => {
          reject(error)
          helper.callApiErr()
        })
    })
  },
}
