import api from '~/ultis/api'
import  helper  from '~/ultis/helper'
export default {
  loginUser({ commit }, account) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(api.API_LOGIN,account)
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
