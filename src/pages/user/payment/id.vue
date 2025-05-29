<template>
  <v-container>
    <v-card class="mb-2 pa-0" flat>
      <v-card-title class="ma-2 d-flex justify-space-between">
        <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" />
        <p style="color:#005eb8;">#BH4334513</p>
      </v-card-title>
      <v-divider />
    </v-card>
    <v-card>
      <v-card-title>
        <p>เลือกวิธีการชำระเงิน</p>
      </v-card-title>
      <v-card-text>
        <v-radio-group v-model="payment">
          <v-row class="ma-4">
            <v-col class="d-flex" cols="12" md="6">
              <v-card
                class="pa-4 w-100"
                :class="payment === 'qr' ? 'selected-card' : ''"
                flat
                variant="outlined"
                @click="payment = 'qr'"
              >
                <v-radio label="QR Code / Mobile Banking" value="qr" />
              </v-card>
            </v-col>

            <v-col class="d-flex" cols="12" md="6">
              <v-card
                class="pa-4 w-100"
                :class="payment === 'debit' ? 'selected-card' : ''"
                flat
                variant="outlined"
                @click="payment = 'debit'"
              >
                <v-radio label="บัตรเครดิต / เดบิต" value="debit" />
              </v-card>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-card-text>
    </v-card>
    <v-card class="mt-2">
      <v-card-title>
        ยอดชำระ
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p>#BH4334513: สงขลา → สมุทรปราการ</p>
          </v-col>
          <v-col class="d-flex align-center justify-space-between" cols="12">
            <p class="text-start">ค่าขนส่ง</p>
            <p class="text-end">1,300.00 บาท/คัน</p>
          </v-col>
          <v-col class="d-flex align-center justify-space-between" cols="12">
            <p class="text-start">หักภาษี ณ ที่จ่าย 1%</p>
            <p class="text-end">100.00 บาท/คัน</p>
          </v-col>
          <v-col class="d-flex align-center justify-space-between" cols="12">
            <p class="text-start">ยอดชำระรวม</p>
            <p class="text-end">100.00 บาท/คัน</p>
          </v-col>
          <v-divider />
          <v-col class="d-flex align-center justify-space-between" cols="12" style="color: #005eb8;">
            <h2 class="text-start">ยอดทั้งหมด</h2>
            <h2 class="text-end">100.00 บาท/คัน</h2>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <v-btn
              block
              color="primary"
              rounded="md"
              size="x-large"
              text="ชำระเงิน"
              @click="dialog = true"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>

  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title class="bg-primary">
        ชำระเงิน
      </v-card-title>
      <v-card-text>
        <p>รหัสการจัดส่ง : #BH4334513</p>
        <p>วันที่ทำรายการ : 2025-02-20 11:00</p>
        <h2 class="text-center mt-2">ชำระเงินผ่าน QR CODE</h2>
        <div class="d-flex justify-center mt-2">
          <v-img
            max-width="200"
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://your-payment-link.com"
          />
        </div>
        <h2 class="text-center mt-2 color-primary">ราคา 1,287 บาท</h2>
        <div class="d-flex align-center justify-center flex-column opacity-70">
          <p>โปรดชำระเงินภายในระยะเวลา  2 นาที</p>
          <p>หากเกินระยะเวลาที่กำหนด ระบบจะยกเลิกการจองอัตโนมัติ</p>
        </div>
      </v-card-text>
      <div class="d-flex justify-end pa-4">
        <v-btn class="me-4" color="red" text="ปิดหน้านี้" variant="outlined" />
        <v-btn color="primary" text="ยืนยัน" />
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    data () {
      return {
        payment: 'qr',
        dialog: false,
      };
    },
  };
</script>
<style scoped>
.selected-card {
  color: #005eb8;
  border-color: var(--v-primary-base) !important;
  border-width: 1px !important;
}
.color-primary {
  color: #005eb8 !important;
}
</style>
