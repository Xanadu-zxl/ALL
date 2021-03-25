<template>
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
    <div class="item bar" id="bar"></div>
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
  setup(props) {
    const createEcharts = () => {
      const myChart = echarts.init(document.getElementById('bar'))
      myChart.setOption({})
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

  .item {
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
}
</style>
