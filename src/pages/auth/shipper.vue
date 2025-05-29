<template>
  <v-container class="d-flex justify-center align-center">
    <v-card flat width="1200">
      <v-card-title class="text-center text-h5">
        <v-icon class="mr-2">mdi-truck</v-icon> Smart Backhaul
      </v-card-title>
      <v-card-text>
        <!-- <p class="text-center text-h6">เลือกประเภทผู้ใช้</p> -->
        <v-row class="text-center">
          <v-col class="align-center justify-center" cols="12" md="6">
            <v-card class="text-center mt-16 " flat>
              <v-img src="@/assets/img/Checking boxes-amico.png" />
              <p class="pa-2">คุณเป็นเจ้าของสินค้า</p>
              <h1>สมัครเพื่อจองรถ</h1>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="ma-4" variant="text">
              <v-card-text class="ma-4">
                <div class="text-start">
                  <h2>สมัครสมาชิก</h2>
                  <p>เจ้าของสินค้า เพื่อจองใช้รถขนส่ง</p>
                </div>
                <v-divider class="mt-2 mb-4" />
                <div>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        density="comfortable"
                        placeholder="ชื่อ"
                        prepend-inner-icon="mdi mdi-card-account-details"
                        rounded="lg"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        density="comfortable"
                        placeholder="นามสกุล"
                        rounded="lg"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        density="comfortable"
                        placeholder="ชื่อผู้ใช้"
                        prepend-inner-icon="mdi-account"
                        rounded="lg"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        density="comfortable"
                        placeholder="รหัสผ่าน"
                        prepend-inner-icon="mdi mdi-key-variant"
                        rounded="lg"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        density="comfortable"
                        placeholder="ยืนยันรหัสผ่าน"
                        prepend-inner-icon="mdi mdi-key-variant"
                        rounded="lg"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        density="comfortable"
                        placeholder="อีเมล"
                        prepend-inner-icon="mdi mdi-email"
                        rounded="lg"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        density="comfortable"
                        placeholder="เบอร์โทรศัพท์"
                        prepend-inner-icon="mdi mdi-phone"
                        rounded="lg"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col>
                      <v-btn
                        block
                        color="primary"
                        rounded="lg"
                        size="x-large"
                        text="ลงทะเบียน"
                      />
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
