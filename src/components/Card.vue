<template>
  <div class="Card">
    <header class="header">
      <div>
        <i class="round"></i>
        <span class="title">{{ title }}</span>
      </div>
      <div>
        <slot name="subtitle"></slot>
      </div>
    </header>
    <slot name="chart"></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
  },
}
</script>

<style lang="scss" scoped>
.Card {
  padding: 0 16px;
  background: #ffffff;
  border: 1px solid #f4f4f8;
  box-sizing: border-box;
  border-radius: 12px;
  margin-bottom: 16px;

  .header {
    height: 54px;
    line-height: 54px;
    @include djbac;
    position: relative;
    @include fineBorder;

    .round {
      width: 8px;
      height: 8px;
      border: 2px solid #2196f3;
      border-radius: 50%;
      display: inline-block;
    }
    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: #313c56;
      margin-left: 8px;
    }
  }
}
</style>
