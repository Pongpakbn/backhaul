<template>
  <v-container>
    <v-row class="align-center mb-4">
      <!-- ฝั่งซ้ายทั้งหมด -->
      <v-col class="d-flex align-center" cols="12" md="6">
        <div class="me-4">
          <h2 class="mb-1">แผนการเดินรถ</h2>
          <p class="opacity-50 mb-0">1 แผน</p>
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
          <v-btn color="primary" prepend-icon="mdi-map-legend" rounded="md" text="เพิ่มคนขับรถ" />
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
        เพิ่มแผนการเดินรถ
        <v-btn icon variant="text" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <p>เส้นทาง</p>
        <Addaddress />
        <v-row class="mt-2">
          <v-col cols="12" md="6">
            <p>ชื่อคนขับ</p>
            <v-select
              density="comfortable"
              hide-details
              placeholder="เลือกคนขับ"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>รถ</p>
            <v-select
              density="comfortable"
              hide-details
              placeholder="เลือกรถ"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>จุดเริ่มต้น</p>
            <v-text-field
              density="comfortable"
              hide-details
              placeholder="จุดเริ่มต้น"
              rounded="lg"
              variant="outlined"
              @click="starpoint = true"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>จุดสิ้นสุด</p>
            <v-text-field
              density="comfortable"
              hide-details
              placeholder="เลือกรถ"
              rounded="lg"
              variant="outlined"
              @click="starpoint = true"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>วันที่ออกเดินทาง</p>
            <v-date-input
              density="comfortable"
              hide-details
              multiple="range"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>วันที่สิ้นสุดการเดินทาง</p>
            <v-date-input
              density="comfortable"
              hide-details
              multiple="range"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-divider class="mt-3 mb-3" />
        <div class="d-flex justify-end">
          <v-btn color="primary" prepend-icon="mdi-check" size="large" text="ยืนยัน" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- addMap -->
  <v-dialog v-model="starpoint" max-width="800">
    <v-card rounded="lg">
      <v-card-title class="d-flex justify-space-between align-center">
        เลือกจุดเริ่มต้น
        <v-btn icon variant="text" @click="starpoint = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <p>จุดเริ่มต้น</p>
        <v-text-field
          density="comfortable"
          placeholder="ค้นหาจุดเริ่มต้น"
          prepend-inner-icon="mdi-magnify"
          rounded="lg"
          variant="outlined"
        />
        <Addaddress />
        <div class="mt-4 d-flex justify-end">
          <v-btn color="primary" prepend-icon="mdi-check" text="ยืนยัน" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import { VDateInput } from 'vuetify/labs/VDateInput';
  import Addaddress from '@/components/Track.vue';
  export default {
    components:{
      Addaddress,
      VDateInput,
    },
    data () {
      return {
        currentStep: 0,
        starpoint:false,
        search:null,
        steps: ['ข้อมูลรถ', 'ข้อมูลเจ้าของรถ', 'ข้อมูลทางกฎหมาย', 'ข้อมูลการทำประกัน'],
        dialog: true,
        headers: [
          { title: '#', value: 'index', sortable: false },
          { title: 'ชื่อคนขับ', value: 'receiptNumber' },
          { title: 'รถและทะเบียน', value: 'quantity' },
          { title: 'วันเริ่ม/สิ้นสุดแผน', value: 'status' },
          { title: 'พาเลททั้งหมด', value: 'date' },
          { title: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        ],
        items: [
          {
            index: 1,
            receiptNumber: 'เอ',
            quantity: ' รถ 4 ล้อ กง 777',
            status: 'เริ่ม : 12/02/2568 - สิ้นสุด :16/02/2568',
            date: '22/23',
          },
          {
            index: 1,
            receiptNumber: 'บี',
            quantity: ' รถ 4 ล้อ กง 777',
            status: 'เริ่ม : 12/02/2568 - สิ้นสุด :16/02/2568',
            date: '22/22',
          },
          {
            index: 1,
            receiptNumber: 'ซี',
            quantity: ' รถ 4 ล้อ กง 777',
            status: 'เริ่ม : 12/02/2568 - สิ้นสุด :16/02/2568',
            date: '2/24',
          },
          {
            index: 1,
            receiptNumber: 'ดี',
            quantity: ' รถ 4 ล้อ กง 777',
            status: 'เริ่ม : 12/02/2568 - สิ้นสุด :16/02/2568',
            date: '0/12',
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
