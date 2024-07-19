<script setup>
import FlightIcon from '@/components/icons/FlightIcon.vue';
import { findAirport } from '@/data/waypoints'

defineProps({
  callsign: String,
  departing: String,
  arriving: String,
  acType: String,
});
</script>
<template>
  <div class="callsignBar">
    {{ callsign }}
  </div>
  <div class="flightRouteContainer">
    <div class="routeDisplayContainer">
      <div class="departure">
        <div class="icao">{{ departing }}</div>
        <div class="fullName">{{ findAirport(departing)?.name || 'N/A' }}</div>
      </div>
      <div class="planeIcon">
        <FlightIcon />
      </div>
      <div class="arrival">
        <div class="icao">{{ arriving }}</div>
        <div class="fullName">{{ findAirport(arriving)?.name || 'N/A' }}</div>
      </div>
    </div>
    <div class="acTypeBar">{{ acType }}</div>
  </div>
</template>

<style scoped>
.callsignBar {
  width: 100%;
  height: auto;
  font-size: x-large;
  font-weight: 600;
  opacity: .75;
  text-align: center;
}

.routeDisplayContainer {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: fit-content;
}

.departure,
.planeIcon,
.arrival {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.arrival,
.departure {
  display: flex;
  flex-direction: column;
}

.icao {
  color: #ddd;
  border-bottom: 1px solid #ccc;
  font-size: large;

  padding-bottom: .1rem;
}

.fullName {
  color: #ddd;
  font-size: smaller;
  opacity: .8;

  margin-top: .2rem;
}

.acTypeBar {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;

  font-size: 1.5rem;
  color: #ddd;
}
</style>

<script></script>