<template>
  <v-container  fluid >
    <v-row   style="padding-left: 25%">
      <v-col xl="2">
        <left-bar title="회사소개" :buttons="buttons"/>
      </v-col>

      <!-- <v-col xl="7">
        <loan-table :title="title" :content="content"/>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import LeftBar from '../Common/LeftBar.vue';

export default {

  // created() {
  //   this.buttons.forEach((value) => {
  //     if(value.path === this.$router.currentRoute.path) {
  //       this.title = value.name;
  //       this.content = [];
  //       this.content.push(value.content)
  //     }
  //   })
  // },
  components: {
    LeftBar
  },
  // watch: {
  //   '$route' (to, from) {
  //     console.log(to)
  //     console.log(from)
  //     this.buttons.forEach((value) => {
  //       if(value.path === to.path) {
  //         this.title = value.name;
  //         this.content = [];
  //         this.content.push(value.content)
  //       }
  //     })
  //   }
  // },

  data() {
    return {
      title: '',
      content: [],
      buttons: [
        {
          name: "인사말",
          path: "/company/greeting"
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