<script setup></script>

<template>
  <span>{{ time }}</span>
</template>
<script>
export default {
  data() {
    return {
      interval: null,
      time: null
    }
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval)
  },
  created() {
    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      let date = new Date();
      let year = date.toLocaleString('en-us', { year: 'numeric' });
      let month = date.toLocaleString('en-us', { month: 'short' });
      let day = date.getDate().toString().padStart(2, '0');
      let hour = date.getUTCHours().toString().padStart(2, '0');
      let minute = date.getUTCMinutes().toString().padStart(2, '0');
      let second = date.getUTCSeconds().toString().padStart(2, '0');
      this.time = `${day} ${month} ${year} - ${hour}:${minute}:${second}`;
    }, 1000)
  }
}
</script>