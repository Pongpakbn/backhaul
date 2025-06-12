<template>
  <v-container>
    <v-card class="pa-6" flat rounded="lg">
      <v-card-text class="d-flex align-center justify-space-between">
        <div class="align-center">
          <div class="d-flex align-center">
            <v-icon class="me-4" size="80">mdi-truck</v-icon>
            <h2 class="animate-wave" style="color: #005eb8">กำลังขนหารถ...</h2>
          </div>
          <p style="color: #005eb8">ระบบกำลังหารถในพื้นที่</p>
        </div>
        <div class="d-flex flex-column align-end">
          <h1 style="color: #f2a900">{{ formattedTime }}</h1>
          <p style="color: #005eb8">เวลาโดยประมาณ 10 นาที</p>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="mt-3" flat rounded="lg">
      <v-card-text>
        <h2>เส้นทาง</h2>
        <Tracking />
      </v-card-text>
    </v-card>

    <v-row class="mt-0 fill-height">
      <v-col cols="12" md="6">
        <v-card flat title="เส้นทางรับ - ส่งสินค้า">
          <v-divider />
          <v-card
            flat
            max-height="auto"
            rounded="lg"
            style="overflow-y: auto"
          >
            <v-card-text>
              <v-timeline align="start" density="compact" side="end" truncate-line="both">
                <v-timeline-item
                  v-for="(stop, index) in stops"
                  :key="index"
                  :color="getTimelineColor(index)"
                  size="small"
                  width="100%"
                >
                  <template #icon>
                    <v-avatar :color="getTimelineColor(index)" size="27">
                      <!-- <span class="text-white">{{ index + 1 }}</span> -->
                    </v-avatar>
                  </template>

                  <div class="d-flex align-center mb-2">
                    <v-btn
                      v-if="stop.type === 'pickup'"
                      append-icon="mdi-swap-horizontal"
                      class="me-3 selected-pickup"
                      color="primary"
                      readonly
                      rounded="lg"
                      size="large"
                      variant="outlined"
                    >
                      จุดรับของ
                    </v-btn>
                    <v-btn
                      v-if="stop.type === 'dropoff'"
                      append-icon="mdi-swap-horizontal"
                      class="selected-drop"
                      color="secondary"
                      readonly
                      rounded="lg"
                      size="large"
                      variant="outlined"
                    >
                      จุดส่งของ
                    </v-btn>
                  </div>
                  <v-card class="border-thin" rounded="lg" variant="outlined">
                    <v-card-text>
                      <h3>{{ stop.address?.name || 'ไม่ระบุ' }}</h3>
                      <p>{{ stop.address?.location || 'ไม่ระบุ' }}</p>
                      <p class="highlight">
                        {{ stop.address?.receiver || 'ไม่ระบุ' }} |
                        {{ stop.address?.phone || 'ไม่ระบุ' }}
                      </p>
                      <v-card
                        class="border-dashed mt-2"
                        color="primary"
                        rounded="lg"
                        variant="outlined"
                      >
                        <p class="ma-2 pa-0">{{ stop.address?.detail || 'ไม่มีรายละเอียด' }}</p>
                      </v-card>
                    </v-card-text>
                  </v-card>
                  <!-- border="thin" variant="outlined" -->
                  <v-card class="mt-2 d-flex align-center" prepend-icon="mdi-calendar" rounded="md">
                    <p>{{ stop.date || 'ไม่ระบุวันที่' }}</p>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat title="รายละเอียดสินค้า">
          <v-divider />
          <v-card-text>
            <v-card class="border-thin rounded-md" variant="outlined">
              <v-card-text>
                <p>ประเภทสินค้า: ทั่วไป</p>
                <p>สินค้า: เครื่องใช้ส่วนตัว</p>
                <p>ขนาด: 120 ก. x 100 ย. x 50 ส.</p>
                <p>บรรจุภัณฑ์: กล่องกระดาษ</p>
                <p>น้ำหนัก: 8 กก.</p>
              </v-card-text>
            </v-card>
            <div class="mt-2">
              <h2>รูปสินค้า</h2>
            </div>
            <v-row>
              <v-col
                v-for="(product, index) in products"
                :key="index"
                class=" d-flex justify-center flex-column align-center"
                cols="12"
                lg="4"
                md="6"
                sm="6"
              >
                <div>
                  <v-img
                    :alt="product.name || 'สินค้า'"
                    cover
                    height="120"
                    :src="product.image"
                    width="120"
                  />
                </div>
                <!-- <p class="mt-2">{{ product.name || 'ไม่มีชื่อ' }}</p> -->
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-col cols="12">
            <v-btn
              block
              color="primary"
              rounded="md"
              size="x-large"
              @click="showDialog = true"
            >
              ดำเนินการต่อ
            </v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="showDialog" fullscreen persistent transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title class="d-flex align-center">
          <v-icon class="me-2">mdi-book-outline</v-icon>
          จองรถ
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="showDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Header Row -->
      <v-card class="ma-2" flat>
        <v-card-text class="py-2" style="background-color: #f5f5f5;">
          <v-row class="font-weight-bold" no-gutters>
            <v-col class="text-center" cols="2">แผนการเดินรถ</v-col>
            <v-col class="text-center" cols="2">คนขับ/ป้ายทะเบียน</v-col>
            <v-col class="text-center" cols="2">เวลาที่รถมาถึง</v-col>
            <v-col class="text-center" cols="2">เวลาจัดส่งปลายทาง</v-col>
            <v-col class="text-center" cols="1">ประเภทสินค้า</v-col>
            <v-col class="text-center" cols="1">ระยะทาง</v-col>
            <v-col class="text-center" cols="1">ค่าส่ง</v-col>
            <v-col class="text-center" cols="1">เลือกรถ</v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Transport Plan Cards -->
      <div class="ma-2">
        <v-card
          v-for="(item, index) in transportPlans"
          :key="index"
          class="mb-2"
          outlined
          style="background-color: #005eb8; color: white;"
        >
          <v-card-text>
            <v-row align="center" no-gutters>
              <v-col class="text-center" cols="2">
                {{ item.start }} <v-icon color="white">mdi-arrow-right</v-icon> {{ item.end }}<br>
                <small>{{ item.date }}, {{ item.time }}</small>
              </v-col>
              <v-col class="text-center" cols="2">
                {{ item.driver }}<br>
                <small>{{ item.plate }}</small>
              </v-col>
              <v-col class="text-center" cols="2">
                มาถึง: {{ item.pickup }}<br>
                <small>วันเวลา: {{ item.pickupTime }}</small>
              </v-col>
              <v-col class="text-center" cols="2">
                มาถึง: {{ item.dropoff }}<br>
                <small>วันเวลา: {{ item.dropoffTime }}</small>
              </v-col>
              <v-col class="text-center" cols="1">
                <v-chip
                  color="green"
                  label
                  text-color="white"
                >
                  {{ item.productType }}
                </v-chip>
              </v-col>
              <v-col class="text-center" cols="1">
                <strong>920 กม.</strong>
              </v-col>
              <v-col class="text-center" cols="1">
                <strong>{{ item.price.toLocaleString() }} บาท</strong>
              </v-col>
              <v-col class="text-center" cols="1">
                <v-btn
                  color="white"
                  size="small"
                  variant="flat"
                  @click="bookCar(item)"
                >
                  <span style="color: #005eb8; font-weight: bold;">จองทันที</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import Tracking from '@/components/Track.vue';
  import productImage from '@/assets/img/Product.png';

  export default {
    components: {
      Tracking,
    },
    data () {
      return {
        transportPlans: [
          {
            start: 'สวนลุง A',
            end: 'สมุทรปราการ',
            date: '12/02/2568',
            time: '05:00 น.',
            driver: 'พงศ์ศักดิ์ (099-xxx-xxx)',
            plate: '2กง 7777 สพ',
            pickup: 'สวนลุง A',
            pickupTime: '12/02/2568, 05:00 น.',
            dropoff: 'สมุทรปราการ',
            dropoffTime: '12/02/2568, 05:00 น.',
            productType: 'สินค้าทั่วไป',
            distance: 920,
            price: 1452.0,
          },
          {
            start: 'สวนลุง A',
            end: 'สมุทรปราการ',
            date: '12/02/2568',
            time: '05:00 น.',
            driver: 'พงศ์ศักดิ์ (099-xxx-xxx)',
            plate: '2กง 7777 สพ',
            pickup: 'สวนลุง A',
            pickupTime: '12/02/2568, 05:00 น.',
            dropoff: 'สมุทรปราการ',
            dropoffTime: '12/02/2568, 05:00 น.',
            productType: 'สินค้าทั่วไป',
            distance: 920,
            price: 1452.0,
          },
          {
            start: 'สวนลุง A',
            end: 'สมุทรปราการ',
            date: '12/02/2568',
            time: '05:00 น.',
            driver: 'พงศ์ศักดิ์ (099-xxx-xxx)',
            plate: '2กง 7777 สพ',
            pickup: 'สวนลุง A',
            pickupTime: '12/02/2568, 05:00 น.',
            dropoff: 'สมุทรปราการ',
            dropoffTime: '12/02/2568, 05:00 น.',
            productType: 'สินค้าทั่วไป',
            distance: 920,
            price: 1452.0,
          },
        ],
        stops: [
          {
            type: 'pickup',
            address: {
              name: '2171 ถ. เพชรบุรีตัดใหม่',
              location:
                '2171 ถ. เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310 ประเทศไทย',
              receiver: 'นายสมชาย',
              phone: '0812345678',
              detail:
                'ตึก A ชั้น 2 ห้อง 201 หน้าร้านขายชานมไข่มุก โครงการมั่งมีศรีสุข มีแมว อยู่ 2 ตัว',
            },
            date: '12/02/2568, 08:00 น.',
          },
          {
            type: 'dropoff',
            address: {
              name: '123 ถ. สุขุมวิท',
              location:
                '123 ถ. สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110 ประเทศไทย',
              receiver: 'นางสาวสมหญิง',
              phone: '0898765432',
              detail: 'อาคาร B ชั้น 3 ห้อง 302 ใกล้ป้ายรถเมล์',
            },
            date: '12/02/2568, 09:00 น.',
          },
        ],
        showDialog: false,
        products: [
          { image: productImage, name: 'สินค้าชิ้นที่ 1' },
          { image: productImage, name: 'สินค้าชิ้นที่ 2' },
          { image: productImage, name: 'สินค้าชิ้นที่ 3' },
          { image: productImage, name: 'สินค้าชิ้นที่ 4' },
          { image: productImage, name: 'สินค้าชิ้นที่ 5' },
          { image: productImage, name: 'สินค้าชิ้นที่ 6' },
        ],
        secondsElapsed: 0,
        interval: null,
        maxSeconds: 600, // 10 minutes = 600 seconds
      };
    },
    computed: {
      formattedTime () {
        const minutes = String(Math.floor(this.secondsElapsed / 60)).padStart(2, '0');
        const seconds = String(this.secondsElapsed % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
      },
    },
    mounted () {
      this.startTimer();
    },
    unmounted () {
      clearInterval(this.interval);
    },
    methods: {
      getTimelineColor (index) {
        return this.stops[index].type === 'pickup' ? 'primary' : 'secondary';
      },
      startTimer () {
        this.interval = setInterval(() => {
          if (this.secondsElapsed < this.maxSeconds) {
            this.secondsElapsed++;
          } else {
            clearInterval(this.interval);
          }
        }, 1000);
      },
      bookCar (item) {
        console.log('Booking car:', item);
        this.showDialog = false;
      // Add your booking logic here
      },
    },
  };
</script>

<style scoped>
.selected-pickup {
  background-color: #005eb8 !important;
  color: white !important;
}

.selected-drop {
  background-color: #f2a900 !important;
  color: white !important;
}

.highlight {
  color: #005eb8;
  font-weight: bold;
}

.animate-wave {
  display: inline-block;
  animation: wave 1.5s infinite ease-in-out;
}

@keyframes wave {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
