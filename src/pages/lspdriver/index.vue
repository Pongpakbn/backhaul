<template>
  <v-container>
    <h2>งานของฉัน</h2>
    <v-card class="mt-2" rounded="lg" variant="text">
      <v-card-text class="pl-0">
        <v-row class="flex-nowrap" no-gutters style="overflow-x: auto">
          <v-col
            v-for="(label, i) in [
              'รอเริ่มงาน',
              'กำลังขนส่ง',
              'ขนส่งสำเร็จ',
            ]"
            :key="i"
            class="flex-grow-0 flex-shrink-0"
          >
            <v-btn
              class="mx-2 ma-1"
              :color="activeTab === i ? 'primary' : 'white'"
              elevation="0"
              rounded="md"
              @click="activeTab = i"
            >
              {{ label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      v-for="(intem, index) in 3"
      :key="index"
      class="mt-4"
      flat
      rounded="lg"
    >
      <v-card-title>
        หมายเลขงาน : BH3ca75 <v-chip color="primary" label text="รอเริ่มงาน" />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="6">
                <p>งานเริ่ม</p>
              </v-col>
              <v-col cols="6">
                <p>6 มีนาคม 2568 10:00 น.</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>ประเภทรถบรรทุก</p>
              </v-col>
              <v-col cols="6">
                <p>รถ 4 ล้อ(ตู้ทึบปกติ)</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>ประเภทการจอง</p>
              </v-col>
              <v-col cols="6">
                <p>เหมาคัน</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>ประเภทสินค้า</p>
              </v-col>
              <v-col cols="6">
                <p>สินค้าทั่วไป</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>รายละเอียดสินค้า</p>
              </v-col>
              <v-col cols="6">
                <p style="text-decoration: underline;color: #000080;cursor: pointer;" @click="dialog_product =true">ดูรายละเอียดสินค้า</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>แผนการเดินรถ</p>
              </v-col>
              <v-col cols="6">
                <p>ภูเก็ต ->กรุงเทพ</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>ระยะทาง</p>
              </v-col>
              <v-col cols="6">
                <p>892 กิโลเมตร</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>จุดรับส่งสินค้า</p>
              </v-col>
              <v-col cols="6">
                <v-btn color="primary" density="compact" text="รายละเอียดจุดรับ-ส่ง" @click="openImgae()" />
              </v-col>
            </v-row>
          </v-col>
          <!-- right -->
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <p>รายละเอียดเพิ่มเติม</p>
                <p>ต้องการรถกระบะพื้นเรียบ หรือ รถกระบะตอนเดียว (ที่ไม่มีแคป) ขอรถที่มีสายรัดสินค้า และ ขอคนขับรถที่มีความระมัดระวังในการขับขี่ ไม่ขับเร็ว เนื่องจากเคยมีคนขับทำสินค้าล่วงจากพาเลท ทำให้ของเสียหาย</p>
              </v-col>
              <v-col cols="12">
                <div>
                  <p>ค่าสำหรับงานนี้</p>
                  <div class="d-flex justify-space-between">
                    <p style="opacity: 0.4;">ค่าขนส่ง (ต่อคัน) </p>
                    <p>1,452 บาท/คัน</p>
                  </div>
                  <v-card flat style="background-color: #f2f2f9;">
                    <v-card-text class="d-flex justify-space-between ma-2" style="color: #000080;">
                      <h2>ยอดที่คุณจะได้รับ</h2>
                      <h2>1,200 บาท</h2>
                    </v-card-text>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="mt-2 mb-2" />
        <v-row>
          <v-col cols="12">
            <v-btn
              block
              color="primary"
              prepend-icon="mdi-magnify"
              rounded="lg"
              size="large"
              text="ดูรายละเอียด"
              @click="offer=true"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        activeTab: 0,
      };
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
