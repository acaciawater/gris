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
    <b-modal id="myModal" ref="myModal" :title="popup.title" hide-footer>
      <div>
        <p v-html="popup.content"></p>
      </div>
    </b-modal>
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

let popupContent = {
  address: { title: 'Water Risk Map', content: '', url: 'info/riskmap.html' },
  shallow_deep: { title: 'Shallow or deep?', content: '', url: 'info/shallowdeep.html' },
  landcover: { title: 'Land use', content: '', url: 'info/landuse.html' },
  usegw: { title: 'Groundwater use', content: '', url: 'info/groundwater.html' },
  generates_waste: { title: 'Waste', content: '', url: 'info/waste.html' },
  surface: { title: 'Surface water', content: '', url: 'info/surface.html' }
}

export default {
  name: 'MySurvey',
  components: { Map },
  data () {
    return {
      survey: model,
      layers: layers,
      popup: {
        title: 'Popup title',
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'
      }
    }
  },
  mounted () {
    let vm = this

    model.onValueChanged.add((sender, options) => {
      this.$store.dispatch('survey', sender.data)
    })

    model.onComplete.add(result => {
      // console.debug('Saving', result)
      this.$store.dispatch('survey', result.data)
      this.survey.clear(false, false)
      this.$router.push('results')
    })

    model.onAfterRenderQuestion.add(function (survey, options) {
      if (options) {
        let question = options.question
        const anchor = options.htmlElement.querySelector('h5>span>span')
        if (question.popup) {
          let existingElement = anchor.querySelector('.infobutton')
          // console.log(existingElement)
          if (!existingElement) {
            let btn = document.createElement('button')
            btn.className = 'infobutton'
            btn.setAttribute('type', 'button')
            btn.onclick = function () {
              const popup = popupContent[question.name]
              if (popup.content === '') {
                popup.content = 'Loading...'
                vm.$http.get(popup.url)
                  .then(response => {
                    // console.log(result)
                    popup.content = response.data
                  })
                  .catch((error) => {
                    popup.content = error.response.data
                  })
              }
              vm.popup = popup
              let modal = vm.$refs.myModal
              if (modal) {
                // when page is revisited, modal is undefined ?!
                modal.show()
              }
            }
            btn.innerHTML = 'info'
            anchor.appendChild(btn)
          }
        }
      }
    })
  },
  methods: {
  }
}
</script>

<style>
.infobutton {
  /* background: rgb(7, 1, 95) !important; */
  min-width: 20px !important;
  padding: 0 1em !important;
  float: right !important;
}
.modal-dialog {
  max-width: 40% !important;
}
</style>
