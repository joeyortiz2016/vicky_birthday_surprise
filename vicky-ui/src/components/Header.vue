<script setup lang="ts">
import { useHeaderStore } from '@/stores/headerstore';
import { computed, ref, useTemplateRef, onMounted } from 'vue';

const headerStore = useHeaderStore();
const headerTextElement = ref<HTMLDivElement | null>(null);

headerStore.$subscribe((mutation, state) => {
  if (state.headerTextVisibility === true) {
    requestAnimationFrame(moveRight);
  }
});

let position = 0;

onMounted(() => {
  requestAnimationFrame(moveRight);
});

function moveRight() {
  if (headerTextElement.value) {
    const rect: DOMRect = headerTextElement.value.getBoundingClientRect();
    if (rect.right >= window.innerWidth) {
      requestAnimationFrame(moveLeft);
    } else {
      console.log('Header text moving right.');
      position += 1;
      headerTextElement.value.style.transform = `translate(${position}px)`;
      requestAnimationFrame(moveRight);
    }
  }
}

function moveLeft() {
  if (headerTextElement.value) {
    const rect: DOMRect = headerTextElement.value.getBoundingClientRect();
    if (rect.left <= 0) {
      requestAnimationFrame(moveRight);
    } else {
      console.log('Header text moving left.');
      position -= 1;
      headerTextElement.value.style.transform = `translate(${position}px)`;
      requestAnimationFrame(moveLeft);
    }
  }
}
</script>

<template>
  <div class="header">
    <div v-if="headerStore.headerTextVisibility" class="header-text" ref="headerTextElement">
     🎈🎈🎈HAPPY BIRTHDAY VICTORIA🎈🎈🎈
    </div>
  </div>
</template>

<style>
.header {
  display: flex;
  flex-direction: row;
  background-color: black;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.header-text {
  font-family: 'Comic Sans MS';
  color: white;
  font-size: xx-large;
}
</style>
