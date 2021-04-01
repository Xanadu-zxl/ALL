<template>
  <div class="bars">
    <div class="item">
      <img src="@/assets/svg/cf.svg" alt="" />
      <div id="bars" class="chart"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts/core'
export default defineComponent({
  name: 'bars',
  setup() {
    const createEcharts = () => {
      const myChart = echarts.init(document.getElementById('bars'))
      myChart.setOption({
        xAxis: {
          type: 'value',
          data: ['received', 'accountsReceivable'],
          show: false,
        },
        yAxis: {
          type: 'category',
          show: false,
        },
        grid: {
          bottom: 40,
          right: 32,
          left: 12,
        },
        series: [
          {
            name: '标准厂房',
            type: 'bar',
            stack: '总量',
            data: [138798],
            barWidth: 4,
            itemStyle: {
              color: '#35B0FF',
              borderRadius: [4, 4, 4, 4],
            },
            label: {
              show: true,
              formatter: '{value| {a}}',
              align: 'left',
              position: [-4, -24],
              rich: {
                value: {
                  color: '#313C56',
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 18,
                },
              },
            },
          },
          {
            name: '应收',
            type: 'bar',
            stack: '总量',
            data: [286300],
            itemStyle: {
              color: '#F0EFF4',
              borderRadius: [0, 4, 4, 0],
            },
            label: {
              show: true,
              formatter: '{value| {c}/12312321}',
              align: 'right',
              position: ['100%', -24],
              rich: {
                value: {
                  color: '#6B7885',
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 18,
                },
              },
            },
          },
        ],
      })
    }
    onMounted(() => {
      createEcharts()
    })
  },
})
</script>

<style lang="scss" scoped>
.bars {
  margin-bottom: 16px;

  .item {
    @include djbac;
    margin-top: 20px;

    .img {
      width: 32px;
      height: 32px;
    }

    .chart {
      flex: 1;
      height: 32px;
    }
  }
}
</style>
