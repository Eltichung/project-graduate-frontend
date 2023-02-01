<template>
  <div class="wrapper">
    <div class="header box between-xs middle-xs">
      <div class="header-text">
        <h1>Pokecho Restaurant</h1>
        <p>au 12th 2020</p>
      </div>
      <div class="header-search">
        <img src="/img/loupe.png" alt="" />
        <input v-model="nameProduct" type="text" />
      </div>
    </div>
    <div class="catergory content">
      <div
        v-for="item in type"
        :key="item.id"
        class="catergory-item middle-xs center-xs"
        @click="filterProduct(item.id)"
      >
        <img src="/img/loupe.png" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="product content">
      <div
        v-for="(item, index) in products"
        :key="item.id"
        class="product-item"
      >
        <img src="/img/anh.jpg" alt="" />
        <h3 class="product-item-name">{{ item.name }}</h3>
        <div class="product-item-price">
          <h3 class="red">$ {{ item.price }}</h3>
          <button ref="btnAdd" @click="addProduct(item, index)">
            <img src="/img/plus.png" alt="" />
          </button>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="order-header">
        <div class="order-header-text">
          <h2>Order</h2>
          <select v-model="location" name="">
            <option v-for="item in 20" :key="item" :value="item">{{
              item
            }}</option>
          </select>
        </div>
      </div>
      <div class="order-product">
        <div
          v-for="(item, index) in productsOrders"
          :key="item.id"
          class="order-product-item"
        >
          <div class="product-img">
            <img src="" alt="" />
          </div>
          <div class="product-infor">
            <h2 class="product-infor-text">{{ item.name }}</h2>
            <div class="product-infor-count">
              <div
                class="product-infor-count-btn"
                @click="increase(item, index)"
              >
                <img src="/img/plus.png" alt="" />
              </div>
              <div class="product-infor-count-input">
                <input ref="count" type="text" :value="item.count" />
              </div>
              <div
                class="product-infor-count-btn"
                @click="decrease(item, index)"
              >
                <img src="/img/minus.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="order-total">
        <div class="order-total-item">
          <p class="gray">Sub Total</p>
          <p>${{ subTotal }}</p>
        </div>
        <div class="order-total-item">
          <p class="gray">Discount</p>
          <p>${{ discount }}</p>
        </div>
        <div class="order-total-item">
          <p class="gray">Sub Total</p>
          <p>${{ subTotal }}</p>
        </div>
        <button @click="orderBill">
          <img src="" alt="" />
          <p>Print Bill</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapActions } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {
      type: [],
      products: [],
      productsOrders: [],
      checkAdd: false,
      nameProduct: '',
      total: 0,
      subTotal: 0,
      discount: 0,
      location: 1,
    }
  },
  watch: {
    nameProduct(newValue) {
      if (newValue !== '') {
        this.searchProduct(newValue).then(
          (data) => (this.products = data.data.data)
        )
      } else this.getDataProduct()
    },
  },
  created() {
    this.getDataType()
    this.getDataProduct()
  },
  methods: {
    ...mapActions({
      getType: 'home/getType',
      getProduct: 'home/getProduct',
      createProduct: 'home/createProduct',
      searchProduct: 'home/searchProduct',
      filterProductByType: 'home/filterProductByType',
    }),
    getDataType() {
      this.getType().then((data) => (this.type = data.data.data))
    },
    getDataProduct() {
      this.getProduct().then((data) => (this.products = data.data.data))
    },
    filterProduct(id) {
      this.filterProductByType(id).then(
        (data) => (this.products = data.data.data)
      )
    },
    addProduct(item, index) {
      const indexItem = this.productsOrders.findIndex(
        (element) => element.count === item.count
      )
      if (!indexItem) {
        this.productsOrders[indexItem].count++
      } else {
        item.count = 1
        this.productsOrders.push(item)
        this.$refs.btnAdd[index].classList.add('disabled')
        this.$refs.btnAdd[index].disabled = true
      }
      this.setSubTotal()
    },
    increase(item, index) {
      item.count++
      this.$refs.count[index].value = item.count
      this.setSubTotal()
    },
    decrease(item, index) {
      if (item.count === 1) this.productsOrders.splice(index, 1)
      item.count--
      this.$refs.count[index].value = item.count
      this.setSubTotal()
    },
    setSubTotal() {
      this.subTotal = this.productsOrders.reduce(
        (total, item) => (total += item.count * item.price),
        0
      )
    },
    setTotal() {
      this.total = (this.subTotal * (100 - this.discount)) / 100
    },
    orderBill() {
      // eslint-disable-next-line prefer-const
      let arrProduct = []
      this.productsOrders.forEach((item) => {
        // eslint-disable-next-line prefer-const
        let temp = {
          id_product: item.id,
          name: item.name,
          quantity: item.count,
          price: item.price,
        }
        arrProduct.push(temp)
      })
      const data = {
        total: this.total,
        status: 1,
        location: this.location,
        method: 1,
        arr_product: arrProduct,
      }
      this.createProduct(data).then((data) => {
        this.$refs.btnAdd.forEach((item) => {
          item.classList.remove('disabled')
          item.disabled = false
        })
        this.productsOrders = []
        this.total = 0
        this.subTotal = 0
        this.discount = 0
      })
    },
  },
}
</script>

<style>
.disabled {
  background-color: gray !important;
}
</style>
