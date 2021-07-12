<template>
  <!-- 粗进度条 -->
  <div class="bar">
    <div class="item">
      <p class="item-title">{{ assets.title }}</p>
      <span
        ><count-to
          class="item-count"
          :startVal="0"
          :endVal="assets.number"
          :duration="2000"
        ></count-to
        >（套）</span
      >
    </div>
    <div class="item-bar">
      <div class="item-bar__main">
        <div class="item-bar__left">
          <div class="item-bar-count">{{ assets.actual }}</div>
          <div class="item-bar-title">{{ assets.left }}</div>
        </div>
        <div class="item-bar__right">
          <div class="item-bar-count">{{ assets.ideal }}</div>
          <div class="item-bar-title">{{ assets.right }}</div>
        </div>
      </div>
      <div class="bar-echartes" :id="assets.id"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import { CountTo } from 'vue3-count-to'
export default defineComponent({
  name: 'bar',
  props: {
    assets: Object,
  },
  components: {
    CountTo,
  },
  setup(props) {
    const createEcharts = () => {
      const myChart = echarts.init(document.getElementById(`${props.assets.id}`))
      myChart.setOption({
        xAxis: {
          type: 'value',
          show: false,
        },
        yAxis: {
          type: 'category',
          show: false,
        },
        grid: {
          top: 0,
          bottom: '-50%',
          left: '8%',
          right: '-4%',
        },
        series: [
          {
            name: props.assets.left,
            type: 'bar',
            // stack: '总量',
            zlevel: 1,
            data: [props.assets.actual],
            barWidth: 20,
            itemStyle: {
              color: '#35B0FF',
              borderRadius: [4, 0, 0, 4],
            },
            label: {
              show: true,
              formatter: `{percentage| ${props.assets.percentage}%}`,
              position: 'right',
              rich: {
                percentage: {
                  color: '#2196f3',
                  fontSize: 14,
                  right: 10,
                  fontWeight: 400,
                  lineHeight: 30,
                },
              },
            },
          },
          {
            name: props.assets.right,
            type: 'bar',
            // stack: '总量',
            barGap: '-100%',
            barWidth: 20,
            data: [props.assets.ideal],
            itemStyle: {
              color: '#F0EFF4',
              borderRadius: [0, 4, 4, 0],
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
    assets: {
      handler() {
        this.createEcharts()
      },
      deep: true,
    },
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
  .item-bar {
    position: relative;
    @include ddccc;
    width: 100%;

    .item-bar__right {
      text-align: right;
    }
    .item-bar__main {
      width: 90%;
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 10px;

      .item-bar-count {
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: #2196f3;
        margin-top: 10px;
      }
      .item-bar-title {
        margin-top: 6px;
        font-size: 13px;
        line-height: 17px;
        color: #95a4b3;
      }
    }
  }
  .bar-echartes {
    height: 150px;
    width: 100%;
    background: #f4f8ff;
    border-radius: 12px;
  }
}
@media screen and (min-width: 768px) {
  .bar {
    flex-direction: row;

    .item {
      width: 50%;
    }
  }
}
</style>
