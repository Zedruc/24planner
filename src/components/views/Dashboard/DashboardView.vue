<script setup>
import DashboardCard from '../../DashboardCard.vue';
import LatestFlight from '../../LatestFlight.vue';
import FlightPlanChart from '../../FlightPlanChart.vue';

import { lastFlight } from '../../../sharedRefs';

class Button {
  /**
   * 
   * @param {String} label Button Label
   * @param {Function} action Button Action on Click
   */
  constructor(label, action) {
    this.label = label;
    this.action = action;
  }
}
</script>

<template>
  <div class="cardContainer">
    <DashboardCard cardTitle="Latest Flight Plan" :cardSubtitle="lastFlight?.time || 'N/A'" :buttonComponentObjects="[
      new Button('View Flight Plan', () => console.log('@click View Flightplan')),
      new Button('Edit Flight', () => console.log('@click Edit Flight'))
    ]">
      <LatestFlight callsign="XXXXXX" :departing="lastFlight?.depart?.toUpperCase() || 'N/A'" :arriving="lastFlight?.arrive?.toUpperCase() || 'N/A'" acType="XXXX" />
    </DashboardCard>
    <DashboardCard cardTitle="Flight Plans" cardSubtitle="Past 30 Days" :buttonComponentObjects="[
      new Button('Create New Flight', () => console.log('@click Create New Flight')),
      new Button('View Saved Flights', () => console.log('@click View Saved Flights'))
    ]">
      <FlightPlanChart />
    </DashboardCard>
  </div>
</template>

<style scoped>
.cardContainer {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  box-sizing: border-box;
}
</style>

<script></script>