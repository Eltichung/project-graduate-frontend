<template>
  <div class="wrapper stat">
    <div class="header box between-xs middle-xs">
      <div class="header-text">
        <h1>Statistical</h1>
      </div>
    </div>
    <div class="box-stat">
      <!-- <div class="box-stat-item first"></div> -->
      <div class="box-stat-item">
        <p class="box-stat-item-title">Yesterday</p>
        <h1>{{ dataStatToday.total_yesterday }}</h1>
        <p>VND</p>
      </div>
      <div class="box-stat-item">
        <p class="box-stat-item-title">Now</p>
        <h1>{{ dataStatToday.total_now }}</h1>
        <p>VND</p>
      </div>
      <div class="box-stat-item">
        <p class="box-stat-item-title">Bill</p>
        <h1>{{ dataStatToday.quantity_bill }}</h1>
        <p>Bill</p>
      </div>
      <!-- <div class="box-stat-item">
        <h1>{{ dataStatToday.total_now }}</h1>
        <p>VND</p>
      </div> -->
    </div>
    <div class="box-main">
      <div class="box-hot">
        <h1>Top product</h1>
        <div class="total">
          <div class="total-item">
            <h3>{{ dataStatToday.quantity_product }}</h3>
            <p>Sold</p>
          </div>
          <div class="total-item">
            <h3>123</h3>
            <p>Not sold yet</p>
          </div>
        </div>
        <div class="list-product">
          <div
            v-for="(item, index) in dataStatToday.top_product"
            :key="item.id"
            class="list-product-item"
          >
            <img :src="`/img/checked${index + 1}.png`" alt="" />
            <div class="list-product-item-text">
              <p>{{ item.name }}</p>
              <p>Sold: {{ item.total }}</p>
            </div>
          </div>
        </div>
      </div>
      <date-picker v-model="time" range></date-picker>
      <chart
        v-if="loader"
        class="box-chart"
        :data="dataChart"
        :options="optionsChart"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: { DatePicker },
  middleware: 'check-auth',
  data() {
    return {
      dataStatToday: {},
      loader: false,
      dataChart: {},
      optionsChart: {
        legend: {
          labels: {
            fontColor: '#fff',
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: '#fff',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: '#fff',
              },
            },
          ],
        },
        title: {
          display: true,
          text: 'The chart',
          fontColor: '#fff',
          fontSize: 20,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      time: '',
    }
  },
  watch: {
    time(newValue) {
      this.getDataStatByDate()
      console.log(this.time)
    },
  },
  created() {
    this.getDataStatToday()
    this.getDataStatByDate()
  },
  methods: {
    ...mapActions('stat', ['statToday', 'statByDate']),
    getDataStatToday() {
      const date = this.convertDate(new Date())
      this.statToday(date).then((data) => {
        this.dataStatToday = data.data
      })
    },
    getDataStatByDate() {
      this.loader = false
      // eslint-disable-next-line prefer-const, no-unused-vars
      let date = {}
      if (this.time === '') {
        date = {
          startTime: this.convertDate(moment(new Date()).subtract(7, 'days')),
          endTime: this.convertDate(new Date()),
        }
      } else {
        // eslint-disable-next-line prefer-const, no-unused-vars
        date = {
          startTime: this.convertDate(this.time[0]),
          endTime: this.convertDate(this.time[1]),
        }
      }

      this.statByDate(date).then((data) => {
        this.dataChart = {
          labels: data.data.map((element) => element.date),
          datasets: [
            {
              label: 'VND',
              backgroundColor: '#3e95cd',
              data: data.data.map((element) => element.total),
            },
          ],
        }
        this.loader = true
      })
    },
    convertDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
  },
}
</script>

<style scoped></style>
