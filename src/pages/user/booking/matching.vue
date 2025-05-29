<template>
  <v-container>
    <v-card class="pa-6" rounded="lg">
      <v-card-text class="d-flex align-center justify-space-between">
        <div class="align-center">
          <div class="d-flex align-center">
            <v-icon class="me-4" size="80"> mdi mdi-truck</v-icon>
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

    <v-card class="mt-5" rounded="lg">
      <v-card-text>
        <h2>เส้นทาง</h2>
        <Tracking />
      </v-card-text>
    </v-card>

    <v-row class="mt-0">
      <v-col cols="12" md="7">
        <v-card title="เส้นทางรับ - ส่งสินค้า">
          <v-divider />
          <v-card-text>
            <RouteAddress />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card title="รายละเอียดสินค้า">
          <v-divider />
          <v-card-text>
            <v-card class="border-thin rounded-md" variant="outlined">
              <v-card-text>
                <p>ประเภทสินค้า: ทั่วไป</p>
                <p>ประเภทสินค้า: ทั่วไป</p>
                <p>ประเภทสินค้า: ทั่วไป</p>
                <p>ประเภทสินค้า: ทั่วไป</p>
                <p>ประเภทสินค้า: ทั่วไป</p>
              </v-card-text>
            </v-card>
            <div class="mt-2">
              <h2>รูปสินค้า</h2>
            </div>
            <v-row>
              <v-col
                v-for="(product, index) in products"
                :key="index"
                class="text-center"
                cols="12"
                lg="4"
                md="4"
                sm="6"
              >
                <v-img
                  :alt="product.name"
                  cover
                  height="180"
                  :src="product.image"
                  width="180"
                />
                <p class="mt-2">{{ product.name }}</p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-col cols="12">
            <v-btn
              block
              color="primary"
              rounded="md"
              size="60px"
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

      <v-data-table
        class="elevation-1"
        :headers="headers"
        hide-default-footer
        item-value="route"
        :items="transportPlans"
      >
        <template #item="{ item }">
          <tr>
            <td>
              {{ item.start }} <v-icon>mdi-arrow-right-thin</v-icon>{{ item.end }} <br>
              {{ item.date }} , {{ item.time }}
            </td>
            <td>
              {{ item.driver }}<br>
              {{ item.plate }}
            </td>
            <td>
              เก็บที่: {{ item.pickup }}<br>
              วันเวลา: {{ item.pickupTime }}
            </td>
            <td>
              เก็บที่: {{ item.dropoff }}<br>
              วันเวลา: {{ item.dropoffTime }}
            </td>
            <td>
              <v-chip color="primary" label size="small" text-color="green-darken-4">
                {{ item.productType }}
              </v-chip>
            </td>
            <td>{{ item.distance }} กม.</td>
            <td>{{ item.price.toLocaleString() }} บาท</td>
            <td>
              <v-btn color="primary" label @click="bookCar(item)">
                จอง
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>
<script>
  import Tracking from '@/components/Track.vue';
  import RouteAddress from '@/components/Address.vue';
  import productImage from '@/assets/img/Product.png'

  export default {
    components: {
      Tracking,
      RouteAddress,
    },
    data () {
      return {
        headers: [
          { title: 'แผนการเดินรถ', value: 'route' },
          { title: 'คนขับ/ป้ายทะเบียน', value: 'driver' },
          { title: 'เวลาที่รถมาถึง', value: 'pickup' },
          { title: 'เวลาจัดส่งปลายทาง', value: 'dropoff' },
          { title: 'ประเภทสินค้า', value: 'productType' },
          { title: 'ระยะทาง', value: 'distance' },
          { title: 'ค่าส่ง', value: 'price' },
          { title: 'เลือกรถ', value: 'action', sortable: false },
        ],
        transportPlans: [
          {
            start: 'สวนลุง A',
            end: ' สมุทรปราการ',
            date: '12/02/2568',
            time: '05:00 น.',
            driver: 'พงศ์ศักดิ์ (099-xxx-xxx)',
            plate: '2no 7777 สพ',
            pickup: 'สวนลุง A',
            pickupTime: '12/02/2568 , 05:00 น.',
            dropoff: 'สมุทรปราการ',
            dropoffTime: '12/02/2568 , 05:00 น.',
            productType: 'สินค้าทั่วไป',
            distance: 920,
            price: 1452.0,
          },
          {
            start: 'สวนลุง A',
            end: ' สมุทรปราการ',
            date: '12/02/2568',
            time: '05:00 น.',
            driver: 'พงศ์ศักดิ์ (099-xxx-xxx)',
            plate: '2no 7777 สพ',
            pickup: 'สวนลุง A',
            pickupTime: '12/02/2568 , 05:00 น.',
            dropoff: 'สมุทรปราการ',
            dropoffTime: '12/02/2568 , 05:00 น.',
            productType: 'สินค้าทั่วไป',
            distance: 920,
            price: 1452.0,
          },
          {
            start: 'สวนลุง A',
            end: ' สมุทรปราการ',
            date: '12/02/2568',
            time: '05:00 น.',
            driver: 'พงศ์ศักดิ์ (099-xxx-xxx)',
            plate: '2no 7777 สพ',
            pickup: 'สวนลุง A',
            pickupTime: '12/02/2568 , 05:00 น.',
            dropoff: 'สมุทรปราการ',
            dropoffTime: '12/02/2568 , 05:00 น.',
            productType: 'สินค้าทั่วไป',
            distance: 920,
            price: 1452.0,
          },
        // เพิ่มรายการได้เลย
        ],
        showDialog: false,
        products: [
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
        ],
        secondsElapsed: 0,
        interval: null,
        maxSeconds: 600, // 10 นาที = 600 วินาที
      };
    },
    computed: {
      formattedTime () {
        const minutes = String(Math.floor(this.secondsElapsed / 60)).padStart(
          2,
          '0'
        );
        const seconds = String(this.secondsElapsed % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
      },
    },
    mounted () {
      this.startTimer();
    },
    beforeUnmount () {
      clearInterval(this.interval);
    },
    methods: {
      startTimer () {
        this.interval = setInterval(() => {
          if (this.secondsElapsed < this.maxSeconds) {
            this.secondsElapsed++;
          } else {
            clearInterval(this.interval);
          }
        }, 1000);
      },
    },
  };
</script>
<style scoped>
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
