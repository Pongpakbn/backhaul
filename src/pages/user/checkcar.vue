<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        เช็ครถว่าง
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="pa-6" justify="center">
          <v-col cols="12" md="6">
            <p>ประเภทรถ</p>
            <v-select density="compact" placeholder="เลือกประเภทรถ" variant="outlined" />
          </v-col>
          <v-col cols="12" md="6">
            <p>วัน</p>
            <v-select density="compact" placeholder="เลือกวันที่" variant="outlined" />
          </v-col>
          <v-col cols="12" md="6">
            <p>จังหวัดต้นทาง</p>
            <v-select density="compact" placeholder="เลือกจังหวัดต้นทาง" variant="outlined" />
          </v-col>
          <v-col cols="12" md="6">
            <p>จังหัวดปลายทาง</p>
            <v-select density="compact" placeholder="เลือกจังหัวดปลายทาง" variant="outlined" />
          </v-col>
          <v-col cols="12" md="6">
            <p>อำเภอต้นทาง</p>
            <v-select density="compact" placeholder="อำเภอต้นทาง" variant="outlined" />
          </v-col>
          <v-col cols="12" md="6">
            <p>อำเภอปลายทาง</p>
            <v-select density="compact" placeholder="อำเภอต้นทาง" variant="outlined" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-4" flat>
      <v-card-title class="ma-2">
        พบ 2 รายการ
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="pa-2">
          <v-col
            v-for="(item, index) in 4"
            :key="index"
            cols="12"
            md="6"
          >
            <v-card class="pa-8 rounded-lg" elevation="2">
              <v-row align="center">
                <!-- ต้นทาง -->
                <v-col cols="12" sm="4">
                  <div class="text-center mb-4">
                    <strong>ต้นทาง</strong>
                    <p>อุบลราชธานี</p>
                    <p>อำเภอ</p>
                  </div>
                  <div class="text-center">
                    <strong>วันที่และเวลา</strong>
                    <p>13:00 - 18:00 น.</p>
                  </div>
                </v-col>

                <!-- ลูกศร -->
                <v-col class="text-center" cols="12" sm="1">
                  <v-icon color="orange" large>mdi-arrow-right</v-icon>
                </v-col>

                <!-- ปลายทาง -->
                <v-col cols="12" sm="4">
                  <div class="text-center mb-4">
                    <strong>ปลายทาง</strong>
                    <p>นครศรีธรรมราช</p>
                    <p>อำเภอ</p>
                  </div>

                  <div class="text-center ">
                    <strong>จำนวนรถ</strong>
                    <p>1 รถ</p>
                  </div>
                </v-col>

                <!-- ราคา -->
                <v-col class="text-right pa-2" cols="12" sm="3" style="color: #005eb8;">
                  <h2 class="mb-6">3,000 บาท</h2>
                  <v-btn color="primary" size="large" text="สนใจใช้งาน" />
                </v-col>
                <v-col class="text-right" cols="12" sm="4" />
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
