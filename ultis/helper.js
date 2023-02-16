import Vue from 'vue'
export default {
  callApiSusscess(message = 'success') {
    Vue.$toast.success(message)
  },
  callApiErr(message = 'error') {
    Vue.$toast.error(message)
  },
}
