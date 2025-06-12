<template>
  <v-container>
    <!-- Filter Card -->
    <v-card flat>
      <v-card-title>เช็ครถว่าง</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="pa-6" justify="center">
          <v-col cols="12" md="6">
            <p>ประเภทรถ</p>
            <v-select
              v-model="filters.vehicleType"
              clearable
              density="comfortable"
              :items="vehicleTypes"
              placeholder="เลือกประเภทรถ"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>วัน</p>
            <v-select
              v-model="filters.date"
              clearable
              density="comfortable"
              :items="dates"
              placeholder="เลือกวันที่"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>จังหวัดต้นทาง</p>
            <v-select
              v-model="filters.originProvince"
              clearable
              density="comfortable"
              :items="provinces"
              placeholder="เลือกจังหวัดต้นทาง"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>จังหวัดปลายทาง</p>
            <v-select
              v-model="filters.destinationProvince"
              clearable
              density="comfortable"
              :items="provinces"
              placeholder="เลือกจังหวัดปลายทาง"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>อำเภอต้นทาง</p>
            <v-select
              v-model="filters.originDistrict"
              clearable
              density="comfortable"
              :items="districts"
              placeholder="เลือกอำเภอต้นทาง"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>อำเภอปลายทาง</p>
            <v-select
              v-model="filters.destinationDistrict"
              clearable
              density="comfortable"
              :items="districts"
              placeholder="เลือกอำเภอปลายทาง"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>ประเภทสินค้า</p>
            <v-select
              v-model="filters.productType"
              clearable
              density="comfortable"
              :items="productTypes"
              placeholder="เลือกประเภทสินค้า"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>น้ำหนักสินค้า</p>
            <v-select
              v-model="filters.weight"
              clearable
              density="comfortable"
              :items="weights"
              placeholder="เลือกน้ำหนักสินค้า"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Results Card -->
    <v-card class="mt-4" flat>
      <v-card-title class="ma-2">
        พบ {{ filteredVehicles.length }} รายการ
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="pa-2">
          <v-col
            v-for="vehicle in filteredVehicles"
            :key="vehicle.id"
            cols="12"
            md="6"
          >
            <v-card class="pa-8 rounded-lg" color="primary" elevation="2">
              <v-row align="center">
                <!-- Origin -->
                <v-col cols="12" sm="4">
                  <div class="text-center mb-4">
                    <strong class="text-black">ต้นทาง</strong>
                    <h2>{{ vehicle.originProvince }}</h2>
                    <p class="text-black">{{ vehicle.originDistrict }}</p>
                  </div>
                  <div class="text-center">
                    <strong class="text-black">เวลาเข้ารับสินค้า</strong>
                    <h2>{{ vehicle.pickupTime }}</h2>
                  </div>
                </v-col>
                <!-- Arrow -->
                <v-col class="text-center" cols="12" sm="1">
                  <v-icon color="orange" size="35px">mdi-arrow-right</v-icon>
                </v-col>
                <!-- Destination -->
                <v-col cols="12" sm="4">
                  <div class="text-center mb-4">
                    <strong class="text-black">ปลายทาง</strong>
                    <h2>{{ vehicle.destinationProvince }}</h2>
                    <p class="text-black">{{ vehicle.destinationDistrict }}</p>
                  </div>
                  <div class="text-center">
                    <strong class="text-black">จำนวนรถ</strong>
                    <h2>{{ vehicle.vehicleCount }} รถ</h2>
                  </div></v-col>
                <!-- Price and Action -->
                <v-col class="text-right pa-2" cols="12" sm="3">
                  <h2 class="mb-6 text-secondary">{{ vehicle.price }} บาท</h2>
                  <v-btn
                    class="text-primary"
                    color="white"
                    size="large"
                    text="สนใจใช้งาน"
                    @click="handleInterest(vehicle.id)"
                  />
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
        // Filter selections
        filters: {
          vehicleType: null,
          date: null,
          originProvince: null,
          destinationProvince: null,
          originDistrict: null,
          destinationDistrict: null,
          productType: null,
          weight: null,
        },
        // Mock filter options
        vehicleTypes: ['รถ 4 ล้อ', 'รถ 6 ล้อ', 'รถ 10 ล้อ', 'รถตู้ทึบ'],
        dates: ['12 ก.พ. 68', '13 ก.พ. 68', '14 ก.พ. 68', '15 ก.พ. 68'],
        provinces: ['อุบลราชธานี', 'นครศรีธรรมราช', 'กรุงเทพมหานคร', 'เชียงใหม่'],
        districts: ['เมือง', 'วารินชำราบ', 'ทุ่งสง', 'ลานสกา'],
        productTypes: ['สินค้าทั่วไป', 'อาหารสด', 'เครื่องใช้ไฟฟ้า', 'วัสดุก่อสร้าง'],
        weights: ['< 500 กก.', '500-1000 กก.', '1000-2000 กก.', '> 2000 กก.'],
        // Mock vehicle availability data
        vehicles: [
          {
            id: 'V001',
            originProvince: 'อุบลราชธานี',
            originDistrict: 'เมือง',
            destinationProvince: 'นครศรีธรรมราช',
            destinationDistrict: 'ทุ่งสง',
            pickupTime: '13:00 - 18:00 น.',
            vehicleCount: 1,
            price: '3,000',
            vehicleType: 'รถ 4 ล้อ',
            productType: 'สินค้าทั่วไป',
            weight: '< 500 กก.',
            date: '12 ก.พ. 68',
          },
          {
            id: 'V002',
            originProvince: 'กรุงเทพมหานคร',
            originDistrict: 'บางนา',
            destinationProvince: 'เชียงใหม่',
            destinationDistrict: 'เมือง',
            pickupTime: '09:00 - 12:00 น.',
            vehicleCount: 2,
            price: '5,500',
            vehicleType: 'รถ 6 ล้อ',
            productType: 'เครื่องใช้ไฟฟ้า',
            weight: '500-1000 กก.',
            date: '13 ก.พ. 68',
          },
          {
            id: 'V003',
            originProvince: 'อุบลราชธานี',
            originDistrict: 'วารินชำราบ',
            destinationProvince: 'นครศรีธรรมราช',
            destinationDistrict: 'ลานสกา',
            pickupTime: '14:00 - 17:00 น.',
            vehicleCount: 1,
            price: '3,200',
            vehicleType: 'รถ 4 ล้อ',
            productType: 'สินค้าทั่วไป',
            weight: '< 500 กก.',
            date: '12 ก.พ. 68',
          },
          {
            id: 'V004',
            originProvince: 'เชียงใหม่',
            originDistrict: 'เมือง',
            destinationProvince: 'กรุงเทพมหานคร',
            destinationDistrict: 'บางนา',
            pickupTime: '10:00 - 15:00 น.',
            vehicleCount: 1,
            price: '6,000',
            vehicleType: 'รถ 10 ล้อ',
            productType: 'วัสดุก่อสร้าง',
            weight: '> 2000 กก.',
            date: '14 ก.พ. 68',
          },
        ],
      };
    },
    computed: {
      filteredVehicles () {
        return this.vehicles.filter(vehicle => {
          return (
            (!this.filters.vehicleType || vehicle.vehicleType === this.filters.vehicleType) &&
            (!this.filters.date || vehicle.date === this.filters.date) &&
            (!this.filters.originProvince || vehicle.originProvince === this.filters.originProvince) &&
            (!this.filters.destinationProvince || vehicle.destinationProvince === this.filters.destinationProvince) &&
            (!this.filters.originDistrict || vehicle.originDistrict === this.filters.originDistrict) &&
            (!this.filters.destinationDistrict || vehicle.destinationDistrict === this.filters.destinationDistrict) &&
            (!this.filters.productType || vehicle.productType === this.filters.productType) &&
            (!this.filters.weight || vehicle.weight === this.filters.weight)
          );
        });
      },
    },
    methods: {
      handleInterest (vehicleId) {
        console.log(`สนใจใช้งานรถ ID: ${vehicleId}`);
      // Add logic for booking or further action
      },
    },
  };
</script>

<style scoped>
.text-black {
  color: #000 !important;
}
.text-secondary {
  color: #f2a900 !important;
}
.text-primary {
  color: #005eb8 !important;
}
</style>
