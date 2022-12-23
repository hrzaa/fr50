<script setup>
// import ListVue from './components/List.vue';
</script>

<template>
  
  <!-- <div id="nav">
    <router-link to="/login">Home</router-link> |
    <router-link to="/dashboard">About</router-link>
  </div> -->
  <router-view />
 
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
