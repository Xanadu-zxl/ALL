<template>
  <div class="inventory">
    <div class="title">
      <h2 class="title-h2">资产概述</h2>
      <div class="title-options" @click="showPopup">
        <span>全区域</span>
        <van-icon class="arrow-down" name="arrow-down" />
      </div>
    </div>
    <Bar />

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
import Bar from '@/components/Bar.vue'

export default defineComponent({
  name: 'inventory',
  components: {
    Bar,
  },
  props: {
    data: Object,
  },
  setup() {
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
    }
  },
})
</script>
<style lang="scss" scoped>
.inventory {
  .title {
    @include djbac;

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

      .arrow-down {
        padding: 0 6px;
      }
    }
  }

  .bar {
    background: #ffffff;
    border: 1px solid #f4f4f8;
    box-sizing: border-box;
    border-radius: 12px;
  }
}
</style>
