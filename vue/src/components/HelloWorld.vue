<template>
  <MapboxMap 
    map-style="mapbox://styles/mapbox/dark-v11"
    access-token="pk.eyJ1IjoicG9zaXRpdmVhZ2VuZGEiLCJhIjoiY2xibXUzNjl4MGxtazNwcHE1Y3A0dGF2eiJ9.QVcg1g8ycABbRqnMTAoi4g" 
    @mb-created="onCreated"
    @mb-zoom="onZoom"
    >

    <MapboxMarker
      v-if="arrow"
      :lng-lat="[center.lng, center.lat]"
    >
      <CanvasArrow         
        :style="{scale: scale}" 
      />
    </MapboxMarker>

    <MapboxMarker
      v-for="strike in strikes" 
      :lng-lat="[strike.lng, strike.lat]"
    >
      <CanvasSmoke 
        v-if="strike.outdated"
        :style="{scale: scale}"
        @click="onClick(strike)"
      />

      <CanvasFire 
        v-else
        :style="{scale: scale}"
        @click="onClick(strike)"
      >      
      </CanvasFire>
    </MapboxMarker>
  </MapboxMap>
</template>

<script setup lang="ts">
// @refs
// 1) https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:zoom
// 2) https://vue-mapbox-gl.studiometa.dev/components/MapboxMap/#props
// @ts-ignore
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import { ref, watch, nextTick } from 'vue'
import CanvasFire from './CanvasFire.vue'
import CanvasSmoke from './CanvasSmoke.vue'
import CanvasArrow from './CanvasArrow.vue'
import { Strike } from '@/lib/Strike'
import 'mapbox-gl/dist/mapbox-gl.css'
import { IGotoZoom } from '@/lib/Goto'

const props = defineProps<{
  strikes: Strike[],
  center: IGotoZoom,
  arrow: boolean
}>()

const map = ref()
const scale = ref(1)
const maxSxaleZoom = 4

watch([() => props.center, () => map], 
([newCenter, newMap], [prevCenter, prevMap]) => {  
  if (!newMap.value) return

  newMap.value.flyTo({
    center: [newCenter.lng, newCenter.lat],    
    essential: true,
    zoom: newCenter.zoom,
    speed: 1,
  })
})

// on mapbox initialized
function onCreated(instance: any) {
  map.value = instance
  map.value.flyTo({
    center: [props.center.lng, props.center.lat],  
    zoom: props.center.zoom,
    essential: true,
    speed: 20,
  })
}

function onZoom() {
  const zoom: number = map.value.getZoom()

  if (zoom >= maxSxaleZoom) {
    scale.value = 1
  } else {
    scale.value = (1*zoom)/maxSxaleZoom
  }
}

function onClick(strike: Strike) {
  var event = new CustomEvent("redirect", { detail: { "url": strike.permalink }})
  document.dispatchEvent(event)
}
</script>
