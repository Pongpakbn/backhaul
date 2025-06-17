<template>
  <v-container>
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card
          class="d-flex align-center justify-center"
          color="primary"
          height="180"
          rounded="lg"
          @click="navigate('จองรถ')"
        >
          <v-card-title
            class="d-flex flex-column flex-sm-row align-center justify-center text-center ma-4"
          >
            <v-icon class="mb-2 mb-sm-0 me-sm-4" size="80">mdi-truck</v-icon>
            <p class="text-h4 text-sm-h3 mb-0">จองรถ</p>
          </v-card-title>
        </v-card>
      </v-col>

      <!-- menu -->
      <v-col
        v-for="(item, index) in cardItems"
        :key="index"
        cols="12"
        lg="6"
        md="6"
        sm="6"
      >
        <v-card
          class="pa-4"
          elevation="0"
          flat
          rounded="lg"
          @click="navigate(item.title)"
        >
          <v-card-text>
            <v-row>
              <v-col class="d-flex align-center justify-center" cols="12" md="4">
                <v-icon size="60">{{ item.icon }}</v-icon>
              </v-col>
              <v-col class="d-flex align-center justify-start" cols="12" md="8">
                <p class="text-h4 font-weight-medium">{{ item.title }}</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        cardItems: [
          { title: 'ติดตามสินค้า', icon: 'mdi-package-variant' },
          { title: 'ชำระเงิน', icon: 'mdi-credit-card' },
          { title: 'ประวัติการจอง', icon: 'mdi-history' },
          { title: 'เช็ครถว่าง', icon: 'mdi-truck-check' },
        ],
      };
    },
    methods: {
      navigate (title) {
        switch (title) {
          case 'จองรถ':
            this.$router.push('/user/booking');
            break;
          case 'ติดตามสินค้า':
            this.$router.push('/user/tracking');
            break;
          case 'ชำระเงิน':
            this.$router.push('/user/payment');
            break;
          case 'ประวัติการจอง':
            this.$router.push('/user/history');
            break;
          case 'เช็ครถว่าง':
            this.$router.push('/user/checkcar');
            break;
        }
      },
    },
  };
</script>
