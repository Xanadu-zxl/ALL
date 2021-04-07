<template>
  <div>
    <div class="tables">
      <header class="tables-header">
        <span class="tables-header_street">街道</span>
        <span class="tables-header_name">名称</span>
        <span class="tables-header_type">类型</span>
      </header>
      <main class="tables-main">
        <p
          class="tables-main_item"
          v-for="item in tableList"
          :key="item.id"
          @click="showDetails(item)"
        >
          <span class="tables-header_street">{{ item.street }}</span>
          <span class="tables-header_name">{{ item.name }}</span>
          <span class="tables-header_type">{{ item.type }}</span>
        </p>
      </main>
      <footer class="tables-footer">
        <van-pagination
          v-model="currentPage"
          mode="simple"
          :page-count="100"
        >
          <template #prev-text>
            <van-icon name="arrow-left" />
          </template>
          <template #next-text>
            <van-icon name="arrow" />
          </template>
        </van-pagination>
      </footer>

      <van-popup round :show="show" @click-overlay="onCancel">
        <div class="tables-popup">
          <h2 class="tables-popup_title">数据详情</h2>
          <div class="tables-popup_detail">
            <p
              class="tables-popup_item"
              v-for="item in tableTitle"
              :key="item.id"
            >
              <span>{{ item.title }}</span>
              <span>{{ detail[item.name] }}</span>
            </p>
          </div>

          <div class="tables-popup_footer" @click="onCancel">
            关闭
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'tables',
  setup() {
    const currentPage = ref(1)
    const tableList = [
      {
        lessee: '张三1',
        rent: '7000/月',
        contact: '120',
        street: '古城街道',
        name: '工厂',
        type: '标砖吃饭',
      },
      {
        lessee: '张三',
        rent: '6000/月',
        contact: '110',
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
      {
        lessee: '张三',
        rent: '6000/月',
        contact: '110',
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
      {
        lessee: '张三',
        rent: '6000/月',
        contact: '110',
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
      {
        lessee: '张三',
        rent: '6000/月',
        contact: '110',
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
      {
        lessee: '张三',
        rent: '6000/月',
        contact: '110',
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
    ]

    const tableTitle = [
      {
        name: 'lessee',
        title: '承租人',
      },
      {
        name: 'rent',
        title: '租金',
      },
      {
        name: 'contact',
        title: '联系方式',
      },
      {
        name: 'street',
        title: '街道',
      },
      {
        name: 'name',
        title: '名称',
      },
      {
        name: 'type',
        title: '类型',
      },
      {
        name: 'type',
        title: '类型',
      },
      {
        name: 'type',
        title: '合同签订',
      },
      {
        name: 'type',
        title: '合同到期',
      },
    ]

    const data = reactive({
      detail: {},
      show: false,
    })

    const showDetails = (item) => {
      console.log(item)
      data.detail = item
      data.show = true
    }
    const showPopup = () => {
      data.show = true
    }

    const onCancel = () => (data.show = false)

    return {
      tableList,
      currentPage,
      showDetails,
      showPopup,
      onCancel,
      tableTitle,
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss">
.tables {
  .tables-header {
    margin: 28px 0 20px;
    color: #95a4b3;
  }

  .tables-main {
    padding: 0 0 16px 0;
    position: relative;
    @include fineBorder;
  }

  .tables-main_item {
    color: #313c56;
    height: 58px;
    border-radius: 8px;
  }

  .tables-main_item:nth-child(odd) {
    background: #f4f4f8;
  }

  .tables-header,
  .tables-main_item {
    @include djbac;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
    padding: 8px;
    box-sizing: border-box;

    .tables-header_street {
      width: 20%;
    }
    .tables-header_name {
      flex: 1;
      margin: 0px 8px;
    }
    .tables-header_type {
      width: 20%;
    }
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
  .van-popup {
    width: 90%;
    max-width: 680px;
  }

  .tables-popup {
    max-width: 680px;
    background: #ffffff;
    border-radius: 12px;
    height: 450px;
    padding: 20px 16px;

    .tables-popup_title {
      font-size: 18px;
      color: #313c56;
      font-weight: 500;
      line-height: 24px;
      text-align: center;
      margin-bottom: 8px;
    }

    .tables-popup_detail {
      overflow: scroll;
      height: 350px;
    }
    .tables-popup_item {
      font-size: 14px;
      line-height: 18px;
      padding: 16px;

      & span:first-child {
        font-weight: 500;
        color: #191f30;
        width: 22%;
        display: inline-block;
      }
      & span:last-child {
        color: #6b7885;
        display: inline-block;
      }
    }

    .tables-popup_footer {
      background: #2196f3;
      height: 42px;
      margin-top: 30px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      line-height: 42px;
      text-align: center;
      color: #ffffff;
    }
  }
}
</style>
