<template>
  <HelloWorld
    :center="state.goto ? state.goto : {lat: 55.096375, lng: 37.659041}"
    :zoom="state.goto ? 8 : 4"
    :strikes="state.strickes"
    style="width:100%;height:100%"    
  />
</template>

<style lang="scss">
@import "assets/css/theme.scss";
@import "assets/css/scaffold.scss";
@import "assets/css/components.scss";
</style>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {ISetikeJSON, Strike, ParseStrikes} from './lib/Strike'
import {onMounted, reactive} from "vue"

const state = reactive({
  strickes: <Strike[]>[],
  goto: window.__GOTO__
})

onMounted(async () => {
  const response = await fetch("/strikes/index.json");
  state.strickes = ParseStrikes(await response.json() as ISetikeJSON[])
})
</script>
