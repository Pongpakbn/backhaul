<template>
  <v-container>
    <v-card class="mb-4 d-flex align-center justify-space-between" flat>
      <div class="d-flex align-center ma-4">
        <v-btn prepend-icon="mdi-chevron-left" variant="text">ย้อนกลับ</v-btn>
      </div>
      <v-chip class="me-4" color="secondary" label variant="outlined">
        เหมาคัน
      </v-chip>
    </v-card>
    <v-card flat subtitle="ระบบจะแนะนำรถที่เหมาะสมกับสินค้า" title="รถที่แนะนำ">
      <template #append>
        <v-btn color="primary" size="large">ต้องการเลือกรถด้วยตัวเอง</v-btn>
      </template>

      <v-divider />
      <v-card-text>
        <v-row>
          <v-col v-for="(truck, index) in trucks" :key="index" cols="12">
            <v-card class="d-flex align-center pa-4 border-thin" rounded="lg" variant="outlined">
              <!-- Truck Image -->
              <v-img
                alt="รถบรรทุก 4 ล้อ"
                class="mr-4"
                max-width="100"
                :src="truck.image"
              />

              <!-- Truck Details -->
              <v-card-text>
                <h3 class="text-h6">{{ truck.title }}</h3>
                <p class="mb-1">
                  ขนาด (กว้าง) {{ truck.width }} x (ยาว) {{ truck.length }} x
                  (สูง) {{ truck.height }} เมตร
                </p>
                <p class="mb-1">รับน้ำหนักสูงสุด {{ truck.weight }} กิโลกรัม</p>
                <p class="mb-1">
                  ระยะเวลาการจัดส่ง {{ truck.deliveryTime }} ชม.
                </p>
              </v-card-text>

              <!-- Action Button -->
              <v-btn class="ml-auto" color="primary">เลือก</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        trucks: [
          {
            title: 'รถ 4 ล้อ (ใหญ่)',
            width: '1.7-1.8',
            length: '3.0-3.2',
            height: '1.7-2.0',
            weight: '100,000',
            deliveryTime: '1.5-2.0',
            image: 'https://png.pngtree.com/png-clipart/20240306/original/pngtree-truck-transport-car-png-image_14525358.png', // Replace with actual image URL
          },
          {
            title: 'รถ 4 ล้อ (ใหญ่)',
            width: '1.7-1.8',
            length: '3.0-3.2',
            height: '1.7-2.0',
            weight: '100,000',
            deliveryTime: '1.5-2.0',
            image: 'https://png.pngtree.com/png-clipart/20240306/original/pngtree-truck-transport-car-png-image_14525358.png', // Replace with actual image URL
          },
          {
            title: 'รถ 4 ล้อ (ใหญ่)',
            width: '1.7-1.8',
            length: '3.0-3.2',
            height: '1.7-2.0',
            weight: '100,000',
            deliveryTime: '1.5-2.0',
            image: 'https://png.pngtree.com/png-clipart/20240306/original/pngtree-truck-transport-car-png-image_14525358.png', // Replace with actual image URL
          },
        ],
      };
    },
  };
</script>
<!-- prepend-icon="mdi mdi-chevron-left"
class="d-flex align-center justify-space-between"
rounded="lg"
title="ย้อนกลับ" -->
