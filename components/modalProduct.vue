<template>
  <modal name="detailOrder" :adaptive="true">
    <div class="modal">
      <div class="box-content modal">
      <table>
        <h1>Bill:{{ productOrder.idBill }}</h1>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
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
        <button @click="close" id="btn-close">Close</button>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  props: ['productOrder'],
  methods: {
    close() {
      this.$modal.hide('detailOrder')
    }
  }
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
.btn 
{
  padding-bottom: 30px;
}
</style>