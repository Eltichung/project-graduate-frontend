<template>
  <div class="wrapper bill">
    <div class="box-header">
      <h1 class="title">Sản Phẩm</h1>
    </div>
    <div class="box-content">
      <button class="btn-add" role="button" @click="editProduct({})">
        Thêm
      </button>
      <table>
        <tr>
          <th>Id</th>
          <th>Tên SP</th>
          <th>Loại</th>
          <th>Giá tiền</th>
          <th>Ảnh</th>
          <th>Giảm giá</th>
          <th></th>
        </tr>
        <tr v-for="item in dataProduct" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item?.type?.name }}</td>
          <td>{{ item.price }}</td>
          <td><img :src="item.imgUrl" alt="" /></td>
          <td>{{ item.discount }}</td>
          <td class="btn-edit">
            <button class="btn-update" @click="editProduct(item)">
              Sửa
            </button>
            <button @click="confirm(item.slug)">Xóa</button>
          </td>
        </tr>
      </table>
    </div>
    <AddProduct :productSelected="productSelected" @loadData="loadData" />
    <PopupConfirm :deleteItem="deleteItem" @loadData="loadData"/>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { mapActions } from 'vuex'
export default {
  middleware: 'check-auth',
  data() {
    return {
      slugProductDelete: null,
      productSelected: {},
      dataProduct: [],
    }
  },
  created() {
    this.loadData()
    this.$modal.show('form-product')
  },
  methods: {
    ...mapActions('home', ['getAllProduct', 'deleteProduct']),
    loadData() {
      this.getAllProduct().then((data) => (this.dataProduct = data.data.data))
      this.$modal.hide('form-product')
    },
    confirm(slug) {
      this.$modal.show('confirm')
      this.slugProductDelete = slug
    },
    showProduct(id) {
      this.$modal.show('detailOrder')
      this.getDetailBill(id).then((data) => {
        this.productOrder.arr = data.data.data
        this.productOrder.total = data.data.total
        this.productOrder.idBill = data.data.id_bill
      })
    },
    deleteItem() {
      this.deleteProduct(this.slugProductDelete).then((data) => {
        this.$modal.hide('confirm')
        this.loadData()
      })
      .finally(()=>{
        this.$modal.hide('confirm')
      })
    },
    editProduct(item) {
      this.$modal.show('form-product')
      this.productSelected = item
    },
  },
}
</script>
<style scoped>
.active {
  opacity: 1 !important;
}
.title {
  opacity: 1;
  cursor: pointer;
}
td:last-child {
  width: 300px;
}
th:last-child {
  width: 300px;
}
td,th
{
  max-width: 150px;
  word-wrap: break-word;
}
td img {
  width: 150px;
  object-fit: cover;
  height: 150px;
}
.img-fluid {
  position: relative !important;
}
</style>
