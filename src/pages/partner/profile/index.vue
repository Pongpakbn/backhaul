<template>
  <v-container fluid>
    <!-- ส่วนหัว: รูปโปรไฟล์และชื่อ -->
    <v-card class="mb-4 pa-4" flat rounded="lg">
      <v-card-title class="text-h6 font-weight-bold">ข้อมูลส่วนตัว/ธุรกิจ</v-card-title>

      <v-card-text>
        <v-row align="center" no-gutters>
          <v-col class="d-flex justify-center justify-md-start mb-4 mb-md-0" cols="12" md="2">
            <v-avatar size="120">
              <v-img alt="Profile Picture" src="https://cdn.vuetifyjs.com/images/john.jpg" />
            </v-avatar>
          </v-col>

          <v-col class="text-center text-md-start" cols="12" md="7">
            <h2 class="text-h5 mb-1">ชื่อรถ ดี</h2>
            <span class="text-body-2 text-grey">ผู้ใช้</span>
          </v-col>

          <v-col class="d-flex justify-center justify-md-end mt-2 mt-md-0" cols="12" md="3">
            <v-btn
              append-icon="mdi-square-edit-outline"
              class="text-caption text-md-body-2"
              color="primary"
              size="small"
              variant="text"
              @click="$router.push('/user/profile/setting')"
            >
              แก้ไข
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- ข้อมูลการติดต่อ -->
    <v-card class="mb-4 pa-4" flat rounded="lg">
      <v-card-title class="text-h6 font-weight-bold">ข้อมูลของฉัน</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6">
            <p class="text-caption text-grey">ชื่อ</p>
            <p class="text-body-1">พงศ์ภัค</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p class="text-caption text-grey">นามสกุล</p>
            <p class="text-body-1">บุญนาม</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p class="text-caption text-grey">อีเมล</p>
            <p class="text-body-1">pongpak@gmail.com</p>
          </v-col>
          <v-col cols="12" sm="6">
            <p class="text-caption text-grey">โทรศัพท์</p>
            <p class="text-body-1">089-123-4567</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- ข้อมูลบริษัท -->
    <v-card class="pa-4" flat rounded="lg">
      <v-card-title class="text-h6 font-weight-bold d-flex  flex-md-row justify-space-between align-center">
        <div class="d-flex align-center flex-wrap">
          <span>พงศ์ภัค</span>
          <v-chip
            class="ml-3"
            color="red"
            label
            size="small"
            text="ค่าเริ่มต้น"
            variant="outlined"
          />
        </div>
        <v-btn
          append-icon="mdi-square-edit-outline"
          class="text-caption text-md-body-2 mt-2 mt-md-0"
          color="primary"
          size="small"
          variant="text"
          @click="$router.push('/user/profile/address')"
        >
          แก้ไข
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <p class="text-body-1">
              2171 ถ. เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310 ประเทศไทย
            </p>
          </v-col>
          <v-col cols="12">
            <p class="text-body-1">(+66) 099-712-5161</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {};
    },
  };
</script>

<style scoped>
/* Optional: Add custom styles for further responsiveness */
.v-card-title {
  word-break: break-word; /* Prevent text overflow */
}
.v-btn {
  text-transform: none; /* Prevent uppercase text in buttons */
}
</style>
