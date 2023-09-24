<template>
    <div class="content">
      <testButtons :radioButtonStates="radioButtonStates" />
    </div>
    <h1>asd</h1>
  </template>
  
  <script >
  import testButtons from '../components/testButtons.vue';
  
  export default {
    components: {
        testButtons,
    },
    data() {
      return {
        radioButtonStates: {
          option1: true,  // Set these conditions based on your logic
          option2: false,
          option3: false,
          // Add more options as needed
        },
      };
    },
  };
  </script>