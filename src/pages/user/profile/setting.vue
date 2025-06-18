```vue
<template>
  <v-container>
    <v-card class="mb-2 pa-0" flat>
      <v-card-title class="pl-1 d-flex justify-space-between">
        <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" @click="$router.push('/user/profile')" />
      </v-card-title>
    </v-card>

    <v-card flat>
      <v-card-title>
        <p>แก้ไขข้อมูลส่วนตัว</p>
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-center flex-column align-center">
          <v-avatar size="120">
            <img alt="Profile Picture" :src="profilePicture || 'https://cdn.vuetifyjs.com/images/john.jpg'">
          </v-avatar>
          <v-btn
            append-icon="mdi-square-edit-outline"
            class="mt-2 text-white rounded-md"
            color="#f2a900"
            flat
            text="แก้ไขรูป"
            @click="$refs.fileInput.click()"
          />
          <input
            ref="fileInput"
            accept="image/jpeg,image/png"
            style="display: none"
            type="file"
            @change="uploadProfilePicture"
          >
        </div>
        <v-row align="center" class="ma-6" justify="center">
          <v-col cols="12" sm="6">
            <h3>ชื่อ</h3>
            <v-text-field
              v-model="firstName"
              density="comfortable"
              placeholder="ชื่อ"
              rounded="md"
              :rules="[v => !!v || 'กรุณากรอกชื่อ']"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <h3>นามสกุล</h3>
            <v-text-field
              v-model="lastName"
              density="comfortable"
              placeholder="นามสกุล"
              rounded="md"
              :rules="[v => !!v || 'กรุณากรอกนามสกุล']"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <h3>อีเมล</h3>
            <v-text-field
              v-model="email"
              density="comfortable"
              placeholder="อีเมล"
              rounded="md"
              :rules="[v => !!v || 'กรุณากรอกอีเมล', v => /.+@.+\..+/.test(v) || 'อีเมลไม่ถูกต้อง']"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <h3>เบอร์โทรศัพท์</h3>
            <v-text-field
              v-model="phone"
              density="comfortable"
              placeholder="เบอร์โทรศัพท์"
              rounded="md"
              :rules="[v => !!v || 'กรุณากรอกเบอร์โทรศัพท์', v => /^\d{10}$/.test(v) || 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก']"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <div class="text-end">
              <v-btn color="primary" size="large" text="บันทึกข้อมูล" @click="saveProfile" />
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-2" flat>
      <v-card-title>
        <p>จัดการรหัสผ่าน</p>
      </v-card-title>
      <v-card-text>
        <v-row align="center" class="ma-6" justify="center">
          <v-col cols="12" sm="4">
            <h3>รหัสผ่านเดิม</h3>
            <v-text-field
              v-model="oldPassword"
              density="comfortable"
              placeholder="รหัสผ่านเดิม"
              rounded="md"
              :rules="[v => !!v || 'กรุณากรอกรหัสผ่านเดิม']"
              type="password"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <h3>รหัสผ่านใหม่</h3>
            <v-text-field
              v-model="newPassword"
              density="comfortable"
              placeholder="รหัสผ่านใหม่"
              rounded="md"
              :rules="[v => !!v || 'กรุณากรอกรหัสผ่านใหม่', v => v.length >= 8 || 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร']"
              type="password"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <h3>ยืนยันรหัสผ่านใหม่</h3>
            <v-text-field
              v-model="confirmPassword"
              density="comfortable"
              placeholder="ยืนยันรหัสผ่านใหม่"
              rounded="md"
              :rules="[v => !!v || 'กรุณายืนยันรหัสผ่านใหม่', v => v === newPassword || 'รหัสผ่านไม่ตรงกัน']"
              type="password"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <div class="text-end">
              <v-btn color="primary" size="large" text="บันทึกข้อมูล" @click="savePassword" />
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import Swal from 'sweetalert2';

  export default {
    data () {
      return {
        profilePicture: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      };
    },
    methods: {
      uploadProfilePicture (event) {
        const file = event.target.files[0];
        if (!file) return;

        // ตรวจสอบว่าเป็นไฟล์ภาพ
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'กรุณาอัปโหลดไฟล์ภาพ (.jpg, .jpeg, .png)',
          });
          return;
        }

        // ตรวจสอบขนาดไฟล์ (ไม่เกิน 2MB)
        if (file.size > 2 * 1024 * 1024) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'ไฟล์ภาพต้องมีขนาดไม่เกิน 2MB',
          });
          return;
        }

        // อ่านไฟล์และแสดงตัวอย่าง
        const reader = new FileReader();
        reader.onload = e => {
          this.profilePicture = e.target.result;
          Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'อัปโหลดรูปโปรไฟล์เรียบร้อยแล้ว',
          });
        };
        reader.readAsDataURL(file);

        // รีเซ็ต input file
        event.target.value = '';
      },
      saveProfile () {
        // ตรวจสอบข้อมูลส่วนตัว
        if (!this.firstName || !this.lastName) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'กรุณากรอกชื่อและนามสกุล',
          });
          return;
        }
        if (!this.email || !/.+@.+\..+/.test(this.email)) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'กรุณากรอกอีเมลที่ถูกต้อง',
          });
          return;
        }
        if (!this.phone || !/^\d{10}$/.test(this.phone)) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก',
          });
          return;
        }

        // จำลองการบันทึกข้อมูล (ในทางปฏิบัติจะต้องเรียก API)
        console.log('Saving profile:', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          profilePicture: this.profilePicture,
        });

        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว',
        });
      },
      savePassword () {
        // ตรวจสอบรหัสผ่าน
        if (!this.oldPassword) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'กรุณากรอกรหัสผ่านเดิม',
          });
          return;
        }
        if (!this.newPassword || this.newPassword.length < 8) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร',
          });
          return;
        }
        if (this.newPassword !== this.confirmPassword) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'รหัสผ่านใหม่และการยืนยันไม่ตรงกัน',
          });
          return;
        }

        // จำลองการบันทึกการเปลี่ยนรหัสผ่าน (ในทางปฏิบัติจะต้องเรียก API)
        console.log('Changing password:', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        });

        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว',
        });

        // รีเซ็ตรหัสผ่าน
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
    },
  };
</script>

<style scoped>
.v-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
```
