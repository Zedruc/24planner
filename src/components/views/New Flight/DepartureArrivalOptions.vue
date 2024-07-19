<script setup>
import { generateAirports } from 'ptfst-db';
import SearchAutocomplete from './SearchAutocomplete.vue';
import Dropdown from 'primevue/dropdown';
</script>

<template>
  <div class="aptinfoCardContainer">
    <div class="aptInfoCardTitle">Departure / Arrival Procedures</div>
    <div class="aptInfoContent">
      <!-- <Dropdown v-model="selectedSid" :options="availableSids" optionLabel="SID"
        placeholder="Select a SID" /> -->
    </div>
  </div>
</template>
<script>
import {ref} from 'vue';

// let availableSids = ref(getCharts(departIdentifier));

const airportInfos = generateAirports();
export default {
  data: function () {
    return {
      sid: null,
      star: null,
      arriveChartpacks: [],
      departChartpacks: [],
    }
  },
  props: {
    departIdentifier: {
      type: String,
      required: true,
    },
    arriveIdentifier: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.emitter.on('sid_change', function (sid) { this.sid = sid });
    this.emitter.on('star_change', function (star) { this.star = star });
  },
  methods: {
    getCharts(icao) {
      if (!icao) return null;
      let dropDownOptions = [];
      airportInfos.forEach(airport => {
        if (airport.code.toLowerCase() == icao.toLowerCase()) {
          airport.chartPacks.forEach(chartPack => {
            if (chartPack?.sids) {
              dropDownOptions.push({
                name: chartPack.author,
                value: chartPack.sids
              });
            }
          });
        }
      });
      return dropDownOptions;
    },
  }
}
</script>
<style scoped>
.aptinfoCardContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: .6rem;
  background-color: var(--eerie-black);
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.aptInfoCardTitle {
  height: 1rem;
  width: 100%;
  font-weight: 600;
  padding: .6rem;
}

.aptInfoContent {
  display: flex;
  flex-direction: row;
  padding: .8rem;
}
</style>