<template>
  <v-container>
    <v-row class="align-center mb-4">
      <!-- ฝั่งซ้ายทั้งหมด -->
      <v-col class="d-flex align-center" cols="12" md="6">
        <div class="me-4">
          <h2 class="mb-1">รถในระบบ</h2>
          <p class="opacity-50 mb-0">4 รายการ</p>
        </div>

        <v-text-field
          v-model="search"
          density="compact"
          hide-details
          placeholder="ค้นหาจากชื่อ"
          prepend-inner-icon="mdi-magnify"
          rounded="md"
          single-line
          variant="solo"
        />
      </v-col>

      <!-- อีกฝั่งเปล่า (ลบทิ้งได้ถ้าไม่ใช้) -->
      <v-col cols="12" md="6">
        <div class="d-flex justify-end">
          <v-btn color="primary" prepend-icon="mdi-account-plus" rounded="md" text="เพิ่มคนขับรถ" />
        </div>
      </v-col>
    </v-row>
    <v-card class="rounded-md" flat>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
        :items-per-page="5"
      >
        <template #[`item.action`]="{ item }">
          <v-btn
            class="me-2"
            color="primary"
            prepend-icon="mdi-tag-outline"
            text="แก้ไข"
            @click="$router.push(`/partner/booking/${item.id}`)"
          />
          <v-btn
            class="text-white"
            color="#f2a900"
            prepend-icon="mdi-delete"
            text="ลบ"
            @click="$router.push(`/partner/booking/${item.id}`)"
          />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog" max-width="1000">
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        เพิ่มรถ
        <v-btn icon variant="text" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text>
        <!-- Timeline Steps -->
        <v-timeline
          align="center"
          class="mb-8"
          density="comfortable"
          direction="horizontal"
          truncate-line="both"
        >
          <v-timeline-item
            v-for="(step, index) in steps"
            :key="index"
            :dot-color="getStepColor(index).color"
            fill-dot
          >
            <template #icon>
              <v-avatar :color="getStepColor(index).color" size="50">
                <v-icon v-if="getStepColor(index).color === 'green'" class="text-white">mdi-check</v-icon>
                <span v-else class="text-white text-h6">{{ index + 1 }}</span>
              </v-avatar>
            </template>
            <strong :style="{ color: getStepColor(index).textColor }">{{ step }}</strong>
          </v-timeline-item>
        </v-timeline>

        <!-- Form Content -->
        <div v-if="currentStep === 0">
          <v-row dense>
            <v-col cols="12" md="6">
              <p>ประเภทรถ</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ประเภทรถ"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>ป้ายทะเบียน</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ป้ายทะเบียน"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>ยี่ห้อ</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ยี่ห้อ"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>รุ่น</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="รุ่น"
                rounded="lg"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="4">
              <p>ปีที่ผลิต</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ปีที่ผลิต"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <p>ขนาดเครื่องยนต์</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ขนาดเครื่องยนต์"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>ขนาดบรรทุก (หน่วย CBM)</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ขนาดบรรทุก"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>วันหมดอายุภาษีรถ</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="วว/ดด/ปปปป"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>วันหมดอายุพรบ</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="วว/ดด/ปปปป"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>เรทราคา</p>
              <v-select
                density="comfortable"
                hide-details
                :items="['เรทราคา 1', 'เรทราคา 2']"
                placeholder="เรทราคา"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </div>

        <div v-else-if="currentStep === 1">
          <v-row dense>
            <v-col cols="12" md="6">
              <p>ชื่อเจ้าของรถ</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ชื่อเจ้าของรถ"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>เบอร์โทรศัพท์</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="เบอร์โทรศัพท์"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <p>ที่อยู่</p>
              <v-textarea
                auto-grow
                density="comfortable"
                hide-details
                placeholder="ที่อยู่"
                rounded="lg"
                rows="3"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <p>แนบเอกสาร</p>
              <v-file-upload
                density="comfortable"
                icon="mdi mdi-camera"
                rounded="lg"
                title="กดเพื่อเลือกรูปภาพ(ขนาดไม่เกิน 20MB)"
                variant="comfortable"
              />
            </v-col>
          </v-row>
        </div>

        <div v-else-if="currentStep === 2">
          <v-row dense>
            <v-col cols="12" md="4">
              <p>ประเภทใบขับขี่</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ประเภทใบขับขี่"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>เลขใบขับขี่</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="เลขใบขับขี่"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>วันหมดอายุ</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="วันหมดอายุ"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </div>

        <div v-else-if="currentStep === 3">
          <p>ข้อมูลการทำประกันภัยขนส่ง</p>
          <v-divider />
          <v-row class="mt-1 mb-1">
            <v-col cols="12" md="6">
              <p>ชื่อบริษัทประกัน</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ชื่อบริษัทประกัน"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>หมายเลขกรมธรรม์</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="หมายเลขกรมธรรม์"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>วันเริ่มต้นและสิ้นสุดการประวันภัย</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="วันเริ่มต้นและสิ้นสุดการประวันภัย"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>ความคุ้มครอง</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ความคุ้มครอง"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <p>เงื่อนไขการชดเชย</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="เงื่อนไขการชดเชย"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <p>ข้อมูลการประสินค้าขณะขนส่ง</p>
          <v-divider />
          <v-row class="mt-1">
            <v-col cols="12" md="6">
              <p>หมายเลขกรมธรรม์สินค้า</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="หมายเลขกรมธรรม์สินค้า"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>ความคุ้มครองประกันสินค้า</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ความคุ้มครองประกันสินค้า"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <p>ระยะเวลาในการคุ้มครอง</p>
              <v-text-field
                density="comfortable"
                hide-details
                placeholder="ระยะเวลาในการคุ้มครอง"
                rounded="lg"
                variant="outlined"
              />
            </v-col>
          </v-row>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions class="justify-space-between">
        <v-btn variant="text" @click="dialog = false">
          ปิดหน้านี้
        </v-btn>

        <div>
          <v-btn
            v-if="currentStep > 0"
            class="mr-2"
            color="grey"
            variant="tonal"
            @click="prevStep"
          >
            ย้อนกลับ
          </v-btn>

          <v-btn
            color="primary"
            size="large"
            @click="nextStep"
          >
            {{ currentStep === steps.length - 1 ? 'บันทึก' : 'ถัดไป' }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    data () {
      return {
        currentStep: 0,
        search:null,
        steps: ['ข้อมูลรถ', 'ข้อมูลเจ้าของรถ', 'ข้อมูลทางกฎหมาย', 'ข้อมูลการทำประกัน'],
        dialog: true,
        headers: [
          { title: '#', value: 'index', sortable: false },
          { title: 'เลขที่ใบเสร็จ', value: 'receiptNumber' },
          { title: 'จำนวน', value: 'quantity' },
          { title: 'สถานะ', value: 'status' },
          { title: 'วันที่', value: 'date' },
          { title: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        ],
        items: [
          {
            index: 1,
            receiptNumber: 'ใบเสร็จรอ',
            quantity: '4 ชิ้น',
            status: 'รอจัดส่ง',
            date: '22/02/2025',
          },
          {
            index: 1,
            receiptNumber: 'ใบเสร็จรอ',
            quantity: '4 ชิ้น',
            status: 'รอจัดส่ง',
            date: '22/02/2025',
          },
          {
            index: 1,
            receiptNumber: 'ใบเสร็จรอ',
            quantity: '4 ชิ้น',
            status: 'รอจัดส่ง',
            date: '22/02/2025',
          },
          {
            index: 1,
            receiptNumber: 'ใบเสร็จรอ',
            quantity: '4 ชิ้น',
            status: 'รอจัดส่ง',
            date: '22/02/2025',
          },
        ],
      };
    },
    methods: {
      nextStep () {
        if (this.currentStep < this.steps.length - 1) {
          this.currentStep++
        } else {
          this.dialog = false
        // TODO: Save data
        }
      },
      prevStep () {
        if (this.currentStep > 0) {
          this.currentStep--
        }
      },
      getStepColor (index) {
        if (index < this.currentStep) {
          return { color: 'green', textColor: 'green' } // Passed step
        }
        if (index === this.currentStep) {
          return { color: 'primary', textColor: '#005eb8' } // Current step with different text color
        }
        return { color: 'grey', textColor: 'grey' } // Upcoming step
      },
    },
  };
</script>
