<script setup>
defineProps({
  action: Function
});
</script>

<template>
  <!-- @vue-ignore -->
  <button @click="action">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  width: auto;
  height: 100%;

  user-select: none;
  cursor: pointer;
  background-color: var(--button-background);

  outline: none;
  border: none;

  color: aliceblue;

  padding: .5rem;
  padding-left: .3rem;
  box-sizing: border-box;
  border-radius: 4px;

  font-size: medium;
  font-weight: 600;

  display: flex;
  flex-direction: row;
  align-items: center;

  transition: .1s ease;
}

button:hover {
  background-color: var(--onyx);
}
</style>

<script></script>