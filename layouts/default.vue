<template>
  <div>
    <nav class="nav">
      <div class="nav-logo middle-xs">
        <img src="/img/logo.png" alt="" />
        <h3>Eltic</h3>
      </div>
      <ul class="nav-menu">
        <li class="center-xs">
          <nuxt-link to="/">
            <div class="nav-menu-img">
              <img src="/img/home.png" alt="" />
            </div>
            <p>Trang chủ</p>
          </nuxt-link>
        </li>
        <li v-if="!!isAdmin" class="center-xs" @click="handler">
          <nuxt-link to="/bill">
            <div class="nav-menu-img">
              <img src="/img/bill.png" alt="" />
            </div>
            <p>Đơn Hàng</p>
            <p id="noti"></p>
          </nuxt-link>
        </li>
        <li v-if="!!isAdmin" class="center-xs">
          <nuxt-link to="/stat">
            <div class="nav-menu-img">
              <img src="/img/stat.png" alt="" />
            </div>
            <p>Thống kê</p>
          </nuxt-link>
        </li>
        <li v-if="!!isAdmin" class="center-xs">
          <nuxt-link to="/settings/product">
            <div class="nav-menu-img">
              <img src="/img/product.png" alt="" />
            </div>
            <p>Sản Phẩm</p>
          </nuxt-link>
        </li>
        <li v-if="!!isAdmin" class="center-xs">
          <nuxt-link to="/settings/type">
            <div class="nav-menu-img">
              <img src="/img/type.png" alt="" />
            </div>
            <p>Loại SP</p>
          </nuxt-link>
        </li>
        <li v-if="!isAdmin" class="center-xs">
          <nuxt-link to="/login">
            <div class="nav-menu-img">
              <img src="/img/user.png" alt="" />
            </div>
            <p>Admin</p>
          </nuxt-link>
        </li>
        <li v-else class="center-xs">
          <nuxt-link to="#">
            <div class="nav-menu-img" @click="logout">
              <img src="/img/user.png" alt="" />
            </div>
            <p>Khách hàng</p>
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <Nuxt />
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import Pusher from 'pusher-js'
// eslint-disable-next-line no-unused-vars
import helpers from '~/ultis/helper'
// import constant from '~/ultis/constant'
export default {
  middleware: 'check-auth',
  data() {
    return {
      isShow: false,
      count: 0,
      isMenu: true,
    }
  },
  watch: {
    count(newValue) {
      this.SET_COUNT_BILL(newValue)
    },
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapState('home', ['isAdmin', 'billOnline']),
  },
  methods: {
    ...mapMutations('home', ['SET_COUNT_BILL']),
    ...mapActions('home', ['getBillByMethod']),
    logout() {
      this.$router.push('/')
      this.$axios.setHeader('Authorization', undefined)
      localStorage.removeItem('token')
    },
    handler() {
      const tagP = document.querySelector('#noti')
      if (tagP !== null) {

        tagP.style.display = 'none'
      }
    },
  },
  // eslint-disable-next-line vue/order-in-components
  mounted() {
    const checkAdmin = this.isAdmin
    const tagP = document.querySelector('#noti')
    if (tagP !== null) {
      tagP.style.display = 'none'
    }
    if (checkAdmin === 1) {
      tagP.style.display = 'none !important'
    }
    // Pusher.logToConsole = true
    // eslint-disable-next-line no-var
    var pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: 'ap1',
    })
    // eslint-disable-next-line no-var
    var channel = pusher.subscribe('order')
    channel.bind('noti', function (data) {
      const bill = document.querySelector('#noti')
      bill.textContent = 'New'
      bill.style.display = 'block'
      // eslint-disable-next-line no-undef
      Vue.$toast.success("New bill")
    })
  },
}
</script>
