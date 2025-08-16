<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/Card.vue';

const sideBarOpacity = ref<number>(0);

function animateSideBarVisible() {
  if (sideBarOpacity.value <= 1) {
    sideBarOpacity.value += 0.0025;
    requestAnimationFrame(animateSideBarVisible);
  } else {
    requestAnimationFrame(animateSideBarInvisible);
  }
}

function animateSideBarInvisible() {
  if (sideBarOpacity.value >= .25) {
    sideBarOpacity.value -= 0.0025;
    requestAnimationFrame(animateSideBarInvisible);
  } else {
    requestAnimationFrame(animateSideBarVisible);
  }
}

function startSideBarAnimation() {
  requestAnimationFrame(animateSideBarVisible);
}
</script>

<template>
  <div class="home">
    <div class="left-side-bar" :style="{opacity: sideBarOpacity}"></div>
    <div class="card-wrapper">
      <Card @completed="startSideBarAnimation" />
    </div>
    <div class="right-side-bar" :style="{opacity: sideBarOpacity}"></div>
  </div>
</template>

<style>
.home {
  height: 100%;
  display: grid;
  grid-template-columns: 300px auto 300px;
  grid-template-rows: 200px auto 200px;
}

.card-wrapper {
  grid-column: 2 / 3;
  grid-row: 1 / 4;
}

.left-side-bar,
.right-side-bar {
  background-image: url('@/assets/side-bar.jpg');
  background-size: contain;
  grid-row: 1 / 4;
}

.left-side-bar {
  grid-column: 1 / 2;
}

.right-side-bar {
  grid-column: 3 / 4;
}
</style>
