<template>
  <div id="left-side" :class="{'hide-menu': hideMenu}">
    <div id="filters">
      <router-link
          :to="{name: 'main'}"
          class="filter_button icon"
          v-if="$store.getters.PAGE === 'chat'"
          style="margin-left: 0"
      >
        <!--arrow_back-->
        <p>home</p>
      </router-link>
<!--      <span class="filter_button icon" @click="changeView">-->
<!--        <p v-text="listViewTypes ? 'view_list' : 'dashboard'" href=""></p>-->
<!--      </span>-->
<!--      <span-->
<!--          class="filter_button icon"-->
<!--      ><p style="top: -7px;">settings_suggest</p>-->
<!--      </span>-->
<!--      <span-->
<!--          class="filter_button icon"-->
<!--          style="margin-right: 0">-->
<!--        <p>search</p>-->
<!--      </span>-->
      <!--      <span class="filter_button icon">-->
      <!--        <a href="" style="text-decoration: none; color: #000">refresh</a>-->
      <!--      </span>-->
    </div>
<!--    <div class="left-side-menu-component">1</div>-->
<!--    <div class="left-side-menu-component">2</div>-->
<!--    <div class="left-side-menu-component">3</div>-->
<!--    <div class="left-side-menu-component">4</div>-->
<!--    <div class="left-side-menu-component">5</div>-->
<!--    <div class="left-side-menu-component">6</div>-->
  </div>
</template>

<script>
export default {
  name: "leftMenu",
  data() {
    return {
      listViewTypes: true,
    }
  },

  methods: {
    changeView() {
      this.listViewTypes = !this.listViewTypes;
    },

    back() {
      history.back()
    },

  },

  computed: {
    hideMenu() {
      return this.$store.getters.hideMenu
    }
  },

  mounted() {
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
  width: 240px;
  /*width: 250px;*/
  margin: 5px;
  /*border: 0 solid #adb2b2;*/
  /*box-sizing: border-box;*/
  border-radius: 3px;
  display: flex;
  /*margin: auto;*/
  /*border-top: 1px solid rgba(0, 0, 0, 0.3);*/
  /*border-bottom: 1px solid rgba(0, 0, 0, 0.3);*/
  /*justify-content: space-evenly;*/
  justify-content: space-between;
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
  color: black;
  height: 100%;
  width: 100%;
  /*width: 18%;*/
  text-align: center;
  border: 1px solid #adb2b2;
  box-sizing: border-box;
  border-radius: 3px;
  margin: 0 3px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
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

#left-side.hide-menu {
  display: none;
}

@media screen and (max-width: 992px) {

  #left-side {
    display: none;
  }

  #left-side.hide-menu {
    display: block;
    z-index: 1;
    position: absolute;
    height: calc(100% - 43px);
    background: #fff;
  }

}

</style>
