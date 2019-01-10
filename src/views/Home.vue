<template>
  <div>
      <div id="hnav">
        <li>
          <img src="@/assets/rvo-logo.png"/>
        </li>
      </div>
    <b-container class="home">
      <b-row>
        <b-col>
          <b-img rounded left fluid :src="require('@/assets/img/GroundwaterIrrigation.png')" alt="Thumbnail"/>
        </b-col>
        <b-col>
          <b-img rounded center fluid :src="require('@/assets/img/RuralWaterSupply.png')" alt="Thumbnail"/>
        </b-col>
        <b-col>
          <b-img rounded right fluid :src="require('@/assets/img/SandDam.png')" alt="Thumbnail"/>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <h1>Groundwater Impact Scan</h1>
        <p>Groundwater is by far the largest source of fresh water available for human use, providing drinking water, irrigation, and water for industry. Demand for fresh water is increasing globally due to population growth and economic development, making sustainable use of groundwater resources more important than ever.</p>
        <p>The Groundwater Impact Scan was developed by the Netherlands Enterprise Agency and Acacia Water to increase awareness of the potential impacts development aid projects can have on groundwater resources. </p>
        <p>The tool is based on a questionnaire and a selection of global datasets related to groundwater availability and quality. The questionnaire is designed to be simple and easy to use, and can be completed within minutes. The Groundwater Impact Scan helps project managers, evaluators and the general public gain insight into the groundwater-related risks associated with a particular project in a particular location. These insights can be used to plan and prioritize risk mitigation measures.</p>
        <p>The Groundwater Impact Scan is a first step towards assessing risks to groundwater resources. The tool has been launched as an exploratory beta version so users can provide feedback at an early stage. The feedback will be used to plan future developments of the tool.</p>
      </b-row>
      <router-link class="btn btn-success btn-lg btn-block col-2 mx-auto" type="button" to="/survey">Start scan</router-link>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>

<style scoped>
.home {
  position: relative;
  top: 10em;
}

#hnav {
  height: 8em;
  width: 100%;
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  top: 0; /* Stay at the top */
  left: -1em;
  background-color: white;
  overflow-y: hidden;
  padding: 0;
}

li>img {
  height: 7em;
  padding: 0;
  margin-top: -1em;
  margin-left: 50%;
}
</style>
