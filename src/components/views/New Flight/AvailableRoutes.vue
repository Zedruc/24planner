<script setup>
import CopyIcon from '@/components/icons/CopyIcon.vue';
import { isNumber } from 'lodash';
</script>

<template>
  <div class="routesCardContainer">
    <div class="routesCardTitle">Available Routes</div>
    <div class="routeList">
      <div v-for="(route, i) in routes" class="route" :id="i" @click="handleClick"
        :class="activeRoute == i ? 'activeRoute' : ''">
        {{ route.join(' ') }}
        <CopyIcon class="copyIcon" :route="route.join(' ')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.routesCardContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: .6rem;
  background-color: var(--eerie-black);
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  height: auto;
  max-height: 20rem;
  box-sizing: border-box;
}

.routesCardTitle {
  height: 1rem;
  width: 100%;
  font-weight: 600;
  margin: .6rem;
  box-sizing: border-box;
  position: sticky;
}

.routeList {
  display: flex;
  flex-direction: column;
  padding: .6rem;
  box-sizing: border-box;
  overflow-y: auto;

}

.copyIcon {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 1rem;
  padding: .3rem;
  padding-bottom: .2rem;
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  transition: background .1s ease;

  background: #596066;
}

.copyIcon:hover {
  background: rgba(117, 162, 221, 0.473);
}

.route {
  position: relative;
  padding: .6rem .5rem;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: var(--slate-gray);
  padding-left: .7rem;
  border-radius: 4px;
  font-family: " Droid Sans", monospace;
  font-size: small;
  transition: box-shadow .15s ease, background .15s ease;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.16);
  user-select: none;
  cursor:
    pointer;
}

.route::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 8px;
  background-color: var(--onyx);
  border-radius: 4px 0 0 4px;
}

.route:not(:last-child) {
  margin-bottom: 1rem;
}

.route:hover {
  background: rgba(160, 214, 247, 0.37);
}

.activeRoute {
  background: rgba(160, 214, 247, 0.37);
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-button {
  height: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 20px;
  border: solid 6px transparent;
  box-shadow:
    inset 0 0 10px 10px rgba(118, 124, 138, 0.33);
  cursor: pointer;
  min-height: 40px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #646464;
}
</style>

<script>
export default {
  data() {
    return {
      activeRoute: null,
    }
  },
  props: {
    routes: {
      type: Array,
      required: true,
      default: [],
    },
  },
  emits: ['routeSelect'],
  methods: {
    handleClick({ target, target: { id: routeIndex } }) {
      let isCopyButton = !target.classList.contains('route');
      if (isCopyButton) return;
      this.activeRoute = routeIndex;
      this.$emit('routeSelect', routeIndex);
    }
  },
  mounted() {
    this.emitter.on('new_route', function () {
      this.activeRoute = null;
    }.bind(this));
  }
}
</script>
