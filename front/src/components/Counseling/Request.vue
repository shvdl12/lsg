<template>
  <v-container>
    <v-card>
        <v-card-title>
          <h3> 대출상담 </h3>
        </v-card-title>
        <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
        <v-card-text>
          <v-form ref="form">
            <v-row  style="margin-top:3%">
              <v-col xl="2" lg="2">
                <h4> 이름 </h4>
              </v-col>
              <v-col class="pa-0" xl="4" lg="5">
                <v-text-field style="font-size: 12px" v-model="user.name" dense outlined color="#5F4B8B"  type="text"
                autocomplete="off" :rules="[rules.required]"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col xl="2" lg="2">
                <h4> 연락처 </h4>
              </v-col>
              <v-col class="pa-0" xl="4" lg="5">
                <v-text-field style="font-size: 12px" v-model="user.phone" dense outlined color="#5F4B8B" 
                type="text" autocomplete="off" :rules="[rules.required, rules.phoneNumber.pattern]"></v-text-field>  
              </v-col>
            </v-row>

            <v-row>
              <v-col xl="2" lg="2">
                <h4 > 남기고 싶은 말 </h4>
              </v-col>
              <v-col class="pa-0" xl="7" lg="7">
                <v-textarea height="100" style="font-size: 12px" v-model="user.comment" no-resize dense outlined color="#5F4B8B" 
                type="text" autocomplete="off"></v-textarea>  
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card style="margin-top:1%">
        <v-card-title>
          <h6> 이용 약관(약관에 동의하셔야 상담 신청이 가능합니다) </h6>
        </v-card-title>
        <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
        <v-card-text class="pa-0">
          
          <v-row>
            <v-col  xl="12">
              <v-textarea readonly style="font-size: 15px" v-model="terms" no-resize dense outlined color="#5F4B8B" 
              type="text" autocomplete="off"></v-textarea>  
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      
      <v-row justify="center" align="center">
        <v-col class="pb-0" xl="3" align="center">
          <v-checkbox color="#5F4B8B" v-model="isAgreed" class="checkbox" dense label="약관에 동의하시겠습니까?"> </v-checkbox>
        </v-col>
      </v-row>

      <v-row justify="center" align="center">
        <v-col class="pt-0" xl="5">
          <v-btn block @click="requestCounseling" color="#fd5c63"> 신청 </v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import terms from 'raw-loader!../../files/termsSub.txt';

export default {

  created() {
    
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

      this.$axios.post('/counseling/create', this.user).then((res) => {
        if(res.data.code === 200) {
          this.$swal.fire({
            icon: 'success',
            title: '요청 성공',
            text: '접수되었습니다',
          })
        }else {
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
    }
  },
  data() {
    return {
      user: {
        name: '',
        phone: '',
        comment: '',
        kind: '대출상담'
      },
      isAgreed: false,
      rules: {
        required: value => !!value || '필수 입력 항목입니다.',
        phoneNumber: {
          pattern: value => {
            return (/^[0-9]{10,11}$/.test(value)) || '숫자만 입력 가능합니다. (10~11자리)'
          }
        }
      },
      terms: terms
    }
  }
}
</script>

<style>

</style>