<template>
  <v-container>
    <div style="color: black; font-size:25px; font-weight:bold" > 고객님이 원하시는 상환 방식으로 선택하실 수 있습니다 </div> <br> <br> <br> 
    <div class="title"> 1. 원리금 균등분할</div>
    <div class="content"> &nbsp; &nbsp; - 대출기간동안 매월 균등한 이자를 일정한 금액으로 상환하는 방식 </div> <br>
    
    <div class="title"> 2. 원금 만기 일시</div> 
    <div class="content"> &nbsp; &nbsp; - 대출기간동안 이자만 납입하고 원금을 만기에 일시 상환하는 방식 </div> <br>

    <div class="title"> 3. 원금 유예 할부</div> 
    <div class="content"> &nbsp; &nbsp; - 대출금의 일부는 분할상환하고 일부는 만기에 일시 상환하는 방식 </div> 
  
  </v-container>  
</template>

<script>
  export default {

  }
</script>

<style scoped>
  ::v-deep.title {
    color: #5c6bc0 !important;
    font-size:20px;
    font-weight:600;
  }

  ::v-deep.content {
    color: black !important;
  }
</style>>

