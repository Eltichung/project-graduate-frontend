<template>
    <div class="wrapper bill">
      <div class="box-header">
        <h1 class="title">Product</h1>
      </div>
      <div class="box-content">
        <button class="btn-add" role="button" @click="editProduct({})">Add</button>
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Image</th>
            <th>Discount</th>
            <th></th>
          </tr>
          <tr v-for="item in dataProduct" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item?.type?.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.imgUrl }}</td>
            <td>{{ item.discount }}</td>
            <td class="btn-edit">
              <button class="btn-update" @click="editProduct(item)">Update</button>
              <button @click="deleteItem(item.slug)">Delete</button>
            </td>
          </tr>
        </table>
      </div>
      <AddProduct  :productSelected="productSelected"/>
    </div>
  </template>
  <script>
  // eslint-disable-next-line no-unused-vars
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        productSelected:{},
        dataProduct : []
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
      },
      showProduct(id){
          this.$modal.show('detailOrder')
          this.getDetailBill(id).then((data) => {
              this.productOrder.arr = data.data.data
              this.productOrder.total=data.data.total
              this.productOrder.idBill=data.data.id_bill
          })
      },
      deleteItem(slug){
          this.deleteProduct(slug).then((data) => {
           this.loadData()
          })
      },
      editProduct(item){
        this.$modal.show('form-product')
        this.productSelected = item
      }
    },
  }
  </script>
  <style scoped>
  .active {
      opacity: 1 !important;
  }
  .title
  {
      opacity: 1;
      cursor: pointer;
  }
  td:last-child
  {
    width: 300px;
  }
  th:last-child
  {
    width: 300px;
  }
  </style>
  