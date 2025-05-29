<template>
  <v-container>
    <v-card class="mb-2 pa-0" flat>
      <v-card-title class="ma-2 d-flex justify-space-between">
        <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" />
      </v-card-title>
      <v-divider />
    </v-card>
    <v-card flat>
      <v-card-title class="d-flex justify-space-between align-center ">
        <p> หมายเลขงาน : BH3ca75</p>
        <v-chip color="primary" label text="รอเริ่มงาน" />
      </v-card-title>
      <v-divider />
      <v-card class="ma-4 " flat>
        <v-row>
          <v-col cols="12" md="5">
            <v-card class="border-thin rounded-md" variant="outlined">
              <v-card-text class="d-flex justify-space-between align-center">
                <div class="d-flex align-center">
                  <v-avatar class="me-3" size="60">
                    <v-img
                      alt="Profile Picture"
                      src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
                    />
                  </v-avatar>
                  <div>
                    <p class="mb-1">แกรป ไดรเวอร์</p>
                    <p>รถ 4 ล้อ (ตู้ทึบปกติ)</p>
                  </div>
                </div>
                <v-btn color="primary" rounded="lg" text="เริ่มงาน" />
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="d-flex justify-center align-center fill-height" flat min-height="90">
              <v-btn color="primary" readonly text=" สถานที่ทั้งหมด 3 จุด" />
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card class="d-flex justify-center align-center fill-height" flat min-height="90">
              <p>ระยะทางทั้งหมด <span style="color: green;">892</span> กิโลเมตร</p>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="ma-4 border-thin" variant="outlined">
        <v-card-text>
          <div
            class="d-flex flex-column flex-md-row align-md-center justify-space-between"
          >
            <div class="text-center text-md-left mb-4 mb-md-0">
              <h3 class="mb-1"><v-icon>mdi-map-marker</v-icon>เริ่มเดินทาง</h3>
              <p class="opacity-50 mb-0 ">6 มีนาคม  2568 10:00 น.</p>
            </div>

            <div class="d-flex justify-center justify-md-end">
              <v-btn color="primary" disabled rounded="lg" text="เริ่มงาน" />
            </div>
          </div>
        </v-card-text>
      </v-card>
      <v-card v-for="(point, index) in pickupPoints" :key="index" class="ma-4 border-thin" variant="outlined">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12">
                  <h3 :style="{ color: point.type === 'pickup' ? '#005eb8' : '#f2a900' }">
                    จุดรับที่ {{ index + 1 }} : {{ point.title }}
                  </h3>
                </v-col>

                <v-col cols="12">
                  <p>{{ point.location }}</p>
                </v-col>

                <v-col cols="12">
                  <v-icon class="me-2" size="30">mdi-domain</v-icon>
                  <span>{{ point.detail }}</span>
                </v-col>

                <v-col cols="12">
                  <v-icon class="me-2" size="30">mdi-truck</v-icon>
                  <span>รับสินค้า : {{ point.time }}</span>
                </v-col>

                <v-col cols="12">
                  <v-icon class="me-2" size="30">mdi-walk</v-icon>
                  <span>{{ point.note || '-' }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12">
                  <div
                    class="d-flex  flex-md-row align-md-center justify-space-between"
                  >
                    <div class="text-center text-md-left mb-4 mb-md-0">
                      <p>กำหนดถึงจุดที่ {{ index + 1 }}</p>
                    </div>

                    <div class="d-flex justify-center justify-md-end">
                      <v-btn
                        color="primary"
                        density="compact"
                        rounded="lg"
                        text="เริ่มงาน"
                        @click="dialog=true"
                      />
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" :style="{color: point.type === 'pickup' ? '#005eb8' : '#f2a900' }">
                  <p>ถึงจุดที่ {{ index + 1 }} : 6 มีนาคม  2568 10:00 น.</p>
                </v-col>
                <v-col cols="12">
                  <div
                    class="d-flex  flex-md-row align-md-center justify-space-between"
                  >
                    <div class="text-center text-md-left mb-4 mb-md-0">
                      <p>รับสินค้า</p>
                    </div>

                    <div class="d-flex justify-center justify-md-end">
                      <v-btn
                        color="primary"
                        density="compact"
                        rounded="lg"
                        :text="point.type==='pickup' ? 'รับสินค้า':'ส่งสินค้า'"
                        @click="dialog_point = true"
                      />
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" :style="{color: point.type === 'pickup' ? '#005eb8' : '#f2a900' }">
                  <p>รับสินค้าเรียบร้อย</p>
                </v-col>
                <v-col
                  v-for="(product, item) in products"
                  :key="item"
                  class="text-center"
                  cols="12"
                  lg="4"
                  md="4"
                  sm="6"
                >
                  <v-img
                    :alt="product.name"
                    cover
                    height="100"
                    :src="product.image"
                    width="100"
                  />
                  <p class="mt-2">{{ product.name }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="ma-4 border-thin" variant="outlined">
        <v-card-text>
          <div
            class="d-flex flex-column flex-md-row align-md-center justify-space-between"
          >
            <div class="text-center text-md-left mb-4 mb-md-0">
              <h3 class="mb-1"><v-icon>mdi-map-marker</v-icon>จบงาน</h3>
              <p class="opacity-50 mb-0 ">6 มีนาคม  2568 10:00 น.</p>
            </div>

            <div class="d-flex justify-center justify-md-end">
              <v-btn color="primary" disabled rounded="lg" text="จบงาน" />
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog" width="1200">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        เริ่มเดินทาง
        <v-btn icon variant="text" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pl-4">
        <locationMap />
        <div class="mt-4">
          <p>ยืนยันภึงจุดที่ 1</p>
          <v-text-field
            v-model="formattedDate"
            hide-details
            :label="currentDateLabel"
            prepend-inner-icon="mdi-calendar-month-outline"
            readonly
            variant="outlined"
          />
        </div>
        <div class="mt-4">
          <v-btn
            block
            color="primary"
            rounded="md"
            size="large"
            text="ยืนยัน"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- dialog_point -->
  <v-dialog v-model="dialog_point" width="1200">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        รับสินค้าจุดที่ 1
        <v-btn icon variant="text" @click="dialog_point = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pl-4 pt-0">
        <strong class="text-h6">เมืองเชียงใหม่ ,เชียงใหม่</strong>
        <p>รายละเอียดสถานที่ :</p>
        <p>2171 ถ. ช้างคลาน ตำบลช้างคลาน อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50100 ประเทศไทย</p>
        <p>รับสินค้า : 6 มีนาคม  2568 10:00 น. </p>
        <strong class="text-h6">สินค้าที่ต้องรับ</strong>
        <p>สินค้าทั่วไป , เครื่องใช้ไฟฟ้า</p>
        <v-divider class="mt-2 mb-2" />
        <p>ยืนยันรับสินค้าจุดที่ 1</p>
        <v-text-field
          v-model="formattedDate"
          density="compact"
          hide-details
          :label="currentDateLabel"
          prepend-inner-icon="mdi-calendar-month-outline"
          readonly
          variant="outlined"
        />
        <v-file-upload
          class="mt-4"
          density="comfortable"
          icon="mdi mdi-camera"
          rounded="lg"
          title="กดเพื่อเลือกรูปภาพ(ขนาดไม่เกิน 20MB)"
          variant="comfortable"
        />
        <p style="color:red;font-size:14px;">* อัปโหลดรูป สินค้าอย่างต่ำ 1  รูป สูงสุด 4 รูป </p>
        <div class="mt-2 d-flex justify-end align-center">
          <v-btn color="primary" prepend-icon="mdi-check" rounded="md" text="ยืนยัน" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import productImage from '@/assets/img/Product.png'
  import locationMap from '@/components/Track.vue'
  export default {
    components:{
      locationMap,
    },
    data () {
      return {
        dialog:false,
        dialog_point:false,
        date: new Date(),
        pickupPoints: [
          {
            title: 'รับสินค้า',
            location: 'เมืองเชียงใหม่ ,เชียงใหม่',
            detail: 'รายละเอียดสถานที่',
            time: '6 มีนาคม 2568 10:00 น. - 12:00 น.',
            note: '',
            type:'pickup',
          },
          {
            title: 'ส่งสินค้า',
            location: 'เขตคลองเตย ,กรุงเทพมหานคร',
            detail: 'โกดังปลายทาง',
            time: '7 มีนาคม 2568 08:00 น. - 10:00 น.',
            note: 'ขอคนขับช่วยขนลง',
            type:'drop',
          },
        ],
        products: [
          { image:productImage },
          { image:productImage },
          { image:productImage },
        ],
      };
    },
    computed: {
      formattedDate () {
        const d = this.date instanceof Date ? this.date : new Date();

        const thaiMonths = [
          'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
          'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
        ];

        const day = d.getDate();
        const month = thaiMonths[d.getMonth()];
        const year = d.getFullYear() + 543; // แปลงเป็น พ.ศ.

        return `${day} ${month} ${year}`;
      },
    },
  };
</script>
