<template>
  <!-- 细进度条 -->
  <div :id="chart.id"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts/core'
export default defineComponent({
  name: 'bars',
  props: {
    chart: Object,
  },

  setup(props) {
    let myChart = null
    const createEcharts = () => {
      if (myChart != null && myChart !== '' && myChart !== undefined) {
        myChart.dispose()
      }
      // eslint-disable-next-line vue/no-mutating-props
      myChart = echarts.init(document.getElementById(props.chart.id))
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
          right: 10,
          left: 12,
        },
        series: [
          {
            name: props.chart.title,
            type: 'bar',
            barMinHeight: 2,
            stack: '总量',
            data: [props.chart.molecular],
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
            barMinHeight: '500',
            name: '总数',
            type: 'bar',
            stack: '总量',
            data: [props.chart.denominator],
            itemStyle: {
              color: '#F0EFF4',
              borderRadius: [0, 4, 4, 0],
            },
            label: {
              show: true,
              formatter: `{value| ${props.chart.molecular}/${props.chart.denominator}}`,
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
    return { createEcharts }
  },
  watch: {
    chart: {
      handler() {
        this.createEcharts()
      },
      deep: true,
    },
  },
})
</script>
