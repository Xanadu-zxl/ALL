<template>
  <div id="BarCharts"></div>
</template>

<script>
import * as echarts from 'echarts/core'

import { onMounted } from 'vue'
export default {
  name: 'Quarter',
  props: {
    histogram: Array,
  },
  watch: {
    histogram() {
      console.log(this.histogram)
      this.createEcharts()
    },
  },
  setup() {
    const showQuarter = false
    return { showQuarter, onMounted }
  },
  mounted() {
    this.createEcharts()
  },
  methods: {
    createEcharts() {
      const myChart = echarts.init(document.getElementById('BarCharts'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          bottom: '30%',
          top: '20%',
          left: '15%',
          right: '15%',
        },
        legend: [
          {
            top: '5%',
            x: 'center',
            itemWidth: 14,
            data: ['标准厂房', '零星商铺', '农贸市场', '办公楼'],
          },
          {
            top: '12%',
            x: 'center',
            itemWidth: 14,
            data: ['学校', '仓库', '其他'],
          },
        ],
        xAxis: {
          type: 'category',
          data: this.histogram[0],
          axisLabel: {
            rotate: 45,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '##E9EAEB',
            },
          },
        },
        dataZoom: [
          {
            left: 20,
            right: 20,
            bottom: 20,
            show: true,
          },
        ],

        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
              },
            },
          },
        ],
        color: ['#35B0FF', '#857BFF', '#FF7474', '#ABE084', '#38B09C', '#FFC552', '#8A99CF'],
        series: [
          {
            name: '标准厂房',
            type: 'bar',
            stack: '年龄',
            barWidth: '50%',
            data: this.histogram[1],
          },
          {
            name: '零星商铺',
            type: 'bar',
            stack: '年龄',
            barWidth: '50%',
            data: this.histogram[2],
          },
          {
            name: '农贸市场',
            type: 'bar',
            stack: '年龄',
            barWidth: '50%',
            data: this.histogram[3],
          },
          {
            name: '办公室',
            type: 'bar',
            stack: '年龄',
            barWidth: '50%',
            data: this.histogram[4],
          },
          {
            name: '学校',
            type: 'bar',
            stack: '年龄',
            barWidth: '50%',
            data: this.histogram[5],
          },
          {
            name: '仓库',
            type: 'bar',
            stack: '年龄',
            barWidth: '50%',
            data: this.histogram[6],
          },
          {
            name: '其他',
            type: 'bar',
            stack: '年龄',
            barWidth: '50%',
            data: this.histogram[7],
          },
        ],
      })
    },
  },
}
</script>

<style lang="scss">
#BarCharts {
  width: 100%;
  height: 400px;
  background: #ffffff;
  border: 1px solid #f4f4f8;
  box-sizing: border-box;
  border-radius: 12px;
}
</style>
