<template>
  <v-container>
    <h2 class="mb-2">การจองของฉัน</h2>

    <!-- ปุ่ม tab -->
    <v-row class="flex-nowrap pl-0" no-gutters style="overflow-x: auto">
      <v-col
        v-for="(label, i) in ['บันทึกร่าง', 'หารถอยู่', 'อยู่ระหว่างเดินทาง', 'สำเร็จ', 'ยกเลิก']"
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

    <!-- แสดงข้อความเมื่อไม่มีข้อมูล -->
    <v-alert v-if="!filteredBookings.length" class="mt-4" type="info">
      ไม่มีการจองในสถานะนี้
    </v-alert>

    <!-- loop cards -->
    <v-card
      v-for="(item, index) in filteredBookings"
      :key="index"
      class="mt-2"
      flat
      rounded="md"
    >
      <v-card-title
        class="bg-primary text-white d-flex flex-wrap justify-space-between align-center"
      >
        <div class="text-subtitle-1">#{{ item.id }} : {{ item.route }}</div>
        <div class="text-subtitle-2 font-weight-regular d-none d-md-block pr-2">
          เริ่มงาน | {{ item.startDate }}
        </div>
      </v-card-title>

      <v-card-text class="text-body-2 pa-4">
        <v-row>
          <!-- ฝั่งซ้าย -->
          <v-col cols="12" md="6">
            <v-row dense>
              <v-col cols="12"><p>ประเภทรถ : {{ item.vehicleType }}</p></v-col>
              <v-col cols="12"><p>ประเภทสินค้า : {{ item.goodsType }}</p></v-col>
              <v-col cols="12"><p>ขนาดสินค้า : {{ item.goodsSize }}</p></v-col>
              <v-col cols="12"><p>ตัวเลือกขนส่ง : {{ item.transportOption }}</p></v-col>
              <v-col v-if="showOfferCards && item.transportOption === 'เสนอราคาที่ต้องการ'" cols="12">
                <v-card
                  class="rounded-lg border-dashed"
                  color="primary"
                  variant="outlined"
                >
                  <v-card-text class="ma-2 d-flex justify-space-between">
                    <h3>ข้อเสนอของคุณ :</h3>
                    <h3>ราคา {{ item.offerPrice }} บาท</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <!-- ฝั่งขวา -->
          <v-col cols="12" md="6">
            <v-row dense>
              <v-col cols="12"><p>ผู้ให้บริการ : {{ item.provider }}</p></v-col>
              <v-col cols="12"><p>ป้ายทะเบียน : {{ item.vehicleType }}</p></v-col>
              <v-col cols="12">
                <p>
                  จุดรับส่งสินค้า :
                  <span
                    style="color: #005eb8; text-decoration: underline; cursor: pointer;"
                    @click="selectedBooking = item; dialog = true"
                  >รายละเอียดจุดรับ - ส่ง</span>
                </p>
              </v-col>
              <v-col cols="12"><p>ระยะทาง : {{ item.distance }}</p></v-col>
              <v-col v-if="showOfferCards && item.transportOption === 'เสนอราคาที่ต้องการ'" cols="12">
                <v-card
                  class="rounded-lg border-dashed"
                  color="secondary"
                  variant="outlined"
                >
                  <v-card-text class="ma-2 d-flex justify-space-between">
                    <h3>ข้อเสนอผู้ให้บริการขนส่ง :</h3>
                    <h3>ราคา {{ item.providerPrice }} บาท</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <v-col v-if="item.status !== 'draft'" cols="12">
            <v-card
              class="text-white pa-2 mb-2"
              style="background-color: #f2a901;"
              variant="tonal"
              width="auto"
            >
              <v-icon class="mr-2" small>mdi-shield-check</v-icon>
              {{ item.fullInsuranceText }}
            </v-card>
          </v-col>
          <v-divider />
          <v-col class="d-flex justify-space-between" cols="12" md="6">
            <h3 v-if="item.status === 'draft'" class="text-grey">อยู่ระหว่างการจอง</h3>
            <h2 v-if="item.status !== 'draft'" class="text-h6">ราคา</h2>
            <h2 v-if="item.status !== 'draft'" class="text-h6">{{ item.totalPrice }} บาท</h2>
          </v-col>

          <v-col class="d-flex justify-end ga-2" cols="12" md="6">
            <v-btn
              v-if="item.status === 'finding'"
              color="red"
              variant="outlined"
              @click="showCancelAlert(item)"
            >
              ยกเลิกการจอง
            </v-btn>
            <v-btn
              v-if="item.status === 'finding'"
              color="#000080"
              rounded="md"
              @click="dialog_offer = true"
            >
              เพิ่มวงเงินประกัน
            </v-btn>
            <v-btn
              v-if="item.status === 'finding' && item.transportOption === 'เสนอราคาที่ต้องการ'"
              color="primary"
              rounded="md"
              @click="openOfferDialog(item)"
            >
              เสนอราคา
            </v-btn>
            <v-btn
              v-if="item.status === 'draft'"
              color="primary"
              @click="confirmDraft(item)"
            >
              ยืนยันการจอง
            </v-btn>
            <v-btn
              v-if="item.status === 'finding' && item.transportOption === 'ราคาที่ระบบแนะนำ'"
              color="primary"
              @click="confirmBooking(item)"
            >
              ยืนยัน
            </v-btn>
            <v-btn
              v-if="item.status === 'in_transit' || item.status === 'completed'"
              color="primary"
              variant="outlined"
              @click="() => {
                if (item.status === 'in_transit') {
                  $router.push(`/user/tracking/id`);
                } else if (item.status === 'completed') {
                  $router.push(`/user/history/id`);
                }
              }"
            >
              ดูรายละเอียด
            </v-btn>
            <v-btn
              v-if="item.status === 'canceled'"
              color="grey"
              variant="outlined"
              @click="showCancelAlert(item)"
            >
              ดูยกเลิกคำขอ
            </v-btn>
            <div v-if="item.status === 'canceled'" class="d-flex align-center ga-2 text-green">
              <v-icon>mdi-check-circle</v-icon>
              <h3>ยกเลิกสำเร็จ</h3>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div
              v-if="item.status === 'finding' && isWithin30Minutes(item.createdAt)"
              class="d-flex align-center ga-2 text-red"
            >
              <v-icon>mdi-alert-outline</v-icon>
              <h3>ยกเลิกฟรีภายใน 30 นาที หลังจากยืนยันการจอง (หลังจากนั้นจะมีค่าธรรมเนียมยกเลิก)</h3>
            </div>
            <div
              v-else-if="item.status === 'finding' && !isWithin30Minutes(item.createdAt)"
              class="d-flex align-center ga-2 text-red"
            >
              <v-icon>mdi-close</v-icon>
              <h3>หมดเวลายกเลิกฟรีแล้ว ค่าธรรมเนียมการยกเลิก: 500 บาท</h3>
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- แสดงวันที่เริ่มงานบนมือถือ -->
      <div class="pa-4 d-md-none text-grey-darken-1 text-caption">
        เริ่มงาน | {{ item.startDate }}
      </div>
    </v-card>

    <!-- Dialog: รายละเอียดจุดรับ-ส่ง -->
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

    <!-- Dialog: เสนอราคา -->
    <v-dialog v-model="offer" max-width="600px">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <p>เสนอราคาที่ต้องการ</p>
          <v-btn icon variant="text" @click="offer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card class="border-thin" variant="outlined">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <h3 class="mb-2">ราคาค่าขนส่ง</h3>
                  <v-text-field
                    ref="priceField"
                    density="comfortable"
                    placeholder="กรอกราคาที่ต้องการ"
                    :rules="[v => !!v || 'กรุณากรอกราคา', v => /^\d+$/.test(v) || 'ต้องเป็นตัวเลขเท่านั้น', v => parseInt(v) >= 500 || 'ราคาต้องไม่ต่ำกว่า 500 บาท']"
                    variant="outlined"
                  />
                  <p class="text-red mt-2">ราคาขั้นต่ำ 500 บาท</p>
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
            </v-card-text>
          </v-card>
          <div class="mt-5 d-flex justify-end">
            <v-btn color="primary" rounded="md" size="large" @click="submitOffer">เสนอราคานี้</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog: เพิ่มวงเงินประกัน -->
    <v-dialog v-model="dialog_offer" max-width="800">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <p>เพิ่มวงเงินประกัน</p>
          <v-btn icon="mdi-close" variant="text" @click="dialog_offer = false" />
        </v-card-title>
        <v-card-text>
          <h3>วงเงินประกัน</h3>
          <v-text-field
            v-model="insuranceAmount"
            hide-details
            placeholder="กรอกจำนวนเงิน"
            :rules="[v => !!v || 'กรุณากรอกจำนวนเงิน', v => /^\d+$/.test(v) || 'ต้องเป็นตัวเลขเท่านั้น', v => parseInt(v) >= 2000 || 'วงเงินต้องไม่ต่ำกว่า 2,000 บาท', v => parseInt(v) <= 10000 || 'วงเงินต้องไม่เกิน 10,000 บาท']"
            variant="outlined"
          />
          <p class="text-red mt-2">
            จำนวนเงินขั้นต่ำ 2,000 บาท - จำนวนเงินสูงสุด 10,000 บาท
          </p>
          <v-btn
            block
            class="mt-8"
            color="primary"
            size="large"
            text="ยืนยัน"
            @click="confirmInsurance"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog: ยกเลิกการจอง -->
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
              กรุณาเลือกเหตุผลในการยกเลิกการจอง
              เมื่อการยกเลิกสำเร็จคุณจะได้รับเงินคืนภายใน 7 - 14 วัน
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
            v-model="cancelReasonDetails"
            auto-grow
            class="mt-2"
            placeholder="โปรดระบุเพิ่มเติม"
            rounded="lg"
            rows="3"
            :rules="[v => selectradio !== 'four' || !!v || 'กรุณากรอกเหตุผลเพิ่มเติม']"
            variant="outlined"
          />
          <v-btn
            block
            class="text-white"
            color="#f2a900"
            size="large"
            text="ยกเลิกการจอง"
            @click="confirmCancel"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Swal from 'sweetalert2';

  export default {
    data () {
      return {
        dialog: false,
        dialog_offer: false,
        offer: false,
        dialog_cancle: false,
        selectunit: null,
        selectradio: null,
        cancelReasonDetails: '',
        insuranceAmount: '',
        activeTab: 0,
        showOfferCards: false,
        unitprice: [
          { title: 'บาท', value: 'baht' },
          { title: 'บาท/กิโลเมตร', value: 'baht/km' },
          { title: 'บาท/ชั่วโมง', value: 'baht/hour' },
        ],
        selectedBooking: null,
        bookings: [
          {
            id: 'BH4334513',
            status: 'draft',
            route: 'สงขลา → สมุทรปราการ',
            startDate: '12 กพ. 2568',
            vehicleType: 'รถ 4 ล้อ (ตู้ทึบปกติ)',
            goodsType: 'สินค้าทั่วไป',
            goodsSize: '20x20x20',
            transportOption: 'ราคาที่ระบบแนะนำ',
            offerPrice: '1,200',
            provider: 'Triple SSS',
            providerPrice: '1,200',
            distance: '920 กม.',
            totalPrice: '1,300.00',
            fullInsuranceText:
              'ประกันสินค้าระหว่างขนส่ง จ่ายตามจริงแต่ไม่เกิน 1,000,000 บาท/เที่ยว (หมายเหตุ: ขึ้นอยู่กับประกันภัยของแต่ละคัน)',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '123 ถนนสุขุมวิท เขตคลองเตย กรุงเทพฯ 10110',
                date: '5 มกราคม 2568 10:00 - 12:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '456 ถนนพระราม 2 เขตบางขุนเทียน กรุงเทพฯ 10150',
                date: '5 มกราคม 2568 12:00 - 14:00 น.',
              },
            ],
            createdAt: new Date().toISOString(),
          },
          {
            id: 'BH4567890',
            status: 'finding',
            route: 'กรุงเทพ → นนทบุรี',
            startDate: '15 กพ. 2568',
            vehicleType: 'รถ 6 ล้อ',
            goodsType: 'เครื่องจักร',
            goodsSize: '30x30x30',
            transportOption: 'เสนอราคาที่ต้องการ',
            offerPrice: '2,500',
            provider: 'Fast Trans',
            providerPrice: '2,800',
            distance: '50 กม.',
            totalPrice: '2,900.00',
            fullInsuranceText:
              'ประกันสินค้าระหว่างขนส่ง จ่ายตามจริงแต่ไม่เกิน 1,000,000 บาท/เที่ยว (หมายเหตุ: ขึ้นอยู่กับประกันภัยของแต่ละคัน)',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '789 ถนนวิภาวดีรังสิต เขตดอนเมือง กรุงเทพฯ 10210',
                date: '6 มกราคม 2568 09:00 - 11:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '321 ถนนงามวงศ์วาน เขตเมืองนนทบุรี 11000',
                date: '6 มกราคม 2568 11:00 - 12:00 น.',
              },
            ],
            createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          },
          {
            id: 'BH4567891',
            status: 'finding',
            route: 'ระยอง → ชลบุรี',
            startDate: '16 กพ. 2568',
            vehicleType: 'รถ 4 ล้อ (ตู้ทึบ)',
            goodsType: 'สินค้าทั่วไป',
            goodsSize: '25x25x25',
            transportOption: 'ราคาที่ระบบแนะนำ',
            offerPrice: '1,800',
            provider: 'Quick Trans',
            providerPrice: '2,000',
            distance: '80 กม.',
            totalPrice: '2,100.00',
            fullInsuranceText:
              'ประกันสินค้าระหว่างขนส่ง จ่ายตามจริงแต่ไม่เกิน 1,000,000 บาท/เที่ยว (หมายเหตุ: ขึ้นอยู่กับประกันภัยของแต่ละคัน)',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '123 ถนนสุขุมวิท อ.เมือง ระยอง 21000',
                date: '7 มกราคม 2568 10:00 - 12:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '456 ถนนบางนา-ตราด อ.เมือง ชลบุรี 20000',
                date: '7 มกราคม 2568 13:00 - 15:00 น.',
              },
            ],
            createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          },
          {
            id: 'BH9876543',
            status: 'in_transit',
            route: 'เชียงใหม่ → ลำปาง',
            startDate: '10 กพ. 2568',
            vehicleType: 'รถ 4 ล้อ (เปิดข้าง)',
            goodsType: 'สินค้าทั่วไป',
            goodsSize: '25x25x20',
            transportOption: 'ราคาที่ระบบแนะนำ',
            offerPrice: '1,500',
            provider: 'North Logistics',
            providerPrice: '1,600',
            distance: '100 กม.',
            totalPrice: '1,700.00',
            fullInsuranceText:
              'ประกันสินค้าระหว่างขนส่ง จ่ายตามจริงแต่ไม่เกิน 1,000,000 บาท/เที่ยว (หมายเหตุ: ขึ้นอยู่กับประกันภัยของแต่ละคัน)',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '456 ถนนนิมมานเหมินทร์ อ.เมือง เชียงใหม่ 50200',
                date: '4 มกราคม 2568 08:00 - 10:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '789 ถนนพหลโยธิน อ.เมือง ลำปาง 52000',
                date: '4 มกราคม 2568 11:00 - 13:00 น.',
              },
            ],
            createdAt: new Date().toISOString(),
          },
          {
            id: 'BH1234567',
            status: 'completed',
            route: 'ขอนแก่น → อุดรธานี',
            startDate: '8 กพ. 2568',
            vehicleType: 'รถ 10 ล้อ',
            goodsType: 'สินค้าทั่วไป',
            goodsSize: '40x40x40',
            transportOption: 'ราคาที่ระบบแนะนำ',
            offerPrice: '3,000',
            provider: 'East Logistics',
            providerPrice: '3,200',
            distance: '120 กม.',
            totalPrice: '3,500.00',
            fullInsuranceText:
              'ประกันสินค้าระหว่างขนส่ง จ่ายตามจริงแต่ไม่เกิน 1,000,000 บาท/เที่ยว (หมายเหตุ: ขึ้นอยู่กับประกันภัยของแต่ละคัน)',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '111 ถนนมิตรภาพ อ.เมือง ขอนแก่น 40000',
                date: '3 มกราคม 2568 07:00 - 09:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '222 ถนนอุดรดุษฎี อ.เมือง อุดรธานี 41000',
                date: '3 มกราคม 2568 10:00 - 12:00 น.',
              },
            ],
            createdAt: new Date().toISOString(),
          },
          {
            id: 'BH7654321',
            status: 'canceled',
            route: 'ภูเก็ต → สุราษฎร์ธานี',
            startDate: '5 กพ. 2568',
            vehicleType: 'รถ 4 ล้อ (ตู้ทึบ)',
            goodsType: 'สินค้าทั่วไป',
            goodsSize: '15x15x15',
            transportOption: 'ราคาที่ระบบแนะนำ',
            offerPrice: '1,000',
            provider: 'South Trans',
            providerPrice: null,
            distance: null,
            totalPrice: null,
            fullInsuranceText:
              'ประกันสินค้าระระหว่างขนส่ง จ่ายตามจริงแต่ไม่เกิน 1,000,000 บาท/เที่ยว (หมายเหตุ: ขึ้นอยู่กับประกันภัยของแต่ละคัน)',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '333 ถนนเจ้าฟ้า อ.เมือง ภูเก็ต 83000',
                date: '2 มกราคม 2568 09:00 - 11:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '444 ถนนตราด อ.เมือง สุราษฎร์ธานี 84000',
                date: '2 มกราคม 2568 13:00 - 15:00 น.',
              },
            ],
            createdAt: new Date().toISOString(),
            cancelReason: 'one',
          },
        ],
      };
    },
    computed: {
      filteredBookings () {
        const statusMap = ['draft', 'finding', 'in_transit', 'completed', 'canceled'];
        return this.bookings.filter(booking => booking.status === statusMap[this.activeTab]);
      },
    },
    methods: {
      getTimelineColor (type) {
        if (type === 'pickup') return 'primary';
        if (type === 'dropoff') return 'secondary';
        return 'grey';
      },
      isWithin30Minutes (createdAt) {
        const createdTime = new Date(createdAt).getTime();
        const now = new Date().getTime();
        const diffMinutes = (now - createdTime) / (1000 * 60);
        return diffMinutes <= 30;
      },
      openOfferDialog (item) {
        this.selectedBooking = item;
        this.offer = true;
      },
      submitOffer () {
        const price = this.$refs.priceField.value;
        const minPrice = 500; // กำหนดราคาขั้นต่ำ 500 บาท

        // ตรวจสอบว่าราคาว่างเปล่าหรือไม่ใช่ตัวเลข
        if (!price || !/^\d+$/.test(price)) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'กรุณากรอกราคาที่ถูกต้อง',
          });
          return;
        }

        // ตรวจสอบราคาขั้นต่ำ
        if (parseInt(price) < minPrice) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: `ราคาที่เสนอต้องไม่ต่ำกว่า ${minPrice} บาท`,
          });
          return;
        }

        // อัปเดตข้อมูลการจอง
        if (this.selectedBooking) {
          const booking = this.bookings.find(b => b.id === this.selectedBooking.id);
          if (booking) {
            booking.offerPrice = price;
          }
        }

        // แสดงการ์ดข้อเสนอและปิด dialog
        this.showOfferCards = true;
        this.offer = false;

        // แจ้งเตือนเมื่อเสนอราคาสำเร็จ
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: `เสนอราคา ${price} บาทเรียบร้อยแล้ว`,
        });
      },
      confirmInsurance () {
        const amount = this.insuranceAmount;
        const minAmount = 2000;
        const maxAmount = 10000;

        // ตรวจสอบว่าวงเงินว่างเปล่าหรือไม่ใช่ตัวเลข
        if (!amount || !/^\d+$/.test(amount)) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'กรุณากรอกวงเงินที่ถูกต้อง',
          });
          return;
        }

        // ตรวจสอบวงเงินขั้นต่ำและสูงสุด
        if (parseInt(amount) < minAmount || parseInt(amount) > maxAmount) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: `วงเงินต้องอยู่ระหว่าง ${minAmount} - ${maxAmount} บาท`,
          });
          return;
        }

        // อัปเดตวงเงินประกัน (สมมติว่ามีการเก็บใน booking)
        if (this.selectedBooking) {
          const booking = this.bookings.find(b => b.id === this.selectedBooking.id);
          if (booking) {
            booking.insuranceAmount = amount;
          }
        }

        // ปิด dialog และแจ้งเตือนเมื่อเพิ่มวงเงินสำเร็จ
        this.dialog_offer = false;
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: `เพิ่มวงเงินประกัน ${amount} บาทเรียบร้อยแล้ว`,
        });

        // รีเซ็ตค่า insuranceAmount
        this.insuranceAmount = '';
      },
      confirmBooking () {
        this.$router.push('/user/payment');
      },
      confirmDraft () {
        this.$router.push('/user/booking');
      },
      showCancelAlert (booking) {
        this.selectedBooking = booking;
        if (booking.status === 'finding') {
          this.dialog_cancle = true;
        } else if (booking.status === 'canceled') {
          const reasonText = {
            one: 'ใช้เวลารอนานเกินไป',
            two: 'ปักหมุดผิด / จองผิดพลาด',
            three: 'ค่าขนส่งแพงเกินไป',
            four: booking.cancelReasonDetails || 'เหตุผลอื่น',
          }[booking.cancelReason || 'one'];

          Swal.fire({
            icon: 'info',
            title: 'รายละเอียดการยกเลิก',
            html: `เหตุผล: ${reasonText}`,
            confirmButtonText: 'ปิด',
          });
        }
      },
      confirmCancel () {

        if (this.selectedBooking) {
          const booking = this.bookings.find(b => b.id === this.selectedBooking.id);
          if (booking) {
            const isFreeCancel = this.isWithin30Minutes(booking.createdAt);
            const fee = isFreeCancel ? 0 : parseFloat(booking.totalPrice) * 0.03; // ค่าธรรมเนียม 3%

            booking.status = 'canceled';
            booking.cancelReason = this.selectradio;
            if (this.selectradio === 'four') {
              booking.cancelReasonDetails = this.cancelReasonDetails;
            }

            // ปิด dialog และรีเซ็ตค่า
            this.dialog_cancle = false;
            this.selectradio = null;
            this.cancelReasonDetails = '';

            // แจ้งเตือนเมื่อยกเลิกสำเร็จ
            Swal.fire({
              icon: 'success',
              title: 'ยกเลิกสำเร็จ',
              html: `การจองของคุณถูกยกเลิกเรียบร้อยแล้ว<br>ค่าธรรมเนียม: ${fee.toFixed(2)} บาท<br>เงินคืนจะดำเนินการภายใน 7-14 วัน`,
            });
          }
        }
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
  background-color: #f2a901 !important;
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
