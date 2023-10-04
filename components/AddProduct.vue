<!-- eslint-disable vue/no-mutating-props -->
<template>
  <modal name="form-product" :adaptive="true">
    <div class="modal">
      <div class="box-content modal">
        <div class="form">
          <h1>Product</h1>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form action="" @submit.prevent="handleSubmit(submit)" enctype="multipart/form-data">
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="input"
                  rules="required"
                >
                  <label for="">Tên SP</label>
                  <input v-model="productSelected.name" type="text" />
                  <p class="err">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <label for="">Loại SP</label>
                <select id="select" v-model="selected">
                  <option v-for="item in type" :key="item.id" :value="item.id" :selected="item.id=selected">
                    {{ item.name }} 
                  </option>
                  >
                </select>
              </div>
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="input"
                  rules="required"
                >
                  <label for="">Description</label>
                  <input v-model="productSelected.description" type="text" />
                  <p class="err">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="input"
                  rules="required"
                >
                  <label for="">Price</label>
                  <input v-model="productSelected.price" type="number" />
                  <p class="err">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
              <div class="form-group file">
                <img
                  :src="preview"
                  class="img-fluid"
                  v-if="preview !== undefined"
                />
                <div class="input-file">
                  <label>Ảnh</label>
                  <input
                    id="my-file"
                    ref="file"
                    type="file"
                    accept="image/*"
                    class="form-control-file"
                    @change="previewImage"
                  />
                </div>
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
export default {
  watch: {
    productSelected() {
      this.preview = this.$props.productSelected?.imgUrl
      this.selected = this.$props.productSelected.type?.id
    },
  },
  props: ['productSelected'],
  data() {
    return {
      type: [],
      dataProduct: {},
      selected: 1,
      preview: '',
      image: '',
    }
  },
  created() {
    this.getDataType()
    console.log(this.selected)
  },
  methods: {
    ...mapActions('home', ['getType', 'updateProduct', 'addProduct']),
    close() {
      this.$modal.hide('form-product')
    },
    getDataType() {
      this.getType().then((data) => (this.type = data.data.data))
    },
    submit() {
      // eslint-disable-next-line vue/no-mutating-props
      this.productSelected.type = this.selected
      const formData = new FormData()
      if (this.$refs.file.files[0] != null) {
        formData.append(
          'imgUrl',
          this.$refs.file.files[0] || this.$props.productSelected?.imgUrl
        )
      } else {
        formData.append('imgUrl', this.$props.productSelected?.imgUrl)
      }
      formData.append('name', this.productSelected.name)
      formData.append('type', this.selected)
      formData.append('description', this.productSelected.description)
      formData.append('price', this.productSelected.price)
      console.log(formData)
      if (this.productSelected.id !== undefined) {
        formData.append('slug', this.productSelected.slug)
        this.updateProduct(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((data) => this.$emit('loadData'))
      } else {
        this.addProduct(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((data) => this.$emit('loadData'))
      }
    },
    previewImage(event) {
      const input = event.target
      if (input.files) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target.result
        }
        this.image = input.files[0]
        reader.readAsDataURL(input.files[0])
      }
    },
  },
  mounted() {
    this.selected = this.productSelected?.type?.id
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
