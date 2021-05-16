<template>
  <div id="check-boxes">
    <p style="margin: 5px 10px"><b>Задачи</b></p>
    <div style="padding: 0 10px;">
      <!--      <div style="display: flex; justify-content: center">&#45;&#45;%>-->
      <textarea type="text"
                v-model="newTaskInput"
                placeholder="Новая задача"
                @keydown.ctrl.enter="addTask"
                class="task-input"
      ></textarea>
      <button
          v-on:click="addTask"
          style="display: block; width: 100%; margin-top: 3px;"
      >добавить
      </button>
    </div>

    <div
        v-for="task in tasks.slice().reverse()"
        class="check-box"
        :class="[task.actual ? '' : 'closed', task.undelivered ? 'undelivered' : '']"
        :key="task.id"
        @click="taskClick(task.id)"
    >
<!--      <div >-->
        <span
            v-text="task.actual ? 'закрыть' : 'открыть'"
            @click="changeTaskStatus(task.id)"
            class="task-button"
        />
        <p
            v-text="task.text"
            :style="{fontWeight: isPinMessageToTaskActive}"
        />
<!--      </div>-->
    </div>

  </div>
</template>

<script>
import {sendMessage, sendTask} from "@/util/ws";
import axios from "axios";

export default {
  name: "checkBoxes",

  data() {
    return {
      newTaskInput: '',
    }
  },

  mounted: async function () {
    try {
      const divName = 'inptsks'
      this.$store.state.tasks = JSON.parse(document.getElementById(divName)
          .getAttribute('tasks').replaceAll('\'', '\"'))
      document.getElementById(divName).remove();
    } catch {
      await axios.get('/api/v1/tasks/' + this.$route.params.id)
          .then(response => (this.$store.state.tasks = response.data))
    }
    // console.log(this.$store.state.tasks)
  },

  computed: {
    tasks() {
      return this.$store.getters.TASKS
    },

    isPinMessageToTaskActive() {
      if (this.$store.getters.pinMessageToTaskActive && this.$store.getters.SELECTEDMESSAGES.length > 0)
        return "bold"
      else
        return ""
    }
  },

  methods: {
    addTask() {
      if (this.newTaskInput > '') {
        let newTask = {
          id: this.$store.getters.TASKS.length,
          clientId: this.$store.getters.CLIENT.id,
          text: this.newTaskInput,
          actual: true
        }
        this.$store.commit("addTask", newTask)
        try {
          sendTask(newTask)
        } catch {
          // alert('server error')
        }
        this.newTaskInput = ''
      }
    },

    changeTaskStatus(index) {
      let task = this.$store.getters.TASKS[index]
      task.actual = !task.actual
      this.$store.commit('changeTask', task)
      // console.log('this.$store.getters.TASKS[index] = ', this.$store.getters.TASKS[index])
      sendTask(task)
    },

    // actClass(index) {
    //   return this.$store.getters.TASKS[index].actual ? '' : 'closed'
    // },

    taskClick(id) {
      if (!this.$store.getters.pinMessageToTaskActive && this.$store.getters.SELECTEDMESSAGES.length === 0) {
        if (this.$store.getters.TASKS[id].messageId !== null) {
          window.location.replace('#' + this.$store.getters.TASKS[id].messageId)
        }
        // console.log(this.$store.getters.TASKS[id].messageId)
      } else {
        this.$store.commit('selectTask', id)
        try {
          sendTask(this.$store.getters.TASKS[id])
          console.log(this.$store.getters.TASKS[id])
        } catch {
          alert('server error')
        }
      }
    },

  },
}
</script>

<style scoped>
#check-boxes {
  width: 400px;
  border-left: 1px solid #adb2b2;
  overflow: auto;
  overflow-wrap: break-word;
}

.check-box {
  border: 1px solid #adb2b2;
  border-radius: 5px;
  margin: 10px;
  padding: 3px;
  /*display: flex;*/
  background: #7fffd4;
  overflow-wrap: anywhere;
  cursor: pointer;
}

.check-box.undelivered {
  background: #f0fff7;
}

.check-box:hover {
  background: #65dbb5;
  position: relative;
  z-index: 0;
}

.check-box:hover .task-button {
  display: block;
}

.task-button {
  display: none;
  margin-left: auto;
  margin-right: 5px;
  cursor: pointer;
  /* border: 1px solid #adb2b2; */
  /* box-sizing: border-box; */
  /* border-radius: 50%; */
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  box-shadow: 0 0 2px #000;
  padding: 0 5px;
  /* max-height: 16px; */
  max-width: 70px;
  position: relative;
  z-index: 2;
}

.task-button:hover{
  background: #5dba9c;
}

.closed .task-button:hover{
  background: #500101;
}

.check-box.closed {
  text-decoration: line-through;
  background: #d64040;
  color: #f7ede2;
}

.check-box.closed:hover {
  background: darkred;
}

.task-input {
  height: 100px;
  /* max-height: 100px; */
  margin: 0px;
  padding: 5px;
  width: 100%;
  resize: vertical;
}
</style>
