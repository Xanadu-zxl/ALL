<template>
  <div class="inventory">
    <div class="title">
      <h2 class="title-h2">资产概述</h2>
      <div class="title-options" @click="showPopup(communitys)">
        <span>{{ community }}</span>
        <van-icon color="#3F3845" class="arrow-down" name="arrow-down" />
      </div>
    </div>
    <Bar :assets="assets" />
    <Card :title="pieData.title">
      <template v-slot:subtitle> </template>
      <template v-slot:chart>
        <Pie :data="pieData" />
      </template>
    </Card>
    <Card :title="barData.title">
      <template v-slot:subtitle>
        <span class="subtitle">已出租/资产数</span>
      </template>
      <template v-slot:chart>
        <Bars :type="type" />
      </template>
    </Card>
    <Card :title="tableData.title">
      <template v-slot:subtitle>
        <div class="header-subtitle" @click="showPopup(status)">
          <span class="subtitle">{{ statusTitle }}·{{ pagination.total }}</span>
          <van-icon color="#3F3845" class="arrow-down" name="arrow-down" />
        </div>
      </template>
      <template v-slot:chart>
        <Tables :tableList="tableList" />
        <footer class="tables-footer">
          <van-pagination
            @change="changePage"
            v-model="currentPage"
            mode="simple"
            :page-count="count"
          >
            <template #prev-text>
              <van-icon name="arrow-left" />
            </template>
            <template #next-text>
              <van-icon name="arrow" />
            </template>
          </van-pagination>
        </footer>
      </template>
    </Card>
    <div class="title">
      <h2 class="title-h2">资产概述</h2>
    </div>
    <BarCharts :histogram="histogram" />
    <van-popup round :show="show" position="bottom" :style="{ height: '50%' }">
      <van-picker @confirm="onConfirm" @cancel="onCancel" :columns="columns" />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onBeforeMount } from 'vue'
import Pie from '@/components/Pie.vue'
import Bar from '@/components/Bar.vue'
import Bars from '@/components/Bars.vue'
import Card from '@/components/Card.vue'
import Tables from '@/components/Tables.vue'
import BarCharts from '@/components/BarCharts.vue'
import api from '../../api/api'

export default defineComponent({
  name: 'inventory',
  components: {
    Bars,
    Bar,
    Pie,
    BarCharts,
    Tables,
    Card,
  },
  props: {
    data: Object,
  },

  setup() {
    const currentPage = ref(1)
    const changePage = () => {
      getPaging(currentPage.value, 10, dataObj.statusTitle)
    }

    const assets = reactive({
      number: 0,
      actual: 0,
      ideal: 1,
      id: 'bar2',
    })
    const dataObj = reactive({
      tableList: [],
      count: 0,
      type: [],
      histogram: [
        ['全部街道'],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
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
                { value: 0, name: '在租' },
                { value: 0, name: '空置' },
                { value: 0, name: '合同纠纷' },
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
      community: '全部街道',
      communitys: ['全部街道'],
      statusTitle: '在租',
      pagination: {
        next: 0,
        page: 0,
        page_size: 0,
        prev: 0,
        total: 0,
      },
      status: ['在租', '空闲', '合同纠纷'],
      columns: [],
      show: false,
    })
    onBeforeMount(() => {
      getAssets('', '')
    })
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

    const setHistogram = (arrs) => {
      const histogram = [[], [], [], [], [], [], [], []]
      arrs.forEach((res, index) => {
        histogram[0].push(res.name)
        for (let index = 1; index < histogram.length; index++) {
          histogram[index].push(0)
        }
        res.value.forEach((res) => {
          switch (res.name) {
            case '标准厂房':
              histogram[1].splice(index, 1, res.count)
              break
            case '零星商铺':
              histogram[2].splice(index, 1, res.count)
              break
            case '农贸市场':
              histogram[3].splice(index, 1, res.count)
              break
            case '办公楼':
              histogram[4].splice(index, 1, res.count)
              break
            case '学校':
              histogram[5].splice(index, 1, res.count)
              break
            case '仓库':
              histogram[6].splice(index, 1, res.count)
              break
            default:
              histogram[7].splice(index, 1, res.count)
              break
          }
        })
      })
      return histogram
    }
    const getPaging = async (page, limit, status) => {
      const { data } = await api.getPaging(page, limit, status)
      dataObj.tableList = data.data
      dataObj.pagination = data.pagination
      dataObj.count = Math.ceil(data.pagination.total / data.pagination.page_size)
    }
    // 请求数据
    const getAssets = async (params, status) => {
      const {
        data: { data },
      } = await api.getAssets(params, status)
      assets.number = data.property_count
      assets.ideal = data.receivable_money[0] + 1
      assets.actual = data.receivable_money[1]
      dataObj.pieData.chartData.series[0].data = setData(data.status_quo)
      dataObj.type = data.property_type
      dataObj.communitys.splice(1)
      dataObj.communitys = dataObj.communitys.concat(data.row_type)
      dataObj.histogram = setHistogram(data.property_distribution)
    }
    return {
      showPopup,
      onCancel,
      onConfirm,
      getAssets,
      getPaging,
      currentPage,
      assets,
      changePage,
      ...toRefs(dataObj),
    }
  },
  watch: {
    community: {
      handler(value) {
        if (value === '全部街道') {
          this.getAssets('', '')
        } else {
          this.getAssets(value, '')
        }
      },
    },
    statusTitle: {
      handler(value) {
        this.getPaging(this.currentPage, 10, value)
      },
      immediate: true,
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
  .tables-footer {
    margin: 16px 0 20px;

    .van-pagination {
      justify-content: center;
      align-items: center;

      .van-pagination__item {
        width: 32px;
        height: 32px;
        background: #f4f4f8;
        color: #3f3845;
        border-radius: 4px;
        flex: none;
      }

      .van-pagination__next::after,
      .van-pagination__prev::after {
        border: none;
      }
      .van-pagination__item:active {
        color: #fff;
        background-color: #a7a7aa;
      }

      .van-pagination__page-desc {
        margin: 0px 26px;
        height: 32px;
        cursor: pointer;
        flex: none;
      }
    }
  }
}
</style>
