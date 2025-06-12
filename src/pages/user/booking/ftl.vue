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
            <v-card class="d-flex flex-column pa-6 border-thin" rounded="lg" variant="outlined">
              <v-row align="center">
                <v-col cols="12" sm="2">
                  <v-img
                    alt="รถบรรทุก 4 ล้อ"
                    class="mx-auto"
                    height="150"
                    :src="truck.image"
                    width="100%"
                  />
                </v-col>
                <v-col cols="12" sm="9">
                  <h3 class="text-h6">{{ truck.title }}</h3>
                  <p class="mb-1">
                    พื้นที่บรรทุก (กว้าง) {{ truck.width }} x (ยาว) {{ truck.length }} x
                    (สูง) {{ truck.height }} เมตร
                  </p>
                  <p class="mb-1">
                    ระยะเวลาการจัดส่ง {{ truck.deliveryTime }} ชม.
                  </p>
                  <v-card
                    class="text-white pa-2 mt-2"
                    style="background-color: #f2a901;"
                    variant="tonal"
                  >
                    <v-icon class="mr-2" small>mdi-shield-check</v-icon>
                    {{ fullInsuranceText }}
                  </v-card>
                </v-col>
                <v-col class="d-flex justify-center align-center  mt-4 mt-sm-0" cols="12" sm="1">
                  <v-btn color="primary">เลือก</v-btn>
                </v-col>
              </v-row>
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
            image: 'https://png.pngtree.com/png-clipart/20240306/original/pngtree-truck-transport-car-png-image_14525358.png',
          },
          {
            title: 'รถ 4 ล้อ (ใหญ่)',
            width: '1.7-1.8',
            length: '3.0-3.2',
            height: '1.7-2.0',
            weight: '100,000',
            deliveryTime: '1.5-2.0',
            image: 'https://png.pngtree.com/png-clipart/20240306/original/pngtree-truck-transport-car-png-image_14525358.png',
          },
          {
            title: 'รถ 4 ล้อ (ใหญ่)',
            width: '1.7-1.8',
            length: '3.0-3.2',
            height: '1.7-2.0',
            weight: '100,000',
            deliveryTime: '1.5-2.0',
            image: 'https://png.pngtree.com/png-clipart/20240306/original/pngtree-truck-transport-car-png-image_14525358.png',
          },
        ],
        showFullText: false,
        fullInsuranceText: 'ประกันสินค้าระหว่างขนส่ง จ่ายตามจริงแต่ไม่เกิน 1,000,000 บาท/เที่ยว (หมายเหตุ*ขึ้นอยู่กับประกันภัยของแต่ละคัน)',
        truncatedInsuranceText: 'ประกันสินค้าระหว่างขนส่ง จ่ายตามจริง...',
      };
    },
  };
</script>

<style scoped>
.border-thin {
  border-width: 1px !important;
}
.full-text {
  white-space: normal;
  font-size: 0.875rem;
  color: #555;
}
</style>
