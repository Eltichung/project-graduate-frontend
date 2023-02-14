import api from '~/ultis/api'
export default {
  statToday({ commit }, date) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_STAT_TODAY}/${date}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  statByDate({ commit }, date) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${api.API_STAT_BY_DATE}/startTime=${date.startTime}&&endTime=${date.endTime}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
