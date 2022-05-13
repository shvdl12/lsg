<template>
  <v-card>
    <v-card-title class="justify-center" style="background-color:#E69A8D">
      <div style="text-align: center; color:white; font-weight:400"> 나의 대출 한도 상담 </div>
    </v-card-title>
    <v-card-text style="margin-bottom:0px; padding-bottom:0px">
      <v-form ref="form">
        <v-text-field v-model="limit.name" label="이름" color="#5F4B8B" prepend-icon="mdi-account" type="text"
          autocomplete="off" :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="limit.phone" label="연락처" color="#5F4B8B" prepend-icon="mdi-phone"
          :type="type" autocomplete="off" :rules="[rules.required, rules.phone.pattern]"></v-text-field>

        개인(신용)정보/수집/이용 제공동의서

        <v-row justify="center" align="center">
          <v-col xl="12" align="center">
            <v-btn dense text small color="#fd5c63" @click="clickTemrsAndPrivacy"> 이용약관 및 개인정보수집</v-btn>
          </v-col>

          <!-- <v-col xl="6" align="center">
            <v-btn dense text small color="#fd5c63" @click="clickPrivacy()"> 개인정보수집 </v-btn>
          </v-col> -->
        </v-row>
        <v-checkbox color="#5F4B8B" v-model="isAgreed" class="checkbox" dense label="개인정보이용/전화권유 동의"> </v-checkbox>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn block @click="limitCheck" color="#fd5c63"> 신청 </v-btn>
    </v-card-actions>
    
    <terms :visible.sync="dialog.visible" :terms="dialog.terms" :privacy="dialog.privacy"  />

  </v-card>
</template>

<script>
import Terms from './Terms.vue';
import termsTxt from 'raw-loader!../../files/terms.txt';
import privacyTxt from 'raw-loader!../../files/privacy.txt';
// import moment from 'moment';

export default {
  created() {
  
  },
  components: { Terms },
  computed: {
    userName() {
      return this.limit.name
    }
  },
  watch: {
    userName(val) {
      if(val === 'admin') {
        this.type = 'password'
      }else {
        this.type = 'text'
      }
    }
  },
  methods: {
    clickTemrsAndPrivacy() {
      this.dialog.visible = true;
      this.dialog.confirm = true;
    },
    reset() {
      this.isAgreed = false;
      this.dialog.confirm = false;
      this.$refs.form.reset();
    },
    limitCheck() {
      this.limit.name = this.limit.name.trim()
      this.limit.phone = this.limit.phone.trim()

      if (this.$router.currentRoute.path.indexOf('counseling') > 0 && this.limit.name === 'admin') {
        this.$axios.post('/counseling/auth', {
          adminPass: this.limit.phone
        }).then((res) => {
          if (res.data.code === 200) {
            this.$store.state.token = res.data.token
            this.$swal.fire({
              icon: 'success',
              title: '인증 성공',
              text: '인증되었습니다',
            })
          } else {
            this.$swal.fire({
              icon: 'error',
              title: '요청 실패',
              text: res.data.message,
            })
          }
        }).catch((err) => {
          console.log(err)
        })
        this.reset();
        return;
      }

      if (!this.$refs.form.validate()) {
        return;
      }

      if (this.dialog.confirm !== true) {
        this.$swal.fire({
          icon: 'error',
          title: '요청 실패',
          text: '약관을 확인해 주시기 바랍니다',
        })
        return;
      }
      if (this.isAgreed !== true) {
        this.$swal.fire({
          icon: 'error',
          title: '요청 실패',
          text: '약관에 동의하여 주시기 바랍니다',
        })
        return;
      }
      this.$axios.post('/counseling/create', this.limit).then((res) => {
        if (res.data.code === 200) {
          this.$swal.fire({
            icon: 'success',
            title: '요청 성공',
            text: '접수되었습니다',
          })
        } else {
          this.$swal.fire({
            icon: 'warning',
            title: '요청 실패',
            text: '관리자에게 문의하시기 바랍니다.',
          })
        }
        this.reset();
      }).catch((err) => {
        console.log(err)
      })
    },
    getTermsText() {
      this.$axios.get("/text/terms").then((res) => {
        this.dialog.terms = res.data
        // console.log(this.terms.content)
      }).catch((err) => {
        alert(err)
      })  
    },
    getPrivacyText() {
      this.$axios.get("/text/privacy").then((res) => {
        this.dialog.privacy = res.data
        // console.log(this.terms.content)
      }).catch((err) => {
        alert(err)
      })  
    }
    
  },
  data() {
    return {
      isAgreed: false,
      limit: {
        name: "",
        phone: "",
        kind: "한도조회"
      },
      rules: {
        required: value => !!value || '필수 입력 항목입니다.',
        phone: {
          pattern: value => {
            return (/^[0-9]{10,11}$/.test(value)) || '10~11 자리 숫자만 입력 가능합니다.'
          }
        }
      },
      dialog: {
        visible: false,
        privacy: privacyTxt,
        terms: termsTxt,
        confirm: false
      },
      type: 'text'
    }
  }
}
</script>

<style scoped>
::v-deep .checkbox .v-label {
 font-size: 10px;
}

</style>

