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
          <span class="tables-header_name">{{ item.company }}</span>
          <span class="tables-header_type">{{ item.type }}</span>
        </p>
      </main>

      <van-popup round :show="show" @click-overlay="onCancel">
        <div class="tables-popup">
          <h2 class="tables-popup_title">数据详情</h2>
          <div class="tables-popup_detail">
            <p class="tables-popup_item" v-for="item in tableTitle" :key="item.id">
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
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'tables',
  props: {
    tableList: Object,
  },
  setup() {
    const tableTitle = [
      {
        name: 'lessee',
        title: '承租人',
      },
      {
        name: 'money',
        title: '租金',
      },
      {
        name: 'phone',
        title: '联系方式',
      },
      {
        name: 'street',
        title: '街道',
      },
      {
        name: 'company',
        title: '名称',
      },
      {
        name: 'type',
        title: '类型',
      },
      {
        name: 'start_time',
        title: '合同签订',
      },
      {
        name: 'end_time',
        title: '合同到期',
      },
    ]

    const data = reactive({
      detail: {},
      show: false,
    })

    const showDetails = (item) => {
      data.detail = item
      data.show = true
    }
    const showPopup = () => {
      data.show = true
    }

    const onCancel = () => (data.show = false)

    return {
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
      text-align: center;
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
      display: flex;

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
