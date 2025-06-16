<template>
  <v-container>
    <v-card class="pa-4" flat rounded="lg">
      <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" @click="$router.push('/admin/boardcast')" />
    </v-card>
    <v-card class="mt-2" flat rounded="lg">
      <v-card-title>ข้อมูลการจอง</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">หมายเลขการจอง</p>
            <p>BH3ac23</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ทำการจองเมื่อ</p>
            <p>12/02/2568 ,13:00 น.</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ชื่อ - สกุล</p>
            <p>พงศ์ภัค บุญนาม</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">เบอร์โทรศัพท์</p>
            <p>099-712-5161</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ประเภทรถ</p>
            <p>รถ 4 ล้อ (ตู้ทึบปกติ)</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ประเภทสินค้า/สินค้า</p>
            <p>สินค้าทั่วไป/เสื้อผ้า ,กระเป๋า</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">เส้นทาง</p>
            <p>สงขลา → สมุทปราการ</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ระยะทาง</p>
            <p>920 กิโลเมตร</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ราคาที่ต้องการ</p>
            <p>1,000 บาท</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-2" flat rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        <h4>แผนการเดินทาง</h4>
        <v-btn
          color="primary"
          rounded="md"
          size="large"
          text="เลือกแผนการเดินรถ"
          @click="dialog = true"
        />
      </v-card-title>
    </v-card>
    <v-card v-if="selectedPlan" class="mt-2" flat rounded="lg">
      <v-card-title>ข้อมูลแผนการเดินทาง</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">คนขับ</p>
            <p>{{ selectedPlan.driver }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ทะเบียนรถ</p>
            <p>{{ selectedPlan.licensePlate }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ต้นทาง</p>
            <p>{{ selectedPlan.origin }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ปลายทาง</p>
            <p>{{ selectedPlan.destination }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">เริ่ม</p>
            <p>{{ selectedPlan.start }}</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">สิ้นสุด</p>
            <p>{{ selectedPlan.end }}</p>
          </v-col>
          <v-col cols="12">
            <p style="opacity: 0.5;">พาเลทที่จอง/ทั้งหมด</p>
            <p>{{ selectedPlan.pallet }}</p>
          </v-col>
          <v-col class="d-flex justify-end align-center" cols="12">
            <v-btn
              color="primary"
              rounded="md"
              size="large"
              text="ยืนยันข้อมูล"
              @click="confirmPlan"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="1200" scrollable>
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <h4>แผนการเดินรถ</h4>
          <v-btn icon="mdi-close" variant="text" @click="dialog = false" />
        </v-card-title>
        <v-divider />
        <v-card style="max-height: 70vh; overflow-y: auto;">
          <v-card
            v-for="plan in plans"
            :key="plan.id"
            class="ma-4 rounded-md"
            elevation="1"
          >
            <v-row class="pa-3">
              <v-col cols="12" md="3">
                <p class="mb-1">ทะเบียนรถ: {{ plan.licensePlate }}</p>
                <p class="mb-0">คนขับ: {{ plan.driver }}</p>
              </v-col>
              <v-col cols="12" md="3">
                <p class="mb-1">ต้นทาง: {{ plan.origin }}</p>
                <p class="mb-0">ปลายทาง: {{ plan.destination }}</p>
              </v-col>
              <v-col cols="12" md="3">
                <p class="mb-1">เริ่ม: {{ plan.start }}</p>
                <p class="mb-0">สิ้นสุด: {{ plan.end }}</p>
              </v-col>
              <v-col class="d-flex align-center justify-center mt-2 mt-md-0" cols="12" md="1">
                <span class="font-weight-bold">{{ plan.pallet }}</span>
              </v-col>
              <v-col class="mt-2 mt-md-0" cols="12" md="2">
                <v-btn
                  block
                  color="primary"
                  text="เลือกแผนนี้"
                  variant="outlined"
                  @click="selectPlan(plan)"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        selectedPlan: null,
        plans: [
          {
            id: 1,
            licensePlate: '64-7250',
            driver: 'เอ',
            origin: 'สงขลา',
            destination: 'สมุทรปราการ',
            start: '12/07/2568 ,05:00 น.',
            end: '13/07/2568 ,07:00 น.',
            pallet: '0/12',
          },
          {
            id: 2,
            licensePlate: '64-7251',
            driver: 'บี',
            origin: 'สงขลา',
            destination: 'สมุทรปราการ',
            start: '12/07/2568 ,06:00 น.',
            end: '13/07/2568 ,08:00 น.',
            pallet: '2/12',
          },
          {
            id: 3,
            licensePlate: '64-7252',
            driver: 'ซี',
            origin: 'สงขลา',
            destination: 'สมุทรปราการ',
            start: '12/07/2568 ,07:00 น.',
            end: '13/07/2568 ,09:00 น.',
            pallet: '1/12',
          },
        ],
      }
    },
    methods: {
      selectPlan (plan) {
        this.selectedPlan = { ...plan }
        this.dialog = false
      },
      confirmPlan () {
        this.$swal
          .fire({
            title: 'ยืนยันการบันทึก',
            text: 'คุณต้องการยืนยันข้อมูลแผนการเดินทางนี้หรือไม่?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          })
          .then(result => {
            if (result.isConfirmed) {
              // Simulate API call
              Promise.resolve({
                data: {
                  success: true,
                  msg: 'ยืนยันข้อมูลแผนการเดินทางสำเร็จ',
                },
              }).then(response => {
                if (response.data.success) {
                  this.$swal
                    .fire({
                      title: 'บันทึกสำเร็จ',
                      text: response.data.msg,
                      confirmButtonText: 'ตกลง',
                      icon: 'success',
                      timer: 1500,
                      showConfirmButton: false,
                    })
                    .then(() => {
                      this.$router.push('/admin/boardcast')
                    })
                } else {
                  this.$swal.fire({
                    title: 'เกิดข้อผิดพลาด',
                    text: response.data.msg,
                    confirmButtonText: 'ตกลง',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                  })
                }
              })
            }
          })
      },
    },
  }
</script>

<style scoped>
p {
  font-size: 16px;
}
</style>
