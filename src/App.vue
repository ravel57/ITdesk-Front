<template>
  <div style="height: 100%; width: 100%">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu">
    <menuHeader/>
    <div style="display: flex; height: calc(100% - 41px);">
      <left-menu/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import {addHandler} from '@/util/ws'
import menuHeader from "@/components/header/menuHeader"
import leftMenu from "@/components/left-menu/left-menu";
import mainPage from "@/pages/main-page/mainPage";
import chatPage from "@/pages/chat-page/chatPage";

export default {


  components: {
    menuHeader,
    leftMenu,
    mainPage,
    chatPage
  },
  data() {
    return {}
  },
  mounted: function () {
  }


  // created() {
  //   addHandler(data => {
  //     let index = getIndex(this.messages, data.id)
  //     if (index > -1) {
  //       this.messages.splice(index, 1, data)
  //     } else {
  //       this.messages.push(data)
  //     }
  //   })
  // }

}

</script>

<style lang="scss">
body {
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: 'Ubuntu';
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
