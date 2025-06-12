<template>
  <v-container>
    <v-card
      class="py-8 px-6 text-center mx-auto ma-4 elevation-1"
      elevation="12"
      max-width="400"
      width="100%"
    >
      <h3 class="text-h6 mb-4">กรอกรหัส OTP</h3>

      <!-- <div class="text-body-2">
        We sent a verification code to john..@gmail.com <br>

        Please check your email and paste the code below.
      </div> -->

      <v-sheet color="surface">
        <v-otp-input
          v-model="otp"
          variant="outlined"
        />
      </v-sheet>

      <v-btn
        class="my-4"
        color="purple"
        height="40"
        text="ยืนยัน"
        variant="flat"
        width="90%"
      />

      <div class="text-caption">
        Didn't receive the code? <a href="#" @click.prevent="otp = ''">Resend</a>
      </div>
    </v-card>
  </v-container>
</template>
<script setup>
  import { shallowRef } from 'vue'

  const otp = shallowRef('')
</script>
