import Vue from 'vue'
import moment from 'moment'
export default {
  callApiSusscess(message = 'success') {
    Vue.$toast.success(message)
  },
  callApiErr(message = 'error') {
    Vue.$toast.error(message)
  },
  formatCost(cost) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })

    return formatter.format(cost)
  },
  convertDate: (time, type = 'YYYY-DD-MM HH:mm:ss') => {
    return moment(time).format(type)
  },
}
