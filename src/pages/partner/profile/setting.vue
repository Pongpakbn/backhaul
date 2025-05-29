<template>
  <v-container>
    <v-card class="mb-2 pa-0" flat>
      <v-card-title class="ma-2 d-flex justify-space-between">
        <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" />
      </v-card-title>
      <v-divider />
    </v-card>

    <v-card>
      <v-card-title>
        <p>แก้ไขข้อมูลส่วนตัว</p>
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-center flex-column align-center">
          <v-avatar size="120">
            <img alt="Profile Picture" src="https://cdn.vuetifyjs.com/images/john.jpg">
          </v-avatar>
          <v-btn append-icon="mdi-square-edit-outline" class="mt-2 text-white rounded-md" color="#f2a900" text="แก้ไขรูป" />
        </div>
        <v-row align="center" class="ma-6" justify="center">
          <v-col cols="12" sm="6">
            <h3>ชื่อ</h3>
            <v-text-field density="comfortable" placeholder="ชื่อ" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12" sm="6">
            <h3>นามสกุล</h3>
            <v-text-field density="comfortable" placeholder="นามสกุล" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12" sm="6">
            <h3>อีเมล</h3>
            <v-text-field density="comfortable" placeholder="อีเมล" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12" sm="6">
            <h3>เบอร์โทรศัพท์</h3>
            <v-text-field density="comfortable" placeholder="เบอร์โทรศัพท์" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12">
            <div class="text-end">
              <v-btn color="primary" size="large" text="บันทึกข้อมูล" />
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-2" flat>
      <v-card-title>
        <p>แก้ไขข้อมูลส่วนตัว</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row align="center" class="ma-6" justify="center">
          <v-col cols="12" sm="4">
            <h3>รหัสผ่านเดิม</h3>
            <v-text-field density="comfortable" placeholder="รหัสผ่านเดิม" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12" sm="4">
            <h3>รหัสผ่านใหม่</h3>
            <v-text-field density="comfortable" placeholder="รหัสผ่านใหม่" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12" sm="4">
            <h3>ยืนยันรหัสผ่านใหม่</h3>
            <v-text-field density="comfortable" placeholder="ยืนยันรหัสผ่านใหม่" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12">
            <div class="text-end">
              <v-btn color="primary" size="large" text="บันทึกข้อมูล" />
            </div>
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
