<template>
  <div class="reply">
        <textarea class="input-textarea"
                  v-model="messageText"
                  placeholder="Сообщение"
                  @keydown.ctrl.enter="sendMessage"
                  type="text"
        ></textarea>
    <div class="reply send-button">
      <span class="icon" style="color: #fff" @click="sendMessage">send</span>
    </div>
  </div>
</template>

<script>
import {sendMessage} from "@/util/ws";
import messages from "@/components/central-side/chat/messages";

export default {
  name: "replay",
  // props: ['messages'],
  // components: {
  //   messages,
  // },
  data() {
    return {
      'messageText': '',
    }
  },
  methods: {
    sendMessage() {
      if (this.messageText > '') {
        let newMessage = {
          id: this.$store.getters.MESSAGES.length,
          clientId: this.$store.getters.CLIENT.id,
          supportId: 1,
          text: this.messageText,
          messageType: "message support"
        }
        this.$store.commit('newMessage', newMessage)
        try {
          sendMessage(newMessage)
        } catch {
          alert('server error')
        }
        this.messageText = ''

        let element = document.getElementById("messages")
        let h = element.scrollHeight
        setTimeout(() => {
          if (element.scrollTop + element.clientHeight + 300 >= h)
            element.scrollTop = element.scrollHeight
        }, 20)
        // console.log(element.scrollHeight)
      }
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


</style>
