<template>
  <b-container fluid id="survey" class="h-100">
    <b-row class="h-100">
      <b-col cols="4">
        <h2>Survey</h2>
        <survey :survey="survey"></survey>
      </b-col>
      <b-col cols="8">
        <!-- <h2>Water risk map</h2> -->
        <Map :layers="layers"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Map from '@/components/Map.vue'
import { Model, JsonObject } from 'survey-vue'
import 'survey-vue/survey.css'
import newSurvey from '@/assets/survey.json'
import layers from '@/assets/surveylayers.json'

JsonObject.metaData.addProperty('question', 'popup:text')
let model = new Model(newSurvey)

export default {
  name: 'MySurvey',
  components: { Map },
  data () {
    return {
      survey: model,
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
