<template>
  <div class="dom">
    <div :id="data.id" class="dom"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
export default {
  name: 'Pies',
  props: {
    data: Object,
  },

  watch: {
    data: {
      handler() {
        this.createEcharts()
      },
      deep: true,
    },
  },
  mounted() {
    this.createEcharts()
  },
  methods: {
    createEcharts() {
      const myChart = echarts.init(document.getElementById(this.data.id))
      myChart.setOption(this.data.chartData)
    },
  },
}
</script>

<style lang="scss">
.dom {
  width: 100%;
  height: 280px;
}
</style>
