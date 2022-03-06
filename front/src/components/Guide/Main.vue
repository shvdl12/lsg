<template>
  <v-container  fluid >
    <v-row   style="padding-left: 25%">
      <v-col xl="2">
        <left-bar title="대출가이드" :buttons="buttons"/>
      </v-col>

      <v-col xl="7">
        <v-card>
          <v-card-title>
            <h3> {{title}} </h3>
          </v-card-title>
          <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
          
          <v-card-text>
            <loan v-if="title === '대출절차안내'"> </loan>
            <repay v-else> </repay>
          </v-card-text>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
import LeftBar from '../Common/LeftBar.vue';
import loan from './Loan.vue'
import repay from './Repay.vue'
export default {

  created() {
    this.buttons.forEach((value) => {
      if(value.path === this.$router.currentRoute.path) {
        this.title = value.name;
        this.content = [];
        this.content.push(value.content)
      }
    })
  },
  components: {
    LeftBar, loan, repay
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
      this.buttons.forEach((value) => {
        if(value.path === to.path) {
          this.title = value.name;
          this.content = [];
          this.content.push(value.content)
        }
      })
    }
  },

  data() {
    return {
      title: '',
      content: [],
      buttons: [
        {
          name: "대출절차안내",
          path: "/guide/loan"
        },
        {
          name: "대출상환안내",
          path: "/guide/repay"
        }
      ]
    }
  }
}
</script>

<style scoped>

/* ::v-deep .checkbox {
  font-size: 1px !important;
}  */

::v-deep .checkbox .v-label {
 font-size: 12px;
}

.center-btn {
    font-weight: bold !important;
    font-size: 15px !important;
  }
  ::v-deep .v-data-table {
  white-space: pre-wrap !important;

}
</style>