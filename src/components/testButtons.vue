<template>
    <div>
      <label>
        <input type="radio" v-model="radioButtonStates.option1" />
        Option 1
      </label>
      <label>
        <input type="radio" v-model="radioButtonStates.option2" />
        Option 2
      </label>
      <label>
        <input type="radio" v-model="radioButtonStates.option3" />
        Option 3
      </label>
      <!-- Add more radio buttons as needed -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      radioButtonStates: Object,
    },
    // You don't need local data for the checked state in this case
  };
  </script>