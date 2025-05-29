<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card class="pa-4" flat width="1000">
      <v-card-title class="text-center text-h5">
        <v-icon class="mr-2">mdi-truck</v-icon> Smart Backhaul
      </v-card-title>
      <v-card-text>
        <p class="text-center text-h6">เลือกประเภทผู้ใช้</p>
        <v-row class="text-center">
          <v-col cols="12" md="6">
            <v-card class="border-thin ma-4 " variant="outlined">
              <v-card-text class="ma-4">
                <v-img src="@/assets/img/Checking boxes-amico.png" />
                <p class="text-h6 pa-2">คุณเป็นเจ้าของสินค้า</p>
                <v-btn
                  block
                  class="text-white"
                  color="#FFC100"
                  rounded="lg"
                  size="large"
                  text="สมัครเพื่อจองรถ"
                  @click="nextPage"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="border-thin ma-4 " variant="outlined">
              <v-card-text class="ma-4">
                <v-img src="@/assets/img/Free shipping-amico 1.svg" />
                <p class="text-h6 pa-2">คุณเป็นเจ้าของสินค้า</p>
                <v-btn
                  block
                  class="text-white"
                  color="#10B981"
                  rounded="lg"
                  size="large"
                  text="สมัครเพื่อหางานขนส่ง"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-divider>หรือ</v-divider>
        <div class="justify-center mt-3">
          <v-btn
            block
            class="text-white"
            color="#005EB8"
            rounded="lg"
            size="x-large"
            style="height: 80px"
            @click="login"
          >
            <div class="d-flex flex-column align-center">
              <span class="text-body-1">LSP Partner</span>
              <span class="text-caption">(Logistics Service Provider)</span>
            </div>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
  import router from '@/router/index';

  const nextPage = () => {
    console.log('Next page clicked');
    router.push('/auth/shipper');
  };
</script>
