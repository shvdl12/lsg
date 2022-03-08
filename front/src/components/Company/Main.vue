<template>
  <v-container fluid>
    <v-row style="padding-left: 25%">
      <v-col xl="2">
        <left-bar title="회사소개" :buttons="buttons" />
      </v-col>

      <!-- <v-col xl="7">
        <loan-table :title="title" :content="content"/>
      </v-col> -->
      <v-col xl="8" style="margin-top: 5%">
        <v-row>
          <v-col xl="2">
            <img src="@/assets/offcier.png" style="width:100%; height:100%"> 
          </v-col>

          <v-col xl="8" style="margin-left:5%">

            <div class="header">
              저희 PIL대부중개를 방문해 주신 고객 <br>
              여러분에게 진심으로 감사드립니다
            </div>
            <br>

            <div class="content">
              언제나 고객님의 목소리에 귀 기울여 최적의 맞춤상품을 <br>
              신속하고 정확하게 제공하는 기업으로 평가 받도록 노력하겠습니다 <br><br>

              인터넷 금융 선도 업체로써 고객님에게 보답할 것을 다짐하며 <br>
              다시 한번 고객님의 방문에 깊은 감사의 말씀을 전합니다 <br><br>

              오늘도 행복한 하루 되시길 기원하겠습니다
            </div>
          </v-col>
        </v-row>

      </v-col>

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

.header {
  font-size: 25px;
  font-weight:500;
}

.content {
  font-size: 17px;
  color: gray;
  
}

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