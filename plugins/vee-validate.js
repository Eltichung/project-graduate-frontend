import Vue from 'vue'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
// eslint-disable-next-line camelcase
import {
  required,
  email,
  confirmed,
  min,
  min_value,
  max,
} from 'vee-validate/dist/rules'

extend('required', required)

extend('email', email)

extend('min', min)
extend('max', max)
extend('min_value', min_value)

extend('confirmed', {
  ...confirmed,
  message: 'The password does not match',
})
extend('phone', (value) => {
  const regex = /1?[\s-]?\(?(\d{3})\)?[\s-]?\d{3}[\s-]?\d{4}/
  if (value.match(regex)) {
    return true
  }

  return 'This value must be a phone number'
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
