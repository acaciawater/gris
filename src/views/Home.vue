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
        <b-col>
        <p>Netherlands Enterprise Agency (RVO.nl) administers many projects in the international domain. A full overview can be accessed via <a href="https://aiddata.rvo.nl">aiddata.rvo.nl</a>. Many of these projects rely on groundwater sources, especially the agriculture projects. RVO wants to stimulate discussions on incorporating groundwater assessments in the business approaches and to contribute to relevant awareness raising. Under the support programme of the Sustainable Water Fund (FDW), Acacia Water has been contracted by RVO.nl to develop a Rapid Assessment Groundwater Tool.</p>
        <h5>Rationale</h5>
        <p>Worldwide the agriculture sector consumes approximately 70% of fresh water sources. Industry and household consumption are good for 15% each. Over half of the fresh water supply is being extracted from groundwater sources. Fresh water is becoming a scarce resource. Water availability assessments are becoming more important every day for business sustainability in both agriculture and industry. But important groundwater data is lacking and risk assessments based on water availability are not easy to make. Hence, groundwater assessments in relation to business sustainability is often not carried out.</p>
        <h5>Groundwater Tool</h5>
        <p>This tool is a first but very practical step to get insight in a risk model for businesses making use of groundwater sources at regional scale. It can also easily be applied to any project of program development in which groundwater will play a role. It’s thus explicitly not only meant for the private sector but also for public sector agents who can use the tool for their plan making including plans on water allocation and water management.</p>
        <h5>Pilot</h5>
        <p>The tool has reached its pilot stage. The tool is currently based on global datasets, and though every effort has been made to use the best-available datasets, they may contain inaccuracies. Therefore, we would like to invite you to try the tool and give us feedback by using the feedback form embedded in the tool. We asked a limited amount of public and private organizations to share their feedback with Acacia Water and RVO.nl during 2019. We will use the feedback to develop an improved version of the tool to be widely released in January 2020.</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="signature">
          Mr Michel de Zwart<br>
          Senior Advisor Global Public Goods / Water Division<br>
          Netherlands Enterprise Agency
        </b-col>
        <b-col>
          <router-link class="btn float-right btn-success btn-lg" type="button" to="/survey">Start scan</router-link>
        </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>

<style scoped>
.signature {
  font-size: small;
}
.home {
  position: relative;
  top: 8em;
}

#hnav {
  height: 8em;
  width: 100%;
  position: absolute;
  top: 0;
  left: -1em;
  background-color: white;
  overflow: hidden;
  padding: 0;
}

li>img {
  height: 7em;
  padding: 0;
  margin-top: -1em;
  margin-left: 50%;
}
</style>
