<template>
  <div>
    <div v-if="! finished">
      <span>{{ remaining.days() }} Days,</span>
      <span>{{ remaining.hours() }} Hours,</span>
      <span>{{ remaining.minutes() }} Minutes,</span>
      <span>{{ remaining.seconds() }} Seconds</span>
      left....
    </div>

    <div v-else v-text="expiredText"></div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    until: null,
    expiredText: { default: "Now expired" }
  },

  data() {
    return {
      now: new Date(),
      interval: null
    };
  },

  computed: {
    remaining() {
      let remaining = moment.duration(Date.parse(this.until) - this.now);

      if (remaining <= 0) {
        this.$emit("finished");
      }

      return remaining;
    },

    finished() {
      return this.remaining <= 0;
    }
  },

  created() {
    this.interval = setInterval(() => {
      this.now = new Date();
    }, 1000);

    this.$on("finished", () => {
      clearInterval(this.interval);
    });
  },

  destroyed() {
    clearInterval(this.interval);
  }
};
</script>