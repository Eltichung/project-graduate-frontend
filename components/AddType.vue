<!-- eslint-disable vue/no-mutating-props -->
<template>
  <modal name="form-type" :adaptive="true">
    <div class="modal">
      <div class="box-content modal">
        <div class="form">
          <h1>Product</h1>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form action="" @submit.prevent="handleSubmit(submit)">
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="input"
                  rules="required"
                >
                  <label for="">Name</label>
                  <input v-model="productSelected.name" type="text" />
                  <p class="err">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
              <div class="form-group file">
                <img :src="preview" class="img-fluid" v-if="preview !== undefined"/>
                <div class="input-file">
                  <label>Image</label>
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
                <button id="btn-close" @click="close">Close</button>
                <button id="btn-submit" @click="handleSubmit()">Submit</button>
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
    }
  },
  props: ['productSelected'],
  data() {
    return {
      type: [],
      dataProduct: {},
      preview: '',
      image: '',
    }
  },
  methods: {
    ...mapActions('home', ['getType', 'updateType', 'addType']),
    close() {
      this.$modal.hide('form-type')
    },
    submit() {
      console.log(this.productSelected.id)
      // eslint-disable-next-line vue/no-mutating-props
      const formData = new FormData()
      if (this.$refs.file.files[0] != null) {
        formData.append('imgUrl', this.$refs.file.files[0] || null)
      }
      formData.append('name', this.productSelected.name)
      if (this.productSelected.id !== undefined) {
        this.updateType(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((data) => this.$emit('loadData'))
      } else {
        this.addType(formData, {
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
