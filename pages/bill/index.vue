<template>
  <div class="wrapper bill">
    <div class="box-header">
      <h1 class="title" :class="{active:currentTab === 1}" @click="loadData(1)" >Waiting</h1>
      <h1 class="title" :class="{active:currentTab === 2}" @click="loadData(2)" >Successful</h1>
      <h1 class="title" :class="{active:currentTab === 3}" @click="loadData(3)" >Cancel</h1>
    </div>
    <div class="box-content">
      <table>
        <tr>
          <th>Id</th>
          <th>Total</th>
          <th>Date</th>
          <th></th>
          <th v-if="currentTab === 1">Handle</th>
        </tr>
        <tr v-for="item in dataBill" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.total }}</td>
          <td>{{ convertDate(item.created_at) }}</td>
          <td>
            <button @click="showProduct(item.id)">Product</button>
          </td>
          <td class="btn-bill" v-if="currentTab === 1">
            <img src="/img/checked1.png" alt="" @click="confirmBill(item.id)">
            <img src="/img/cancel.png" alt="" @click="cancelBill(item.id)">
          </td>
        </tr>
      </table>
    </div>
    <modalProduct :productOrder="productOrder" v-show="true"/>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { mapActions } from 'vuex'
import moment from 'moment' 
import constant from '~/ultis/constant'
export default {
  data() {
    return {
      dataBill: [],
      showModal: true,
      productOrder: {
        total:0,
        arr:[],
        idBill : 0,
      },
      isActive: true,
      currentTab: 1,
      confirm: 0,
      success: 0,
      cancel: 0,
    }
  },
  created() {
    this.confirm = constant.STATUS_BILL.confirm
    this.success = constant.STATUS_BILL.success
    this.cancel = constant.STATUS_BILL.cancel
    this.loadData(1)
    this.$modal.show('detailOrder')
  },
  methods: {
    ...mapActions('home', ['getBill','getDetailBill','getBillByStatus', 'updateStatusBill']),
    loadData(status) {
        this.currentTab = status
      this.getBill(status).then((data) => (this.dataBill = data.data.data))
    },
    convertDate: (time,type='YYYY-DD-MM HH:mm:ss') =>
    {
      return moment(time).format(type);
    },
    showProduct(id){
        this.$modal.show('detailOrder')
        this.getDetailBill(id).then((data) => {
            this.productOrder.arr = data.data.data
            this.productOrder.total=data.data.total
            this.productOrder.idBill=data.data.id_bill
        })
    },
    confirmBill(id)
    {
      const param = {
        id: id,
        status: constant.STATUS_BILL.success
      }
      console.log(param)
      this.updateStatusBill(param)
      .then(data => this.loadData(1))
    },
    cancelBill(id)
    {
      const param = {
        id: id,
        status: constant.STATUS_BILL.cancel
      }
      this.updateStatusBill(param)
      .then(data => this.loadData(1))
    }
  },
}
</script>
<style>
.active {
    opacity: 1 !important;
}
.title
{
    opacity: 0.4;
    cursor: pointer;
}
.btn-bill
{
  display: flex;
  gap: 15px;
  justify-content: center;
}
.btn-bill img
{
  width: 35px;
  object-fit: cover;
  height: 35px;
  cursor: pointer;
}
</style>
