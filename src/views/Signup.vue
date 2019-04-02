<template>
<div class="h-100">
  <div id="hnav">
    <li>
      <img src="@/assets/rvo-logo.png"/>
    </li>
  </div>

  <b-container  class="d-flex justify-content-center align-items-center h-100">
    <div>
      <h3 class="caption">Signup</h3>
      <b-form @submit.prevent="onSubmit">
        <b-form-group>
          <label for=email>Email address</label>
          <b-input
            id="email"
            required
            v-model="email"
            type="text"
            placeholder="email"
            v-on:change="onChange"
          />
          <div v-show="hasError('email')" class="alert alert-danger">{{errors.email}}</div>
        </b-form-group>
        <b-form-group>
          <label for=password1>Password</label>
          <b-input
            id="password1"
            required
            v-model="password1"
            type="password"
            placeholder="password"
            v-on:change="onChange"
            autocomplete="new-password"
          />
          <div v-show="hasError('password1')" class="alert alert-danger" v-html="errors.password1"></div>
        </b-form-group>
        <b-form-group>
          <label for=password2>Confirm</label>
          <b-input
            id="password2"
            required
            v-model="password2"
            type="password"
            placeholder="confirm password"
            v-on:change="onChange"
            autocomplete="new-password"
          />
          <div v-show="hasError('password2')" class="alert alert-danger" v-html="errors.password2"></div>
        </b-form-group>
        <b-form-group>
          <b-button v-if="busy" disabled class="btn btn-info btn-lg btn-block" type="submit">Please wait...</b-button>
          <b-button v-else class="btn btn-info btn-lg btn-block" type="submit">Register</b-button>
        </b-form-group>
        <div v-show="hasError('server')" class="alert alert-danger">{{errors.server}}</div>
        </b-form>
    </div>
    <b-modal
      id="modalPopup"
      ref="modalPopup"
      :title="'Succeeded!'"
      @hide="login"
      hide-footer>
      <div>
        <p>You have successfully registered using the email address {{email}}.</p>
        <p>You will receive an email shortly with a verification code.
          Please follow the instructions in the email
          to complete the registration process.</p>
          <p>Thank you for your interest in the Groundwater Impact Scan.</p>

      </div>
    </b-modal>
  </b-container>
</div>
</template>

<script>

export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      password1: '',
      password2: '',
      email: '',
      busy: false, // true when waiting for response from auth server
      errors: {},
      completed: false // true when signed up successfully
    }
  },

  methods: {
    hasError (field) {
      return field in this.errors
    },
    hasErrors () {
      return Object.keys(this.errors).length > 0
    },
    clearErrors () {
      this.errors = {}
    },
    validate () {
      // eslint-disable-next-line no-useless-escape
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      this.clearErrors()
      if (pattern.test(this.email) === false) {
        this.errors['email'] = 'A valid email address is required.'
      } else if (this.password1.length < 8) {
        this.errors['password1'] = 'Password should be at least 8 characters long.'
      } else if (this.password1 !== this.password2) {
        this.errors['password2'] = "Passwords don't match."
      }
      return !this.hasErrors()
    },
    signup () {
      return this.$http.post('/auth/registration/', {
        username: this.email,
        email: this.email,
        password1: this.password1,
        password2: this.password2
      })
    },
    onChange () {
      // Clear all errors when changing input
      if (this.hasErrors()) {
        this.clearErrors()
      }
    },
    login () {
      // redirect to login page when signup is complete
      if (this.completed) {
        this.$router.push({ name: 'login' })
      }
    },
    onSubmit () {
      if (this.validate()) {
        this.busy = true
        this.signup()
          .then(response => {
            this.busy = false
            this.completed = true
            console.debug('signup succeeded!')
            // if settings.ACCOUNT_EMAIL_VERIFICATION is optional, then a token is returned
            // else an email message is sent
            sessionStorage.setItem('user', this.email)
            let token = response.data.token
            if (token) {
              sessionStorage.setItem('token', token)
            } else { // if (response.data.details === 'Verification e-mail sent.') {
              this.$refs.modalPopup.show()
            }
          })
          .catch(err => {
            this.busy = false
            console.debug('signup failed')
            if (err) {
              if (err.response) {
                if (err.response.data) {
                  let errors = err.response.data
                  for (const key in errors) {
                    console.error(key, errors[key])
                    errors[key] = errors[key].join('<br>')
                  }
                  this.errors = errors
                } else {
                  console.error(err.response)
                }
              } else if (err.message) {
                console.error(err.message)
                this.errors['server'] = err.message
              } else {
                console.error(err)
              }
            }
          })
      }
    }
  }
}
</script>

<style>
.form-control {
  min-width: 300px;
}

li>img {
  height: 7em;
  padding: 0;
  margin-top: -1em;
  margin-left: 50%;
}

</style>
