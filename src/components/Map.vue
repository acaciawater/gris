<template>
    <l-map
      ref="map"
      :zoom="zoom"
      :minZoom="2"
      :center="center"
      @update:zoom="updateZoom"
      @update:center="updateCenter"
      @click="setMarker">
      <l-marker :visible="true" :draggable="true" :lat-lng="location" @dragend="moveMarker">
      </l-marker>
    </l-map>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LMarker } from 'vue2-leaflet'
import secrets from '@/assets/secrets.json'

export default {
  name: 'Map',
  components: { LMap, LMarker },
  props: ['layers'],

  data () {
    return {
      address: 'Click on the map to set the project location'
    }
  },

  computed: {
    location () {
      return this.$store.getters.location
    },
    zoom () {
      return this.$store.getters.zoom
    },
    center () {
      return this.$store.getters.center
    }
  },

  mounted () {
    this.setLayers(this.layers)
  },

  methods: {
    addLayer (layer, map) {
      if (layer.type === 'tms') {
        L.tileLayer(layer.url, {
          attribution: layer.attribution,
          // minZoom: layer.minZoom || 3,
          maxZoom: layer.maxZoom || 20
        }).addTo(map)
      } else if (layer.type === 'wms') {
        L.tileLayer
          .wms(layer.url, {
            layers: layer.layer,
            format: 'image/png',
            transparent: true,
            opacity: layer.opacity || 1.0,
            minZoom: layer.minZoom || 3,
            maxZoom: layer.maxZoom || 18
          })
          .addTo(map)
      } else if (layer.type === 'wfs') {
        let options = {
          version: '1.0.0',
          service: 'WFS',
          request: 'GetFeature',
          map: layer.map,
          typename: layer.layer,
          outputFormat: 'GeoJSON'
        }
        this.$http
          .get(layer.url, { params: options })
          .then(response => {
            let layerStyle = layer.style
            L.geoJSON(response.data, {
              style: layer.style,
              onEachFeature: (feature, layer) => {
                layer.bindTooltip(feature.properties.NAME_LONG)
                layer.on('mouseover', () => {
                  layer.setStyle({ color: 'red', weight: 3 })
                  layer.bringToFront()
                })
                layer.on('mouseout', () => {
                  layer.setStyle(layerStyle)
                })
              }
            }).addTo(map)
          })
      }
    },

    setLayers (layers) {
      let map = this.$refs.map.mapObject

      // this.removeLayers(map)
      let id = 0
      layers.forEach(layer => {
        layer.id = ++id // add autoincremented id to layer.
        if (layer.visible) {
          this.addLayer(layer, map)
        }
      })
    },

    updateZoom (zoom) {
      this.$store.dispatch('zoom', zoom)
    },
    updateCenter (center) {
      this.$store.dispatch('center', center)
    },
    // updateBounds (bounds) {
    //   this.$store.dispatch('bounds', bounds)
    // },
    updateLocation (loc) {
      if (loc) {
        this.$store.dispatch('location', [loc.lat, loc.lng])
        this.geocode(loc)
      }
    },

    moveMarker (evt) {
      // sets marker position from marker's dragend event
      this.updateLocation(evt.target.getLatLng())
    },

    setMarker (evt) {
      // sets marker position from map click event
      this.updateLocation(evt.latlng)
    },

    geocode (latlng) {
      // retrieve reverse geocoding information
      let config = {
        params: {
          language: 'en',
          latlng:
            latlng.lat.toFixed(8) +
            ',' +
            latlng.lng.toFixed(8),
          key: secrets.google_api_key
        }
      }
      this.address = 'Locating...'
      // this.$emit('addressChanged', this.address)
      this.$http
        .get('https://maps.googleapis.com/maps/api/geocode/json', config)
        .then(result => {
          if (result.status < 400) {
            const location = result.data.results[0]
            this.address = location ? location.formatted_address : ''
            localStorage.setItem('googleLocation', JSON.stringify(location.address_components));
            console.log(location.address_components)
          } else {
            this.address = ''
          }
        })
        .catch(err => {
          console.error(err)
          this.address = ''
        })
        .finally(() => {
          // this.$emit('addressChanged', this.address)
        })
    }

  }
}
</script>

<style>
</style>
