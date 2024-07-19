<script setup>
import CardButton from './CardButton.vue';
import LatestFlight from './LatestFlight.vue';
defineProps({
  cardTitle: String,
  cardSubtitle: String,
  contentComponent: Object,
  buttonComponentObjects: Array,
});
</script>

<template>
  <div class="dashboardCard">
    <div class="infoBar">
      <div class="cardTitle">{{ cardTitle }}</div>
      <div class="cardSubTitle">{{ cardSubtitle }}</div>
    </div>
    <div class="contentContainer">
      <slot></slot>
    </div>
    <div class="cardButtons">
      <CardButton :label="buttonObject.label" :action="buttonObject.action"
        v-for="buttonObject in buttonComponentObjects" />
    </div>

  </div>
</template>

<script>
</script>

<style scoped>
.dashboardCard {
  background-color: var(--outer-space);

  width: auto;
  height: 20rem;

  margin: .6rem;
  padding: 1rem;

  border-radius: 6px;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.infoBar {
  width: 100%;
  height: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-wrap: nowrap;
}

.cardTitle {
  font-weight: 600;
}

.cardSubTitle {
  opacity: 0.6;
  font-size: small;
  text-align: right;
}

.contentContainer {
  width: 100%;
  height: auto;
}

.cardButtons {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>