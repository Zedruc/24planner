<script setup lang="ts">
import CreateFlightIcon from './icons/CreateFlightIcon.vue';
import DashboardIcon from './icons/DashboardIcon.vue';
import PreviousFlightsIcon from './icons/PreviousFlightsIcon.vue';
import ViewFlightPlanIcon from './icons/ViewFlightPlanIcon.vue';
import UserGuideIcon from './icons/UserGuideIcon.vue';

//@ts-ignore
import UtcClock from './UtcClock.vue';
</script>

<template>
  <div class="sidebarContainer">
    <ul class="sidebarButtons">
      <RouterLink to="/">
        <DashboardIcon />Dashboard
      </RouterLink>

      <RouterLink to="/newflight">
        <CreateFlightIcon /> New Flight
      </RouterLink>
      <!-- <RouterLink to="">
        <ViewFlightPlanIcon /> View Flight Plan
      </RouterLink>
      <RouterLink to="">
        <PreviousFlightsIcon /> Previous Flights
      </RouterLink>
      <RouterLink to="">
        <UserGuideIcon /> Guide
      </RouterLink> -->
    </ul>

    <div class="appInfo">
      <div id="utc-time">
        <UtcClock />
      </div>
      <hr class="infoDivider">
      <span class="appVersion">Version 1.0.3</span>
    </div>
  </div>
</template>

<style scoped>
.sidebarContainer {
  width: 13rem;
  height: 100%;
  background-color: var(--eerie-black);

  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
}

.sidebarButtons>a {
  position: relative;
  height: 3rem;
  width: auto;
  padding: .5rem 0;
  padding-left: .8rem;
  display: flex;
  align-items: center;
}

.sidebarButtons {
  position: relative;
  left: 0;
  top: 0;
  list-style: none;
  padding: 0;

  height: 90%;
  width: auto;

  font-size: larger;
  font-weight: 200;

  cursor: pointer;
}

.sidebarButtons>a {
  position: relative;

  height: 3rem;
  width: auto;

  padding: .5rem 0;
  padding-left: .8rem;
  display: flex;
  align-items: center;
}

.sidebarButtons>a::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  height: 100%;
  background: red;
  transition: width .15s ease;
}

.sidebarButtons>a:hover::before {
  width: 8px;
}

.sidebarButtons>a:hover {
  background: rgba(255, 255, 255, 0.05);
}

.infoDivider {
  margin: 1rem 0;
}

.appInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.appVersion {
  font-size: small;
  opacity: .5;
}
</style>
