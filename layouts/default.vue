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
            <p>Home</p>
          </nuxt-link>
        </li>
        <li v-if="!!isAdmin" class="center-xs" @click="handler">
          <nuxt-link to="/bill">
            <div class="nav-menu-img">
              <img src="/img/bill.png" alt="" />
            </div>
            <p>Bill</p>
            <p id="noti"></p>
          </nuxt-link>

        </li>
        <li v-if="!!isAdmin" class="center-xs">
          <nuxt-link to="/stat">
            <div class="nav-menu-img">
              <img src="/img/stat.png" alt="" />
            </div>
            <p>Statistical</p>
          </nuxt-link>
        </li>
        <li v-if="!!isAdmin" class="center-xs">
          <nuxt-link to="/settings/product">
            <div class="nav-menu-img">
              <img src="/img/product.png" alt="" />
            </div>
            <p>Product</p>
          </nuxt-link>
        </li>
        <li v-if="!!isAdmin" class="center-xs">
          <nuxt-link to="/settings/type">
            <div class="nav-menu-img">
              <img src="/img/type.png" alt="" />
            </div>
            <p>Type</p>
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
          <div class="nav-menu-img" @click="logout">
            <img src="/img/user.png" alt="" />
          </div>
          <p>Custommer</p>
        </li>
      </ul>
    </nav>
    <Nuxt />
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Pusher from 'pusher-js'
// import constant from '~/ultis/constant'
export default {
  watch: {
    count(newValue) {
      this.SET_COUNT_BILL(newValue)
    }
  },
  data() {
    return {
      isShow: false,
      count: 0,
    }
  },
  middleware: 'check-auth',
  computed: {
    ...mapState('home', ['isAdmin', 'billOnline']),
  },
  methods: {
    ...mapMutations('home',['SET_COUNT_BILL']),
    ...mapActions('home', ['getBillByMethod']),
    logout() {
      localStorage.removeItem('token')
      this.$axios.setHeader('Authorization', '')
      this.$router.push('/')
    },
    handler() {
      const tagP = document.querySelector('#noti');
    if(tagP !== null)
    {
      console.log('a')
      tagP.style.display = 'none';
    }
    }
  },
  mounted() {
    const checkAdmin = this.isAdmin
    const tagP = document.querySelector('#noti');
    if(tagP !== null)
    {
      tagP.style.display = 'none';
    }
    if(checkAdmin === 1)
    {
      tagP.style.display = 'none !important';
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
        
    })
  }
}
</script>
