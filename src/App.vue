<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'APP',
  watch: {
    $route(to) {
      window.document.title = to.meta.title
    },
  },
})
</script>

<style lang="scss" scoped>
#app {
  max-width: 700px;
  margin: 0 auto;
}
</style>
