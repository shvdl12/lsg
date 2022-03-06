<template>
  <!-- <v-container  fluid style= "background-color: #E2E2E2"> -->
    <v-container  fluid >
    <v-row justify="center" style= "background-color: #5F4B8B">
      <v-col lg="6">
        <img src="@/assets/main_logo.png" style="margin-left:10%">
        
        <v-row style="margin-top:1%; border:5px solid white; border-radius:20px" >
          <v-col xl="2" align="center" >
            <v-btn x-large icon>  <v-icon x-large color="#E69A8D " @click="$router.push('/loan/worker')"> mdi-domain </v-icon>  </v-btn>
            <v-btn x-small class="center-btn" text  color="#E69A8D " @click="$router.push('/loan/worker')"> 직장인대출  </v-btn>
          </v-col>
          <v-col xl="2" align="center" >
            <v-btn x-large icon>  <v-icon x-large color="#E69A8D " @click="$router.push('/loan/business')"> mdi-currency-usd </v-icon>  </v-btn>
            <v-btn x-small class="center-btn" text  color="#E69A8D" @click="$router.push('/loan/business')"> 사업자대출  </v-btn>
          </v-col>
          <v-col xl="2" align="center" >
            <v-btn x-large icon>  <v-icon x-large color="#E69A8D" @click="$router.push('/loan/housewives')"> mdi-face-woman </v-icon>  </v-btn>
            <v-btn x-small class="center-btn" text  color="#E69A8D" @click="$router.push('/loan/housewives')"> 주부대출  </v-btn>
          </v-col>
          <v-col xl="2" align="center" >
            <v-btn x-large icon>  <v-icon x-large color="#E69A8D" @click="$router.push('/loan/property')"> mdi-home </v-icon>  </v-btn>
            <v-btn x-small class="center-btn" text  color="#E69A8D" @click="$router.push('/loan/property')"> 부동산대출  </v-btn>
          </v-col>
          <v-col xl="2" align="center" >
            <v-btn x-large icon>  <v-icon x-large color="#E69A8D" @click="$router.push('/loan/revival')"> mdi-account-tie </v-icon>  </v-btn>
            <v-btn x-small class="center-btn" text  color="#E69A8D" @click="$router.push('/loan/revival')"> 회생신용회복  </v-btn>
          </v-col>
          <v-col xl="2" align="center" >
            <v-btn x-large icon>  <v-icon x-large color="#E69A8D" @click="$router.push('/loan/car')"> mdi-car </v-icon>  </v-btn>
            <v-btn x-small class="center-btn" text  color="#E69A8D" @click="$router.push('/loan/car')"> 차량담보대출  </v-btn>
          </v-col>
          
        </v-row>
      </v-col>

      <v-col lg="2">
        <limit-check />
      </v-col>
    </v-row>

    <v-row justify="center" style= "background-color: #5F4B8B">
      <br>
    </v-row>
    
    <!-- <v-row style="margin-top:1%">
      <center-box style="margin-left:10%; "/>
    </v-row> -->
  </v-container>
</template>

<script>

// import CenterBox from './CenterBox.vue'
import LimitCheck from '../Common/LimitCheck.vue'

export default {
  name: 'Main',
  components: {
    LimitCheck,
    // CenterBox
  },
 
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>

.center-btn {
    font-weight: bold !important;
    font-size: 15px !important;
  }
</style>