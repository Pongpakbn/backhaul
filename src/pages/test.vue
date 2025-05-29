<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-card class="elevation-5 pa-4">
        <!-- หัวข้อ -->
        <v-card-title class="headline">
          ข้อมูลการทำประกันภัยรถขนส่ง
        </v-card-title>

        <!-- รายละเอียด -->
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>เงื่อนไขกรมธรรม์</v-list-item-title>
                  <v-list-item-subtitle>57999002233</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>วันที่ออกกรมธรรม์</v-list-item-title>
                  <v-list-item-subtitle>20/04/2568 - 25/06/2568</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ระยะเวลาความคุ้มครอง</v-list-item-title>
                  <v-list-item-subtitle>20/04/2568 - 25/06/2568</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>วันที่เริ่มต้นประกัน</v-list-item-title>
                  <v-list-item-subtitle>20/04/2568 - 25/06/2568</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>

          <!-- ความคุ้มครอง -->
          <v-divider class="my-4" />
          <v-subheader class="title">ความคุ้มครอง</v-subheader>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>ความเสียหายต่อตัวรถ</v-list-item-title>
                <v-list-item-subtitle>วงเงินสูงสุด 500,000 บาท</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>ความรับผิดต่อบุคคลภายนอก</v-list-item-title>
                <v-list-item-subtitle>วงเงินสูงสุด 1,000,000 บาท</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>การโจรกรรม</v-list-item-title>
                <v-list-item-subtitle>ครอบคลุมตามมูลค่ารถ</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <!-- เงื่อนไข -->
          <v-divider class="my-4" />
          <v-subheader class="title">เงื่อนไข</v-subheader>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>ขอบเขตความรับผิด</v-list-item-title>
                <v-list-item-subtitle>ครอบคลุมอุบัติเหตุและภัยธรรมชาติ</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>ข้อยกเว้น</v-list-item-title>
                <v-list-item-subtitle>ไม่ครอบคลุมการขับขี่โดยผู้ไม่มีใบอนุญาต</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>เงื่อนไขการเคลม</v-list-item-title>
                <v-list-item-subtitle>ต้องแจ้งภายใน 7 วัน พร้อมเอกสารครบถ้วน</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <!-- ปุ่ม (ถ้าต้องการเพิ่มการโต้ตอบ) -->
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text>ดูเพิ่มเติม</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
