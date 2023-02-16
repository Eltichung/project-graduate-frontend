import api from '~/ultis/api'
import  helper  from '~/ultis/helper'
export default {
  statToday({ commit }, date) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_STAT_TODAY}/${date}`)
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
  statByDate({ commit }, date) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_STAT_BY_DATE}/startTime=${date.startTime}&&endTime=${date.endTime}`)
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
