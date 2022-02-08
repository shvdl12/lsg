<template>
  <v-card>
    <v-card-title>
      <h3> {{this.title}} </h3>
    </v-card-title>
    <hr style="border: gray dashed 1px; transform: scaleY(0.5)">
    <v-card-text class="pa-0">
      <v-data-table :items="content" hide-default-footer>
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(header, idx) in headers" v-bind:key="idx">
              <td style="width:140px; font-weight:bold; background-color:#e0e0e0; ">
                {{ header.text }}
              </td>
              <td v-for="(item, idx) in items" v-bind:key="idx">
                {{ item[header.value] }}
              </td>
            </tr>
          </tbody>  
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
  
</template>

<script>
  export default {

    props: ['title', 'content'],
    data () {
      return {
        headers: [
          { text: '대출대상', value: 'target'},
          { text: '대출연령', value: 'age' },
          { text: '대출금액', value: 'amount' },
          { text: '대출금리', value: 'interestRate' },
          { text: '이자납입방법', value: 'pay' },
          { text: '연체이자율', value: 'overdue' },
          { text: '취급수수료', value: 'handling' },
          { text: '연장수수료', value: 'extension' },
          { text: '중도상환수수료', value: 'penalty' },
          { text: '대출기간', value: 'period' },
          { text: '구비서류', value: 'document' },
          { text: '유의사항', value: 'notice' },
        ]
      }
    },
  }
</script>

<style>

</style>