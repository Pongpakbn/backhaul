<template>
  <v-container>
    <v-card class="mb-4 d-flex align-center justify-space-between" flat>
      <div class="d-flex align-center ma-4 ">
        <v-btn class="pl-0" prepend-icon="mdi-chevron-left" variant="text">ย้อนกลับ</v-btn>
      </div>
      <v-chip class="me-4" color="secondary" label variant="outlined">
        รายชิ้น
      </v-chip>
    </v-card>

    <v-card flat>
      <v-card-title>สินค้า</v-card-title>
      <v-divider />
      <v-card-text>
        <v-card
          v-for="(item, index) in 2"
          :key="index"
          border="thin"
          class="mb-4"
          variant="outlined"
        >
          <v-card-text>
            <h3>{{ รายการ + (index + 1) }}</h3>
            <v-row class="d-flex align-center">
              <v-col cols="12" md="3">
                <v-card class="pa-2" flat>
                  <v-avatar size="150">
                    <v-img src="@/assets/img/Checking boxes-amico.png" />
                  </v-avatar>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-row>
                  <v-col class="text-grey" cols="6"><p>ความกว้าง</p></v-col>
                  <v-col><p>40 cm.</p></v-col>
                  <v-col class="text-grey" cols="6"><p>ความสูง</p></v-col>
                  <v-col><p>60 cm.</p></v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="3">
                <v-row>
                  <v-col class="text-grey" cols="6"><p>ความยาว</p></v-col>
                  <v-col><p>20 cm.</p></v-col>
                  <v-col class="text-grey" cols="6"><p>น้ำหนัก</p></v-col>
                  <v-col><p>3 kg.</p></v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="3">
                <v-row>
                  <v-col><v-btn color="primary" variant="text">แก้ไข</v-btn></v-col>
                  <v-col><v-btn color="secondary" variant="text">ลบ</v-btn></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-btn
          block
          border="thin"
          class="mt-4"
          prepend-icon="mdi-plus"
          size="x-large"
          text="เพิ่มสินค้า"
          variant="outlined"
          @click="dialog = true"
        />
        <v-btn
          block
          class="mt-4"
          color="primary"
          size="x-large"
          text="ยืนยัน"
          @click="dialog_sum = true"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          ขนาดสินค้า
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col class="d-flex align-center justify-center" cols="12" md="6">
              <v-img height="250" src="@/assets/img/Product.png" />
            </v-col>
            <v-col cols="12" md="6">
              <h3>ความกว้าง</h3>
              <v-text-field
                density="comfortable"
                placeholder="ความกว้าง"
                prepend-inner-icon="mdi mdi-border-top"
                rounded="lg"
                variant="outlined"
              />
              <h3>ความยาว</h3>
              <v-text-field
                density="comfortable"
                placeholder="ความยาว"
                prepend-inner-icon="mdi mdi-border-left"
                rounded="lg"
                variant="outlined"
              />
              <h3>ความสูง</h3>
              <v-text-field
                density="comfortable"
                placeholder="ความสูง"
                prepend-inner-icon="mdi mdi-border-vertical"
                rounded="lg"
                variant="outlined"
              />
              <h3>น้ำหนัก</h3>
              <v-text-field
                density="comfortable"
                placeholder="น้ำหนัก"
                prepend-inner-icon="mdi mdi-weight"
                rounded="lg"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12">
              <!-- <v-file-input
                show-size
                accept="image/*"
                label="กดเพื่อเลือกรูปภาพ (ไม่เกิน 20MB)"
                prepend-icon="mdi-camera"
                variant="outlined"
              /> -->
              <v-file-upload
                density="comfortable"
                icon="mdi mdi-camera"
                title="กดเพื่อเลือกรูปภาพ(ขนาดไม่เกิน 20MB)"
                variant="comfortable"
              />
            </v-col>

            <v-col cols="12">
              <v-btn
                block
                color="primary"
                rounded="lg"
                size="x-large"
                text="ยืนยัน"
                @click="dialog = false"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_sum" max-width="800px">
      <v-card>
        <v-card-title>
          สรุปรายการ
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-card
            v-for="(item, index) in 2"
            :key="index"
            border="thin"
            class="mb-4"
            variant="outlined"
          >
            <v-card-text>
              <h3>{{ รายการ + (index + 1) }}</h3>
              <v-row class="d-flex align-center">
                <v-col cols="12" md="4">
                  <v-card class="pa-2" flat>
                    <v-avatar size="150">
                      <v-img src="@/assets/img/Checking boxes-amico.png" />
                    </v-avatar>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-row>
                    <v-col class="text-grey" cols="6"><p>ความกว้าง</p></v-col>
                    <v-col><p>40 cm.</p></v-col>
                    <v-col class="text-grey" cols="6"><p>ความสูง</p></v-col>
                    <v-col><p>60 cm.</p></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="4">
                  <v-row>
                    <v-col class="text-grey" cols="6"><p>ความยาว</p></v-col>
                    <v-col><p>20 cm.</p></v-col>
                    <v-col class="text-grey" cols="6"><p>น้ำหนัก</p></v-col>
                    <v-col><p>3 kg.</p></v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        dialog_sum: false,
        รายการ: 'รายการที่ ',
      };
    },
  };
</script>
