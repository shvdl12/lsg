<template>
  <v-container fluid>
    <v-row style="padding-left: 25%">
      <v-col xl="2">
        <left-bar title="고객센터" :buttons="buttons" />
      </v-col>

      <v-col xl="8">
        <v-card>
          <v-card-title>
            <h3> FAQ </h3>
          </v-card-title>
          <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
          <v-card-text>
            <div style="font-size: 35px; color:#5c6bc0; font-weight:bold"> 잦은질문모음</div><br>

            <div style="font-size: 12px">
              금융위원회는 2011년 10월 4일 이후로 신용 정보 조회기록을 <br>
              신용등급평가요소에서 제외하고 기록 또한 금융기관에 제공하지 않도록 하였습니다
            </div>
            <br>
            <v-row class="question">
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-comment-question </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div> 피아이엘(PIL) 에서는 대출이율이 어떻게 됩니까? </div>
                <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
              </v-col>

            </v-row>
            <v-row>
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-forum </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div class="answer"> 대출이율은 고객님의 개인신용도에 따라 약간의 차이가 있으며 연체금리 20%이내로 하고 있습니다. </div>
              </v-col>
            </v-row>
            <br><br>

            <v-row class="question">
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-comment-question </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div> 대출신청을 했는데 연락이 아직 안오네요. </div>
                <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
              </v-col>

            </v-row>

            <v-row>
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-forum </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div class="answer"> 대출신청을 하시고 상담전화를 드리기까지 통상 오전중 신청이시면 당일 오후에, 오후중 신청이시면 다음날 오전중으로
                  상담 전화를 드리고 있습니다. 하지만, 경우에 따라서 약간더 지체될수도 있사오니 이점 양해해 주시기 바랍니다. </div>
              </v-col>
            </v-row>
            <br><br>

            <v-row class="question">
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-comment-question </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div> 대출신청하기전에 우선 전화로 상담을 받고 싶은데요. </div>
                <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
              </v-col>

            </v-row>

            <v-row>
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-forum </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div class="answer"> 대출 상담은 통상 대출신청후 신청서에 기재된 정보를 토대로 상담이 이루어집니다.
                  피아이엘(PIL) 은 신청서작성시에 상담을 해드리는 것을 원칙으로 하고 있사오니, 대출신청을 먼저 해주시기 바랍니다. </div>
              </v-col>
            </v-row>
            <br><br>

            <v-row class="question">
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-comment-question </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div> 현재 카드가 연체중인데 대출이 가능합니까? </div>
                <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
              </v-col>

            </v-row>

            <v-row>
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-forum </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div class="answer"> 현재가 카드가 연체중이시더라도 연체기간에 따라 대출이 가능할수도 있습니다.
                  대출신청후 상담원과의 전화상담을 통해 더욱 자세한 대출여부정보를 들으실수 있습니다.</div>
              </v-col>
            </v-row>
            <br><br>

            <v-row class="question">
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-comment-question </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div> 피아이엘(PIL) 에서는 당일 대출이 가능합니까? </div>
                <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
              </v-col>

            </v-row>

            <v-row>
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-forum </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div class="answer"> 대출은 상담후 당일대출을 원칙으로 하고있으나, 고객상황 및 피아이엘(PIL) 의 상황에 따라 조금 지체될수도 있습니다. </div>
              </v-col>
            </v-row>
            <br><br>

            <v-row class="question">
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-comment-question </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div> 대출을 신청했는데,취소하고 싶습니다. </div>
                <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
              </v-col>

            </v-row>

            <v-row>
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-forum </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div class="answer"> 대출신청후 신청의 취소는 현재 전산처리가 되지 않고 있습니다.
                  다만, 신청후 상담원이 상담연락을 드렸을시 취소여부를 말씀해주시면, 대출취소와 함께 작성해 주신 개인정보는 폐기됩니다. </div>
              </v-col>
            </v-row>
            <br><br>

            <v-row class="question">
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-comment-question </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div> 대출중개 수수료 어떻게 되나요? </div>
                <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
              </v-col>

            </v-row>

            <v-row>
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-forum </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div class="answer"> 피아이엘(PIL) 에서는 대출중개 수수료를 요구하지 않습니다.
                  대출중개 수수료를 요구할 시 저희 피아이엘(PIL) 으로 연락주시기 바랍니다. </div>
              </v-col>
            </v-row>
            <br><br>

            <v-row class="question">
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-comment-question </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div> 대출은 얼마까지 가능한가요?</div>
                <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
              </v-col>

            </v-row>

            <v-row>
              <v-col xl="1" style="padding-bottom: 0px">
                <v-icon style="width: 100%"> mdi-forum </v-icon>
              </v-col>
              <v-col xl="10" style="padding-bottom: 0px">
                <div class="answer"> 대출금액한도에 대해서는 고객님들의 신용 및 그밖에 다른 이유들로 인해 차등 적용됩니다.
                  이점 숙지하시고, 피아이엘(PIL) 에서는 고객님과의 상담을 통해 가능여부를 통보해 드리고 있습니다. </div>
              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
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
          name: "FAQ",
          path: "/customer/faq"
        }
      ]
    }
  }
}
</script>

<style scoped>

.question{
  color: #5c6bc0;
}

.answer{
  color: black;
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