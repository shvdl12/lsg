<template>
   <div class="text-center">
    <v-dialog
      v-model="visible"
      width="700"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          이용약관 및 개인정보수집
        </v-card-title>

        <v-card-text>
          <v-textarea height="500" no-resize readonly solo v-model="terms"></v-textarea>
          <v-textarea height="500" no-resize readonly solo v-model="privacy"></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#5F4B8B"
            text
            @click="$emit('update:visible', false);"
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['visible', 'privacy', 'terms']
}
</script>

<style>

</style>