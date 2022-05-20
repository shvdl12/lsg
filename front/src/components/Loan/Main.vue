<template>
  <v-container  fluid >
    <v-row   style="padding-left: 25%">
      <v-col xl="2">
        <left-bar title="대출상품" :buttons="buttons"/>
      </v-col>

      <v-col xl="7">
        <loan-table :title="title" :content="content"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LeftBar from '../Common/LeftBar.vue';
import LoanTable from './LoanTable.vue';


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
    LeftBar,
    LoanTable,
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
          name: "직장인대출",
          path: "/loan/worker",
          content: {
            target: '근속기간 3개월 이상/ 여성직장인 1개월이상/ 프리랜서 6개월 이상이며 소득증빙이 가능한 직장인',
            age: '만 20세 ~ 55세',
            amount: '100만원 ~ 5,000만원',
            interestRate: '연 20%이내',
            overdue: '대출금리 (최고 연 20% 이내)연체이율은 최고 20%를 초과할 수 없음',
            pay: '만기일시상환 : 월1회 이자납입, 원리금균등상환 : 월1회 원리금납입 (대출 계약일로부터 이자 발생) 1, 5, 10, 15, 20일 중 고객 지정결제',
            handling: '없음',
            extension: '없음',
            penalty: '0~4% 이내',
            period: '1개월~60개월 (최장 5년까지 연장가능)',
            document: '(* 최근 2주 이내 발급분)\n- 신분증(주민등록증, 운전면허증 택일)\n- 주민등록(원)초본\n- 급여거래내역3개월(근로자 소득원천징수, 재직증명서, 급여통장 사본)\n- 4대보험 가능시 (자격득실확인서,납부확인서)- 통장사본',
            notice: '※ 대출과 관련하여 대출모집법인이나 대출모집인이 고객으로부터 어떠한 명목으로든 금전을 받는것은불법입니다.\n ※ 대출이자 또는 원금연체시 신용상에 불이익이 있을 수 있습니다.',
          }
        },
        {
          name: "사업자대출",
          path: "/loan/business",
          content: {
            target: '개인 및 법입 사업체를 운영하는 사업자, 사업자등록 소지자',
            age: '만 20세 ~ 65세',
            amount: '100만원 ~ 5,000만원',
            interestRate: '연 20%이내',
            overdue: '대출금리 (최고 연 20% 이내)연체이율은 최고 20%를 초과할 수 없음',
            pay: '만기일시상환 : 월1회 이자납입, 원리금균등상환 : 월1회 원리금납입 (대출 계약일로부터 이자 발생) 1, 5, 10, 15, 20일 중 고객 지정결제',
            handling: '없음',
            extension: '없음',
            penalty: '0~4% 이내',
            period: '1개월~60개월 (최장 5년까지 연장가능)',
            document: '(* 최근 2주 이내 발급분)\n- 신분증(주민등록증, 운전면허증 택일)\n- 주민등록(원)초본(병적사항 미확인시 전역증 추가)\n- 본인 소득증빙(근로자 소득원천징수, 재직증명서, 급여통장 사본)\n- 자동이체 통장사본(인터넷통장의 경우 화면 출력 대체)\n- 사업자등록증 사본',
            notice: '※ 대출과 관련하여 대출모집법인이나 대출모집인이 고객으로부터 어떠한 명목으로든 금전을 받는것은불법입니다.\n ※ 대출이자 또는 원금연체시 신용상에 불이익이 있을 수 있습니다.',
          }
        },
        {
          name: "주부대출",
          path: "/loan/housewives",
          content: {
            target: '생활자금이 필요한 주부, 주민등록등본상 배우자가 있는 기혼 여성',
            age: '만 20세 ~ 60세',
            amount: '100만원 ~ 2,000만원',
            interestRate: '연 20%이내',
            overdue: '대출금리 (최고 연 20% 이내)연체이율은 최고 20%를 초과할 수 없음',
            pay: '만기일시상환 : 월1회 이자납입, 원리금균등상환 : 월1회 원리금납입 (대출 계약일로부터 이자 발생) 1, 5, 10, 15, 20일 중 고객 지정결제',
            handling: '없음',
            extension: '없음',
            penalty: '0~4% 이내',
            period: '1개월~60개월 (최장 5년까지 연장가능)',
            document: '(* 최근 2주 이내 발급분)\n- 신분증(주민등록증, 운전면허증 택일)\n- 주민등록(원)초본\n- 자동이체 통장사본(인터넷통장의 경우 화면 출력 대체)\n- 기타서류(고객별 간편 신청 가능)',
            notice: '※ 대출과 관련하여 대출모집법인이나 대출모집인이 고객으로부터 어떠한 명목으로든 금전을 받는것은불법입니다.\n ※ 대출이자 또는 원금연체시 신용상에 불이익이 있을 수 있습니다.',
          }
        },
        {
          name: "부동산대출",
          path: "/loan/property",
          content: {
            target: '아파트, 빌라, 주택, 상가, 토지, 전답등 부동산 물건의 모든것이 가능합니다.',
            age: '-',
            amount: '담보 감정가의 최고 60%까지\n 1년이상 상환우량고객에 한해 추가 대출 혹은 연장가능',
            interestRate: '연 20%이내',
            overdue: '대출금리 (최고 연 20% 이내)연체이율은 최고 20%를 초과할 수 없음',
            pay: '만기일시상환 : 월1회 이자납입, 원리금균등상환 : 월1회 원리금납입 (대출 계약일로부터 이자 발생) 1, 5, 10, 15, 20일 중 고객 지정결제',
            handling: '없음',
            extension: '없음',
            penalty: '0~4% 이내',
            period: '1개월~60개월(상환우량 고객에 따라 차등적용)',
            document: '(* 최근 2주 이내 발급분)\n- 신분증(주민등록증, 운전면허증 택일)\n- 주민등록(원)초본(병적사항 미확인시 전역증 추가)\n- 등기권리증, 인감증명서, 인감도장\n- 자동이체 통장사본(인터넷통장의 경우 화면 출력 대체)\n- 기타서류(고객별 간편 신청 가능)',
            notice: '※ 대출과 관련하여 대출모집법인이나 대출모집인이 고객으로부터 어떠한 명목으로든 금전을 받는것은불법입니다.\n ※ 대출이자 또는 원금연체시 신용상에 불이익이 있을 수 있습니다.',
          }
        },
        {
          name: "개인회생/신용회복대출",
          path: "/loan/revival",
          content: {
            target: '개인회생, 파산면책, 신용회복 신청자 중 소득확인이 가능한 직장인, 자영업자 모두',
            age: '만 20세 ~ 55세',
            amount: '100만원 ~ 5,000만원',
            interestRate: '연 20%이내',
            overdue: '대출금리 (최고 연 20% 이내)연체이율은 최고 20%를 초과할 수 없음',
            pay: '만기일시상환 : 월1회 이자납입, 원리금균등상환 : 월1회 원리금납입 (대출 계약일로부터 이자 발생) 1, 5, 10, 15, 20일 중 고객 지정결제',
            handling: '없음',
            extension: '없음',
            penalty: '0~4% 이내',
            period: '1개월~60개월 (최장 5년까지 연장가능)',
            document: '(* 최근 2주 이내 발급분)\n- 신분증(주민등록증, 운전면허증 택일)\n- 주민등록(원)초본(병적사항 미확인시 전역증 추가)\n- 급여거래내역3개월\n- 4대보험 가능시 (자격득실확인서,납부확인서)\n- 통장사본',
            notice: '※ 대출과 관련하여 대출모집법인이나 대출모집인이 고객으로부터 어떠한 명목으로든 금전을 받는것은불법입니다.\n ※ 대출이자 또는 원금연체시 신용상에 불이익이 있을 수 있습니다.',
          }
        },
        {
          name: "차량담보대출",
          path: "/loan/car",
          content: {
            target: '차량을 소유한 모든 고객',
            age: '만 20세 ~ 60세',
            amount: '300만원 ~ 5,000만원',
            interestRate: '연 20%이내',
            overdue: '대출금리 (최고 연 20% 이내)연체이율은 최고 20%를 초과할 수 없음',
            pay: '만기일시상환 : 월1회 이자납입, 원리금균등상환 : 월1회 원리금납입 (대출 계약일로부터 이자 발생) 1, 5, 10, 15, 20일 중 고객 지정결제',
            handling: '없음',
            extension: '없음',
            penalty: '0~4% 이내',
            period: '1개월~60개월 (최장 5년까지 연장가능)',
            document: '(* 최근 2주 이내 발급분)\n- 신분증(주민등록증, 운전면허증 택일)\n- 차량등록증\n- 주민등록(원)등본,초본\n- 인감증명서 2통, 인감도장\n- 통장사본',
            notice: '※ 대출과 관련하여 대출모집법인이나 대출모집인이 고객으로부터 어떠한 명목으로든 금전을 받는것은불법입니다.\n ※ 대출이자 또는 원금연체시 신용상에 불이익이 있을 수 있습니다.',
          }
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