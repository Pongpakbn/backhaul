<template>
  <v-container>
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card
          class="d-flex align-center justify-center"
          color="primary"
          height="180"
          rounded="lg"
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
        lg="3"
        md="4"
        sm="6"
      >
        <v-card class="h-100" elevation="4" flat rounded="lg">
          <v-card-title
            class="d-flex flex-column align-center justify-center text-center pa-6"
          >
            <v-icon class="mb-4" size="60">{{ item.icon }}</v-icon>
            <p class="text-subtitle-1 font-weight-medium">{{ item.title }}</p>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  const cardItems = [
    { title: 'ติดตามสินค้า', icon: 'mdi-package-variant' },
    { title: 'ชำระเงิน', icon: 'mdi-credit-card' },
    { title: 'ประวัติการจอง', icon: 'mdi-history' },
    { title: 'เช็ครถว่าง', icon: 'mdi-truck-check' },
  ];
</script>
