<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="copyRoute(route)">
    <title>content-copy</title>
    <path
      d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
  </svg>
</template>
<style scoped>
/* SVG icon styles */
path {
  fill: aliceblue;
}

svg {
  height: 1.5rem;
  margin-right: .75rem;
}
</style>
<script>
export default {
  props: {
    route: {
      type: String,
      required: true
    }
  },
  methods: {
    async copyRoute(route) {
      try {
        await navigator?.clipboard?.writeText(route);
      } catch (e) {
        console.log('@click Copy Route failed:');
        console.log(e);
      }
    }
  }
}
</script>