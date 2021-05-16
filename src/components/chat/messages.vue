<template>
  <div id="messages" ref="messages">
    <div
        v-for="(message) in messages"
        :key="message.id"
        :id="message.id"
        class="message"
        :class="[message.undelivered ? ' undelivered' : '', message.selected ? 'selected' : '',  message.messageType]"
    >
      <div v-text="message.text"/>
      <div style="height: 10px; margin-top: 18px">
        <div
            class="date"
            v-text="getMessageDateTime(message.date)"
        />
        <div
            class="icon check-mark"
            @click="selectMessage(message.id)"
        > check_circle
        </div>
      </div>
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

  methods: {
    getMessageDateTime(date) {
      let options = {hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric'}
      return new Date(date).toLocaleDateString("ru-RU", options)
    },

    selectMessage(id){
      // console.log(id)
      this.$store.commit('selectMessage', id)
    }
  },

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
      element.scrollTop = element.scrollHeight + 50
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
  border-radius: 10px;
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

.message .client {
  /*float: right;*/
  margin-left: 10px;
  margin-right: auto;
  background: #edffea;
  /*word-wrap: break-word;*/
}

.message .support {
  margin-left: auto;
  margin-right: 10px;
  background: #f2eaff;
  /*word-wrap: break-word;*/
}

.message .comment {
  margin-left: 100px;
  margin-right: auto;
  background: #fbc0ffad;
  /*word-wrap: break-word;*/
}

.message .support .undelivered {
  background: #fbfcff;
}

.message p {
  margin: 0;
  overflow: auto;
}

.date {
  margin-left: auto;
  margin-right: 10px;
  position: revert;
  font-size: 10px;
  left: 100px;
}

.check-mark {
  display: none;
}

.message:hover .check-mark {
  display: block;
  position: relative;
  transform: scale(0.5);
  top: -30px;
  width: 10px;
  margin-left: auto;
  margin-right: 7px;
}

.message .selected{
  background: #d64040;
}
</style>
