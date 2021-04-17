<template>
  <div style="height: 100%; width: 100%">
    <menuHeader/>
    <div style="display: flex; height: calc(100% - 41px);">
      <left-menu/>
      <chat/>
      <tasks/>
    </div>
  </div>
</template>

<script>
import {addHandler} from '@/util/ws'
import menuHeader from "@/components/header/menuHeader"
import leftMenu from "@/components/left-menu/left-menu";
import chat from "@/components/central-side/chat/chat";
import tasks from "@/components/central-side/tasks/tasks";

export default {
  components: {
    menuHeader,
    leftMenu,
    chat,
    tasks,
  },
  data() {
    return {}
  },
  mounted: function () {}


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
}

//#app {
//  font-family: Avenir, Helvetica, Arial, sans-serif;
//  -webkit-font-smoothing: antialiased;
//  -moz-osx-font-smoothing: grayscale;
//  text-align: center;
//  color: #2c3e50;
//}
//
//#nav {
//  padding: 30px;
//
//  a {
//    font-weight: bold;
//    color: #2c3e50;
//
//    &.router-link-exact-active {
//      color: #42b983;
//    }
//  }
//}
</style>
