<script setup>
defineProps({
  label: String,
  action: Function
});
</script>

<template>
  <button @click="action">{{ label }}</button>
</template>

<style scoped>
button {
  width: 90%;
  margin-bottom: 1rem;

  user-select: none;
  cursor: pointer;
  background-color: var(--button-background);

  outline: none;
  border: none;

  color: aliceblue;

  padding: .5rem 1rem;
  border-radius: 4px;

  transition: .1s ease;
}

button:hover {
  background-color: var(--button-hover-background);
}

button:active {
  background-color: var(--button-active-background);
}
</style>

<script></script>