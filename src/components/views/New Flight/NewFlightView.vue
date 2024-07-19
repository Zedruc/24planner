<script setup>
import GeneralButton from '@/components/GeneralButton.vue';
import CogIcon from '@/components/icons/CogIcon.vue';

import FlightInfoPanel from './FlightInfoPanel.vue';
import AvailableRoutes from './AvailableRoutes.vue';
import DepartureArrivalOptions from './DepartureArrivalOptions.vue';

import { getAirports, getWaypoints, getGraphData, findAirport, getFixCoordinates } from '../../../data/waypoints.ts';
import { findRoute, buildGraph, shuffle } from '../../../scripts/route_finder';

import L from 'leaflet';
import "leaflet/dist/leaflet.css";
</script>

<template>
  <div class="generateFlightContainer">
    <div class="buttonBar">
      <GeneralButton :action="() => { console.log('@click Generate Flight') }">
        <CogIcon /> Generate Flight
      </GeneralButton>
    </div>
    <div class="mainContainer">
      <div class="leftPanel" id="userInputSide">
        <FlightInfoPanel @generateRoute="generateRoutes" />
        <AvailableRoutes :routes="routes" @routeSelect="drawRouteOnMap" />
      </div>
      <div class="rightPanel" id="chartSide">
        <div class="chartContainer" id="map_canvas">
          <!-- <canvas id="chartCanvas" height="927" width="1200"></canvas> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.generateFlightContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.buttonBar {
  width: 100%;
  height: 3.5rem;
  background-color: var(--eerie-black);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;

  padding: .5rem;
  box-sizing: border-box;

  box-shadow: 0 5px 10px rgb(0, 0, 0, .5);
}

.mainContainer {
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.leftPanel,
.rightPanel {
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.leftPanel>*:not(:last-child) {
  margin-bottom: 1rem;
}


#map_canvas {
  width: calc(2000px/2);
  height: calc(1653px/2);
}
</style>

<script>
import FlightInfoPanel from './FlightInfoPanel.vue';
import { lastFlight } from '@/sharedRefs';

export default {
  data: () => {
    return {
      sidWaypoints: [],
      starWaypoints: [],
      arrive: null,
      depart: null,
      routes: [],
      map: null,
      lastPolyline: null,
      lastRouting: null,
    }
  },
  mounted() {
    this.map = L.map('map_canvas', {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 1,
      zoomDelta: 0.5,
      zoomAnimation: false,
      maxBoundsViscosity: 100,
      zoomControl: false,
      attributionControl: false,
    })
    const bounds =[[0, 0],[1653, 2000]]

    var image = L.imageOverlay('./Enroute_Chart_PTFS.png', bounds).addTo(this.map);

    this.map.setMaxBounds(bounds);
    this.map.fitBounds(bounds);

    // Draw all waypoints
    for (const fix of getWaypoints()) {
      L.polygon([[fix.y-347, fix.x], [fix.y-347, fix.x]], {
        color: 'red',
        smoothFactor: 0,
        weight: 3,
      }).addTo(this.map);
    }

    this.emitter.on('depart_change', function (depart) {
      console.log(depart);
      this.depart = depart.toUpperCase();
    }.bind(this));
    this.emitter.on('arrive_change', function (arrive) {
      this.arrive = arrive.toUpperCase();
    }.bind(this));

  },
  components: {
    FlightInfoPanel
  },
  methods: {
    removeDuplicateWaypoints(route) {
      let alreadyInRoute = [];
      let filtered = route.filter(fix => {
        if (!alreadyInRoute.includes(fix)) {
          alreadyInRoute.push(fix);
          return true;
        } else return false;
      });
      return filtered;
    },
    removeDuplicateRoutes(routes) {
      let a = [];
      let filtered = routes.filter(route => {

        if (!a.includes(route.toString())) {
          a.push(route.toString());
          return true;
        } else return false;
      });
      return filtered;
    },
    generateRoutes(depart, arrive) {
      if (this.lastRouting == `${depart}${arrive}`) return;
      this.lastRouting = `${depart}${arrive}`;

      if (this.lastPolyline) this.lastPolyline.removeFrom(this.map);

      this.emitter.emit('new_route');
      const waypoints = getWaypoints().concat(findAirport(depart), findAirport(arrive));
      shuffle(waypoints);
      this.routes = [];
      let sid = this.sidWaypoints;
      let star = this.starWaypoints;

      if (sid.length > 0) {
        sid.unshift(depart);
        depart = sid[sid.length - 1];
      }

      if (star.length > 0) {
        star.push(arrive);
        arrive = star[0];
        star.shift();
      }

      for (let k = 15; k > 0; k--) {
        const graph = buildGraph(waypoints, k);
        let route = findRoute(graph, waypoints, depart, arrive);
        if (route == null) continue;
        this.routes.push([...sid, ...route, ...star]);
      }

      this.routes = this.removeDuplicateRoutes(this.removeDuplicateWaypoints(this.routes.filter(route => route !== null)));
      this.emitter.emit('routes-generated', this.routes);
    },
    drawRouteOnMap(routeIndex) {
      let route = this.routes[routeIndex];

      let date = new Date();
      let year = date.toLocaleString('en-us', { year: 'numeric' });
      let month = date.toLocaleString('en-us', { month: 'short' });
      let day = date.getDate().toString().padStart(2, '0');
      let hour = date.getUTCHours().toString().padStart(2, '0');
      let minute = date.getUTCMinutes().toString().padStart(2, '0');
      const time = `${day} ${month} ${year} - ${hour}:${minute} UTC`;
      
      lastFlight.value = {depart: this.depart.toLowerCase(), arrive: this.arrive.toLowerCase(), time: time }

      let fixCoordinateObjects = getFixCoordinates(route);

      let fixCoordinates = fixCoordinateObjects.map((fix, i) => {
        if (!fix) return null;
        return [fix.y-347, fix.x];
      }).filter(fix => fix !== null);
      if (this.lastPolyline) this.lastPolyline.removeFrom(this.map);
      this.lastPolyline = L.polyline(fixCoordinates, { color: 'red' }).addTo(this.map);
    }
  },
}
</script>