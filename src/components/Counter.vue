<template>
  <div>
    <span class="count" v-text="count"></span>
    <button @click="count++" class="increment">Increment</button>
    <button @click="count--" v-show="count > 0" class="decrement">Decrement</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  }
};
</script>