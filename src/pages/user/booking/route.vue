```vue
<template>
  <v-container class="pa-0 fill-height" fluid style="background-color: white">
    <v-row class="fill-height" no-gutters>
      <!-- Left Panel with Scroll -->
      <v-col class="pa-0" cols="12" md="5" style="position: relative">
        <div class="left-panel-content pa-4">
          <div class="mb-4">
            <p class="text-h6 mb-4">เลือกเส้นทาง</p>
            <div class="d-flex justify-space-around ga-2">
              <v-row>
                <v-col cols="12" md="6">
                  <v-btn
                    block
                    class="border-thin"
                    :class="{ 'bg-primary text-white': routeMode === 'useSingleRoute', 'bg-white': routeMode !== 'single' }"
                    :prepend-icon="routeMode === 'useSingleRoute' ? 'mdi-checkbox-marked' : ''"
                    rounded="lg"
                    size="large"
                    variant="outlined"
                    @click="setRouteMode('useSingleRoute')"
                  >
                    ใช้เส้นทางเดียว
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn
                    block
                    class="border-thin"
                    :class="{ 'bg-primary text-white': routeMode === 'useSplitRoute', 'bg-white': routeMode !== 'single' }"
                    :prepend-icon="routeMode === 'useSplitRoute' ? 'mdi-checkbox-marked' : ''"
                    rounded="lg"
                    size="large"
                    variant="outlined"
                    @click="setRouteMode('useSplitRoute')"
                  >
                    แยกเส้นทาง
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-h6 mb-4">รถที่เลือก</p>
            <v-card class="mx-auto" flat>
              <v-slide-group>
                <v-slide-group-item
                  v-for="n in 8"
                  :key="n"
                  v-slot="{ isSelected, toggle }"
                >
                  <v-card
                    class="me-2 ma-2"
                    :color="isSelected ? 'primary' : undefined"
                    elevation="1"
                    rounded="lg"
                    @click="toggle"
                  >
                    <v-card-text>
                      <v-icon>mdi-truck</v-icon>
                      4 ล้อคันที่ {{ n }}
                    </v-card-text>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>
            </v-card>
          </div>

          <div class="mb-4">
            <p class="text-h6 mb-4">เลือกเส้นทาง</p>
            <RouteAddress />
          </div>
          <div class="mb-2">
            <p class="text-h6 mb-2">รายละเอียดอื่นๆ</p>
            <p style="font-size: 14px">
              หมายเหตุ/อุปกรณ์ เพิ่มเติมอื่นๆ (ถ้ามี)
            </p>
            <v-textarea
              auto-grow
              density="comfortable"
              hide-details
              placeholder="กรอกหมายเหตุ/อุปกรณ์เพิ่มเติม"
              rounded="lg"
              rows="3"
              variant="outlined"
            />
          </div>

          <div class="mb-2">
            <p class="text-h6 mb-2">
              บริการส่งเอกสารกลับ
              <span style="font-size: 14px; color: #f2a900">(ฟรีไม่มีค่าใช้จ่าย)</span>
            </p>
            <v-card class="border-thin rounded-lg" flat variant="outlined">
              <v-card-text>
                <div class="d-flex align-center justify-space-between">
                  <v-checkbox
                    color="primary"
                    hide-details
                    label="บริการส่งเอกสารกลับ"
                  />
                  <p
                    style="color: #f2a900; text-decoration: underline; cursor: pointer"
                    @click="openAddressDialog"
                  >
                    เปลี่ยนที่อยู่
                  </p>
                </div>
                <div class="pl-10">
                  <p><b>สถานที่ส่งเอกสารกลับ</b></p>
                  <p>{{ address.name }}</p>
                  <p>{{ address.location }}</p>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div class="mb-2">
            <p class="text-h6 mb-2">ตัวเลือกค่าขนส่ง</p>
            <v-radio-group v-model="payment">
              <v-card
                class="border-thin pa-4 mb-4"
                :class="payment === 'recommend' ? 'selected-card' : ''"
                flat
                variant="outlined"
                @click="payment = 'recommend'"
              >
                <v-radio label="ราคาระบบแนะนำ" value="recommend" />
              </v-card>
              <v-card
                class="border-thin pa-4"
                :class="payment === 'offer' ? 'selected-card' : ''"
                flat
                variant="outlined"
                @click="payment = 'offer'"
              >
                <v-radio label="ต้องการเสนอราคา" value="offer" />
              </v-card>
            </v-radio-group>
          </div>
          <div class="mb-2">
            <v-row>
              <v-col cols="12" md="6">
                <v-btn
                  block
                  color="secondary"
                  size="large"
                  text="บันทึกร่าง"
                  variant="outlined"
                  @click="savedraft"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  block
                  color="primary"
                  size="large"
                  text="ยืนยันการจอง"
                  @click="confirmBooking"
                />
              </v-col>
            </v-row>
          </div>
        </div>

        <!-- Address Selection Dialog -->
        <v-dialog v-model="showAddressDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">เลือกที่อยู่</v-card-title>
            <v-divider />
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="(addr, index) in addressList"
                  :key="index"
                  :active="selectedAddressIndex === index"
                  color="primary"
                  :value="addr"
                  @click="selectAddress(index)"
                >
                  <v-list-item-title>{{ addr.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ addr.location }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="grey"
                text="ยกเลิก"
                variant="text"
                @click="showAddressDialog = false"
              />
              <v-btn
                color="primary"
                :disabled="selectedAddressIndex === null"
                text="ยืนยัน"
                variant="text"
                @click="confirmAddress"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <!-- Right Panel (Map) -->
      <v-col class="pa-0" cols="12" md="7">
        <RouteMap />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import RouteMap from '@/components/Map.vue';
  import RouteAddress from '@/components/Address.vue';
  import Swal from 'sweetalert2';

  export default {
    components: {
      RouteMap,
      RouteAddress,
    },
    data () {
      return {
        payment: 'recommend',
        useSingleRoute: true,
        useSplitRoute: false,
        routeMode: 'useSingleRoute',
        address: {
          name: 'มานะ ใจดี 099-123-4567',
          location:
            '2171 ถ. เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310 ประเทศไทย',
        },
        showAddressDialog: false,
        selectedAddressIndex: null,
        addressList: [
          {
            name: 'มานะ ใจดี 099-123-4567',
            location:
              '2171 ถ. เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310 ประเทศไทย',
          },
          {
            name: 'สมชาย รอบคอบ 088-987-6543',
            location:
              '123 ถ. สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110 ประเทศไทย',
          },
          {
            name: 'นารี ใส่ใจ 077-456-7890',
            location:
              '456 ซ. รัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพมหานคร 10400 ประเทศไทย',
          },
        ],
      };
    },
    methods: {
      selectSingleRoute () {
        this.useSingleRoute = true;
        this.useSplitRoute = false;
      },
      selectSplitRoute () {
        this.useSingleRoute = false;
        this.useSplitRoute = true;
      },
      setRouteMode (mode) {
        this.routeMode = mode;
      },
      openAddressDialog () {
        this.showAddressDialog = true;
        this.selectedAddressIndex = null; // Reset selection when opening dialog
      },
      selectAddress (index) {
        this.selectedAddressIndex = index;
      },
      confirmAddress () {
        if (this.selectedAddressIndex !== null) {
          this.address = { ...this.addressList[this.selectedAddressIndex] };
        }
        this.showAddressDialog = false;
        this.selectedAddressIndex = null;
      },
      confirmBooking () {
        Swal.fire({
          icon: 'success',
          title: 'ยืนยันการจองสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.$router.push('/user/booking/matching');
        });
      },
      savedraft (){
        Swal.fire({
          icon: 'success',
          title: 'บันทึกร่างสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.$router.push('/user/job');
        });
      },
    },
  };
</script>

<style scoped>
.left-panel-content {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.selected-card {
  color: white;
  border-color: var(--v-primary-base) !important;
  border-width: 1px !important;
  background-color: var(--v-primary-lighten5, #0053b8) !important;
}

.v-card {
  cursor: pointer;
}
</style>
