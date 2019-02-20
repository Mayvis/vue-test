<template>
  <div>
    <input type="text" class="new-reminders" v-model="newReminder">
    <button @click="add">Add reminder</button>

    <ul v-if="reminders.length">
      <li v-for="reminder in reminders" :key="reminder">
        {{ reminder }}
        <button class="remove" @click="remove(reminder)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newReminder: "",
      reminders: []
    };
  },

  methods: {
    add() {
      this.reminders.push(this.newReminder);

      this.newReminder = "";
    },

    remove(reminder) {
        this.reminders.splice(reminder, 1);
    }
  }
};
</script>