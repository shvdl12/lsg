<template>
  <div>
    <div class="left-header"> {{this.title}} </div>

    <div v-for="(button, idx) in buttons" v-bind:key="idx">
      <v-btn class="left-btn" block text @click="navi(button.path)"> {{button.name}} </v-btn>
      <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
    </div>

    <limit-check style="margin-top:15%" />
  </div>

  
  
</template>

<script>

import LimitCheck from './LimitCheck.vue'

export default {
components: { LimitCheck },
  props: ['title', 'buttons'],  
  methods: {
    navi(path) {
      if(this.$router.currentRoute.path !== path) {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style scoped>
  ::v-deep .left-btn {
    justify-content: left;
  }

  .left-header {
    margin-left:1%;
    margin-bottom:3%;
    color: #5c6bc0 ;
    font-size: 25px;
    font-weight: 500;
  }
 
</style>