import {type Ref, ref, watch} from 'vue';
const lastFlight: Ref<Object> = ref({});
lastFlight.value = JSON.parse((localStorage.getItem('lastFlight')) as string) || {};
watch(lastFlight, (newValue) => {
  localStorage.setItem('lastFlight', JSON.stringify(lastFlight.value));
});

export { lastFlight };