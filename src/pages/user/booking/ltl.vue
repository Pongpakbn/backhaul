<template>
  <v-container>
    <v-card class="mb-4 d-flex align-center justify-space-between" flat>
      <div class="d-flex align-center ma-4">
        <v-btn prepend-icon="mdi-chevron-left" variant="text">ย้อนกลับ</v-btn>
      </div>
      <v-chip class="me-4" color="secondary" label variant="outlined">
        รายชิ้น
      </v-chip>
    </v-card>
    <v-card flat>
      <v-card-title>
        <p class="ma-2" style="font-size: 24px">ขนาดสินค้า</p>
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
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>

</script>
<!-- prepend-icon="mdi mdi-chevron-left"
class="d-flex align-center justify-space-between"
rounded="lg"
title="ย้อนกลับ" -->
