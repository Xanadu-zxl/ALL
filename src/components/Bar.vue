<template>
  <!-- 粗进度条 -->
  <div class="bar">
    <div class="item">
      <p class="item-title">资产数量</p>
      <span
        ><count-to
          class="item-count"
          :startVal="0"
          :endVal="343"
          :duration="2000"
        ></count-to
        >（套）</span
      >
    </div>
    <div class="item bar-echartes" id="bar"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import { CountTo } from 'vue3-count-to'
export default defineComponent({
  name: 'bar',
  components: {
    CountTo,
  },
  setup() {
    const createEcharts = () => {
      const myChart = echarts.init(document.getElementById('bar'))
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
          bottom: 0,
          right: 16,
          left: 16,
        },
        series: [
          {
            name: '已收',
            type: 'bar',
            stack: '总量',
            data: [138798],
            barWidth: 20,
            itemStyle: {
              color: '#35B0FF',
              borderRadius: [4, 0, 0, 4],
            },
            label: {
              show: true,
              formatter: '{value| {c} }\n{name| {a} }',
              align: 'left',
              position: [-4, -80],
              rich: {
                value: {
                  color: '#35B0FF',
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: 30,
                },
                name: {
                  color: '#95A4B3',
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 30,
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
              formatter: '{value| {c} }\n{name| {a} }',
              align: 'right',
              position: ['100%', -80],
              rich: {
                value: {
                  color: '#6B7885',
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: 30,
                },
                name: {
                  color: '#95A4B3',
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 30,
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
    return { createEcharts }
  },
})
</script>

<style lang="scss" scoped>
.bar {
  @include ddccc;
  padding: 16px;
  margin-bottom: 16px;

  .item {
    position: relative;

    @include ddccc;
    height: 150px;
    width: 100%;

    .item-title {
      font-size: 14px;
      margin-bottom: 8px;
      line-height: 18px;
      text-align: center;
      color: $pdgtTitleColor;
    }

    .item-count {
      font-weight: 500;
      font-size: 40px;
      line-height: 40px;
      text-align: center;
      color: #da251d;
    }
  }
  .bar-echartes {
    background: #f4f8ff;
    border-radius: 12px;
  }
}
</style>
