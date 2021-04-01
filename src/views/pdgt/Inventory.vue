<template>
  <div class="inventory">
    <div class="title">
      <h2 class="title-h2">资产概述</h2>
      <div class="title-options" @click="showPopup">
        <span>全区域</span>
        <van-icon color="#3F3845" class="arrow-down" name="arrow-down" />
      </div>
    </div>
    <Bar />
    <Card :title="dataObj.pieData.title">
      <template v-slot:subtitle> </template>
      <template v-slot:chart>
        <Pie :data="dataObj.pieData" />
      </template>
    </Card>
    <Card :title="dataObj.barData.title">
      <template v-slot:subtitle>
        <span class="subtitle">已出租/资产数</span>
      </template>
      <template v-slot:chart>
        <Bars />
      </template>
    </Card>
    <Card :title="dataObj.tableData.title">
      <template v-slot:subtitle>
        <span class="subtitle">在租·373</span>
        <van-icon color="#3F3845" class="arrow-down" name="arrow-down" />
      </template>
      <template v-slot:chart>
        123
      </template>
    </Card>

    <van-popup
      round
      v-model:show="show"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        @confirm="onConfirm"
        @cancel="onCancel"
        :columns="state.columns"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Pie from '@/components/Pie.vue'
import Bar from '@/components/Bar.vue'
import Bars from '@/components/Bars.vue'
import Card from '@/components/Card.vue'

export default defineComponent({
  name: 'inventory',
  components: {
    Bars,
    Bar,
    Pie,
    Card,
  },
  props: {
    data: Object,
  },
  setup() {
    const dataObj = {
      pieData: {
        title: '房屋状态分布',
        id: 'pie1',
        chartData: {
          title: {
            textStyle: {
              color: '#333333',
              fontWeight: 500,
              fontSize: 16,
            },
          },
          legend: {
            show: true,
            bottom: '8%',
          },
          color: ['#35B0FF', '#857BFF', '#FF7474'],
          tooltip: {
            show: true,
            trigger: 'item',
            triggerOn: 'mousemove',
            confine: true,
            backgroundColor: '#fff',
            borderRadius: 4,
            borderColor: '#fff',
            formatter: (params) => {
              return `${params.marker}${params.name}     ${params.data.value} (${params.percent}%)`
            },
            textStyle: {
              color: '#313C56',
              fontSize: 12,
            },
          },
          series: [
            {
              bottom: '8%',
              color: ['#35B0FF', '#857BFF', '#FF7474'],
              name: '房屋状态分布',
              type: 'pie',
              radius: ['25%', '40%'],
              avoidLabelOverlap: false,
              data: [
                { value: 435, name: '在租' },
                { value: 635, name: '空置' },
                { value: 445, name: '合同纠纷' },
              ],
              label: {
                align: 'right',
                formatter: '{b}\n{c}（{d}%)',
              },
              labelLine: {
                length: 15,
                length2: 6,
              },
            },
          ],
        },
      },
      barData: {
        title: '资产类型',
      },
      tableData: {
        title: '租赁详情',
      },
    }
    const state = reactive({
      columns: [
        '全区域',
        '郫筒街道',
        '唐昌街道',
        '犀浦街道',
        '团结街道',
        '安靖街道',
        '红光街道',
      ],
    })
    const community = ref('全部社区')
    const show = ref(false)
    const showPopup = () => {
      show.value = true
    }
    const onConfirm = (value) => {
      community.value = value
      show.value = false
    }
    const onCancel = () => (show.value = false)

    return {
      show,
      showPopup,
      state,
      onCancel,
      onConfirm,
      community,
      dataObj,
    }
  },
})
</script>
<style lang="scss" scoped>
.inventory {
  .title {
    @include djbac;
    margin-bottom: 11px;

    .title-h2 {
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
      color: $pdgth2Color;
      position: relative;
      padding-left: 8px;

      &::before {
        content: '';
        width: 4px;
        height: 20px;
        background: $pdgtColor;
        position: absolute;
        top: 3px;
        left: 0px;
        border-radius: 4px;
      }
    }

    .title-options {
      font-size: 14px;
      line-height: 18px;
      color: $pdgtTextColor;
      @include dcc;
    }
  }

  .bar {
    background: #ffffff;
    border: 1px solid #f4f4f8;
    box-sizing: border-box;
    border-radius: 12px;
  }
  .arrow-down {
    padding: 0 6px;
  }
}
</style>
