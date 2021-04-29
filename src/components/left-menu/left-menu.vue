<template>
  <div id="left-side">
    <div id="filters">
      <!--      <span class="filter_button">-->
      <!--          <img src="@/images/toList.png" style="transform: scale(0.85)">-->
      <!--      </span>-->
      <!--      <span class="filter_button">-->
      <!--          <img src="@/images/viewSettings.png" style="margin: 8px 0; transform: scale(1.1);">-->
      <!--      </span>-->
      <!--      <span class="filter_button">-->
      <!--          <img src="@/images/search.png" style="transform: scale(0.8)">-->
      <!--      </span>-->
      <!--      <span class="filter_button">-->
      <!--          <a href="/"><img src="@/images/refresh.png" style="transform: scale(1.25)"></a>-->
      <!--      </span>-->
      <span class="filter_button icon" @click="back">
        <p>arrow_back</p>
      </span>
      <span class="filter_button icon" @click="changeView">
        <p v-text="listViewTypes ? 'view_list' : 'dashboard'" href=""></p>
      </span>
      <span class="filter_button icon">
        <p style="top: -7px;">settings_suggest</p>
      </span>
      <span class="filter_button icon">
        <p>search</p>
      </span>
      <span class="filter_button icon">
        <a href="" style="text-decoration: none; color: #000">refresh</a>
      </span>
    </div>
    <div class="left-side-menu-component">1</div>
    <div class="left-side-menu-component">2</div>
    <div class="left-side-menu-component">3</div>
    <div class="left-side-menu-component">4</div>
    <div class="left-side-menu-component">5</div>
    <div class="left-side-menu-component">6</div>
  </div>
</template>

<script>
export default {
  name: "leftMenu",
  data() {
    return {
      listViewTypes: true
    }
  },
  methods: {
    changeView() {
      this.listViewTypes = !this.listViewTypes;
    },
    back(){
      history.back()
    }
  }

}
</script>

<style scoped>
#left-side {
  /*height: 100%;*/
  width: 250px;
  /* width: 40vw; */
  /* max-width: 250px; */
  padding: 1px 1px;
  border-right: 1px solid #adb2b2;
  /* width: 500px; */
  /* height: 100%; */
  /* border: dashed 2px gray; */
}

#filters {
  height: 40px;
  width: 250px;
  /*width: 250px;*/
  margin: 5px 0;
  /*border: 0 solid #adb2b2;*/
  /*box-sizing: border-box;*/
  border-radius: 3px;
  display: flex;
  /*margin: auto;*/
  /*border-top: 1px solid rgba(0, 0, 0, 0.3);*/
  /*border-bottom: 1px solid rgba(0, 0, 0, 0.3);*/
}

/*div.inline {*/
/*    float: left;*/
/*}*/

/*#filters img {*/
/*    width: 40px;*/
/*}*/

/*#filters td:hover {*/
/*    box-shadow: 0 0 2px 1px #adb2b2;*/
/*    background-color: #f2f8f8;*/
/*}*/

.filter_button {
  height: 100%;
  width: 18%;
  text-align: center;
  border: 1px solid #adb2b2;
  box-sizing: border-box;
  border-radius: 3px;
  margin: 0 3px;
  cursor: pointer;
  user-select: none;
}

.filter_button p {
  position: relative;
  top: -5px;
}

.filter_button a {
  position: relative;
  top: -5px;
}

.filter_button:hover {
  box-shadow: 0 0 2px 1px #adb2b2;
  background-color: #f2f8f8;
}

.left-side-menu-component {
  height: 30px;
  /*width:100%;*/
  margin: 5px 5px;
  border: 1px solid #adb2b2;
  box-sizing: border-box;
  border-radius: 3px;
  /*border-bottom: 1px solid rgba(0, 0, 0, 0.3);*/
}

.left-side-menu-component:hover {
  box-shadow: 0 0 2px 1px #adb2b2;
  background-color: #f2f8f8;
}


button {
  display: none;
}


/*@media (device-width: 700px) {*/
/*    !* магия *!*/
/*    button {*/
/*        display: block;*/
/*    }*/

/*    #left-side {*/
/*        display: none;*/
/*    }*/
/*}*/

@media screen and (max-width: 992px) {
  #left-side {
    display: none;
  }
}

.icon {
  font-size: 40px;
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1.26;
  text-transform: none;
  letter-spacing: normal;
  justify-content: center;
  display: flex;
  /*color: #fff;*/
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}

</style>
