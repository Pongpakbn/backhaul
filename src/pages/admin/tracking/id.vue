<template>
  <v-container>
    <v-card class="mb-2 pl-0" flat>
      <v-card-title class="ma-2 d-flex pl-0 justify-space-between align-center">
        <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" @click="$router.push('/admin/tracking')" />
        <div class="d-flex align-center mt-2 mt-md-0">
          <p class="me-2 text-primary">{{ booking.bookingId }}</p>
          <v-chip
            v-if="booking.status === 'complete'"
            color="success"
            label
            text="ขนส่งสำเร็จ"
            variant="outlined"
          />
        </div>
      </v-card-title>
    </v-card>
    <v-card class="mt-2" flat title="ตำแหน่ง">
      <v-divider />
      <v-card-text>
        <v-card flat height="500">
          <MapComponent />
        </v-card>
      </v-card-text>
    </v-card>
    <v-row class="pt-2">
      <v-col cols="12" md="6">
        <v-card flat title="ผู้ส่ง">
          <v-divider />
          <v-card-text>
            <p><span class="blur">ผู้จอง: </span>{{ booking.bookerName }}</p>
            <p><span class="blur">วันที่จอง: </span>{{ booking.bookingDate }}</p>
            <p><span class="blur">หมายเลขการจอง: </span>{{ booking.bookingId }}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat title="ผู้รับ">
          <v-divider />
          <v-card-text>
            <p><span class="blur">จุดรับ: </span>{{ booking.pickupLocation }}</p>
            <p><span class="blur">จุดส่ง: </span>{{ booking.dropoffLocation }}</p>
            <p><span class="blur">สถานะ: </span>{{ booking.status === 'complete' ? 'สำเร็จ' : 'กำลังดำเนินการ' }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="mt-2" flat>
      <v-card-title>
        <p>ข้อมูลรถ</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="text">
          <v-col cols="12" md="2">
            <v-row>
              <v-col cols="12">
                <v-card border="thin" class="d-flex align-center justify-center" variant="outlined">
                  <img alt="รถ" height="120px" src="@/assets/img/assd.png">
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12">
                <span class="blur">ประเภทรถ: </span><span>{{ vehicle.type }}</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">คนขับ: </span><span>{{ vehicle.driverName }}</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">เบอร์โทรศัพท์: </span><span>{{ vehicle.driverPhone }}</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <span class="blur">ป้ายทะเบียน: </span><span>{{ vehicle.licensePlate }}</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">ผู้ให้บริการ: </span><span>{{ vehicle.provider }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-2" flat>
      <v-card-title>
        <p>ข้อมูลสินค้า</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="text">
          <v-col cols="12" md="2">
            <v-row>
              <v-col cols="12">
                <v-card border="thin" class="d-flex align-center justify-center" variant="outlined">
                  <img alt="กล่องสินค้า" height="120px" src="@/assets/img/Product.png">
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12">
                <span class="blur">ประเภทสินค้า: </span><span>{{ product.type }}</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">น้ำหนัก: </span><span>{{ product.weight }}</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">มูลค่าสินค้า: </span><span>{{ formatCurrency(product.value) }}</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <span class="blur">รวมสินค้า: </span><span>{{ formatCurrency(product.totalValue) }}</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">ค่าจัดส่ง: </span><span>{{ formatCurrency(product.shippingCost) }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-text class="d-flex justify-end">
        <h2>รวม: {{ formatCurrency(product.totalCost) }}</h2>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import MapComponent from '@/components/Map.vue'
  import { ref } from 'vue'

  const formatCurrency = value => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(value)
  }

  // Mock data for booking
  const booking = ref({
    bookerName: 'pongpak',
    bookingId: '#BH4334513',
    bookingDate: '2025-06-15 14:30',
    pickupLocation: '123 ถนนสุขุมวิท, กรุงเทพฯ',
    dropoffLocation: '456 ถนนรัชดาภิเษก, กรุงเทพฯ',
    status: 'complete',
  })

  // Mock data for vehicle
  const vehicle = ref({
    type: 'รถ 4 ล้อ',
    driverName: 'พงศ์ศักดิ์',
    driverPhone: '099-134-4312',
    licensePlate: 'กศ1111',
    provider: 'Triple S',
  })

  // Mock data for product
  const product = ref({
    type: 'เครื่องใช้ไฟฟ้า',
    weight: '8 kg',
    value: 800,
    totalValue: 800,
    shippingCost: 1287,
    totalCost: 1287,
  })
</script>
