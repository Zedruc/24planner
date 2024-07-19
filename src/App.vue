<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="container">
    <div class="header">
      <h1 class="title">24 Planner</h1>
    </div>
    <main style="display: flex; flex-direction: row;">

      <Sidebar />

      <div class="routerViewContainer">
        <RouterView></RouterView>
      </div>

    </main>
  </div>
</template>

<style scoped>
.header {
  background-color: var(--eerie-black);
  border-bottom: 1px solid black;
  box-sizing: border-box;
}

.routerViewContainer {
  width: calc(100% - 13rem);
  padding: 1rem;
  box-sizing: border-box;
}
</style>
