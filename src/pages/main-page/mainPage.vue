<template>
  <div id="right-side">
    <div class="right-side-column">
      <div v-for="client in clients">
        <router-link
            class="client-card"
            :to="{name: 'chat', params: {id: client.id}}"
        >
          <div class="client-card-info" style="border-bottom: 1px solid #adb2b2; display: flex ">
            <span class="organization"> {{ client.organization }} </span>
            <span class="name" v-text=""> {{ client.firstName, client.lastName }} </span>
            <br>
          </div>
          <div
              v-for="task in client.tasks"
              class="tasks-list"
          >
            <p>{{ task.text }}</p>
          </div>
          <span class="client-card-date">  {{ getData(client) }} </span>
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
      // clients: [{
      //   id: 11,
      //   firstName: "123",
      //   lastName: '123',
      //   organization: '',
      //   lastMessageDateTime: Date(),
      //   tasks: [{text: '123'}, {text: '123'}, {text: '123'}, ],
      // }]
    }
  },

  mounted: async function () {
    try {
      const divName = 'clients'
      this.$store.state.clients = JSON.parse(
          document.getElementById(divName).getAttribute(divName).replaceAll('\'', '\"')
      )
      console.log(this.$store.getters.CLIENTS)
      document.getElementById(divName).remove();
    } catch {
      await axios.get('/api/v1/clients/')
          .then(response => (this.$store.state.clients = response.data))
    }
  },

  methods: {
    getData(client) {
      let options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
      return new Date(client.lastMessageDateTime).toLocaleDateString("ru-RU", options)
    }
  },

  computed: {
    clients() {
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

.client-card .client-card-date {
  border-top: 1px solid #adb2b2;
  display: flex;
  align-content: flex-end;
  justify-content: flex-end;
  margin-right: 10px;
  margin-left: auto;
  font-size: 13px;
  width: 100%;
  font-weight: bold;
}

.organization {
  margin-left: 10px;
  margin-right: auto;
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
</style>
