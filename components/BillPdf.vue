<template>
  <div ref="document" class="pdf">
    <div class="box-content">
      <h2 class="pdf-center">Eltic Restaurants</h2>
      <h3 class="pdf-center">Hóa đơn thanh toán</h3>
      <p class="pdf-center">---------------------------------</p>
      <p>Tên khách hàng: {{ infoCustomer?.name }}</p>
      <p>SDT: {{ infoCustomer?.phone }}</p>
      <p>Địa chỉ: {{ infoCustomer?.address }}</p>
      <p>Thời gian: {{ infoCustomer?.address }}</p>
      <p class="pdf-center">---------------------------------</p>
      <p>Thông tin đơn hàng</p>
      <p v-if="discount != null">Giảm giá: {{ discount }} %</p>
      <i>{{ dataBill?.method != null ? 'Online' : 'Tại quán' }} </i>
      <table class="table-pdf">
        <tr>
          <th style="text-align: start">Tên Sản Phẩm</th>
          <th>Số Lượng</th>
          <th style="text-align: start">Giá Tiền</th>
        </tr>
        <tr v-for="item in productOrder" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ formatNumber(item.price) }}</td>
        </tr>
        <br />
        <h1 id="total1">
          Tổng : <span> {{ formatNumber(totalBill) }}</span>
          <span class="line gray" v-if="discount">
            {{ subTotal && formatNumber(subTotal) }}</span
          >
        </h1>
      </table>
    </div>
    <div class="fix"></div>
  </div>
</template>
<script>
import helpers from '~/ultis/helper'
export default {
  layout: 'none',
  props: [
    'productOrder',
    'totalBill',
    'infoCustomer',
    'discount',
    'subTotal',
    'dataBill',
  ],
  methods: {
    formatNumber(number) {
      return helpers.formatCost(number)
    },
    formatDate(time) {
      return helpers.convertDate(time)
    },
  },
}
</script>
<style>
.fix {
  width: 120px;
  height: 100vh;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 33333333;
}
.pdf {
  color: #000 !important;
  background: #fff;
}
.pdf .box-content {
  margin: 0 auto;
  width: 300px;
}
.table-pdf th {
  padding-right: 10px;
}
.table-pdf tr td {
  padding: 5px 0;
  border-bottom: 1px solid #000;
}
.pdf-center {
  text-align: center;
}

#total1 {
  text-align: left;
  width: 100%;
  white-space: nowrap;
}
</style>
