<!-- eslint-disable prefer-const -->
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
        id="hot-deal"
        class="catergory-item middle-xs center-xs"
        :class="{ active_type: currentType == -1 }"
        @click="getDataProduct()"
      >
        <img src="/img/hot-deal.png" alt="" />
      </div>
      <div
        v-for="item in type"
        :key="item.id"
        class="catergory-item middle-xs center-xs"
        :class="{ active_type: currentType == item.id }"
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
        <img :src="item.imgUrl" alt="" />
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
            <img :src="item.imgUrl" alt="" />
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
                <p>{{ item.quantity }}</p>
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
          <p>${{ setSubTotal }}</p>
        </div>
        <div class="order-total-item">
          <p class="gray">Discount</p>
          <p>${{ discount }}</p>
        </div>
        <div class="order-total-item">
          <p class="gray">Total</p>
          <p>${{ setTotal }}</p>
        </div>
        <button @click="orderBill">
          <img src="" alt="" />
          <p>Print Bill</p>
        </button>
      </div>
    </div>
    <InforCustomer :dataBill="dataBill" @clearCart="clearCart" />
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapActions } from 'vuex'
import  pusher  from '~/service/pusher'
import constant from '~/ultis/constant'
export default {
  name: 'IndexPage',
  middleware: 'check-auth',
  data() {
    return {
      isShow: false,
      type: [],
      products: [],
      productsOrders: [],
      checkAdd: false,
      nameProduct: '',
      total: 0,
      subTotal: 0,
      discount: 0,
      currentType: -1,
      location: 0,
      inforCustommer: { name: '', phone: '', address: '' },
      dataBill: {},
    }
  },
  computed: {
    ...mapState('home', ['isAdmin']),
    setTotal() {
      // eslint-disable-next-line no-return-assign, vue/no-side-effects-in-computed-properties
      this.total = (this.setSubTotal * (100 - this.discount)) / 100
      return this.total
    },
    setSubTotal() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.subTotal = this.productsOrders.reduce(
        (total, item) => (total += item.quantity * item.price),
        0
      )
      return this.subTotal
    },
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
  mounted() {
    pusher.noti()
  },
  methods: {
    ...mapActions({
      getType: 'home/getType',
      getProduct: 'home/getProduct',
      createBill: 'home/createBill',
      searchProduct: 'home/searchProduct',
      filterProductByType: 'home/filterProductByType',
    }),
    getDataType() {
      this.getType().then((data) => (this.type = data.data.data))
    },
    getDataProduct() {
      this.getProduct().then((data) => {
        this.products = data.data.data
        this.currentType = -1
      })
    },
    filterProduct(id) {
      this.filterProductByType(id).then((data) => {
        this.products = data.data.data
        this.currentType = id
      })
    },
    addProduct(item, index) {
      // eslint-disable-next-line no-unused-vars
      const issetProduct = this.productsOrders.find((product) => {
        // eslint-disable-next-line eqeqeq
        return item.id == product.id
      })
      if (issetProduct) item.quantity++
      else {
        item.quantity = 1
        this.productsOrders.push(item)
      }
    },
    increase(item, index) {
      this.productsOrders[index].quantity++
    },
    decrease(item, index) {
      if (item.quantity === 1) this.productsOrders.splice(index, 1)
      else item.quantity--
    },
    dataCustommer(data) {
      this.inforCustommer = data
    },
    clearCart() {
      this.productsOrders = []
      this.total = 0
      this.subTotal = 0
      this.discount = 0
    },
    orderBill() {
      // eslint-disable-next-line prefer-const
      let arrProduct = []
      this.productsOrders.forEach((item) => {
        const temp = {
          id_product: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }
        arrProduct.push(temp)
      })
      // eslint-disable-next-line prefer-const
      let bill = {
        total: this.total,
        location: this.location,
        arr_product: arrProduct,
      }
      // eslint-disable-next-line eqeqeq
      if (this.isAdmin == 0) {
        this.$modal.show('form-customer')
        this.dataBill = bill
      } else {
        // eslint-disable-next-line no-unused-expressions
        bill.status = constant.STATUS_BILL.success
        bill.method = constant.METHOD.offline
        this.createBill(bill).then((data) => {
          this.clearCart()
        })
      }
    },
  },
}
</script>

<style scoped>
.disabled {
  background-color: gray !important;
}
.catergory-item {
  opacity: 0.8;
}
.active_type {
  border: 2px solid #2192ff;
  opacity: 1 !important;
}
#hot-deal {
  opacity: 0.5;
}
#hot-deal.active_type {
  opacity: 1 !important;
  border: 0 !important;
}
</style>
