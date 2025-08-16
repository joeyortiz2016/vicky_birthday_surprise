<script setup lang="ts">
import Header from './components/Header.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app-wrapper">
    <div class="header-wrapper">
      <Header />
    </div>
    <div class="router-view-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
.app-wrapper {
  display: grid;
  grid-template-rows: 100px auto;
  height: 100dvh;
  font-family: 'Comic Sans MS';
}

.header-wrapper {
  grid-row: 1 / 2;
}

.router-view-wrapper {
  grid-row: 2 / 3;
  background-color: grey;
}
</style>
