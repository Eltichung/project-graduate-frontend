import Vue from 'vue'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, email, confirmed, min, min_value } from 'vee-validate/dist/rules'

extend('required', required)

extend('email', email)

extend('min', min)
extend('min_value', min_value)

extend('confirmed', {
  ...confirmed,
  message: 'The password does not match'
})


Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)