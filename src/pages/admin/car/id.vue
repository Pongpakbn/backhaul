<template>
  <v-container>
    <v-card class="pa-4" flat rounded="lg">
      <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" />
    </v-card>
    <v-card class="mt-2" flat rounded="lg">
      <v-card-title>ข้อมูลรถ</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ประเภทรถ</p>
            <p>รถ 4 ล้อ(ตู้ทึบ)</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ป้ายทะเบียน </p>
            <p>กง 3721</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ยี่ห้อ</p>
            <p>HINO</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">รุ่น </p>
            <p>FC 155</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ปีที่ผลิต</p>
            <p>2018</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ขนาดเครื่องยนต์ </p>
            <p>2000</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ขนาดบรรทุก(หน่วย CBM)</p>
            <p>3000</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">วันหมดอายุภาษีรถ </p>
            <p>20/04/2568</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">วันหมดอายุ พรบ.</p>
            <p>20/04/2568</p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">เรทราคา </p>
            <p>2,500 </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-2" flat rounded="lg">
      <v-card-title>ข้อมูลเจ้าของรถ</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ชื่อเจ้าของรถ </p>
            <p>นายพงศ์ภัค บุญนาม </p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">เบอร์โทรศัพท์ </p>
            <p>098-678-9876 </p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ที่อยู่ </p>
            <p>2171 ถ. เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310 ประเทศไทย </p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">เอกสาร </p>
            <v-btn
              color="primary"
              prepend-icon="mdi-eye"
              rounded="md"
              text="ดูเอกสาร"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-2" flat rounded="lg">
      <v-card-title>ข้อมูลทางกฎหมาย</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <p style="opacity: 0.5;">ประเภทใบขับขี่ </p>
            <p>ใบขับขี่ บ.2 </p>
          </v-col>
          <v-col cols="12" md="4">
            <p style="opacity: 0.5;">เลขที่ใบขับขี่ </p>
            <p>10934525 </p>
          </v-col>
          <v-col cols="12" md="4">
            <p style="opacity: 0.5;">วันหมดอายุ </p>
            <p>30/05/2568 </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-2" flat rounded="lg">
      <v-card-title>ข้อมูลการทำประกันภัยรถขนส่ง</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ชื่อบริษัทประกันภัย </p>
            <p>วิริยะประกันภัย </p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">หมายเลขกรมธรรม์ </p>
            <p>57999002233 </p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">วันเริ่มต้นและสิ้นสุดการประกันภัย </p>
            <p>20/04/2568 - 25/06/2568 </p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ความคุ้มครอง </p>
            <p>ความคุ้มครองกรณีชน,ความคุ้มครองสินค้าเสียหายมความคุ้มครองจากภัยธรรมชาติ</p>
          </v-col>
          <v-col cols="12">
            <p style="opacity: 0.5;">เงื่อนไขการชดเชย </p>
            <p>ความเสียหายจากอุบัติเหตุ ,การสูญหาย , หรือความเสียหายที่เกิดจากภัยธรรมชาติ </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-2" flat rounded="lg">
      <v-card-title>ข้อมูลการประกันสินค้าขณะขนส่ง</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">หมายเลขกรรมธรรม์สินค้า </p>
            <p>57999002233 </p>
          </v-col>
          <v-col cols="12" md="6">
            <p style="opacity: 0.5;">ระยะเวลาในการคุ้มครอง </p>
            <p>คุ้มครองตั้งแต่รับสินค้า ถึงส่งสินค้า</p>
          </v-col>
          <v-col cols="12">
            <p style="opacity: 0.5;">ความคุ้มครองประกันสินค้า </p>
            <p>ค่าชดเชยจากการสูญเสีย, ความเสียหายจากอบุติเหตุ, ความเสียหายที่เกิดขึ้นระหว่างการขนส่ง</p>
          </v-col>
          <v-col class="d-flex justify-end" cols="12">
            <v-btn
              class="me-4"
              prepend-icon="mdi-close"
              rounded="md"
              size="large"
              text="ไม่อนุมัติ"
              variant="outlined"
            />
            <v-btn
              color="success"
              prepend-icon="mdi-check"
              rounded="md"
              size="large"
              text="ไม่อนุมัติ"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped>
p{
  font-size: 16px
}
</style>
