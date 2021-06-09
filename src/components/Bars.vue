<template>
  <div class="bars">
    <div class="bars-left block">
      <div class="item" v-for="(item, index) in chartListLeft" :key="item.index">
        <img :src="imgUrl[index]" alt="" />
        <Baritem class="chart" :chart="item"></Baritem>
      </div>
    </div>
    <div class="bars-right block">
      <div class="item" v-for="(item, index) in chartListRight" :key="item.index">
        <img :src="imgUrl[index]" alt="" />
        <Baritem class="chart" :chart="item"></Baritem>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
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
      chartListLeft: [
        { id: 'cfBar', title: '标准厂房', molecular: 0, denominator: 0 },
        { id: 'spBar', title: '零星商铺', molecular: 0, denominator: 0 },
        { id: 'scBar', title: '农贸市场', molecular: 0, denominator: 0 },
        { id: 'bgsBar', title: '办公楼', molecular: 0, denominator: 0 },
      ],
      chartListRight: [
        { id: 'xxBar', title: '学校', molecular: 0, denominator: 0 },
        { id: 'ckBar', title: '仓库', molecular: 0, denominator: 0 },
        { id: 'qtBar', title: '其他', molecular: 0, denominator: 0 },
      ],
    }
  },
  methods: {
    setData(arr) {
      console.log('%c 🥫 arr: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', this.type)
      this.chartListLeft.forEach((chartList) => {
        arr[1].forEach((res) => {
          if (chartList.title === res[0]) {
            chartList.molecular = res[1]
          }
        })
        arr[0].forEach((res) => {
          if (chartList.title === res[0]) {
            chartList.denominator = res[1]
          }
        })
      })
      this.chartListRight.forEach((chartList) => {
        arr[1].forEach((res) => {
          if (chartList.title === res[0]) {
            chartList.molecular = res[1]
          }
        })
        arr[0].forEach((res) => {
          if (chartList.title === res[0]) {
            chartList.denominator = res[1]
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
      width: 90%;
      height: 32px;
    }
  }
}

@media screen and (min-width: 768px) {
  .bars {
    display: flex;
    .block {
      width: 50%;
    }
  }
}
</style>
