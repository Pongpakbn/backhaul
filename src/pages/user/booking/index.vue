<template>
  <v-container>
    <v-card flat>
      <v-card-title class="ma-2">
        <p style="font-size: 24px">ประเภทการจอง</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="ma-0 pa-0" dense>
          <!-- รายชิ้น -->
          <v-col cols="12" md="6">
            <v-card class="border mx-2 my-4" flat>
              <v-card-text class="pa-6 d-flex justify-center">
                <v-img contain max-height="200" max-width="100%" src="@/assets/img/Box.svg" />
              </v-card-text>
            </v-card>
            <v-card-text class="mt-2 mx-2 mb-4">
              <v-btn
                block
                class="text-white"
                :color="selectedOption === 'รายชิ้น' ? 'primary' : 'grey lighten-1'"
                rounded="lg"
                size="large"
                style="font-size: 28px; height: 56px"
                @click="selectOption('รายชิ้น')"
              >
                รายชิ้น
              </v-btn>
            </v-card-text>
          </v-col>

          <!-- เหมาคัน -->
          <v-col cols="12" md="6">
            <v-card class="border mx-2 my-4" flat>
              <v-card-text class="pa-6 d-flex justify-center">
                <v-img contain max-height="200" max-width="100%" src="@/assets/img/Truck.svg" />
              </v-card-text>
            </v-card>
            <v-card-text class="mt-2 mx-2 mb-4">
              <v-btn
                block
                class="text-white"
                :color="selectedOption === 'เหมาคัน' ? 'primary' : 'grey lighten-1'"
                rounded="lg"
                size="large"
                style="font-size: 28px; height: 56px"
                @click="selectOption('เหมาคัน')"
              >
                เหมาคัน
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
        <div class="text-center mt-4 text-subtitle-1">
          คุณเลือกรูปแบบการจอง: <strong>{{ selectedOption }}</strong>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mt-4" flat>
      <v-card-title class="ma-2">
        <p style="font-size: 24px">ประเภทสินค้า</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="ma-4">
          <v-col cols="12" md="6">
            <p>ประเภทสินค้า</p>
            <v-text-field
              placeholder="ประเภทสินค้า"
              required
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>สินค้า</p>
            <v-text-field
              placeholder="สินค้า"
              required
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <p>บรรจุภัฑณ์</p>
            <v-text-field
              placeholder="บรรจุภัฑณ์"
              required
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>น้ำหนักสินค้าทั้งหมด</p>
            <v-text-field
              placeholder="น้ำหนักสินค้าทั้งหมด"
              required
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>มูลค่าสินค้าทั้งหมด(บาท)</p>
            <v-text-field
              placeholder="มูลค่าทั้งหมด"
              required
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <p>รายละเอียดเพิ่มเติม</p>
            <v-textarea
              placeholder="ประเภทสินค้า"
              required
              rounded="lg"
              rows="4"
              variant="outlined"
            />
          </v-col>
          <v-col>
            <v-btn block color="primary" size="x-large" text="ยินยันการเลือก" />
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
        selectedOption: 'รายชิ้น', // ✅ ค่า default
      };
    },
    methods: {
      selectOption (option) {
        this.selectedOption = option;
      },
    },
  };
</script>
<style>
.border {
  border-radius: 15px;
}

</style>
