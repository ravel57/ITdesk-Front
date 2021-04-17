<template>
  <div id="check-boxes"
       tasks="${tasks}"
       ref="task"
  >
    <p style="margin: 5px 10px"><b>Задачи</b></p>
    <div style="padding: 0 10px;">
      <!--      <div style="display: flex; justify-content: center">&#45;&#45;%>-->
      <textarea type="text"
                v-model="newTaskStr"
                placeholder="Новая задача"
                @keydown.enter="handleEnter"
                class="task-input"
      ></textarea>
      <button
          v-on:click="addCheckBox"
          style="display: block; width: 100%; margin-top: 3px;"
      >добавить
      </button>
    </div>

    <div class="check-box"
         v-for="(checkBox, i) in checkBoxes"
         v-bind:class="[checkBox.actual ? '' : 'closed']"
    >
      {{ checkBox.text }}
      <span v-text="checkBox.actual ? 'x' : '+'"
            @click="chengeTaskStatus(i)"
            class="task-button"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkBoxes",
  data() {
    return {
      newTaskStr: '',
      checkBoxes: [],
      // active: false,
      // upHere: false,
      // data: null
    }
  },
  methods: {
    addCheckBox() {
      console.log("new task: ", this.newTaskStr)
      if (this.newTaskStr > '') {
        this.checkBoxes.push({text: this.newTaskStr, actual: true})
        sendTaskWS(this.newTaskStr)
        this.newTaskStr = ''
      }
    },

    handleEnter(e) {
      if (e.ctrlKey)
        this.addCheckBox()
    },
    chengeTaskStatus(index) {
      console.log("changed: ", index)
      this.checkBoxes[index].actual = !this.checkBoxes[index].actual
      changedTaskStatusWS(index, this.checkBoxes[index].actual)
    },
  },

  mounted: function () {
    // let tasks = JSON.parse(this.$refs.tasks.getAttribute('tasks')
    this.checkBoxes = JSON.parse(document.getElementById("check-boxes").getAttribute('tasks')
        .replaceAll('\'', '\"'))
    // console.log(tasks)
  },
}
</script>

<style >
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

.task-input{
  height: 100px;
  /* max-height: 100px; */
  margin: 0px;
  padding: 5px;
  width: 100%;
  resize: vertical;
}
</style>
