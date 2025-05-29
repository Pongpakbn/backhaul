<template>
  <v-container>
    <h2 class="text-center mb-4"> ติดต่อเรา</h2>
    <v-card class="rounded-md" flat>
      <v-card-text>
        <v-row align="center" class="text-center mb-4" justify="center">
          <v-col
            class="d-flex flex-column align-center justify-center pa-4"
            cols="12"
            md="4"
          >
            <v-icon color="primary" size="60">mdi-face-agent</v-icon>
            <div>
              <strong>Call Center</strong><br>
              (+66) 98-765-3341
            </div>
          </v-col>

          <v-col
            class="d-flex flex-column align-center justify-center pa-4"
            cols="12"
            md="4"
          >
            <v-img height="60" :src="lineLogo" width="60" />
            <div>
              <strong>LINE</strong><br>
              (@yourlineid)
            </div>
          </v-col>

          <v-col
            class="d-flex flex-column align-center justify-center pa-4"
            cols="12"
            md="4"
          >
            <v-icon color="#1877f2" size="60">mdi-facebook</v-icon>
            <div>
              <strong>Facebook</strong><br>
              fb.com/yourpage
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <h2 class="text-center mb-4 mt-4">การสนับสนุน</h2>
    <v-card class="pa-8 rounded-md" flat>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p>ชื่อ - นามสกุล</p>
            <v-text-field density="comfortable" placeholder="ชื่อ - นามสกุล" variant="outlined" />
          </v-col>

          <v-col cols="12" md="6">
            <p>อีเมล์</p>
            <v-text-field density="comfortable" placeholder="อีเมล์" variant="outlined" />
          </v-col>

          <v-col cols="12" md="6">
            <p>เบอร์โทรศัพท์</p>
            <v-text-field density="comfortable" placeholder="เบอร์โทรศัพท์" variant="outlined" />
          </v-col>

          <v-col cols="12">
            <p>ข้อความ</p>
            <v-textarea
              auto-grow
              density="comfortable"
              placeholder="ข้อความ"
              rows="3"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-file-upload
              density="comfortable"
              icon="mdi mdi-camera"
              rounded="lg"
              title="กดเพื่อเลือกรูปภาพ(ขนาดไม่เกิน 20MB)"
              variant="comfortable"
            />
          </v-col>
          <v-col cols="12">
            <div class="text-center">
              <v-btn color="primary" rounded="lg" size="x-large" text="ส่งข้อมูล" />
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup>
  import lineLogo from '@/assets/img/line.png'
</script>
