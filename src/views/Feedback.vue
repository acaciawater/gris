<template>
  <b-container fluid id="wrapper">
    <div class="row">
        <h3 class="col-6 mb-4">Send Feedback</h3>
    </div>
    <div class="row">
      <b-form class="form col-6" @submit.prevent="sendFeedback">
        <b-form-group>
          <div class="p-2">
            <label for="subject">Subject</label>
            <b-form-input
              class="form-control"
              id="subject"
              required
              type="text"
              v-model="subject"
              placeholder="Subject"/>
          </div>
          <div class="p-2">
            <label for="content">Message</label>
            <b-form-textarea
              class="form-control"
              id="content"
              required
              v-model="content"
              placeholder="Message content"
              :rows="10"
              :max-rows="20"/>
          </div>
          <div class="p-2">
            <b-button class="btn btn-success" type="submit">Send</b-button>
          </div>
        </b-form-group>
      </b-form>
    </div>
    <div class="row mt-1">
        <div class="col-6">{{resultMessage}}</div>
    </div>
  </b-container>
</template>

<script>

export default {
  name: 'Feedback',

  data () {
    return {
      subject: 'Groundwater Impact Scan',
      content: '',
      resultMessage: 'This message has not been sent.'
    }
  },

  methods: {
    sendFeedback (evt) {
      let token = sessionStorage.getItem('token')
      let config = { headers: { Authorization: 'JWT ' + token } }
      let data = { message: this.content }
      this.$http.post('/api/v1/feedback/', data, config)
        .then(response => {
          this.resultMessage = 'Thanks for sending your feedback!'
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        })
        .catch(() => {
          this.resultMessage = 'There was an error sending your feedback!'
        })
    }
  }
}
</script>

<style>
.form {
  width: 400px;
  background-color: #f4f7f8;
  border-radius: 8px;
  padding: 10px 20px 10px 10px;
}
#wrapper {
  position: relative;
  top: 10%;
  left: 25%;
}
.form-control {
  background-color: #e8eeef !important;
}
label {
  font-weight: bold;
}
.form-control:focus {
  border-color: rgba(104, 233, 145, 0.67) !important;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(180, 239, 193, 0.53) !important;
  outline: 0 none !important;
}
</style>
