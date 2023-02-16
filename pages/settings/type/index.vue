<template>
  <div class="wrapper bill">
    <div class="box-header">
      <h1 class="title"></h1>
    </div>
    <div class="box-content">
      <button class="btn-add" role="button" @click="editProduct({})">
        Add
      </button>
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Image</th>
          <th></th>
        </tr>
        <tr v-for="item in type" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.imgUrl }}</td>
          <td class="btn-edit">
            <button class="btn-update" @click="editProduct(item)">
              Update
            </button>
            <button @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </table>
    </div>
    <AddProduct :productSelected="productSelected" />
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { mapActions } from 'vuex'
export default {
  middleware: 'check-auth',
  data() {
    return {
      productSelected: {},
      type: [],
    }
  },
  created() {
    this.loadData()
    this.$modal.show('form-product')
  },
  methods: {
    ...mapActions('home', ['getType']),
    loadData() {
      this.getType().then((data) => (this.type = data.data.data))
    },
    deleteItem(id) {
      this.deleteProduct(id).then((data) => {
        this.loadData()
      })
    },
    editProduct(item) {
      this.$modal.show('form-type')
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
  opacity: 0.4;
  cursor: pointer;
}
td:last-child {
  width: 300px;
}
th:last-child {
  width: 300px;
}
</style>
