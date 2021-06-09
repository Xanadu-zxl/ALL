<template>
  <div class="inventory">
    <div class="title">
      <h2 class="title-h2">资产概述</h2>
      <div class="title-options" @click="showPopup(communitys)">
        <span>{{ community }}</span>
        <van-icon color="#3F3845" class="arrow-down" name="arrow-down" />
      </div>
    </div>
    <Bar :assets="assetsData" />
    <Card :title="pieData.title">
      <template v-slot:subtitle> </template>
      <template v-slot:chart>
        <Pie :data="pieData" />
      </template>
    </Card>
    <Card :title="barData.title">
      <template v-slot:subtitle>
        <span class="subtitle">已收租/待收租</span>
      </template>
      <template v-slot:chart>
        <Bars :type="type" />
      </template>
    </Card>
    <Card :title="tableData.title">
      <template v-slot:subtitle>
        <div class="header-subtitle" @click="showPopup(status)">
          <span class="subtitle">{{ statusTitle }}</span>
          <van-icon color="#3F3845" class="arrow-down" name="arrow-down" />
        </div>
      </template>
      <template v-slot:chart>
        <div class="navs">
          <div :class="assets" @click="switchNav(assets)">近月待收资产</div>
          <div :class="deadline" @click="switchNav(deadline)">
            合同即将逾期
          </div>
        </div>
        <Tables />
      </template>
    </Card>

    <van-popup round :show="show" position="bottom" :style="{ height: '50%' }">
      <van-picker @confirm="onConfirm" @cancel="onCancel" :columns="columns" />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, toRefs } from 'vue'
import Pie from '@/components/Pie.vue'
import Bar from '@/components/Bar.vue'
import Bars from '@/components/Bars.vue'
import Card from '@/components/Card.vue'
import Tables from '@/components/Tables.vue'
import api from '../../api/api'

export default defineComponent({
  name: 'inventory',
  components: {
    Bars,
    Bar,
    Pie,
    Tables,
    Card,
  },
  props: {
    data: Object,
  },
  setup() {
    const assetsData = reactive({
      number: 0,
      actual: 0,
      ideal: 1,
      id: 'bar2',
    })
    const dataObj = reactive({
      type: [],
      pieData: {
        title: '收租情况',
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
              color: ['#857BFF', '#FF7474'],
              name: '收租情况',
              type: 'pie',
              radius: ['25%', '40%'],
              avoidLabelOverlap: false,
              data: [
                { value: 435, name: '已收租' },
                { value: 635, name: '待收租' },
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
        title: '预警清单',
      },
      community: '全部街道',
      communitys: ['全部街道'],
      statusTitle: '在租·1',
      status: ['在租·1', '空闲·1', '合同纠纷·0'],
      columns: [],
      show: false,
      assets: ['assets', 'navs-active'],
      deadline: ['deadline'],
    })

    // 切换选择的图表
    const switchNav = (el) => {
      if (el.includes('navs-active')) {
      } else {
        if (dataObj.deadline.includes('navs-active')) {
          dataObj.deadline.pop()
        } else {
          dataObj.deadline.push('navs-active')
        }
        if (dataObj.assets.includes('navs-active')) {
          dataObj.assets.pop()
        } else {
          dataObj.assets.push('navs-active')
        }
      }
    }
    const showPopup = (column) => {
      dataObj.columns = column
      dataObj.show = true
    }
    const onConfirm = (value) => {
      if (dataObj.columns.includes('全部街道')) {
        dataObj.community = value
      } else {
        dataObj.statusTitle = value
      }

      dataObj.show = false
    }
    const onCancel = () => {
      dataObj.show = false
    }
    onBeforeMount(() => {
      getWarning('', '')
    })
    const setData = (res) => {
      const arr = []
      res.forEach((res) => {
        arr.push({
          name: res[0],
          value: res[1],
        })
      })
      return arr
    }
    // 请求数据
    const getWarning = async (params, status) => {
      const {
        data: { data },
      } = await api.getWarning(params, status)
      assetsData.number = data.property_count
      assetsData.ideal = data.receivable_money[0] + 1
      assetsData.actual = data.receivable_money[1]
      dataObj.pieData.chartData.series[0].data = setData(data.status_quo)
      dataObj.type = data.property_type
      dataObj.communitys.splice(1)
      dataObj.communitys = dataObj.communitys.concat(data.row_type)
    }

    return {
      assetsData,
      showPopup,
      onCancel,
      onConfirm,
      getWarning,
      switchNav,
      ...toRefs(dataObj),
    }
  },
  watch: {
    community: {
      handler(value) {
        if (value === '全部街道') {
          this.getWarning('', '')
        } else {
          this.getWarning(value, '')
        }
      },
    },
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
      padding-left: 12px;

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
  .header-subtitle {
    @include dcc;
  }
  .subtitle {
    font-size: 14px;
    line-height: 18px;
    color: #95a4b3;
  }

  .navs {
    padding: 4px;
    margin-top: 10px;
    background: #f4f4f8;
    border-radius: 8px;
    @include dcc;

    .assets,
    .deadline {
      width: 50%;
      height: 30px;
      border-radius: 4px;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      color: #6b7885;
    }
    .navs-active {
      background: $pdgtColor;
      color: #fff;
    }
  }
}
</style>
