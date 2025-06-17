<template>
  <v-container>
    <!-- Header -->
    <v-card class="mb-2 pa-0" flat>
      <v-card-title class="ma-2 d-flex justify-space-between">
        <v-btn
          prepend-icon="mdi-chevron-left"
          text="ย้อนกลับ"
          variant="text"
          @click="$router.push('/user/payment')"
        />
        <p style="color:#005eb8;">#BH4334513</p>
      </v-card-title>
      <v-divider />
    </v-card>

    <!-- Payment Method Selection -->
    <v-card flat>
      <v-card-title>เลือกวิธีการชำระเงิน</v-card-title>
      <v-card-text>
        <v-radio-group v-model="payment">
          <v-row class="ma-4">
            <v-col class="d-flex" cols="12" md="4">
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
            <v-col class="d-flex" cols="12" md="4">
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
            <v-col class="d-flex" cols="12" md="4">
              <v-card
                class="pa-4 w-100"
                :class="payment === 'contact' ? 'selected-card' : ''"
                flat
                variant="outlined"
                @click="payment = 'contact'"
              >
                <v-radio label="ลูกค้าสัญญา" value="contact" />
              </v-card>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-card-text>
    </v-card>

    <!-- Payment Summary -->
    <v-card class="mt-2" flat>
      <v-card-title>ยอดชำระ</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p>#BH4334513: สงขลา → สมุทรปราการ</p>
          </v-col>
          <v-col class="d-flex align-center justify-space-between" cols="12">
            <p>ค่าขนส่ง</p>
            <p>1,300.00 บาท/คัน</p>
          </v-col>
          <v-col class="d-flex align-center justify-space-between" cols="12">
            <p>หักภาษี ณ ที่จ่าย 1%</p>
            <p>100.00 บาท/คัน</p>
          </v-col>
          <v-col class="d-flex align-center justify-space-between" cols="12">
            <p>ยอดชำระรวม</p>
            <p>1,200.00 บาท/คัน</p>
          </v-col>
          <v-divider />
          <v-col class="d-flex align-center justify-space-between" cols="12" style="color: #005eb8;">
            <h2>ยอดทั้งหมด</h2>
            <h2>1,200.00 บาท/คัน</h2>
          </v-col>
          <v-divider />
          <v-col cols="12">
            <v-btn
              block
              color="primary"
              rounded="md"
              size="x-large"
              text="ชำระเงิน"
              @click="openPaymentDialog"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Payment Dialog -->
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title class="bg-primary">ชำระเงิน</v-card-title>
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
            <p>โปรดชำระเงินภายในระยะเวลา 2 นาที</p>
            <p>หากเกินระยะเวลาที่กำหนด ระบบจะยกเลิกการจองอัตโนมัติ</p>
          </div>
        </v-card-text>
        <div class="d-flex pa-4 align-center">
          <!-- ปุ่มซ้าย -->
          <div v-if="payment === 'contact'">
            <v-btn
              color="primary"
              text="ดาวน์โหลดใบแจ้งหนี้"
              variant="outlined"
              @click="downloadInvoice"
            />
          </div>

          <!-- Spacer ช่วยดันปุ่มขวา -->
          <v-spacer />

          <!-- ปุ่มขวา -->
          <div class="d-flex" style="gap: 8px;">
            <v-btn
              color="red"
              text="ปิดหน้านี้"
              variant="outlined"
              @click="dialog = false"
            />
            <v-btn color="primary" @click="confirmPayment">
              ยืนยัน
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="cardDialog" max-width="600">
      <v-card>
        <v-card-title class="bg-primary text-white">
          ชำระเงินด้วยบัตรเครดิต/เดบิต
        </v-card-title>
        <v-card-text>
          <v-form ref="cardForm" v-model="cardFormValid">
            <v-text-field
              v-model="card.number"
              label="หมายเลขบัตรเครดิต"
              maxlength="19"
              placeholder="xxxx xxxx xxxx xxxx"
              :rules="[v => !!v || 'กรุณากรอกหมายเลขบัตร']"
            />
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="card.expiry"
                  label="วันหมดอายุ"
                  placeholder="MM/YY"
                  :rules="[v => !!v || 'กรุณากรอกวันหมดอายุ']"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="card.cvv"
                  label="CVV"
                  maxlength="4"
                  placeholder="XXX"
                  :rules="[v => !!v || 'กรุณากรอก CVV']"
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="card.name"
              label="ชื่อบนบัตร"
              :rules="[v => !!v || 'กรุณากรอกชื่อบนบัตร']"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="red" variant="outlined" @click="cardDialog = false">ยกเลิก</v-btn>
          <v-btn color="primary" @click="submitCardPayment">ยืนยัน</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        payment: 'qr',
        dialog: false,
        cardDialog: false,
        cardFormValid: false,
        card: {
          number: '',
          expiry: '',
          cvv: '',
          name: '',
        },
      };
    },
    methods: {
      downloadInvoice () {
        // ตัวอย่าง: อาจจะลิงก์ไปไฟล์ PDF หรือ Blob
        window.open('/invoice', '_blank');
      },
      confirmPayment () {
        this.dialog = false;

        this.$swal.fire({
          icon: 'success',
          title: 'ชำระเงินสำเร็จ',
          text: 'ระบบกำลังนำคุณไปยังหน้าติดตามสถานะ...',
          confirmButtonText: 'ตกลง',
          confirmButtonColor: '#005eb8',
        }).then(() => {
          this.$router.push('/user/tracking');
        });
      },
      openPaymentDialog () {
        if (this.payment === 'qr') {
          this.dialog = true;
        } else if (this.payment === 'debit') {
          this.cardDialog = true;
        } else if (this.payment === 'contact') {
          this.dialog = true;
        }
      },
      submitCardPayment () {
        if (!this.cardFormValid) {
          this.$refs.cardForm.validate();
          return;
        }
        // TODO: ส่งข้อมูลบัตรเครดิตไปยัง backend หรือ gateway
        alert('ดำเนินการชำระเงินด้วยบัตรเรียบร้อย');
        this.cardDialog = false;
      },
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
