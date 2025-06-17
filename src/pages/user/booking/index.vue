```vue
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
                <v-img
                  contain
                  max-height="200"
                  max-width="100%"
                  src="@/assets/img/Box.svg"
                />
              </v-card-text>
            </v-card>
            <v-card-text class="mt-2 mb-4">
              <v-btn
                block
                class="text-white"
                :color="
                  selectedOption === 'รายชิ้น' ? 'primary' : 'grey lighten-1'
                "
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
                <v-img
                  contain
                  max-height="200"
                  max-width="100%"
                  src="@/assets/img/Truck.svg"
                />
              </v-card-text>
            </v-card>
            <v-card-text class="mt-2 mb-4">
              <v-btn
                block
                class="text-white"
                :color="
                  selectedOption === 'เหมาคัน' ? 'primary' : 'grey lighten-1'
                "
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
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="ma-4">
            <v-col cols="12" md="6">
              <p>ประเภทสินค้า <span class="text-red">*</span></p>
              <v-select
                v-model="form.productType"
                :items="productTypes"
                placeholder="เลือกประเภทสินค้า"
                required
                rounded="lg"
                :rules="[v => !!v || 'กรุณาเลือกประเภทสินค้า']"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>สินค้า <span class="text-red">*</span></p>
              <v-text-field
                v-model="form.item"
                placeholder="สินค้า"
                required
                rounded="lg"
                :rules="[v => !!v || 'กรุณากรอกสินค้า']"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <p>บรรจุภัณฑ์ <span class="text-red">*</span></p>
              <v-text-field
                v-model="form.packaging"
                placeholder="บรรจุภัณฑ์"
                required
                rounded="lg"
                :rules="[v => !!v || 'กรุณากรอกบรรจุภัณฑ์']"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>น้ำหนักสินค้าทั้งหมด <span class="text-red">*</span></p>
              <v-text-field
                v-model="form.weight"
                placeholder="น้ำหนักสินค้าทั้งหมด"
                required
                rounded="lg"
                :rules="[v => !!v || 'กรุณากรอกน้ำหนักสินค้า']"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>
                มูลค่าสินค้าทั้งหมด(บาท) <span class="text-grey">ไม่บังคับ</span>
              </p>
              <v-text-field
                v-model="form.value"
                hide-details
                placeholder="มูลค่าทั้งหมด"
                rounded="lg"
                variant="outlined"
              />
              <div class="text-grey-darken-1">
                <p class="mt-2">
                  ⚠️ เงื่อนไขการรับสินค้าและพัสดุประกันสินค้าตามมาตรฐาน
                </p>
                <p>
                  กรณีไม่แสดงมูลค่า: คุ้มครองตามความเสียหายจริง แต่ไม่เกิน 500
                  บาทต่อชิ้น
                </p>
                <p>กรณีแสดงมูลค่า: คุ้มครองตามมูลค่าที่แสดง</p>
                <p>(สูงสุดไม่เกินวงเงินประกันมาตรฐานระบบ แล้วแต่ประเภทรถ)</p>
              </div>
            </v-col>
            <v-col cols="12">
              <p>รายละเอียดเพิ่มเติม <span class="text-red">*</span></p>
              <v-textarea
                v-model="form.details"
                auto-grow
                placeholder="รายละเอียดเพิ่มเติม"
                required
                rounded="lg"
                rows="4"
                :rules="[v => !!v || 'กรุณากรอกรายละเอียดเพิ่มเติม']"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <v-btn
                block
                color="primary"
                :disabled="!isFormComplete"
                size="x-large"
                text="ยืนยันการจอง"
                @click="submit"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'BookingType',
    data () {
      return {
        selectedOption: 'รายชิ้น', // Default booking type
        valid: true,
        form: {
          productType: 'เครื่องซักผ้า/อุกรณ์ไฟฟ้า',
          item: '',
          packaging: '',
          weight: '',
          value: '',
          details: '',
        },
        productTypes: [
          'เครื่องซักผ้า/อุกรณ์ไฟฟ้า',
          'ยานยนต์และส่วนประกอบ',
          'พลาสติก/ผลิตภัณฑ์/ยาง',
          'เหล็ก/อลูมิเนียม/ทองแดง',
          'สินค้าอาหารและเครื่องดื่ม',
          'ธัญพืช/เมล็ดพืช/วัตถุดิบอาหารสัตว์/ปุ๋ย',
          'ผลไม้สด/ผัก/ของสด',
          'ผลิตภัณฑ์ยา/เคมีภัณฑ์',
          'เครื่องจักรกลและส่วนประกอบ',
          'ย้ายบ้าน/ขนย้ายของ',
        ],
      };
    },
    computed: {
      isFormComplete () {
        return (
          !!this.form.productType &&
          !!this.form.item &&
          !!this.form.packaging &&
          !!this.form.weight
        );
      },
    },
    methods: {
      selectOption (option) {
        this.selectedOption = option;
      },
      async submit () {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.$router.push('/user/booking/ltl');
        }
      },
    },
  };
</script>

<style scoped>
.border {
  border-radius: 15px;
}
</style>
```
