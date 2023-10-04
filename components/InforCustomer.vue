<!-- eslint-disable vue/no-mutating-props -->
<template>
  <modal name="form-customer" :adaptive="true">
    <div class="modal">
      <div class="box-content modal">
        <div class="form">
          <h1>Sản Phẩm</h1>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form action="" @submit.prevent="handleSubmit(submit)">
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required|max:128"
                >
                  <label for="">Tên SP</label>
                  <input v-model="inforCustommer.name" type="text" />
                  <p class="err">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Phone"
                  rules="required|phone"
                >
                  <label for="">Số điện thoại</label>
                  <input
                    v-model="inforCustommer.phone"
                    type="text"
                    maxlength="10"
                  />
                  <p class="err">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Address"
                  rules="required|max:128"
                >
                  <label for="">Địa chỉ</label>
                  <input v-model="inforCustommer.address" type="text" />
                  <p class="err">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
              <div class="btn">
                <button id="btn-close" @click="close">Đóng</button>
                <button id="btn-submit">Đồng Ý</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapActions } from 'vuex'
import constant from '~/ultis/constant'
export default {
  props: ['dataBill'],
  data() {
    return {
      inforCustommer: { name: '', phone: '', address: '' },
    }
  },
  created() {},
  methods: {
    ...mapActions('home', ['createBill']),
    close() {
      this.$modal.hide('form-customer')
    },

    submit() {
      this.$modal.hide('form-customer')
      const bill = {
        ...this.dataBill,
        status: constant.STATUS_BILL.confirm,
        method: constant.METHOD.online,
        name: this.inforCustommer.name,
        phone: this.inforCustommer.phone,
        address: this.inforCustommer.address,
      }
      this.createBill(bill).then((data) => {
        this.$emit('clearCart')
        this.inforCustommer.name = ''
        this.inforCustommer.phone = ''
        this.inforCustommer.address = ''
        this.$toast.success('Successful')
      })
    },
  },
}
</script>
<style scoped>
#btn-close {
  padding: 12px 30px;
  display: flex;
  /* margin: 0 auto; */
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #f05755;
  color: white;
  cursor: pointer;
}
#btn-submit {
  padding: 12px 30px;
  display: flex;
  /* margin: 0 auto; */
  outline: none;
  border: none;
  border-radius: 10px;
  background-image: radial-gradient(
    100% 100% at 100% 0,
    #5adaff 0,
    #5468ff 100%
  );
  color: white;
  cursor: pointer;
}
.btn {
  padding-top: 50px;
  padding-bottom: 30px;
  display: flex;
  gap: 30px;
  justify-content: center;
}
</style>
