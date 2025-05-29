<template>
  <v-container>
    <v-card>
      <v-card-title> ประเภทรถ </v-card-title>
      <v-divider />
      <v-card-text>
        <div class="fab-wrapper">
          <v-btn
            class="rotate-fab"
            color="secondary"
            size="large"
            @click="drawer = true"
          >
            <span class="rotate-text">รายการรถที่เลือก </span>
          </v-btn>
        </div>
        <v-row>
          <v-col
            v-for="(truck, index) in trucks"
            :key="index"
            cols="12"
            md="6"
            sm="6"
          >
            <v-card class="pa-4 border-thin" variant="outlined">
              <v-row no-gutters>
                <!-- รูปไอคอนรถ -->
                <v-col class="d-flex align-center" cols="4">
                  <v-img
                    contain
                    max-width="100%"
                    src="https://www.isuzucv.com/images/us/models/6.6l_npr_gas.webp"
                  />
                </v-col>
                <!-- ข้อมูลรถ -->
                <v-col
                  class="d-flex flex-column justify-space-between"
                  cols="8"
                >
                  <div>
                    <v-card-title class="text-h6">
                      {{ truck.name }}
                    </v-card-title>
                    <v-card-text>
                      <p class="mb-1">
                        ขนาดตัวรถ (ย) {{ truck.length }} x (ก)
                        {{ truck.width }} x (ส) {{ truck.height }} เมตร
                      </p>
                      <p class="mb-1">
                        รับน้ำหนักสูงสุด
                        {{ truck.maxWeight.toLocaleString() }} กิโลกรัม
                      </p>
                      <p class="mb-1">ความสูงพื้น 1.5-2.0 เมตร</p>
                    </v-card-text>
                  </div>
                  <!-- ปุ่ม -->
                  <v-btn
                    class="mt-2 align-self-end select"
                    size="large"
                    @click="selectTruck(truck)"
                  >
                    เลือก
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-navigation-drawer
      v-model="drawer"
      class="d-flex flex-column fill-height"
      location="right"
      temporary
      width="800"
    >
      <v-card color="primary" flat rounded="0">
        <v-card-text class="d-flex align-center justify-space-between">
          <h2>รายการรถที่เลือก</h2>
          <v-btn
            density="comfortable"
            icon="mdi mdi-close"
            variant="text"
            @click="drawer = false"
          />
        </v-card-text>
      </v-card>
      <v-card v-if="selectedTrucks.length === 0" color="#f5f5f5" flat>
        <v-card-text>
          <p class="text-center text-grey ma-16">ขณะนี้ยังไม่มีข้อมูลรถ</p>
        </v-card-text>
      </v-card>
      <v-divider />
      <v-list class="pa-0">
        <v-list-item v-for="(truck, index) in selectedTrucks" :key="index">
          <v-list-item class="pa-0">
            <v-row no-gutters>
              <!-- รูปไอคอนรถ -->
              <v-col class="d-flex align-center" cols="3">
                <v-img
                  contain
                  max-width="80%"
                  src="https://www.isuzucv.com/images/us/models/6.6l_npr_gas.webp"
                />
              </v-col>
              <!-- ข้อมูลรถ -->
              <v-col class="d-flex flex-column justify-space-between" cols="6">
                <div>
                  <v-card-title class="text-h6">
                    {{ truck.name }}
                  </v-card-title>
                  <v-card-text>
                    <p class="mb-1">
                      ขนาดตัวรถ (ย) {{ truck.length }} x (ก) {{ truck.width }} x
                      (ส) {{ truck.height }} เมตร
                    </p>
                    <p class="mb-1">
                      รับน้ำหนักสูงสุด
                      {{ truck.maxWeight.toLocaleString() }} กิโลกรัม
                    </p>
                    <p class="mb-1">ความสูงพื้น 1.5-2.0 เมตร</p>
                  </v-card-text>
                </div>
              </v-col>
              <!-- <v-col class="mt-2 d-flex justify-start align-center gap-2" cols="3">
                <v-btn
                  v-if="getTruckQuantity(truck) === 0"
                  color="primary"
                  icon
                  @click="addTruck(truck)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>

                <template v-else>
                  <v-btn icon @click="removeTruck(truck)">
                    <v-icon>
                      {{
                        getTruckQuantity(truck) === 1
                          ? "mdi-delete"
                          : "mdi-minus"
                      }}
                    </v-icon>
                  </v-btn>

                  <span class="mx-2 text-h6">
                    {{ getTruckQuantity(truck) }}
                  </span>
                  <v-btn icon @click="addTruck(truck)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
              </v-col> -->
            </v-row>
          </v-list-item>
        </v-list-item>
      </v-list>

      <div class="mt-4">
        <v-btn block class="select" size="large" @click="drawer = false">
          ยืนยันการเลือก
        </v-btn>
      </div>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false, // <-- ควบคุม Drawer
        selectedTrucks: [],
        // ข้อมูลรถ 12 คัน
        trucks: [
          {
            name: 'รถ 4 ล้อ (ตู้ทึบ)',
            length: '1.7-1.8',
            width: '3.0-3.2',
            height: '1.7-2.0',
            maxWeight: 100000,
          },
          {
            name: 'รถ 4 ล้อ (ตู้ทึบ)',
            length: '1.8-1.9',
            width: '3.1-3.3',
            height: '1.8-2.1',
            maxWeight: 120000,
          },
          {
            name: 'รถ 6 ล้อ (ตู้ทึบ)',
            length: '2.0-2.2',
            width: '3.5-3.7',
            height: '2.0-2.3',
            maxWeight: 150000,
          },
          {
            name: 'รถ 6 ล้อ (ตู้ทึบ)',
            length: '2.1-2.3',
            width: '3.6-3.8',
            height: '2.1-2.4',
            maxWeight: 160000,
          },
          {
            name: 'รถ 10 ล้อ (ตู้ทึบ)',
            length: '2.5-2.7',
            width: '4.0-4.2',
            height: '2.5-2.8',
            maxWeight: 200000,
          },
          {
            name: 'รถ 10 ล้อ (ตู้ทึบ)',
            length: '2.6-2.8',
            width: '4.1-4.3',
            height: '2.6-2.9',
            maxWeight: 210000,
          },
          {
            name: 'รถเทรลเลอร์',
            length: '3.0-3.2',
            width: '4.5-4.7',
            height: '3.0-3.3',
            maxWeight: 300000,
          },
          {
            name: 'รถเทรลเลอร์',
            length: '3.1-3.3',
            width: '4.6-4.8',
            height: '3.1-3.4',
            maxWeight: 310000,
          },
          {
            name: 'รถกระบะ (ตู้ทึบ)',
            length: '1.5-1.6',
            width: '2.8-3.0',
            height: '1.5-1.8',
            maxWeight: 80000,
          },
          {
            name: 'รถกระบะ (ตู้ทึบ)',
            length: '1.6-1.7',
            width: '2.9-3.1',
            height: '1.6-1.9',
            maxWeight: 85000,
          },
          {
            name: 'รถ 4 ล้อ (คอก)',
            length: '1.7-1.8',
            width: '3.0-3.2',
            height: '1.7-2.0',
            maxWeight: 90000,
          },
          {
            name: 'รถ 4 ล้อ (คอก)',
            length: '1.8-1.9',
            width: '3.1-3.3',
            height: '1.8-2.1',
            maxWeight: 95000,
          },
        ],
      };
    },
    methods: {
      selectTruck (truck) {
        // เช็คว่ารถนี้ยังไม่ได้เลือก
        if (!this.selectedTrucks.includes(truck)) {
          this.selectedTrucks.push(truck);
        }
        this.drawer = true;
      },
      getTruckQuantity (truck) {
        const found = this.selectedTrucks.find(t => t.truck === truck);
        return found ? found.quantity : 0;
      },
      addTruck (truck) {
        const found = this.selectedTrucks.find(t => t.truck === truck);
        if (found) {
          found.quantity++;
        } else {
          this.selectedTrucks.push({ truck, quantity: 1 });
        }
      },
      removeTruck (truck) {
        const index = this.selectedTrucks.findIndex(t => t.truck === truck);
        if (index !== -1) {
          const item = this.selectedTrucks[index];
          item.quantity--;
          if (item.quantity <= 0) {
            this.selectedTrucks.splice(index, 1);
          }
        }
      },
    },
  };
</script>

<style scoped>
.fab-wrapper {
  position: fixed;
  top: 50%;
  right: -63px;
  transform: translateY(-50%);
  z-index: 999;
}

.rotate-fab {
  transform: rotate(90deg);
  height: 80px;
  width: 190px; /* กำหนดความกว้างพอให้มีพื้นที่สำหรับข้อความแนวนอน */
  display: flex;
  align-items: center;
  justify-content: center;
}

.rotate-text {
  display: block;
  text-align: center;
  width: 100%;
  color: white;
}
.select {
  color: white;
  background-color: #0053b8;
}
.select:hover {
  background-color: #f2a900;
}
</style>
