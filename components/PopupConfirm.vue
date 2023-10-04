<template>
  <modal name="confirm" :adaptive="true">
    <div class="modal popup modal-confirm">
      <h3>Are you sure?</h3>
      <div class="btn between-xs confirm">
        <button @click="confirm">Đồng ý</button>
        <button @click="cancel">Đóng</button>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  props: ['deleteItem'],
  methods: {
    confirm() {
      this.deleteItem()
      this.$emit('loadData')
    },
    cancel() {
      this.$modal.hide('confirm')
    },
  },
}
</script>
<style lang="scss" scoped>
.popup.modal {
  img {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 90px;
    object-fit: contain;
    padding-bottom: 50px;
  }

  h3 {
    margin-top: 4vh;
    font-family: 'SVN-ARCO Typography';
    color: #f1af1f;
    font-weight: 400;
    font-size: 250%;
    font-style: normal;
    text-align: center;
  }

  .btn.confirm {
    display: flex;

    button {
      margin: 0 auto;
      margin-top: 20px;
      height: 50px;
      color: #794821;
      background: #f1af1f;
      border-radius: 4px;
      font-family: 'SVN-ARCO Typography';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      padding: 4px;
      border: none;
      cursor: pointer;
      transition: all 0.3s;
      width: 70px !important;
      border-radius: 30px;
    }
  }
}
</style>
