import Vue from 'vue'
import moment from 'moment'
export default {
  callApiSusscess(message = 'Thành công') {
    Vue.$toast.success(message)
  },
  callApiErr(message = 'Thất bại') {
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
