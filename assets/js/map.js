import mapboxgl from '../vendor/mapbox-gl.2.11.0.js'
import {ParseStrikes} from "./lib/strike"

const maxSxaleZoom = 4
const zoomInitial = 4
const zoomPoint = 7
const center = {lat: 55.096375, lng: 37.659041, zoom: zoomInitial}

mapboxgl.accessToken = document.querySelector("meta[name='mabox-token']").getAttribute("content")

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [center.lng, center.lat],
  zoom: center.zoom,
})

map.on('style.load', () => {
  map.setFog({
      color: 'rgb(0, 0, 0)', // Lower atmosphere
      'high-color': 'rgb(0, 0, 0)', // Upper atmosphere
      'horizon-blend': 0, // Atmosphere thickness (default 0.2 at low zooms)
      'space-color': 'rgb(4, 7, 7)', // Background color
      'star-intensity': 0.05 // Background star brightness (default 0.35 at low zoooms )
  })
})

function NewArrowMarker() {
  const $el = document.createElement('div');
  $el.className = 'marker-arrow';
  const $wrapper = document.createElement("div");
  $wrapper.appendChild($el)
  const marker = new mapboxgl.Marker($wrapper)

  map.on('zoom', () => {
    $el.style.zoom = onZoomScale()
  })

  return marker
}

const arrow = NewArrowMarker()

async function load() {
  const url = document.querySelector("meta[name='strikes']").getAttribute("content")
  const response = await fetch(url)
  return ParseStrikes(await response.json())
}

function fly(speed) {
  const tag = document.getElementById("location")
  const point = tag ? {...JSON.parse(tag.textContent), zoom: zoomPoint} : center

  if (point.zoom == zoomPoint) {
    arrow.setLngLat([point.lng, point.lat])
    arrow.addTo(map)
  } else {
    arrow.remove();
  }

  map.flyTo({
    center: [point.lng, point.lat],    
    essential: true,
    zoom: point.zoom,
    speed: speed,
  })
}

function onZoomScale() {
  const zoom = map.getZoom()

  if (zoom >= maxSxaleZoom) {
    return 1
  } else {
    return (1*zoom)/maxSxaleZoom
  }
}

function onClick(strike) {
  var event = new CustomEvent("redirect", { detail: { "url": strike.permalink }})
  document.dispatchEvent(event)
}

document.addEventListener('pjax:complete', () => fly(1));
fly(1000);

(async function(){  
  const strikes = await load()

  strikes.forEach((strike) => {
    const $el = document.createElement('div');
    $el.className = strike.outdated ? 'marker-smoke' : 'marker-fire';
    $el.title = strike.title
    $el.style.cursor = 'pointer'
    $el.onclick = function() {
      onClick(strike);
    }
    const $wrapper = document.createElement("div");
    $wrapper.appendChild($el)
    new mapboxgl.Marker($wrapper)
      .setLngLat([strike.lng, strike.lat])
      .addTo(map)

    map.on('zoom', () => {
      $el.style.zoom = onZoomScale()
    })
  });
})();
