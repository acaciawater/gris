<template>
<b-container>
  <div class="row">
    <div class="col-10"/>
    <pdf element="root" class="col"/>
  </div>
  <div id="root" class="row">
    <div class="col-12">
      <h2>Survey</h2>
      <survey :survey="survey"></survey>
    </div>
    <div class="col-12">
      <results :popover="false"></results>
    </div>
  </div>
</b-container>
</template>

<script>
import pdf from '@/components/PdfButton.vue'
import Results from '@/components/Results.vue'
import { Model } from 'survey-vue'
import 'survey-vue/survey.css'
import newSurvey from '@/assets/survey.json'
let model = new Model(newSurvey)
model.mode = 'display'
model.isSinglePage = true
model.showProgressBar = 'off'

export default {
  name: 'Export',
  components: { Results, pdf },
  data () {
    return {
      survey: model
    }
  },
  computed: {
    surveyData () {
      return this.$store.getters.survey
    }
  },
  created () {
    this.survey.data = this.surveyData
  }
}
</script>

<style>

</style>
