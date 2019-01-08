<template>
  <b-container fluid id="results" class="h-100">
    <b-row class="h-100">
      <b-col cols="4">
        <h2>Results</h2>
      </b-col>
      <b-col cols="8">
        <Map :layers="layers" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Map from '@/components/Map.vue'
import layers from '@/assets/resultlayers.json'
export default {
  name: 'Results',
  components: { Map },
  data () {
    return {
      layers: layers
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>

</style>
