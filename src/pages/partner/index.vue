<template>
  <v-container>
    <h2>หน้าหลัก</h2>
    <v-row class="mt-2">
      <!-- menu -->
      <v-col v-for="(item, index) in cardItems" :key="index" cols="12" md="6">
        <v-card elevation="1" flat rounded="lg">
          <v-card-title class="d-flex align-center  justify-start ma-4">
            <div class="d-flex align-center">
              <v-icon class="me-8" size="60">{{ item.icon }}</v-icon>
              <div class="d-flex flex-column justify-center">
                <p class="mb-1" style="font-size: 24px">{{ item.title }}</p>
                <p class="mb-1">10 คัน</p>
                <p class="text-subtitle-1 opacity-50">ว่าง: 4 | ใช้งาน: 5 | รอซ่อม: 1</p>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="mt-4 rounded-lg">
      <v-card-title>
        รายได้
      </v-card-title>
      <v-card-text>
        <Chart />
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
  import Chart from '@/components/chart.vue';
  const cardItems = [
    { title: 'จำนวนรถในระบบ', icon: 'mdi-truck' },
    { title: 'ชำระเงิน', icon: 'mdi-truck' },
    { title: 'ประวัติการจอง', icon: 'mdi-truck' },
    { title: 'เช็ครถว่าง', icon: 'mdi-truck' },
  ];
</script>
