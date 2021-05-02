<template>
  <div class="client-info">
    <div style="display: flex">
      <div>
        <div class="client">
          <p>
            {{ firstName }} {{ lastName }}
          </p>
          <p style="font-size: 0.7em; margin-bottom: 6px;">
            {{ organization }}
          </p>
        </div>
        <div style="display: flex">
          <div class="client-field">
            Кастомное поле 1
          </div>
          <div class="client-field">
            Кастомное поле 2
          </div>
          <div class="client-field">
            Кастомное поле 3
          </div>
          <div class="client-field">
            Кастомное поле 4
          </div>
        </div>
      </div>
      <div style="margin-left: auto; margin-right: 10px; color: #000; margin-top: auto;" class="icon">
        search
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "clientInfo",

  mounted: async function () {
    try {
      const divName = 'client'
      this.$store.state.client = JSON.parse(document.getElementById(divName).getAttribute(divName).replaceAll('\'', '\"'))
      document.getElementById(divName).remove();
    } catch {
      await axios.get('/api/v1/client/' + this.$route.params.id)
          .then(response => (this.$store.state.client = response.data))
    }
  },

  computed: {
    firstName() {
      return this.$store.getters.CLIENT.firstName
    },
    lastName() {
      return this.$store.getters.CLIENT.lastName
    },
    organization() {
      return this.$store.getters.CLIENT.organization
    },
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

.client-info .client-field {
  border: 1px solid #adb2b2;
  border-radius: 3px;
  padding: 1px;
  margin: 0 3px;
}

</style>
