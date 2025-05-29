<template>
  <v-container>
    <v-card class="pa-4" flat rounded="lg">
      <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" />
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
            <p style="opacity: 0.5;">ทำการจองเมื่อ  </p>
            <p>12/02-2568 ,13:00 น.</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ชื่อ - สกุล</p>
            <p>พงศ์ภัค บุญนาม</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">เบอร์โทรศัพท์  </p>
            <p>099-712-5161</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ประเภทรถ</p>
            <p>รถ 4 ล้อ (ตู้ทึบปกติ)</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ประเภทสินค้า/สินค้า  </p>
            <p>สินค้าทั่วไป/เสื้อผ้า ,กระเป๋า</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">เส้นทาง</p>
            <p>สงขลา → สมุทปราการ</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ระยะทาง </p>
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
        <h4>ข้อมูลเจ้าของรถ</h4>
        <v-btn
          color="primary"
          rounded="md"
          size="large"
          text="เลือกแผนการเดินรถ"
          @click="dialog=true"
        />
      </v-card-title>
    </v-card>
    <v-card class="mt-2" flat rounded="lg">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">คนขับ  </p>
            <p>เอ</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ทะเบียนรถ </p>
            <p>64-7298</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ต้นทาง  </p>
            <p>สงขลา</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ปลายทาง  </p>
            <p>สมุทรปราการ</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">เริ่ม </p>
            <p>12/07/2568 ,05:00 น.</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">สิ้นสุด</p>
            <p>13/07/2568 ,07:00 น.</p>
          </v-col>
          <v-col cols="12">
            <p style="opacity: 0.5;">พาเลทที่จอง/ทั้งหมด</p>
            <p>0/12</p>
          </v-col>
          <v-col cols="12" class="d-flex justify-end align-center">
            <v-btn
              color="primary"
              rounded="md"
              size="large"
              text="ยืนยันข้อมูล"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog" max-width="1200" scrollable>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <h4>แผนการเดินรถ</h4>
        <v-btn icon="mdi-close" variant="text" @click="dialog = false" />
      </v-card-title>

      <v-divider />
      <v-card style="max-height: 70vh; overflow-y: auto;">
        <v-card
          v-for="(item, index) in 3"
          :key="index"
          class="ma-4 rounded-md"
          elevation="1"
        >
          <v-row class="pa-3">
            <v-col cols="12" md="3">
              <p class="mb-1">ทะเบียนรถ: 64-7250</p>
              <p class="mb-0">คนขับ: เอ</p>
            </v-col>

            <v-col cols="12" md="3">
              <p class="mb-1">ต้นทาง: สงขลา</p>
              <p class="mb-0">ปลายทาง: สมุทรปราการ</p>
            </v-col>

            <v-col cols="12" md="3">
              <p class="mb-1">เริ่ม: 12/07/2568, 05:00 น.</p>
              <p class="mb-0">สิ้นสุด: 13/07/2568, 07:00 น.</p>
            </v-col>

            <v-col class="d-flex align-center justify-center mt-2 mt-md-0" cols="12" md="1">
              <span class="font-weight-bold">0/12</span>
            </v-col>

            <v-col class="mt-2 mt-md-0" cols="12" md="2">
              <v-btn block color="primary" text="เลือกแผนนี้" variant="outlined" />
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-card>
  </v-dialog>
</template>
<script>
  export default{
    data () {
      return{
        dialog:false,
      }
    },
  }
</script>
<style scoped>
p{
  font-size: 16px
}
</style>
