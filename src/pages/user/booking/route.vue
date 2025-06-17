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
                    :prepend-icon="routeMode === 'useSplitRoute' ? 'mdi-checkbox-marked' : '' "
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
                  <p style="color: #f2a900; text-decoration: underline">
                    เปลี่ยนที่อยู่
                  </p>
                </div>
                <div class="pl-10">
                  <p><b>สถานที่ส่งเอกสารกลับ</b></p>
                  <!-- Mock -->
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
                  size="x-large"
                  text="บันทึกร่าง"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  block
                  color="primary"
                  size="x-large"
                  text="ยืนยันการจอง"
                  @click="$router.push('/user/booking/matching')"
                />
              </v-col>
            </v-row>
          </div>
        </div>
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
    },
  };
</script>

<style scoped>
/* route address */
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

/* ทำให้ cursor เป็นรูปแบบ pointer เมื่อชี้ที่ card */
.v-card {
  cursor: pointer;
}
</style>
