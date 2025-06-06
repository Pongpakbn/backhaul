<template>
  <v-container class="d-flex justify-center">
    <v-card class="pa-4" flat width="800">
      <v-card-text>
        <h1 class="text-center mb-4">แจ้งปัญหา</h1>
        <v-form @submit.prevent="submitForm">
          <h3 class="mb-4">ชื่อ - นามสกุล</h3>
          <v-text-field
            v-model="fullName"
            placeholder="กรอกชื่อ - นามสกุล"
            required
            variant="outlined"
          />

          <h3 class="mb-4">อีเมล์/เบอร์โทรศัพท์</h3>
          <v-text-field
            v-model="contact"
            placeholder="กรอกอีเมล์หรือเบอร์โทรศัพท์"
            required
            variant="outlined"
          />

          <h3 class="mb-4">ปัญหาที่พบเจอ</h3>
          <v-select
            v-model="problem"
            :items="problemOptions"
            placeholder="เลือกปัญหาที่พบเจอ"
            required
            variant="outlined"
          />

          <h3 class="mb-4">รายละเอียด</h3>
          <v-textarea
            v-model="details"
            auto-grow
            placeholder="อธิบายรายละเอียดปัญหา"
            rows="3"
            variant="outlined"
          />

          <v-file-input
            v-model="file"
            class="mt-4"
            hide-details
            label="อัปโหลดไฟล์แนบ"
            prepend-icon=""
            prepend-inner-icon="mdi-paperclip"
            show-size
            variant="outlined"
          />

          <!-- Submit Button -->
          <v-btn
            block
            class="mt-8"
            color="primary"
            size="large"
            type="submit"
          >
            ส่งแบบฟอร์ม
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        fullName: '',
        contact: '',
        problem: null,
        problemOptions: [
          'ข้อมูลบัญชีไม่อัปเดตหรือแสดงผิด',
          'จ่ายเงินแล้วแต่ระบบไม่ยืนยัน',
          'หน้าเว็บโหลดช้า/ค้าง',
          'อื่นๆ',
        ],
        details: '',
        file: null,
      };
    },
    methods: {
      submitForm () {
        console.log('Form submitted:', {
          fullName: this.fullName,
          contact: this.contact,
          problem: this.problem,
          details: this.details,
          file: this.file,
        });

      // ส่งข้อมูลต่อไปยัง backend ได้ตรงนี้
      },
    },
  };
</script>
