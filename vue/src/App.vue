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
import {onBeforeUnmount, onMounted, reactive} from "vue"
import { IGoto } from './lib/Goto';

const state = reactive({
  strickes: <Strike[]>[],
  goto: <IGoto | null>null
})

onMounted(async () => {
  const response = await fetch("/strikes/index.json");
  state.strickes = ParseStrikes(await response.json() as ISetikeJSON[])
})

onMounted(() => {
  document.addEventListener('pjax:complete', go)
  go()
})

onBeforeUnmount(() => {
  document.removeEventListener('pjax:complete', go)
})

function go() {
  const tag = document.getElementById("location")
  state.goto = tag ? JSON.parse(tag.textContent!) : null
}
</script>
