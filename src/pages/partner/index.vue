<template>
  <v-container>
    <v-row class="mt-2">
      <!-- menu -->
      <v-col cols="12" md="6">
        <v-card color="primary" flat rounded="lg">
          <v-card-title class="d-flex align-center  justify-start ma-4">
            <div class="d-flex align-center">
              <v-icon class="me-8" size="60">mdi-book-open-blank-variant-outline</v-icon>
              <div class="d-flex flex-column justify-center">
                <p class="mb-1" style="font-size: 24px">จำนวนการจองในระบบ</p>
                <p class="mb-1">10 คัน</p>
              </div>
            </div>
          </v-card-title>
        </v-card>

        <!--  -->
        <!-- <v-card elevation="1" flat rounded="lg">
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
        </v-card> -->
      </v-col>
      <v-col>
        <v-card flat rounded="lg" style="background-color: #f2a900;color: white;">
          <v-card-title class="d-flex align-center  justify-start ma-4">
            <div class="d-flex align-center">
              <v-icon class="me-8" size="60">mdi-map-marker-distance</v-icon>
              <div class="d-flex flex-column justify-center">
                <p class="mb-1" style="font-size: 24px">จำนวนการจองในระบบ</p>
                <p class="mb-1">10 คัน</p>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="mt-4" flat>
      <v-row>
        <v-col cols="12" md="6">
          <v-card flat>
            <v-card-title class="d-flex align-center  justify-start ma-4">
              <div class="d-flex align-center">
                <v-icon class="me-8" size="60">mdi-truck</v-icon>
                <div class="d-flex flex-column justify-center">
                  <p class="mb-1" style="font-size: 24px" />
                  <p class="mb-1">10 คัน</p>
                  <p class="text-subtitle-1 opacity-50">ว่าง: 4 | ใช้งาน: 5 | รอซ่อม: 1</p>
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card flat>
            <v-card-title class="d-flex align-center  justify-start ma-4">
              <div class="d-flex align-center">
                <v-icon class="me-8" size="60">mdi-steering</v-icon>
                <div class="d-flex flex-column justify-center">
                  <p class="mb-1" style="font-size: 24px" />
                  <p class="mb-1">10 คัน</p>
                  <p class="text-subtitle-1 opacity-50">ว่าง: 4 | ใช้งาน: 5 | รอซ่อม: 1</p>
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-4 rounded-lg" flat>
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
  // const cardItems = [
  //   { title: 'จำนวนรถในระบบ', icon: 'mdi-truck' },
  //   { title: 'ชำระเงิน', icon: 'mdi-truck' },
  //   { title: 'ประวัติการจอง', icon: 'mdi-truck' },
  //   { title: 'เช็ครถว่าง', icon: 'mdi-truck' },
  // ];
</script>
