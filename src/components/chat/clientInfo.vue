<template>
  <div class="client-info">
    <div style="display: flex">
      <div>
        <span class="client" style="display: flex">
          <!--<p @click="changeFirstName" ref="firstName"> {{ firstName }} </p>-->
          <span
              @click="firstNameEditable"
              @keydown.enter="changeFirstName"
              @keydown.esc="cancelChangeFirstName"
              :class="{'editable' : firstNameEditeble}"
              ref="firstName">
            <p
                v-if="client.firstName"
                v-text="client.firstName"
            />
            <p
                v-else
                style="color: #adb2b2"
                v-text="'Имя'"
            />
          </span>
          <span
              @click="lastNameEditable"
              @keydown.enter="changeLastName"
              @keydown.esc="cancelChangeLastName"
              ref="lastName"
              :class="{'editable' : lastNameEditeble}"
          >
            <p
                v-if="client.lastName"
                v-text="client.lastName"
            />
            <p
                v-else
                style="color: #adb2b2"
                v-text="'Фамилия'"
            />
          </span>
          <p style="font-size: 0.7em; margin-bottom: 6px;">
            {{ organization }}
          </p>
        </span>
<!--        <div style="display: flex">-->
<!--          <div class="client-field"> Кастомное поле 1 </div>-->
<!--          <div class="client-field"> Кастомное поле 2 </div>-->
<!--          <div class="client-field"> Кастомное поле 3 </div>-->
<!--          <div class="client-field"> Кастомное поле 4 </div>-->
<!--        </div>-->
      </div>
      <div style="margin-left: auto; margin-right: 10px; color: #000; margin-top: auto;" class="icon">
        search
      </div>
    </div>
    <div style="height: 20px" v-if="selectedMessages.length">
      <button @click="pinMessageToTask">Прикрепить к задаче</button>
      <button @click="removeSelection">Снять выделение</button>
      {{ selectedMessages }}
      {{ 'pinMessageToTaskActiv: ' + this.$store.getters.pinMessageToTaskActive }}
      {{ '[' + this.$store.getters.SELECTEDMESSAGES.length + ']' }}
    </div>
    <div v-else style="height: 20px"/>
  </div>
</template>

<script>
import {sendClient} from "@/util/ws";
import axios from "axios";

export default {

  name: "clientInfo",

  data() {
    return {
      firstNameEditeble: false,
      lastNameEditeble: false,
      // client: {
      //   id: 11,
      //   firstName: "firstName",
      //   lastName: 'lastName',
      //   organization: 'organization',
      //   lastMessageDateTime: 1619962500000,
      //   tasks: [{text: '123'}, {text: '123'}, {text: '123'}]
      // },
    }
  },

  mounted: async function () {
    try {
      const divName = 'client'
      this.$store.state.client = JSON.parse(document.getElementById(divName)
          .getAttribute(divName).replaceAll('\'', '\"'))
      document.getElementById(divName).remove();
    } catch {
      await axios.get('/api/v1/client/' + this.$route.params.id)
          .then(response => (this.$store.state.client = response.data))
    }
  },

  methods: {
    pinMessageToTask() {
      this.$store.commit('pinMessageToTask')
    },

    removeSelection() {
      this.$store.commit('removeSelection')
    },

    changeFirstName() {
      this.$refs.firstName.setAttribute('contenteditable', 'false')
      this.firstNameEditeble = false
      this.client.firstName = this.$refs.firstName.innerText
      sendClient(this.client)
    },
    changeLastName() {
      this.$refs.lastName.setAttribute('contenteditable', 'false')
      this.lastNameEditeble = false
      this.client.lastName = this.$refs.lastName.innerText
      sendClient(this.client)
    },

    firstNameEditable() {
      this.$refs.firstName.setAttribute('contenteditable', 'true')
      this.firstNameEditeble = true
      console.log(this.firstNameEditeble)
    },
    lastNameEditable() {
      this.$refs.lastName.setAttribute('contenteditable', 'true')
      this.lastNameEditeble = true
    },

    cancelChangeFirstName() {
      this.$refs.firstName.setAttribute('contenteditable', 'false')
      this.firstNameEditeble = false
      this.$refs.firstName.innerText = this.client.firstName
    },
    cancelChangeLastName() {
      this.$refs.lastName.setAttribute('contenteditable', 'false')
      this.lastNameEditeble = false
      this.$refs.lastName.innerText = this.client.lastName
    },
  },

  computed: {
    client() {
      return this.$store.getters.CLIENT
    },
    // firstName() {
    //   // return this.client.firstName
    //   return this.$store.getters.CLIENT.firstName
    // },
    // lastName() {
    //   // return this.client.lastName
    //   return this.$store.getters.CLIENT.lastName
    // },
    organization() {
      return this.$store.getters.CLIENT.organization
    },
    firstNameEditeble() {
      return this.client.firstNameEditeble
    },
    selectedMessages() {
      return this.$store.getters.SELECTEDMESSAGES
    }
  }

}

</script>

<style scoped>
.client-info {
  width: 100%;
  /* max-height: 60px; */
  /*height: 70px;*/
  /*height: auto;*/
  border-bottom: 1px solid #adb2b2;
  /*display: flex;*/
  padding-bottom: 10px;
}

.client-info .client {
  font-size: 1.2em;
}

.client-info p {
  margin: 1px 5px;
}

.editable {
  border: 1px solid red;
  border-radius: 3px;
  margin: 0 4px;
}

.client-info .client-field {
  border: 1px solid #adb2b2;
  border-radius: 3px;
  padding: 1px;
  margin: 1px 3px;
}

button {
  height: 20px;
  margin: 1px;
}
</style>
