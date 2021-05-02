<template>
  <div style="display: flex; width: 100%">
    <chat/>
    <tasks/>
  </div>
</template>

<script>
import chat from "@/components/chat/chat";
import tasks from "@/components/tasks/tasks";

export default {

  name: "chatPage",

  components: {
    chat,
    tasks
  },

  mounted: () => {}

}
</script>

<style scoped>

</style>
