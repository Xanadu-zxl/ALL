<template>
  <router-view />
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

<style lang="scss" scoped></style>
