<template>
  <div class="wrapper bill">
    <div class="box-header">
      <h1 class="title">Type</h1>
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
          <td><img :src="item.imgUrl" alt=""></td>
          <td class="btn-edit">
            <button class="btn-update" @click="editProduct(item)">
              Update
            </button>
            <button @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </table>
    </div>
    <AddType :productSelected="productSelected" @loadData = 'loadData'/>
    <PopupConfirm />
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { mapActions } from 'vuex'
import PopupConfirm from '~/components/PopupConfirm.vue'
export default {
  middleware: "check-auth",
  data() {
    return {
      idProductDelete: null,
      productSelected: {},
      type: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    ...mapActions("home", ["getType", 'deleteType']),
    confirm(id) {
      this.idProductDelete = id
    },
    loadData() {
      this.$modal.hide("form-type");
      this.getType().then((data) => (this.type = data.data.data));
    },
    deleteItem(id) {
      this.deleteType(id).then((data) => {
        this.loadData()
      });
    },
    editProduct(item) {
      this.productSelected = item;
      this.$modal.show("form-type");
    },
  },
  components: { PopupConfirm }
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

td img {
  width: 50px;
  object-fit: cover;
  height: 50px;
}
</style>
