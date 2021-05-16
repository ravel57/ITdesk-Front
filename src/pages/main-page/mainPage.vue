<template>
  <div id="right-side">
    <div class="right-side-column">
      <div v-for="(client, index) in clients">
        <router-link
            :to="{name: 'chat', params: {id: client.id}}"
            class="client-card"
            :class="{ 'unreaded' : !client.readed}"
        >
          <!--          card-header-->
          <div class="client-card-info" style="border-bottom: 1px solid #adb2b2; display: flex ">
            <span
                class="organization"
                v-text="client.organization"
            />
            <span class="name" style="display: flex;">
              <p v-if="client.firstName" style="margin-left: 3px;">{{ client.firstName }}</p>
              <p v-if="client.lastName" style="margin-left: 3px;">{{ client.lastName }}</p>
            </span>
          </div>

          <!--          card-tasks-->
          <div
              v-for="task in client.tasks.slice().reverse()"
              class="tasks-list"
          >
            <p>{{ task.text }}</p>
          </div>

          <!--          card-date-->
          <div class="client-card-info date" style="display: flex; border-top: 1px solid #adb2b2">
            <span
                v-if="client.lastMessageType === 'message client'"
                class="date icon"
            > south_east </span>
            <span
                v-else-if="client.lastMessageType === 'message support'"
                class="date icon"
            > north_west </span>
            <!--:style="{transform: (client.lastMessageType == 'message client' ? ': rotate(0deg);' : 'rotate(180deg)')}" v-text="input"-->
            <span
                class="date"
                :style="{color: dateTimeDifColor(client.lastMessageDateTime) }"
                style="margin-left: 0;"
            > {{ client.lastMessageDifTime }} </span>
            <span
                class="date"
                style="margin-left: 0;"
            > {{ "(" + getClientLastMessageDateTime(client) + ")" }} </span>
          </div>

        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "mainPage",
  data() {
    return {
      // clients: [
      //   {
      //     id: 11,
      //     firstName: "123",
      //     lastName: '123',
      //     organization: '',
      //     lastMessageDifTime: 0,
      //     lastMessageDateTime: 1620232769504,
      //     lastMessageType: 'input',
      //     tasks: [{text: '123'}, {text: '123'}, {text: '123'},],
      //   },
      //   {
      //     id: 12,
      //     firstName: "234",
      //     lastName: '243',
      //     organization: '',
      //     lastMessageDifTime: 0,
      //     lastMessageDateTime: 1619962800000,
      //     lastMessageType: 'output',
      //     tasks: [{text: '123'}, {text: '123'}, {text: '123'},],
      //   },
      // ],
    }
  },

  mounted: async function () {
    try {
      const divName = 'clients'
      this.$store.state.clients = JSON.parse(
          document.getElementById(divName).getAttribute(divName).replaceAll('\'', '\"')
      )
      document.getElementById(divName).remove();
    } catch {
      await axios.get('/api/v1/clients/')
          .then(response => (this.$store.state.clients = response.data))
    }

    this.$store.state.clients.forEach(e => {
      e.lastMessageDateTime = new Date(e.lastMessageDateTime)
      e.lastMessageDifTime = Date.now() - e.lastMessageDateTime
    })
    this.startDateTimeDif()

    this.$store.state.page = this.$router.currentRoute.name
    this.$store.commit('clearChat')
  },


  methods: {
    getClientLastMessageDateTime(client) {
      let options = {hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric'}
      return new Date(client.lastMessageDateTime).toLocaleDateString("ru-RU", options)
    },

    startDateTimeDif() {
      this.$store.state.clients.forEach(e => {
        e.lastMessageDifTime = this.getDateTimeDif(e.lastMessageDateTime)
      })
      setInterval(() => {
        this.$store.state.clients.forEach(e => {
          e.lastMessageDifTime = this.getDateTimeDif(e.lastMessageDateTime)
        })
      }, 500);
    },

    getDateTimeDif(date) {
      // let date = this.clients[index].lastMessageDateTime
      let out = ''
      let d = new Date(Date.now() - date)
      let b = false
      if (d.getUTCMonth()) {
        out += d.getUTCMonth() + 'мес '
        b = true
      }
      if (d.getUTCDate() - 1 | b) {
        out += d.getUTCDate() - 1 + 'д '
        b = true
      }
      if (d.getUTCHours() | b) {
        out += d.getUTCHours() + 'ч '
        b = true
      }
      if (d.getUTCMinutes() | b) {
        out += d.getUTCMinutes() + 'м '
        b = true
      }
      // if (d.getUTCSeconds() | b) {
      //   out += d.getUTCSeconds() + 'c '
      //   b = true
      // }
      if (!b) {
        out = '< 1м'
      }
      return out
    },

    dateTimeDifColor(d) {
      d = new Date((Date.now() - new Date(d)) / 60000)
      // console.log(d)
      if (d < 1) {
        return 'cadetblue'
      } else if (d < 5) {
        return 'darkcyan'
      } else if (d < 15) {
        return 'coral'
      } else {
        return 'red'
      }
    }
  },

  computed: {
    clients() {
      // return this.clients()
      return this.$store.getters.CLIENTS
    },

  }
}
</script>

<style scoped>
body {
  /*font-family: 'Ubuntu';*/
  height: 100%;
  padding: 0;
  margin: 0;
  display: block;
}

.main-frame {
  /*width: 100%;*/
  height: calc(100% - 51px);
  display: flex;
  background-color: #f8ffff;
}

#right-side {
  height: 100%;
  /*width: 100%;*/
  padding: 10px;
  /*margin-top: 10px;*/
  box-sizing: border-box;
  display: flex;
  overflow: auto;
  /*flex-direction: column;*/
  /*border-bottom: 1px solid #adb2b2;*/
}

/*#right-side p {*/
/*    margin-left: 10px;*/
/*}*/

.right-side-body {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: auto;
  /*border: 1px solid #adb2b2;*/
}

.right-side-column {
  width: 100%;
  min-width: 400px;
  margin: 0 5px;
}

.client-card {
  display: block;
  width: auto;
  min-height: 50px;
  margin: 10px 0;
  border: 1px solid #adb2b2;
  box-sizing: border-box;
  border-radius: 6px;
  color: #4a4c4c;
  text-decoration: none
  /*border-bottom: 1px solid rgba(0, 0, 0, 0.3);*/;
  padding: 5px 0;
}

.client-card .client-card-info .date {
  margin-right: 10px;
  margin-left: auto;
  font-size: 13px;
}

/*.client-card client-card-info.date {*/
/*  border-top: 1px solid #adb2b2;*/
/*  !*display: flex;*!*/
/*  !*align-content: flex-end;*!*/
/*  !*justify-content: flex-end;*!*/
/*  margin-right: 10px;*/
/*  margin-left: auto;*/
/*  font-size: 13px;*/
/*  width: 100%;*/
/*  !*font-weight: bold;*!*/
/*}*/

.organization {
  margin-left: 10px;
  margin-right: auto;
  /*color: darkcyan;*/
}

.name {
  margin-right: 10px;
  margin-left: auto;
}

.tasks-list {
  /* font-weight: bold; */
  padding: 0 11px;
  font-size: 16px;
}

.tasks-list p {
  margin: 3px 0;
}

.client-card:hover {
  box-shadow: 0 0 2px 1px #adb2b2;
  background-color: #f2f8f8;
  /*font-weight: bold;*/
}

.unreaded {
  font-weight: bold;
  /*background: #d64040;*/
}
</style>
