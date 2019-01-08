<template>
  <div id="app">
    <div id="nav">
      <router-link title="Home" class="navitem" to="/">
        <fa-icon icon="home" size="2x"/>
      </router-link>
      <router-link title="Questions" class="navitem" to="/survey">
        <fa-icon icon="poll-h" size="2x"/>
      </router-link>
      <router-link title="Results" class="navitem" to="/results">
        <fa-icon icon="file-alt" size="2x"/>
      </router-link>
      <router-link title="Feedback" class="navitem" to="/feedback">
        <fa-icon icon="envelope" size="2x"/>
      </router-link>
      <router-link title="Export" class="navitem" to="/export">
        <fa-icon icon="file-pdf" size="2x"/>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-left: 4em;
}

#nav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 4em; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: rgb(58, 131, 107);
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}

.navitem {
  display: block;
  color: rgb(122, 206, 136);
  padding: 0 1em;
  margin: 1em auto 4em auto;
}

#nav a {
  outline: 0;
}

#nav a.router-link-exact-active {
  color: white;
}
</style>
