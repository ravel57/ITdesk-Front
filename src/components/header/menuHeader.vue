<template>
  <div class="menuHeader">
    <span
        @click="menu"
        style="cursor: pointer; user-select: none;"
    > &#9776;Меню </span>

  </div>
</template>

<script>
export default {

  name: "menuHeader",
  data() {
    return {
      menuShowStase: true,
    }
  },

  methods: {
    menu() {
      if (document.getElementById("left-side").style.display === "") {
        document.getElementById("left-side").style.display = "none";
      } else {
        document.getElementById("left-side").style.display = "";
      }
    }
  }, mounted() {
    // console.log('header')
  }
}
</script>

<style scoped>
.menuHeader {
  height: 40px;
  width: 100%;
  background-color: #dde8fa;
  border-bottom: 1px solid #adb2b2;
}

.menuHeader span {
  /*width: 233px;*/
  height: 100%;
  font-size: 24px;
  padding-left: 20px;
  vertical-align: middle;
}

/*----------------------*/
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav a {
    font-size: 18px;
  }
}
</style>
