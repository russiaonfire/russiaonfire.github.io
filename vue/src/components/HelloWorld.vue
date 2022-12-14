<template>
  <MapboxMap 
    map-style="mapbox://styles/mapbox/light-v11"
    access-token="pk.eyJ1IjoicG9zaXRpdmVhZ2VuZGEiLCJhIjoiY2xibXUzNjl4MGxtazNwcHE1Y3A0dGF2eiJ9.QVcg1g8ycABbRqnMTAoi4g" 
    ref="$map"
    :center="[center.lng, center.lat]"
    :zoom="zoom"
    @mb-created="(instance: any) => map = instance" 
    @mb-zoom="onZoom"
    >

    <MapboxMarker
      v-for="strike in strikes" 
      :lng-lat="[strike.lng, strike.lat]"
    >
      <CanvasSmoke 
        v-if="strike.outdated"
        :style="{scale: scale}" 
      />
      <CanvasFire 
        v-else
        :style="{scale: scale}" 
      />
    </MapboxMarker>
  </MapboxMap>
</template>

<script setup lang="ts">
// @refs
// 1) https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:zoom
// 2) https://vue-mapbox-gl.studiometa.dev/components/MapboxMap/#props
// @ts-ignore
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import { ref } from 'vue'
import CanvasFire from './CanvasFire.vue'
import CanvasSmoke from './CanvasSmoke.vue'
import { Strike } from '@/lib/Strike'
import 'mapbox-gl/dist/mapbox-gl.css'

const props = defineProps<{
  strikes: Strike[],
  zoom: number,
  center: {lat: number, lng: number}
}>()

const map = ref();
const scale = ref(1)
const maxSxaleZoom = 4

function onZoom() {
  const zoom: number = map.value.getZoom()

  if (zoom >= maxSxaleZoom) {
    scale.value = 1
  } else {
    scale.value = (1*zoom)/maxSxaleZoom
  }
}
</script>
