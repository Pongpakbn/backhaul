<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card class="pa-8" elevation="5" width="500">
      <v-card-text>
        <div d-flex justify-center />
        <v-card-title class="text-center text-h5">
          <v-icon class="mr-2">mdi-truck</v-icon>
          <p>Smart Backhaul</p>
        </v-card-title>

        <v-btn
          block
          class="mb-4"
          rounded="lg"
          size="large"
          text="สมัครสมาชิก"
          variant="outlined"
          @click="nextPage"
        />
        <v-btn
          block
          class="mb-4"
          rounded="lg"
          size="large"
          text="เบอร์โทรศัพท์"
          variant="outlined"
          @click="nextPage"
        />

        <v-divider class="my-4">or</v-divider>

        <v-form ref="form">
          <h4>ชื่อผู้ใช้</h4>
          <v-text-field
            v-model="username"
            placeholder="ชื่อผู้ใช้"
            prepend-inner-icon="mdi-account"
            required
            rounded="lg"
            variant="outlined"
          />
          <h4>รหัสผ่าน</h4>
          <v-text-field
            v-model="password"
            placeholder="รหัสผ่าน"
            prepend-inner-icon="mdi-lock"
            required
            rounded="lg"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
          >
            <template #append-inner>
              <v-icon @click="showPassword = !showPassword">
                {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
              </v-icon>
            </template>
          </v-text-field>
          <div class="d-flex justify-end mb-8">
            <p class="text-green">ลืมรหัสผ่าน ?</p>
          </div>

          <v-btn
            block
            class="text-white"
            color="#005EB8"
            rounded="lg"
            size="x-large"
            @click="login"
          >
            เข้าสู่ระบบ
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import router from '@/router/index';
  import { ref } from 'vue';

  const username = ref('');
  const password = ref('');
  const showPassword = ref(false);

  const login = () => {
    console.log('Logging in with', username.value, password.value);
  };
  const nextPage = () => {
    router.push('/auth/register');
  };
</script>
