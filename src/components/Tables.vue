<template>
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
      <van-pagination v-model="currentPage" mode="simple" :page-count="100">
        <template #prev-text>
          <van-icon name="arrow-left" />
        </template>
        <template #next-text>
          <van-icon name="arrow" />
        </template>
      </van-pagination>
    </footer>

    <van-popup round v-model:show="show">
      <div class="tables-popup">
        <h2 class="tables-popup_title">数据详情</h2>
        <p class="tables-popup_item">
          <span>街道</span>
          <span>古城街道</span>
        </p>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'tables',
  setup() {
    const currentPage = ref(1)
    const tableList = [
      {
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
      {
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
      {
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
      {
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
      {
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
      {
        street: '古城街道',
        name: '测测股卡还是觉得哈快点哈',
        type: '标砖吃饭',
      },
    ]
    const show = ref(false)

    const showDetails = (item) => {
      console.log(item)
      show.value = true
    }
    const showPopup = () => {
      show.value = true
    }

    const onCancel = () => (show.value = false)

    return {
      show,
      tableList,
      currentPage,
      showDetails,
      showPopup,
      onCancel,
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
    }
    .tables-popup_item {
      font-size: 14px;
      line-height: 18px;
      & span:first-child {
        font-weight: 500;
        color: #191f30;
      }
      & span:last-child {
        color: #6b7885;
      }
    }
  }
}
</style>
