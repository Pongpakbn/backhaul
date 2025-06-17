<template>
  <v-container>
    <v-card class="mb-2 pl-0" flat>
      <v-card-title class="ma-2 d-flex justify-space-between pl-0">
        <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" @click="$router.push('/partner/booking')" />
      </v-card-title>
      <v-divider />
    </v-card>
    <v-card class="mt-2" flat>
      <v-card-title class="ma-2 d-flex justify-space-between">
        <p>หมายเลขงาน : BH3ca75</p>
        <v-chip color="primary" label>รอเริ่มงาน</v-chip>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="5">
            <v-card class="border-thin rounded-md" variant="outlined">
              <v-card-text class="d-flex justify-start align-center">
                <v-avatar class="me-6" size="60">
                  <v-img alt="Profile Picture" src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" />
                </v-avatar>
                <div>
                  <p>แกรป ไดรเวอร์</p>
                  <p>รถ 4 ล้อ (ตู้ทึบปกติ)</p>
                </div>
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
      </v-card-text>
    </v-card>

    <v-card class="mt-2 mb-2" flat>
      <v-card-title>
        รายละเอียดการจอง
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col class="d-flex text" cols="12" md="6">
            <p class="blur">ชื่อ - สกุลผู้จอง : </p> <span>พงศ์ภัค </span>
          </v-col>
          <v-col class="d-flex text" cols="12" md="6">
            <p class="blur">เบอร์โทรศัพท์ : </p> <span>099-712-5161 </span>
          </v-col>
          <v-col class="d-flex text" cols="12" md="6">
            <p class="blur">ทำการจองเมื่อ :  </p> <span>20/02/2025, 11:00 </span>
          </v-col>
          <v-col class="d-flex text" cols="12" md="6">
            <p class="blur">ประเภทการจอง : </p> <span>เหมาคัน </span>
          </v-col>
          <v-col class="d-flex text" cols="12" md="6">
            <p class="blur">สถานะ :  </p> <span>สำเร็จ </span>
          </v-col>
          <v-col class="d-flex text" cols="12" md="6">
            <p class="blur">ช่องทางการชำระเงิน :   </p> <span>โอนเงินผ่านบัญชีธนาคาร </span>
          </v-col>
          <v-col class="d-flex text" cols="12" md="6">
            <p class="blur">สถานะการชำระเงิน :   </p> <span>ชำระเงินแล้ว </span>
          </v-col>
          <v-col class="d-flex text" cols="12" md="6">
            <p class="blur">จัดส่งสำเร็จเมื่อ :   </p> <span>22/02/2025, 15:00 </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="fill-height" flat>
          <v-card-title>
            จุดรับ - ส่งสินค้า
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-timeline
              align="start"
              density="compact"
              side="end"
              truncate-line="both"
            >
              <v-timeline-item
                v-for="(location, index) in locations"
                :key="index"
                :color="getTimelineColor(location.type)"
                size="small"
                width="100%"
              >
                <template #icon>
                  <v-avatar :color="getTimelineColor(location.type)" size="27">
                    <!-- <span class="text-white">{{ index + 1 }}</span> -->
                  </v-avatar>
                </template>
                <div>
                  <div class="font-weight-medium">{{ location.label }}</div>
                  <div class="text-subtitle text-grey-darken-1">
                    {{ location.address }}
                  </div>
                  <div style="color: #005eb8">{{ location.date }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title>
            ข้อมูลสินค้า
          </v-card-title>
          <v-divider />
          <v-card-text>
            <p>ประเภทสินค้า : สินค้าทั่วไป</p>
            <p>รายละเอียดสินค้า : เครื่องแต่งกาย เสื้อผ้า แว่น</p>
            <p>บรรจุภัฑณ์ : กล่องกระดาษ</p>
            <p>น้ำหนัก : 3.00 กิโลกรัม</p>
            <p>มูลค่า : 245บาท</p>
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import productImage from '@/assets/img/Product.png'
  export default {
    data () {
      return {
        products: [
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
        ],
        locations: [
          {
            type: 'pickup',
            label: 'จุดรับสินค้า',
            address: '123 ถนนสุขุมวิท เขตคลองเตย กรุงเทพฯ 10110',
            date: 'รับสินค้า : 5 มกราคม 2568 10:00 น. - 12:00 น. ',
          },
          {
            type: 'dropoff',
            label: 'จุดส่งสินค้า',
            address: '456 ถนนพระราม 2 เขตบางขุนเทียน กรุงเทพฯ 10150',
            date: 'รับสินค้า : 5 มกราคม 2568 10:00 น. - 12:00 น. ',
          },
          {
            type: 'dropoff',
            label: 'จุดส่งสินค้า 2',
            address: '789 ถนนแจ้งวัฒนะ เขตหลักสี่ กรุงเทพฯ 10210',
            date: 'รับสินค้า : 5 มกราคม 2568 10:00 น. - 12:00 น. ',
          },
        ],
      };
    },
    methods: {
      getTimelineColor (type) {
        if (type === 'pickup') return 'primary';
        if (type === 'dropoff') return 'secondary';
        return 'grey';
      },
    },
  };
</script>
<style>
.selected-pickup {
  background-color: #005eb8 !important;
  color: white !important;
}

.selected-drop {
  background-color: #f2a900 !important;
  color: white !important;
}

.hightlight {
  color: #005eb8;
  font-weight: bold;
}
.force-white {
  color: white !important;
}
.blur{
  opacity: 0.5;
}
.text{
  font-size: 16px;
}
</style>
