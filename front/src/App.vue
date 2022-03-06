<template>
  <v-app>
    <v-container fluid>
      <v-row justify="end" align="center" style="background-color: #E2E2E2; border-bottom:1px dashed">
        <v-col lg="4" align="center">
          <h4> 피아이엘(PIL)대부중개(2022-서울동대문-0004(대부중개업))</h4>
        </v-col>

        <v-col lg="4" style="display: flex; " align="right">
          <v-icon largecolor="green darken-2"> mdi-phone-classic</v-icon>
          <h4> 010-5694-5619</h4>
        </v-col>
      </v-row>

      <v-row justify="center" align="center" style="padding-left: 10%; padding-right: 10%">
        <v-col lg="3" align="left">
          <v-btn class="tool-btn" text x-large @click="$router.push('/')"> 피아이엘(PIL) </v-btn>
          <v-btn class="tool-btn-small" text @click="$router.push('/')"> 신뢰를 우선으로하는 기업 </v-btn>
        </v-col>

        <v-col lg="1" align="center">
          <v-btn class="tool-btn" text x-large @click="$router.push('/company/greeting')"> 회사소개 </v-btn>
        </v-col>

        <v-col lg="1" align="center">
          <v-btn class="tool-btn" text x-large @click="$router.push('/loan/worker')"> 대출소개 </v-btn>
        </v-col>

        <v-col lg="1" align="center">
          <v-btn class="tool-btn" text x-large @click="$router.push('/counseling/loan')"> 대출상담 </v-btn>
        </v-col>

        <v-col lg="1" align="center">
          <v-btn class="tool-btn" text x-large @click="$router.push('/customer/faq')"> 고객센터 </v-btn>
        </v-col>

        <v-col lg="1" align="center">
          <v-btn class="tool-btn" text x-large @click="$router.push('/guide/loan')"> 대출가이드 </v-btn>
        </v-col>
      </v-row>

      <hr style="border: solid 1px green; margin-top:10px;">

      <v-main>
        <router-view />
      </v-main>


      <!-- <hr style="border: gray dashed 1px;"> -->
      <v-footer padless>
        <v-card flat tile class="indigo lighten-1 white--text text-center">
          <v-card-text>

          </v-card-text>

          <v-card-text class="white--text pt-0">

            <v-row align="center" justify="center">
              <v-col xl="5">

                피아이엘(PIL) 대부중개 | 대표: 이상규 | 주소: 서울특별시 동대문구 장안동 125-19 , 502호
                이메일: queen9321@naver.com | 대부업중개번호: 2022-서울동대문-0004(대부중개업) | 개인정보보호책임자: 이상규 | 사업자등록번호:
                427-10-02124
                서울특별시 동대문구청 (경제 진흥과 : 02-2127-4274) 피아이엘(PIL) 대부중개는 한국 대부금융협회에 등록된 소비자금융사 입니다.
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>피아이엘(PIL)</strong>
          </v-card-text>
        </v-card>
      </v-footer>

      <v-row justify="center" style="margin-top:1%">
        대출금리 연 20%이내 (연체금리 연 20% 이내) <br>
        약정금리 +3%이내 <br>
        대출중개수수료 없음 취급수수료등 기타부대비용없음/상환방법: 원리금균등상환방식 / 만기일시 상환방식 <br>
        고객센터/상담실:010-5694-5619 <br>
        중개수수료를 요구하거나 받는것은 불법으로 대출과 관련된 일체 수수료를 받지 않습니다. <br>
        연체시 불이익:신용등급 하락및 연체이자 발생할 수 있음. 조기상환수수료는 없습니다.<br>
        과도한 빛은 당신에게 큰 불행을 안겨줄수 있습니다. 이자 외 별도로 중개수수료를 수취하는것은 불법입니다. <br>
        대출시 귀하의 신용등급이 하락할 수 있습니다. <br>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
  
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style >
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
  #app  {
    font-family: 'Noto Sans KR', sans-serif;
  }
</style>

<style scoped>
  
  .tool-btn {
    font-weight: bold !important;
    font-size: 17px !important;
  }

  .tool-btn-small {
    font-weight: 12px !important;
    font-size: 11px !important;
    text-align: start !important;
  }
</style>
