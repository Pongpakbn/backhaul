<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <h2 class="mb-2">ประวัติการเรียกรถ</h2>
      <v-select
        v-model="selectstatus"
        density="compact"
        :items="['ทั้งหมด', 'ที่ต้องยืนยัน', 'ที่ต้องชำระ', 'ชำระแล้ว']"
        placeholder="เลือกสถานะ"
        rounded="md"
        style="max-width: 350px; height: 40px; background-color: white;"
        variant="outlined"
      />
    </div>
    <!-- loop cards -->
    <v-card
      v-for="(item, index) in filteredBookings"
      :key="index"
      class="mt-2"
      rounded="md"
    >
      <v-card-title class="bg-primary text-white d-flex flex-wrap justify-space-between align-center">
        <div class="text-subtitle-1">{{ item.id }} : {{ item.from }} → {{ item.to }}</div>
        <div class="text-subtitle-2 font-weight-regular d-none d-md-block pr-2">
          เริ่มงาน | 12 กพ. 68
        </div>
      </v-card-title>

      <v-card-text class="text-body-2 pa-4">
        <v-row>
          <!-- ฝั่งซ้าย -->
          <v-col cols="12" md="6">
            <v-row dense>
              <v-col cols="12"><p>ประเภทรถ : รถ 4 ล้อ(ตู้ทึบปกติ)</p></v-col>
              <v-col cols="12"><p>ประเภทสินค้า : สินค้าทั่วไป</p></v-col>
              <v-col cols="12"><p>ขนาดสินค้า : 20x20x20</p></v-col>
              <v-col cols="12"><p>ตัวเลือกขนส่ง : ราคาที่ระบบแนะนำ</p></v-col>
              <v-col cols="12">
                <v-chip
                  v-if="item.status === 'paid'"
                  class="ma-2"
                  color="success"
                  label
                  size="large"
                  variant="outlined"
                >
                  ชำระเงินสำเร็จเมื่อ :  12/02/2568, 13:00 น.
                </v-chip>
                <v-card
                  v-if="item.status !== 'paid'"
                  class="rounded-lg border-dashed"
                  color="primary"
                  variant="outlined"
                >
                  <v-card-text class="ma-2 d-flex justify-space-between">
                    <h3>ข้อเสนอของคุณ :</h3>
                    <h3>ราคา 1,200 บาท</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <!-- ฝั่งขวา -->
          <v-col cols="12" md="6">
            <v-row dense>
              <v-col cols="12"><p>ผู้ให้บริการ : Triple SSS</p></v-col>
              <v-col cols="12">
                <p>ป้ายทะเบียน : รถ 4 ล้อ(ตู้ทึบปกติ)</p>
              </v-col>
              <v-col cols="12">
                <p>
                  จุดรับส่งสินค้า :
                  <span
                    style="
                      color: #005eb8;
                      text-decoration: underline;
                      cursor: pointer;
                    "
                    @click="dialog = true"
                  >รายละเอียดจุดรับ - ส่ง</span>
                </p>
              </v-col>
              <v-col cols="12">
                <p>ระยะทาง : 920 กม.</p>
              </v-col>
              <v-col cols="12">
                <v-card
                  v-if="item.status !== 'paid'"
                  class="rounded-lg border-dashed"
                  color="secondary"
                  variant="outlined"
                >
                  <v-card-text class="ma-2 d-flex justify-space-between">
                    <h3>ข้อเสนอผู้ให้บริการขนส่ง :</h3>
                    <h3>ราคา 1,200 บาท</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-divider />
          </v-col>

          <v-col class="d-flex justify-space-between" cols="12" md="6">
            <h2 class="text-h6">ราคา</h2>
            <h2 class="text-h6">1,300.00 บาท</h2>
          </v-col>
          <v-col class="d-flex justify-end" cols="12" md="6">
            <!-- <v-btn
              class="mx-2"
              color="sub"
              variant="outlined"
              @click="dialog_cancle = true"
            >ยกเลิกการจอง</v-btn> -->
            <v-btn
              color="primary"
              prepend-icon="mdi-magnify"
              text="ดูรายละเอียด"
              @click="$router.push('history/id')"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <!-- แสดงวันที่เริ่มงานบนมือถือ -->
      <div class="pa-4 d-md-none text-grey-darken-1 text-caption">
        เริ่มงาน | 12 กพ. 68
      </div>
    </v-card>
  </v-container>

  <v-dialog v-model="dialog_cancle" max-width="600px">
    <v-card>
      <v-card-title
        class="d-flex align-center justify-space-between text-wrap text-sm"
      >
        <p>กรุณาเลือกเหตุผลในการยกเลิกการจอง</p>
        <v-btn
          icon
          variant="text"
          @click="dialog_cancle = false"
        ><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-card
          class="pa-4 d-flex align-center justify-center"
          flat
          style="background-color: rgba(242, 169, 0, 0.1)"
        >
          <v-icon class="me-4">mdi-bell-badge</v-icon>
          <p>
            กรุณาเลือกเหตุผลในกาารยกเลิกการจอง
            เมื่อการยกเลิกสำเร็จคุณจะได้รับเงินคืน ภายใน 7 - 14 วัน
            การยกเลิกจะมีค่าธรรมเนียม โดยจะหัก 3% จากราคาค่าขนส่ง
          </p>
        </v-card>
        <v-radio-group
          v-model="selectradio"
          class="mt-2"
          color="primary"
          hide-details=""
        >
          <v-radio label="ใช้เวลารอนานเกินไป" value="one" />
          <v-radio label="ปักหมุดผิด / จองผิดพลาด" value="two" />
          <v-radio label="ค่าขนส่งแพงเกินไป" value="three" />
          <v-radio label="เหตุผลอื่น" value="four" />
        </v-radio-group>
        <v-textarea
          v-if="selectradio === 'four'"
          auto-grow
          class="mt-2"
          placeholder="โปรดระบุเพิ่มเติม"
          rounded="lg"
          rows="3"
          variant="outlined"
        />
        <v-btn
          block
          class="text-white"
          color="#f2a900"
          size="large"
          text="ยกเลิกการจอง"
        />
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
  export default {
    data () {
      return {
        selectstatus: null,
        allBookings: [
          {
            id: '#BH4334513',
            from: 'สงขลา',
            to: 'สมุทรปราการ',
            status: 'confirm', // 0: ที่ต้องยืนยัน
          },
          {
            id: '#BH4334514',
            from: 'ชลบุรี',
            to: 'กรุงเทพฯ',
            status: 'pay', // 1: ที่ต้องชำระ
          },
          {
            id: '#BH4334515',
            from: 'เชียงใหม่',
            to: 'ขอนแก่น',
            status: 'paid', // 2: ชำระแล้ว
          },
        ],
        dialog: false,
        offer: true,
        selectradio: 'one',
        dialog_cancle: false,
        activeTab: 0,
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
    computed: {
      filteredBookings () {
        const statusMap = ['confirm', 'pay', 'paid'];
        return this.allBookings.filter(b => b.status === statusMap[this.activeTab]);
      },
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
</style>
