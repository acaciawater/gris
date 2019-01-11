<template>
  <b-container fluid class="h-100">
    <b-row class="h-100">
      <b-col cols="5">
        <results></results>
      </b-col>
      <b-col cols="7">
        <Map :layers="layers" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Map from '@/components/Map.vue'
import layers from '@/assets/resultlayers.json'
import Results from '@/components/Results.vue'

export default {
  name: 'ResultsPage',
  components: { Map, Results },

  data () {
    return {
      layers: layers // layers on the map
    }
  }
}
</script>

<style scoped>
</style>
