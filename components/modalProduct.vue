<template>
  <modal name="detailOrder" :adaptive="true">
    <div class="modal">
      <div class="box-content modal">
        <table>
          <h1>Hóa Đơn:{{ productOrder.idBill }}</h1>
          <h3 class="gray">Tên KH: {{ infoCustomer.name }}</h3>
          <h3 class="gray">SDT: {{ infoCustomer.phone }}</h3>
          <h3 class="gray">Địa chỉ: {{ infoCustomer.address }}</h3>
          <h3 class="gray">Thời gian: {{ formatDate(infoCustomer.created_at) }}</h3>
          <tr>
            <th>Tên SP</th>
            <th>Số Lượng</th>
            <th>Giá Tiền</th>
          </tr>
          <tr v-for="item in productOrder.arr" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
          </tr>
          <h1 id="total">Total : {{ productOrder.total }}</h1>
        </table>
      </div>
      <div class="btn between-xs">
        <button @click="close" id="btn-close">Đóng</button>
      </div>
    </div>
  </modal>
</template>
<script>
import helpers from '~/ultis/helper'
export default {
  props: ['productOrder', 'infoCustomer'],
  methods: {
    close() {
      this.$modal.hide('detailOrder')
    },
    formatDate(time) {
      return helpers.convertDate(time)
    },
  },
}
</script>
<style scoped>
#btn-close {
  padding: 8px 30px;
  display: flex;
  margin: 0 auto;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #f05755;
  color: white;
  cursor: pointer;
}
.btn {
  padding-bottom: 30px;
}
</style>
