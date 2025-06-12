<template>
  <v-container>
    <h2 class="mb-2">การจองของฉัน</h2>

    <!-- ปุ่ม tab -->
    <v-row class="flex-nowrap pl-0" no-gutters style="overflow-x: auto">
      <v-col
        v-for="(label, i) in [
          'บันทึกร่าง',
          'หารถอยู่',
          'อยู่ระหว่างเดินทาง',
          'สำเร็จ',
          'ยกเลิก',
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

    <!-- loop cards -->
    <v-card
      v-for="(item, index) in 3"
      :key="index"
      class="mt-2"
      flat
      rounded="md"
    >
      <v-card-title
        class="bg-primary text-white d-flex flex-wrap justify-space-between align-center"
      >
        <div class="text-subtitle-1">#BH4334513 : สงขลา → สมุทรปราการ</div>
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
                <v-card
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
            <v-card
              class="text-white pa-2  mb-2"
              style="background-color: #f2a901;"
              variant="tonal"
              width="850"
            >
              <v-icon class="mr-2" small>mdi-shield-check</v-icon>
              {{ fullInsuranceText }}
            </v-card>
          </v-col>
          <v-divider />
          <v-col class="d-flex justify-space-between" cols="12" md="6">
            <h2 class="text-h6">ราคา</h2>
            <h2 class="text-h6">1,300.00 บาท</h2>
          </v-col>

          <v-col class="d-flex justify-end ga-2" cols="12" md="6">
            <v-btn
              color="sub"
              variant="outlined"
              @click="dialog_cancle = true"
            >ยกเลิกการจอง</v-btn>
            <v-btn color="#000080" rounded="md" text="เพิ่มวงเงินประกัน" @click="dialog_offer = true" />
            <v-btn color="primary">ยืนยัน</v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex align-center ga-2 text-red">
              <v-icon>mdi-alert-outline</v-icon>
              <h3>ยกเลิกผรีภายใน 30 นาที หลังจากยืนยันการจอง
                (หลังจากนั้นจะมีค่าธรรมเนียมยกเลิก)</h3>
            </div>
            <div class="d-flex align-center ga-2 text-red">
              <v-icon>mdi-close</v-icon>
              <h3>ยกเลิกผรีภายใน 30 นาที หลังจากยืนยันการจอง
                (หลังจากนั้นจะมีค่าธรรมเนียมยกเลิก)</h3>
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- แสดงวันที่เริ่มงานบนมือถือ -->
      <div class="pa-4 d-md-none text-grey-darken-1 text-caption">
        เริ่มงาน | 12 กพ. 68
      </div>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title
        class="bg-primary text-white text-h6 d-flex align-center justify-space-between"
      >
        <p>รายละเอียดจุดรับ - ส่ง</p>
        <v-btn
          icon
          variant="text"
          @click="dialog = false"
        ><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>

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

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

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

  <v-dialog v-model="offer" max-width="600px">
    <v-card>
      <!-- <v-card-title
        class="d-flex align-center justify-space-between "
      >
        <p>กรุณาเลือกเหตุผลในการยกเลิกการจอง</p>
        <v-btn
          icon
          variant="text"
          @click="dialog_cancle = false"
        ><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title> -->
      <v-card-text>
        <h2>เสนอราคาที่ต้องการ</h2>
        <v-card class="border-thin" variant="outlined">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <h3 class="mb-2">ราคาค่าขนส่ง</h3>
                <v-text-field density="comfortable" placeholder="กรอกราคาที่ต้องการ" variant="outlined" />
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="mb-2">หน่วยราคา</h3>
                <v-select
                  v-model="selectunit"
                  density="comfortable"
                  item-title="title"
                  item-value="value"
                  :items="unitprice"
                  placeholder="เลือกหน่วยราคา"
                  variant="outlined"
                />
              </v-col>
            </v-row>

          </v-card-text> </v-card>
        <div class="mt-5 d-flex justify-space-between">
          <v-btn color="red" rounded="md" variant="outlined">ยกเลิก </v-btn>
          <v-btn color="primary" rounded="md">เสนอราคานี้ </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialog_offer" width="800">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <p>เพิ่มวงเงินประกัน</p>
        <v-btn icon="mdi-close" variant="text" @click="dialog_offer = false" />
      </v-card-title>
      <v-card-text>
        <h3>วงเงินประกัน</h3>
        <v-text-field hide-details placeholder="กรอกจำนวนเงิน" variant="outlined" />
        <p class="text-red mt-2">จำนวนเงินขั้นต่ำ 2,000 บาท - จำนวนเงินสูงสุด 10,000 บาท</p>
        <v-btn
          block
          class="mt-8"
          color="primary"
          size="large"
          text="ยืนยัน"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog_offer: false,
        fullInsuranceText: 'ประกันสินค้าระหว่างขนส่ง จ่ายตามจริงแต่ไม่เกิน 1,000,000 บาท/เที่ยว (หมายเหตุ*ขึ้นอยู่กับประกันภัยของแต่ละคัน)',
        selectunit: null,
        unitprice: [
          { title: 'บาท', value: 'baht' },
          { title: 'บาท/กิโลเมตร', value: 'baht/km' },
          { title: 'บาท/ชั่วโมง', value: 'baht/hour' },
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
