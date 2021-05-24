<template>
  <div class="bars">
    <div class="item" v-for="(item, index) in chartList" :key="item.index">
      <img :src="imgUrl[index]" alt="" />
      <Baritem class="chart" :chart="item"></Baritem>
    </div>
  </div>
</template>
<script lang="ts">
// import { defineComponent, reactive } from 'vue'
import Baritem from '@/components/BarItem.vue'
import global from '@/tool/global.ts'

export default {
  name: 'BarItem',
  components: {
    Baritem,
  },
  props: {
    type: Array,
  },
  watch: {
    type(value) {
      this.setData(value)
    },
  },
  data() {
    return {
      imgUrl: global.iconUrl,
      chartList: [
        { id: 'cfBar', title: '标准厂房', molecular: 0, denominator: 1 },
        { id: 'spBar', title: '零星商铺', molecular: 0, denominator: 1 },
        { id: 'scBar', title: '农贸市场', molecular: 0, denominator: 1 },
        { id: 'bgsBar', title: '办公楼', molecular: 0, denominator: 1 },
        { id: 'xxBar', title: '学校', molecular: 0, denominator: 1 },
        { id: 'ckBar', title: '仓库', molecular: 0, denominator: 1 },
        { id: 'qtBar', title: '其他', molecular: 0, denominator: 1 },
      ],
    }
  },
  methods: {
    setData(arr) {
      this.chartList.forEach((chartList) => {
        arr[0].forEach((res) => {
          if (chartList.title === res[0]) {
            chartList.molecular = res[1]
          }
        })
        arr[1].forEach((res) => {
          if (chartList.title === res[0]) {
            chartList.denominator = res[1] + 1
          }
        })
      })
    },
  },
}
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
