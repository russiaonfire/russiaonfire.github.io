<template>
  <HelloWorld
    :center="state.goto"
    :strikes="state.strickes"
    :arrow="state.goto.zoom == zoomInitial ? false : true"
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
import {onBeforeUnmount, onMounted, reactive, toHandlers} from "vue"
import {IGotoZoom} from './lib/Goto'

const zoomInitial = 4
const zoomPoint = 7
const center: IGotoZoom = {lat: 55.096375, lng: 37.659041, zoom: zoomInitial}

const state = reactive({
  strickes: <Strike[]>[],
  goto: <IGotoZoom>center,
})

onMounted(async () => {
  const url = document.querySelector("meta[name='strikes']")!.getAttribute("content")!
  const response = await fetch(url)
  state.strickes = ParseStrikes(await response.json() as ISetikeJSON[])
})

onMounted(() => {  
  state.goto = getLocation()
  document.addEventListener('pjax:complete', fly)
})

onBeforeUnmount(() => {
  document.removeEventListener('pjax:complete', fly)
})

function fly() {
  state.goto = getLocation()
}

function getLocation(): IGotoZoom {
  const tag = document.getElementById("location")
  if (tag) {
    return {...JSON.parse(tag.textContent!), zoom: zoomPoint}
  }

  return center
}
</script>
