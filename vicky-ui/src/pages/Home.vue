<script setup lang="ts">
import Card from '@/components/Card.vue';
</script>

<template>
  <div class="home">
    <div class="card-wrapper">
      <Card />
    </div>
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
  grid-row: 2 / 3;
}
</style>
