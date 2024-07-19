<script setup>
import SearchAutocomplete from './SearchAutocomplete.vue';
import { getAirports } from '@/data/waypoints';
import { lastFlight } from '@/sharedRefs';
</script>

<template>
  <div class="fiCardContainer">
    <div class="fiCardTitle">Flight Info</div>
    <div class="inputContainer">
      <div class="fiInput">
        <span class="inputLabel">Airline (ICAO)</span>
        <input type="text" id="airlineIcao" maxlength="3" placeholder="ZZZ" @change="lastFlight.airlineIcao = this.value; airlineIcao = this.value" />
      </div>
      <div class="fiInput">
        <span class="inputLabel">Flight Number</span>
        <input type="text" id="flightNumber" maxlength="4" placeholder="0000" @change="lastFlight.flightNumber = this.value; flightNumber = this.value" />
      </div>
      <div class="fiInput">
        <span class="inputLabel">Depart</span>
        <SearchAutocomplete :items="getAirports().map(airport => airport.identifier)" customPlaceholder="ZZZZ"
          @input="setDepart" @result="setDepart" />
      </div>
      <div class=" fiInput">
        <span class="inputLabel">Arrive</span>
        <SearchAutocomplete :items="getAirports().map(airport => airport.identifier)" customPlaceholder="ZZZZ"
          @input="setArrive" @result="setArrive" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fiCardContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: .6rem;
  background-color: var(--eerie-black);
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.fiCardTitle {
  height: 1rem;
  width: 100%;
  font-weight: 600;
  padding: .6rem;
}

.inputContainer {
  display: flex;
  flex-direction: row;
  padding: .6rem;
}

.fiInput {
  display: flex;
  flex-direction: column;
  width: 5rem;
}

.fiInput:not(:last-child) {
  margin-right: 1.5rem;
}

.inputLabel {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  font-size: .7rem;
  color: #ddd;
  opacity: .8;
}

.fiInput>input,
.fiInput>div>input {
  width: 100%;
  height: auto;
  padding: .3rem;

  outline: none;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  margin-top: .3rem;
  background-color: var(--input-background);
  color: aliceblue;

  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
}
</style>

<script>
export default {
  data: () => {
    return {
      airlineIcao: null,
      flightNumber: null,
      depart: null,
      arrive: null,
    }
  },
  emits: ['generateRoute'],
  methods: {
    setDepart(icao) {
      if (typeof icao !== 'string') return;
      this.depart = icao;
      this.checkAbleToGenerate();
      this.emitter.emit('depart_change', icao)
    },
    setArrive(icao) {
      if (typeof icao !== 'string') return;
      this.arrive = icao;
      this.checkAbleToGenerate();
      this.emitter.emit('arrive_change', icao)
    },
    checkAbleToGenerate() {
      if (this.depart?.length == 4 && this.arrive?.length == 4) {
        this.$emit('generateRoute', this.depart.toUpperCase(), this.arrive.toUpperCase());
      }
    }
  }
}
</script>