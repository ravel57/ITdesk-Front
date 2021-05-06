<template>
  <div id="chat">
    <client-info/>
    <messages/>
    <replay/>
  </div>
</template>

<script>
import clientInfo from "@/components/chat/clientInfo";
import messages from "@/components/chat/messages";
import replay from "@/components/chat/replay";

export default {
  name: "chat",
  components: {
    clientInfo,
    messages,
    replay,
  },
  mounted() {
    this.$store.state.page = this.$router.currentRoute.name
  }
}
</script>

<style>
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

p {
  margin: 0;
}

#chat {
  /* display: grid; */
  width: 100%;
  position: relative;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
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
  cursor: pointer;
  user-select: none;
}
</style>
