<template>
    <div class="home">
      <IntroPage msg="Welcome to Your Vue.js App"/>
    </div>
  </template>
  
  <script>
  import IntroPage from '@/components/IntroPage.vue'
  
  export default {
    name: 'HomeView',
    components: {
      IntroPage
    }
  }
  </script>
  <style>
 
  </style>