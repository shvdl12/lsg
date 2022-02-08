<template>
  <v-container  fluid >
    <v-row  style="padding-left: 25%">
      <v-col xl="2">
        <left-bar title="대출상담" :buttons="buttons"/>
      </v-col>

      <v-col v-if="title === '대출상담'" xl="7">
        <request  />
      </v-col>
      <v-col v-else xl="8">
        <counseling-table  /> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LeftBar from '../Common/LeftBar.vue';
import CounselingTable from './CounselingTable.vue';
import Request from './Request.vue';

export default {

  created() {
    this.title = this.buttons[0].name;
    this.getTermsText()
    // console.log(this.$router.currentRoute.path)
  },
  components: {
    LeftBar,
    Request,
    CounselingTable
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
      this.buttons.forEach((value) => {
        if(value.path === to.path) {
          this.title = value.name;
          console.log(this.title)
        }
      })
    }
  },
  methods: {
    reset() {
      this.isAgreed = false;
      this.$refs.form.reset();
    },
    getTermsText() {
      this.$axios.get("/text/termsSub").then((res) => {
        this.terms = res.data
        // console.log(this.terms.content)
      }).catch((err) => {
        alert(err)
      })
    },
    requestCounseling() {

      this.user.name = this.user.name.trim()
      this.user.phone = this.user.phone.trim()
      
      if(!this.$refs.form.validate()) {
        return;
      }

      if(this.isAgreed === false) {
        this.$swal.fire({
          icon: 'error',
          title: '요청 실패',
          text: '약관에 동의하여 주시기 바랍니다',
        })
        return;
      }

      this.$swal.fire({
        icon: 'success',
        title: '요청 성공',
        text: '접수되었습니다',
      })
      this.reset();
    }
  },
  data() {
    return {
      title: '',
      user: {
        name: '',
        phone: '',
        comment: ''
      },
      isAgreed: false,
      terms: '',
      rules: {
        required: value => !!value || '필수 입력 항목입니다.',
        phoneNumber: {
          pattern: value => {
            return (/^[0-9]{10,11}$/.test(value)) || '숫자만 입력 가능합니다. (10~11자리)'
          }
        }
      },
      buttons: [
        {
          name: "대출상담",
          path: "/counseling/loan"
        },
        {
          name: "신청목록",
          path: "/counseling/list"
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