<template>
  <v-card>
    <v-card-title>
      <h3> 신청목록 </h3>
      <v-spacer />
       <v-text-field color="#5F4B8B" v-model="search" label="검색" class="mx-4"></v-text-field>
      <v-btn @click="deleteData" text color="#fd5c63"> 신청 기록 삭제 </v-btn>

      <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
       <v-icon v-bind="attrs" v-on="on" @click="getData"> mdi-reload </v-icon>
      </template>
      <span>새로고침</span>
    </v-tooltip>
      

    </v-card-title>
    <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
    <v-card-text class="pa-0">
      <v-data-table v-model="selected" item-key="idx" show-select :items="items" :headers="headers" class="elevation-1"  :search="search" />
    </v-card-text>
  </v-card>
  
</template>

<script>
  export default {

    props: ['title', 'content'],
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.$axios.get('/counseling/list').then((res) => {
          if(res.data.code === 200) {
            this.items = res.data.data
          }
        }).catch((err) => {
            console.log(err)
        })
      },
      deleteData() {
        if(this.selected.length === 0) {
            this.$swal.fire({
            icon: 'warning',
            title: '삭제 실패',
            text: '삭제할 기록을 선택해 주시기 바랍니다',
          })
        }
        else {
          this.$swal.fire({
            title: '정말 삭제하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
          }).then((result) => {
            if (result.isConfirmed) {
              var list = [];
              this.selected.forEach((value) => {
                list.push(value.idx)
              });
              this.$axios.post('/counseling/delete', list).then(() => {
                this.selected = []
                this.getData()
              }).catch((err) => {
                console.log(err)
              })
            } 
          })
        }
      }
    },
    data () {
      return {
        headers: [
          { text: '신청번호', value: 'idx', sortable: false},
          { text: '이름', value: 'name', sortable: false},
          { text: '연락처', value: 'phone', sortable: false},
          { text: '신청항목', value: 'kind', sortable: false},
          { text: '코멘트', value: 'comment',width: '35%', sortable: false},
          { text: '신청날짜', value: 'registeredAt' }
        ],
        items: [],
        selected: [],
        search: ''
      }
    },
  }
</script>

<style>

</style>