<template>
  <v-container>
    <h2 class="mb-2">แจ้งชำระเงิน</h2>
    <!-- ปุ่ม tab -->
    <v-card class="mt-2" rounded="lg" variant="text">
      <v-card-text class="pl-0">
        <v-row class="flex-nowrap" no-gutters style="overflow-x: auto">
          <v-col
            v-for="(label, i) in [
              'ที่ต้องยืนยัน',
              'ที่ต้องชำระ',
              'ชำระแล้ว',
            ]"
            :key="i"
            class="flex-grow-0 flex-shrink-0"
          >
            <v-btn
              class="mx-2 ma-1"
              :color="activeTab === i ? 'primary' : 'white'"
              flat
              rounded="md"
              @click="activeTab = i"
            >
              {{ label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- loop cards -->
    <v-card
      v-for="(item, index) in filteredBookings"
      :key="index"
      class="mt-2"
      flat
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
              <v-col class="d-flex justify-cente align-center ga-2"><b>วงเงินประกัน 3,000 บาท + วงเงินประกันซื้อเพิ่ม  </b><v-icon color="primary" @click="dialog_insurance = true">mdi-help-circle-outline</v-icon></v-col>
            </v-row>
          </v-col>
          <!-- ฝั่งขวา -->
          <v-col cols="12" md="6">
            <v-row dense>
              <v-col class="d-flex align-center ga-2" cols="12"><p>ผู้ให้บริการ : Triple SSS</p><v-icon color="primary" @click="dialog_delivery = true">mdi-help-circle-outline</v-icon></v-col>
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
                    @click="openLocationDialog(item)"
                  >รายละเอียดจุดรับ - ส่ง</span>
                </p>
              </v-col>
              <v-col cols="12">
                <p>ระยะทาง : 920 กม.</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
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
          <v-col cols="12" md="6">
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

          <v-divider />
          <v-col class="d-flex justify-space-between" cols="12" md="6">
            <h2 class="text-h6">ราคา</h2>
            <h2 class="text-h6">1,300.00 บาท</h2>
          </v-col>
          <v-col class="d-flex justify-end" cols="12" md="6">
            <v-btn
              class="mx-2"
              color="sub"
              variant="outlined"
              @click="dialog_cancle = true"
            >ยกเลิกการจอง</v-btn>
            <v-btn
              color="primary"
              @click="handleAction(item)"
            >
              {{ getButtonLabel(item.status) }}
            </v-btn>
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
  <!-- dialog_insurance -->
  <v-dialog v-model="dialog_insurance" width="800">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <p>ข้อมูลประกัน</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <h3>ข้อมูลวงเงินประกันของรถขนส่งสินค้า</h3>
        <p>ชื่อบริษัทประกัน: วิริยะประกันภัย จำกัด (มหาชน)</p>
        <p>หมายเลขกรมธรรม์: VY-TRK-2024-001234</p>
        <p>วันเริ่มต้นและสิ้นสุดการประกันภัย: 1 มกราคม 2568 – 31 ธันวาคม 2568</p>
        <p>ความคุ้มครอง: คุ้มครองความเสียหายต่อรถ ความเสียหายต่อทรัพย์สินบุคคลภายนอก และอุบัติเหตุส่วนบุคคล</p>
        <p>เงื่อนไขการชดเชย: ค่าซ่อมตามจริงไม่เกินทุนประกัน, ค่ารักษาพยาบาลสูงสุด 100,000 บาทต่อครั้ง</p>
        <v-divider class="mt-4 mb-4" />
        <h3>ข้อมูลการประกันขณะขนส่งสินค้า</h3>
        <p>หมายเลขกรมธรรม์ขนส่งสินค้า: VY-GOODS-2024-007890</p>
        <p>ความคุ้มครองประกันสินค้า: ความเสียหายจากอุบัติเหตุระหว่างขนส่ง ไฟไหม้ น้ำท่วม และโจรกรรม</p>
        <p>ระยะเวลาในการคุ้มครอง: คุ้มครองตลอดระยะทางตั้งแต่ต้นทางถึงปลายทางภายในประเทศ (ไม่เกิน 24 ชั่วโมง)</p>
        <div class="mt-6">
          <v-btn
            block
            color="primary"
            size="large"
            text="รับทราบ"
            @click="dialog_insurance = false"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- dialog_delivery -->
  <v-dialog v-model="dialog_delivery" width="800">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <p>เงื่อนไขการรับสินค้าและพัสดุประกันสินค้าตามมาตรฐาน</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <h3>การรับสินค้า</h3>
        <p>ระยะเวลาการจัดส่ง</p>
        <li>สินค้าจะถูกจัดส่งภายใน 1-3 วันทำการ หลังจากได้รับการชำระเงินเรียบร้อยแล้ว</li>
        <li>วันจัดส่งไม่รวมวันเสาร์ อาทิตย์ และวันหยุดนักขัตฤกษ์</li>
        <p>การตรวจสอบก่อนรับสินค้า</p>
        <li>กรุณาตรวจสอบสินค้าทันทีเมื่อได้รับ หากพบว่าแพ็กเกจมีความเสียหาย หรือสินค้าไม่ตรงกับที่สั่ง กรุณาถ่ายรูปหลักฐานและแจ้งภายใน 24 ชั่วโมง</li>
        <p>กรณีไม่มีผู้รับสินค้า</p>
        <li>หากไม่มีผู้รับสินค้า ณ สถานที่จัดส่ง จะมีการติดต่อเพื่อประสานงานจัดส่งใหม่ (อาจมีค่าจัดส่งเพิ่มเติมตามระยะทาง)</li>
        <p>สินค้าจัดส่งโดย</p>
        <li>บริษัท Triple S</li>
        <v-divider class="mt-4 mb-4" />
        <h3>ระยะเวลารับประกัน</h3>
        <li>รับประกันสินค้านาน 12 เดือน นับจากวันที่ซื้อสินค้า</li>
        <h3>เงื่อนไขการรับประกัน</h3>
        <li>รับประกันเฉพาะกรณีที่เกิดจากความผิดพลาดของผู้ผลิต เช่น วัสดุชำรุด อุปกรณ์ไม่ทำงาน</li>
        <li>ไม่ครอบคลุมความเสียหายที่เกิดจากการใช้งานผิดวิธี, ความชื้น, อุบัติเหตุ หรือการแก้ไขซ่อมแซมโดยไม่ได้รับอนุญาต</li>
        <h3>ขั้นตอนการเคลมสินค้า</h3>
        <li>ติดต่อฝ่ายบริการลูกค้า พร้อมแนบใบเสร็จและรูปภาพสินค้าที่มีปัญหา</li>
        <li>บริษัทฯ จะทำการตรวจสอบ และแจ้งผลภายใน 3–7 วันทำการ</li>
        <h3>กรณีที่ไม่สามารถเคลมได้</h3>
        <li>สินค้ามีร่องรอยการแกะหรือดัดแปลง</li>
        <li>หมดระยะเวลารับประกัน</li>
        <li>ความเสียหายเกิดจากการใช้งานที่ไม่ถูกต้อง</li>
        <div class="mt-6">
          <v-btn
            block
            color="primary"
            size="large"
            text="รับทราบ"
            @click="dialog_delivery = false"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- dialog for pickup and dropoff details -->
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="bg-primary text-white text-h6 d-flex align-center justify-space-between">
        <p>รายละเอียดจุดรับ - ส่ง</p>
        <v-btn icon variant="text" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-timeline align="start" density="compact" side="end" truncate-line="both">
          <v-timeline-item
            v-for="(location, index) in selectedBooking?.locations || []"
            :key="index"
            :color="getTimelineColor(location.type)"
            size="small"
            width="100%"
          >
            <template #icon>
              <v-avatar :color="getTimelineColor(location.type)" size="27" />
            </template>
            <div>
              <div class="font-weight-medium">{{ location.label }}</div>
              <div class="text-subtitle text-grey-darken-1">{{ location.address }}</div>
              <div style="color: #005eb8">{{ location.date }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog_insurance: false,
        dialog_delivery: false,
        selectunit: null,
        dialog: false,
        offer: true,
        selectradio: 'one',
        dialog_cancle: false,
        activeTab: 0,
        selectedBooking: null,
        allBookings: [
          {
            id: '#BH4334513',
            from: 'สงขลา',
            to: 'สมุทรปราการ',
            status: 'confirm',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '123 ถนนสุขุมวิท เขตคลองเตย กรุงเทพฯ 10110',
                date: 'รับสินค้า : 5 มกราคม 2568 10:00 น. - 12:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '456 ถนนพระราม 2 เขตบางขุนเทียน กรุงเทพฯ 10150',
                date: 'ส่งสินค้า : 6 มกราคม 2568 14:00 น. - 16:00 น.',
              },
            ],
          },
          {
            id: '#BH4334514',
            from: 'ชลบุรี',
            to: 'กรุงเทพฯ',
            status: 'pay',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '789 ถนนบางนา-ตราด บางนา ชลบุรี 20150',
                date: 'รับสินค้า : 7 มกราคม 2568 09:00 น. - 11:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '101 ถนนสีลม สาทร กรุงเทพฯ 10500',
                date: 'ส่งสินค้า : 7 มกราคม 2568 15:00 น. - 17:00 น.',
              },
            ],
          },
          {
            id: '#BH4334515',
            from: 'เชียงใหม่',
            to: 'ขอนแก่น',
            status: 'paid',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '321 ถนนช้างม่อย เมืองเชียงใหม่ เชียงใหม่ 50000',
                date: 'รับสินค้า : 8 มกราคม 2568 08:00 น. - 10:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '654 ถนนมิตรภาพ เมืองขอนแก่น ขอนแก่น 40000',
                date: 'ส่งสินค้า : 9 มกราคม 2568 12:00 น. - 14:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า 2',
                address: '987 ถนนศรีจันทร์ เมืองขอนแก่น ขอนแก่น 40000',
                date: 'ส่งสินค้า : 9 มกราคม 2568 14:00 น. - 16:00 น.',
              },
            ],
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
      getButtonLabel (status) {
        if (status === 'confirm') return 'ยืนยันและชำระเงิน';
        if (status === 'pay') return 'ชำระเงิน';
        if (status === 'paid') return 'ดูรายละเอียด';
        return 'ดำเนินการ';
      },
      handleAction (item) {
        if (item.status === 'confirm' || item.status === 'pay') {
          // Navigate to payment page for confirm or pay status
          this.$router.push(`/user/payment/id`);
        } else if (item.status === 'paid') {
          // Navigate to tracking page for paid status
          this.$router.push(`/user/tracking/id`);
        }
      },
      openLocationDialog (item) {
        this.selectedBooking = item;
        this.dialog = true;
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
