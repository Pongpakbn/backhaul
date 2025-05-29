<template>
  <v-container>
    <!-- ส่วนหัว: รูปโปรไฟล์และชื่อ -->
    <v-card class="mb-4 pa-4" flat rounded="lg">
      <v-card-title class="text-h6">ข้อมูลส่วนตัว/ธุรกิจ</v-card-title>

      <v-card-text>
        <v-row align="center">
          <v-col class="d-flex justify-center justify-md-start mb-4 mb-md-0" cols="12" md="2">
            <v-avatar size="120">
              <v-img alt="Profile Picture" src="https://cdn.vuetifyjs.com/images/john.jpg" />
            </v-avatar>
          </v-col>

          <v-col class="text-center text-md-start" cols="12" md="7">
            <h2 class="mb-1">ชื่อรถ ดี</h2>
            <span>ผู้ใช้</span>
          </v-col>

          <v-col class="d-flex justify-center justify-md-end" cols="12" md="3">
            <v-btn
              append-icon="mdi-square-edit-outline"
              color="primary"
              variant="text"
              @click="$router.push('/user/profile/setting')"
            >
              แก้ไขข้อมูลส่วนตัว
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- ข้อมูลการติดต่อ -->
    <v-card class="mb-4 pa-4" flat rounded="lg">
      <v-card-title class="text-h6">ข้อมูลของฉัน</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <h3>ชื่อ</h3>
            <p>พงศ์ภัค</p>
          </v-col>
          <v-col cols="12" sm="6">
            <h3>นามสกุล</h3>
            <p>บุญนาม</p>
          </v-col>
          <v-col cols="12" sm="6">
            <h3>อีเมล</h3>
            <p>pongpak@gmail.com</p>
          </v-col>
          <v-col cols="12" sm="6">
            <h3>โทรศัพท์</h3>
            <p>089-123-4567</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- ข้อมูลบริษัท -->
    <v-card class="pa-4" flat rounded="lg">
      <v-card-title class="text-h6">ที่อยู่ของฉัน</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <h3>ประเทศ</h3>
            <p>
              ไทย
            </p>
          </v-col>
          <v-col cols="12" sm="6">
            <h3>ที่อยู่</h3>
            <p>
              217 ถ. พหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง<br>
              จังหวัดปทุมธานี 10310 ประเทศไทย
            </p>
          </v-col>
          <v-col cols="12" sm="6">
            <h3>รหัสไปรษณีย์</h3>
            <p>10310</p>
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
