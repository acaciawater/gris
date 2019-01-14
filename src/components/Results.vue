<template>
  <div>
    <h2>
      <span>
        Results
        <fa-icon v-show="popover && comments.length > 0" id="exclamation" class="warning" icon="exclamation-circle" pull="right" size="xs"></fa-icon>
      </span>
    </h2>
    <div v-if="survey">
      <table class="table">
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Risk</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <Indicator
            v-for="(source,index) in indicators"
            :source="source"
            :position="position"
            :key="index+1"
            v-show="source.selected"
            :popup="showModal"
          ></Indicator>
        </tbody>
      </table>
      <Comments v-if="!popover" :comments="comments" :title="title"></Comments>
    </div>
    <div v-else>
      <p>Please complete the survey before requesting results.</p>
    </div>
    <b-modal
      id="modalPopup"
      ref="modalPopup"
      :title="popup.title"
      hide-footer>
      <div>
        <p v-html="popup.content"></p>
      </div>
    </b-modal>
    <b-popover target="exclamation" triggers="hover">
      <template slot="title"><h3>{{title}}</h3></template>
      <Comments :comments="comments" :title="''"></Comments>
    </b-popover>
  </div>
</template>

<script>

import Indicator from '@/components/Indicator.vue'
import luChange from '@/assets/luchange.json'
import Comments from '@/components/Comments.vue'

export default {
  name: 'Results',
  components: { Indicator, Comments },
  props: { popover: { default: true } },
  data () {
    return {
      indicators: [], // todo: move to store
      comments: [], // comments at end of indicator list
      title: 'Remarks', // title for comments section
      popup: { title: 'Title', content: 'Content' } // modal popup when indicator clicked
    }
  },

  mounted () {
    this.fetchIndicators().then(indicators => {
      this.updateResults(this.survey)
      this.$forceUpdate()
    })
  },

  computed: {
    survey () {
      return this.$store.getters.survey
    },
    position () {
      return this.$store.getters.location
    }
  },

  methods: {
    showModal (indicator) {
      this.popup.title = indicator.source.name
      this.popup.content = '<p>Loading...</p>'
      this.$refs.modalPopup.show()
      this.$http.get(indicator.source.info).then(response => {
        this.popup.content = response.data
      })
        .catch(err => {
          this.popup.content = err
        })
    },

    selectAll (indicators) {
      indicators.forEach(indicator => { indicator.selected = true })
    },

    selectNone (indicators) {
      indicators.forEach(indicator => { indicator.selected = false })
    },

    updateResults (survey) {
      this.comments = []
      if (survey) {
        let selected = this.selectIndicators(survey)
        this.indicators.forEach(indicator => {
          indicator.selected = selected.has(indicator.name)
        })
      } else {
        // no survey: select 0 indicators
        this.selectNone(this.indicators)
      }
      this.$forceUpdate()
    },

    async fetchIndicators (url = '/api/v1/indicator/', name = undefined) {
      // retrieve indicator list from backend
      return this.$http.get(url, { 'params': name ? { name: name } : {} })
        .then(response => {
          const indicators = response.data
          this.$store.dispatch('indicators', indicators)
          this.indicators = indicators
          // console.debug(indicators.map(indicator => indicator.name))
          return indicators
        })
    },

    landuseChange (oldLanduse, newLanduse, type) {
      let impactMatrix = luChange[type]
      let index = luChange.Columns.indexOf(newLanduse)
      return index < 0 ? 0 : impactMatrix[oldLanduse][index]
    },

    selectIndicators (data) {
      // select indicators for survey
      let indicators = new Set()
      if (data.usegw === 'yes') {
        // console.log('Groundwater')
        indicators.add('Groundwater stress')
        indicators.add('Recharge')
        indicators.add('Population growth')
        indicators.add('Proximity to wetlands')
        if (data.watersector === 'Drinking water') {
          indicators.add('Arsenic')
          indicators.add('Fluoride')
          indicators.add('Salinity')
          indicators.add('Proximity to the coast')
        } else if (data.watersector === 'Irrigation' || data.watersector === 'Livestock') {
          indicators.add('Arsenic')
          indicators.add('Salinity')
          indicators.add('Proximity to the coast')
        } else if (data.watersector === 'Industry') {
          indicators.add('Salinity')
          indicators.add('Proximity to the coast')
          if (data.industry_type === 'Food') {
            indicators.add('Arsenic')
            indicators.add('Fluoride')
          }
        }
        if (data.shallow_deep !== 'Deep') {
          this.comments.push('Shallow groundwater is generally more vulnerable to contamination.')
        }
        if (data.shallow_deep !== 'Shallow') {
          this.comments.push('Deep groundwater is usually very old and is replenished very slowly. This means that there is a higher risk that groundwater use is non-sustainable. In addition, pumping costs from deep wells can be substantial.')
        }
        if (data.urbanrural === 'Urban') {
          this.comments.push('The wells are planned in an urban area. The risk of groundwater contamination caused by human activities is relatively high in urban areas, so it is advised to thoroughly check groundwater quality before well installation.')
        }
      }
      if (data.generates_waste === 'yes') {
        // console.log('Waste')
        indicators.add('Groundwater vulnerability')
        if (data.treatment_plan === 'no') {
          this.comments.push('Any untreated waste has a risk of contaminating groundwater resources. Therefore, it is crucial that projects have a sound waste (water) treatment or disposal plan.')
        }
      }
      if (data.surface === 'yes') {
        // console.log('Surface water')
        indicators.add('Population density upstream') // not yet available?
        indicators.add('Return flow ratio')
      }
      if (data.landcover === 'yes') {
        // console.log('Landuse')
        let lu1 = data.landuse_now
        let lu2 = data.landuse_future
        // console.log(lu1, lu2)
        let effect = this.landuseChange(lu1, lu2, 'Quantity')
        // console.log('Recharge:', effect)
        if (effect < 0) {
          indicators.add('Recharge')
          indicators.add('Groundwater stress')
          this.comments.push('Replenishment of groundwater resources is expected to decrease as a result of the planned change in land cover. This risk can be mitigated by implementing managed aquifer recharge measures')
        }
        effect = this.landuseChange(lu1, lu2, 'Quality')
        // console.log('Quality:', effect)
        if (effect < 0) {
          indicators.add('Groundwater vulnerability')
          this.comments.push('Surface water quality is expected to be impacted as a result of the planned change in land cover. This can have a negative impact on groundwater quality, especially in areas where the groundwater is vulnerable (see groundwater vulnerability indicator')
        }
      }
      return indicators
    }
  }
}
</script>

<style>
.warning {
  color: red;
  margin-top: 0.3em;
}
.popover {
  max-width: 600px !important;
}
</style>
