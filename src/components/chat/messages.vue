<template>
  <div id="messages" ref="messages">
    <div
        v-for="(message) in messages"
        :text="message.text"
        :key="message.id"
        :class="[message.undelivered ? ' undelivered' : '',  message.messageType]"
        :id="message.id"
    >
      {{ message.text }}
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {

  name: "messages",

  data() {
    return {}
  },

  methods: {},

  mounted: async function () {
    try {
      const divName = 'impmsg'
      this.$store.state.messages = JSON.parse(document.getElementById(divName)
          .getAttribute('messages').replaceAll('\'', '\"'))
      document.getElementById(divName).remove();
    } catch {
      await axios.get('/api/v1/messages/' + this.$route.params.id)
          .then(response => (this.$store.state.messages = response.data))
    }
    setTimeout(() => {
      let element = document.getElementById('messages')
      element.scrollTop = element.scrollHeight;
    }, 1)
  },

  computed: {
    messages() {
      return this.$store.getters.MESSAGES;
    }
  }

}
</script>

<style scoped>
#messages {
  width: 100%;
  overflow: auto;
  /* max-height: calc(100% - 191px); */
  height: 100%;
  /* display: inline-grid; */
  /*border: 1px solid #adb2b2;*/
  display: flex;
  flex-direction: column;
}


.message {
  /*float: left;*/
  min-width: 100px;
  /*width: 40vw;*/
  max-width: 400px;
  border: 1px solid #adb2b2;
  border-radius: 3px;
  padding: 10px;
  word-wrap: break-word;
  /*float: right;*/
  /*word-wrap: break-word;*/
  /*min-height: 10px;*/
  /*max-height: 400px;*/
  position: relative;
  margin: 10px;
  white-space: pre-line;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  word-wrap: break-word;
}

.message.client {
  /*float: right;*/
  margin-left: 10px;
  margin-right: auto;
  background: #edffea;
  /*word-wrap: break-word;*/
}


.message.support {
  margin-left: auto;
  margin-right: 10px;
  background: #f2eaff;
  /*word-wrap: break-word;*/
}

.message.support.undelivered {
  background: #fbfcff;
}

.message p {
  margin: 0;
  overflow: auto;
}

.reply {
  display: flex;
  /*background: blueviolet;*/
  padding: 10px;
  min-height: 30px;
  height: 100%;
  max-height: 100px;
  /* position: absolute; */
  /* bottom: 0; */
  /*width: 100%;*/
  margin-bottom: 0;
}

/*.reply .input {*/
/*    height: 100%;*/
/*    width: calc(100% - 50px);*/
/*    !*width: 100%;*!*/
/*    !*max-width: 100%;*!*/
/*    border: 1px solid #adb2b2;*/
/*    padding: 10px;*/
/*    overflow: auto;*/
/*    box-sizing: border-box;*/
/*}*/

.reply .input-textarea {
  margin: 0px;
  padding: 5px;
  width: 100%;
  height: 100%;
  resize: none;
  font-size: 16px;
}

.reply .send-button {
  /*width: 50px;*/
  background: darkcyan;
  justify-content: center;
  align-items: center;
  font-size: 4em;
  color: white;
  height: auto;
  cursor: pointer;
  user-select: none;
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
