<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <van-icon class="play" name="play" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<style scoped lang="scss"></style>
