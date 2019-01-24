<template>
  <div class="row justify-content-center align-items-center h-100">
    <b-form @submit.prevent="save">
      <b-form-group>
        <input
          class="form-control form-control-lg"
          id="project_name"
          required
          v-model="project_name"
          type="text"
          placeholder="Fill in a project name">
      </b-form-group>
      <b-form-group class="mt-4">
        <p>Address: {{googleLocation[0].long_name}}, {{googleLocation[1].long_name}}</p>
      </b-form-group>
      <b-form-group>
        <b-button class="btn btn-success btn-lg btn-block" type="submit">Save</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: 'save',
    data () {
      return {
        project_name: '',
        googleLocation: JSON.parse(localStorage.getItem('googleLocation')) || ''
      }
    },
    methods: {
      save () {
        console.log(JSON.stringify(this.$store.state.survey))
        console.log(JSON.stringify(this.$store.state.map.location))
        let survey = JSON.stringify(this.$store.state.survey)
        let lat = this.$store.state.map.location[0]
        let lng = this.$store.state.map.location[1]
        let data = {
          project: this.project_name,
          location: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          survey: JSON.parse(survey)
        }
        // console.log(data)
        localStorage.setItem('survey', JSON.stringify(data))
        let token = sessionStorage.getItem('token')
        let config = { headers: { Authorization: 'JWT ' + token } }
        this.$http
          .post('/api/v1/survey/', data, config)
          .then(response => {
            console.debug('Successfully saved!')
            console.debug(response)
          })
          .catch(error => {
            let e = error.response.data
            let errormsg = ''
            for (const key in e) {
              errormsg += key + ': ' + e[key].toString()
            }
            console.error(error.response.statusText, errormsg)
          })
      }
    }
  }
</script>

<style scoped>

</style>
