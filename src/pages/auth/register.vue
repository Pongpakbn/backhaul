<template>
  <v-card class="pa-6 fill-height d-flex justify-center align-center" flat style="height: 100%">
    <v-card-title class="text-center text-h5" />
    <v-card-text>
      <div class="d-flex justify-center align-center">
        <v-icon class="mr-2" size="70px">mdi-truck</v-icon> <span class="text-h4">Smart Backhaul</span>
      </div>
      <p class="text-center text-h6">เลือกประเภทผู้ใช้</p>
      <v-row class="text-center">
        <v-col cols="12" md="4">
          <v-card class="border-thin ma-4" variant="outlined">
            <v-card-text class="ma-4">
              <v-img height="100%" src="@/assets/img/Checking boxes-amico.png" />
              <p class="text-h6 pa-2">คุณเป็นเจ้าของสินค้า</p>
              <v-btn
                block
                class="text-white"
                color="#F2A900"
                rounded="lg"
                size="x-large"
                text="สมัครเพื่อหารถส่งสินค้า"
                @click="goToShipper"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="border-thin ma-4" variant="outlined">
            <v-card-text class="ma-4">
              <v-img src="@/assets/img/Free shipping-amico 1.svg" />
              <p class="text-h6 pa-2">คุณเป็นเจ้าของสินค้า</p>
              <v-btn
                block
                class="text-white"
                color="#10B981"
                rounded="lg"
                size="x-large"
                text="สมัครเพื่อหางานขนส่ง"
                @click="goToDriver"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="border-thin ma-4" variant="outlined">
            <v-card-text class="ma-4">
              <v-img src="@/assets/img/Location search-amico 1.svg" />
              <p class="text-h6 pa-2">คุณเป็นเจ้าของสินค้า</p>
              <v-btn
                block
                class="text-white"
                color="#005EB8"
                rounded="lg"
                size="x-large"
                text="สมัครเพื่อให้บริการขนส่ง"
                @click="goToLsp"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-divider>หรือ</v-divider>
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
        </div> -->
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'UserTypeSelection',
    data () {
      return {};
    },
    methods: {
      goToShipper () {
        this.$router.push('/auth/shipper');
      },
      goToDriver () {
        this.$router.push('/auth/driver');
      },
      goToLsp () {
        this.$router.push('/auth/lsp');
      },
    },
  };
</script>
