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
        class="check-box"
        v-for="(checkBox, index) in tasks"
        :class="{'closed' : !checkBox.actual, '' : checkBox.actual}"
        :key="checkBox.id"
    >
      {{ checkBox.text }}
      <span
          v-text="checkBox.actual ? 'x' : '+'"
          @click="changeTaskStatus(index)"
          class="task-button"
      ></span>
    </div>

  </div>
</template>

<script>
import {sendTask} from "@/util/ws";

export default {
  name: "checkBoxes",

  data() {
    return {
      newTaskInput: '',
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
        // console.log("new task: ", newTask)
        // this.$store.commit("addTask", newTask)
        sendTask(newTask)
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

    actClass(index) {
      return this.$store.getters.TASKS[index].actual ? '' : 'closed'
    }

  },

  computed: {
    tasks() {
      return this.$store.getters.TASKS
    },


  },

  mounted: function () {
    const divName = 'inptsks'
    this.$store.state.tasks = JSON.parse(document.getElementById(divName)
        .getAttribute('tasks').replaceAll('\'', '\"'))
    document.getElementById(divName).remove();
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
  display: flex;
  background: #7fffd4;
  overflow-wrap: anywhere;
}

.check-box:hover {
  background: #65dbb5;
}

.check-box:hover .task-button {
  display: flex;
}

.task-button {
  display: none;
  margin-left: auto;
  margin-right: 5px;
  cursor: pointer;
  border: 1px solid #adb2b2;
  box-sizing: border-box;
  border-radius: 50%;
  text-align: center;
  font-weight: normal;
  font-size: 12px;
  box-shadow: 0 0 2px #000000;
  padding: 0 5px;
  max-height: 16px;
}

.closed {
  text-decoration: line-through;
  background: #d64040;
  color: #f7ede2;
}

.closed:hover {
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
