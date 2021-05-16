<template>
  <div class="reply">
        <textarea class="input-textarea"
                  v-model="messageText"
                  :placeholder="placeholder"
                  @keydown.ctrl.enter="sendMessage"
                  type="text"
                  ref="replay"
                  :style="{ 'background': messageTextareaColor }"
        />
    <div class="reply send-button" style="display: block">
      <span class="icon" style="color: #fff" @click="sendMessage">send</span>
      <span class="icon comment" style="color: #fff" @click="changeMessageType">{{ messageType }}</span>
    </div>
  </div>
</template>

<script>
import {sendMessage} from "@/util/ws";
import messages from "@/components/chat/messages";

export default {
  name: "replay",
  // props: ['messages'],
  // components: {
  //   messages,
  // },
  data() {
    return {
      messageText: '',
      messageTextareaColor: '',
      placeholder: 'Сообщение'
    }
  },

  mounted() {
    this.$refs.replay.focus()
  },


  methods: {
    sendMessage() {
      if (this.messageText > '') {
        let newMessage = {
          id: this.$store.getters.MESSAGES.length,
          clientId: this.$store.getters.CLIENT.id,
          supportId: 1,
          text: this.messageText,
          messageType: this.$store.getters.MESSAGETYPE.replace('message ',''),
          date: Date.now()
        }
        this.$store.commit('newMessage', newMessage)
        try {
          sendMessage(newMessage)
        } catch {
          alert('server error')
        }
        this.messageText = ''

        let element = document.getElementById("messages")
        setTimeout(() => {
          element.scrollTop = element.scrollHeight
        }, 20)
        // console.log(element.scrollHeight)
      }
    },

    changeMessageType() {
      this.$store.commit('changeMessageType', '')
      if (this.$store.getters.MESSAGETYPE === 'comment') {
        this.messageTextareaColor = 'aquamarine'
        this.placeholder = 'Комментарий'
      }
      else if (this.$store.getters.MESSAGETYPE === 'message support') {
        this.messageTextareaColor = 'white'
        this.placeholder = 'Сообщение'
      }
    }
  },

  computed: {
    messageType() {
      return this.$store.getters.MESSAGETYPE.replace(' support', '')
    },

    messageTextareaColor() {
      if (this.messageType() === 'comment')
        return 'black'
      else if (this.messageType() === 'message support')
        return 'white'
    }
  }
}
</script>

<style scoped>
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

.input-textarea {
  margin: 0px;
  padding: 5px;
  width: 100%;
  height: 100%;
  resize: none;
  font-size: 16px;
}

.send-button {
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

.comment {
  transform: scale(-0.5, 0.5);
}

</style>
