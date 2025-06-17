<template>
  <v-container>
    <v-card class="mb-2 pl-0" flat>
      <v-card-title class="ma-2 pl-0 d-flex justify-space-between">
        <v-btn
          prepend-icon="mdi-chevron-left"
          text="ย้อนกลับ"
          variant="text"
          @click="$router.push('/partner/myjob')"
        />
      </v-card-title>
      <v-divider />
    </v-card>
    <v-card flat>
      <v-card-title class="d-flex justify-space-between align-center">
        <p>หมายเลขงาน: {{ job.jobId }}</p>
        <v-chip :color="getChipColor(job.status)" label :text="job.status" />
      </v-card-title>
      <v-divider />
      <v-card class="ma-4" flat>
        <v-row>
          <v-col cols="12" md="5">
            <v-card class="border-thin rounded-md" variant="outlined">
              <v-card-text class="d-flex justify-start align-center">
                <v-avatar class="me-6" size="60">
                  <v-img
                    alt="Profile Picture"
                    src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
                  />
                </v-avatar>
                <div>
                  <p>แกรป ไดรเวอร์</p>
                  <p>{{ job.vehicleType }}</p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-col class="d-flex justify-center align-center fill-height" flat min-height="90">
              <v-btn color="primary" readonly :text="`สถานที่ทั้งหมด ${job.locations.length} จุด`" />
            </v-col>
          </v-col>
          <v-col cols="12" md="3">
            <v-col class="d-flex justify-center align-center fill-height" flat min-height="90">
              <p>ระยะทางทั้งหมด <span style="color: green;">{{ job.distance }}</span></p>
            </v-col>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="ma-4 border-thin" variant="outlined">
        <v-card-text>
          <div class="d-flex flex-column flex-md-row align-md-center justify-space-between">
            <div class="text-center text-md-left mb-4 mb-md-0">
              <h3 class="mb-1"><v-icon>mdi-map-marker</v-icon>เริ่มเดินทาง</h3>
              <p class="opacity-50 mb-0">{{ job.startDate }}</p>
            </div>
            <div class="d-flex justify-center justify-md-end">
              <v-btn
                :aria-label="'เริ่มงาน'"
                color="primary"
                :disabled="job.status !== 'รอเริ่มงาน'"
                text="เริ่มงาน"
                @click="confirmStartJob(0)"
              />
            </div>
          </div>
        </v-card-text>
      </v-card>
      <v-card
        v-for="(point, index) in job.locations"
        :key="index"
        class="ma-4 border-thin"
        variant="outlined"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12">
                  <h3 :style="{ color: point.type === 'pickup' ? '#005eb8' : '#f2a900' }">
                    {{ point.type === 'pickup' ? `จุดรับที่ ${index + 1}` : `จุดส่งที่ ${index - pickupCount + 1}` }}: {{ point.label }}
                  </h3>
                </v-col>
                <v-col cols="12">
                  <p>{{ point.address }}</p>
                </v-col>
                <v-col cols="12">
                  <v-icon class="me-2" size="30">mdi-domain</v-icon>
                  <span>{{ point.detail || 'ไม่มีรายละเอียดเพิ่มเติม' }}</span>
                </v-col>
                <v-col cols="12">
                  <v-icon class="me-2" size="30">mdi-truck</v-icon>
                  <span>{{ point.type === 'pickup' ? 'รับสินค้า' : 'ส่งสินค้า' }}: {{ point.date }}</span>
                </v-col>
                <v-col cols="12">
                  <v-icon class="me-2" size="30">mdi-walk</v-icon>
                  <span>{{ point.note || '-' }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12">
                  <div class="d-flex flex-md-row align-md-center justify-space-between">
                    <div class="text-center text-md-left mb-4 mb-md-0">
                      <p>กำหนดถึงจุดที่ {{ index + 1 }}</p>
                    </div>
                    <div class="d-flex justify-center justify-md-end">
                      <v-btn
                        :aria-label="`ยืนยันถึง${point.type === 'pickup' ? 'จุดรับ' : 'จุดส่ง'}ที่ ${index + 1}`"
                        color="primary"
                        density="compact"
                        text="ถึงจุด"
                        @click="confirmArrive(index)"
                      />
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" :style="{ color: point.type === 'pickup' ? '#005eb8' : '#f2a900' }">
                  <p>ถึงจุดที่ {{ index + 1 }}: {{ point.date }}</p>
                </v-col>
                <v-col cols="12">
                  <div class="d-flex flex-md-row align-md-center justify-space-between">
                    <div class="text-center text-md-left mb-4 mb-md-0">
                      <p>{{ point.type === 'pickup' ? 'รับสินค้า' : 'ส่งสินค้า' }}</p>
                    </div>
                    <div class="d-flex justify-center justify-md-end">
                      <v-btn
                        :aria-label="`ยืนยัน${point.type === 'pickup' ? 'รับ' : 'ส่ง'}สินค้าจุดที่ ${index + 1}`"
                        color="primary"
                        density="compact"
                        :text="point.type === 'pickup' ? 'รับสินค้า' : 'ส่งสินค้า'"
                        @click="confirmPickupDropoff(index)"
                      />
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" :style="{ color: point.type === 'pickup' ? '#005eb8' : '#f2a900' }">
                  <p>{{ point.type === 'pickup' ? 'รับสินค้าเรียบร้อย' : 'ส่งสินค้าเรียบร้อย' }}</p>
                </v-col>
                <v-col
                  v-for="(product, item) in job.products"
                  :key="item"
                  class="text-center"
                  cols="12"
                  lg="4"
                  md="4"
                  sm="6"
                >
                  <v-img
                    :alt="product.name"
                    cover
                    height="100"
                    :src="product.image"
                    width="100"
                  />
                  <p class="mt-2">{{ product.name }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="ma-4 border-thin" variant="outlined">
        <v-card-text>
          <div class="d-flex flex-column flex-md-row align-md-center justify-space-between">
            <div class="text-center text-md-left mb-4 mb-md-0">
              <h3 class="mb-1"><v-icon>mdi-map-marker</v-icon>จบงาน</h3>
              <p class="opacity-50 mb-0">{{ job.endDate || 'ยังไม่จบงาน' }}</p>
            </div>
            <div class="d-flex justify-center justify-md-end">
              <v-btn
                :aria-label="'ยืนยันจบงาน'"
                color="primary"
                :disabled="job.status !== 'กำลังขนส่ง' || !allPointsCompleted"
                text="จบงาน"
                @click="confirmCompleteJob"
              />
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-card>

    <!-- Dialog: Confirm Arrival -->
    <v-dialog v-model="dialog" max-width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          ถึงจุดที่ {{ selectedPointIndex + 1 }}
          <v-btn aria-label="ปิดหน้าต่างยืนยันถึงจุด" icon variant="text" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pl-4">
          <locationMap />
          <div class="mt-4">
            <p>ยืนยันถึงจุดที่ {{ selectedPointIndex + 1 }}</p>
            <v-text-field
              v-model="formattedDate"
              hide-details
              prepend-inner-icon="mdi-calendar-month-outline"
              readonly
              variant="outlined"
            />
          </div>
          <div class="mt-4">
            <v-btn
              aria-label="ยืนยันถึงจุด"
              block
              color="primary"
              rounded="md"
              size="large"
              text="ยืนยัน"
              @click="submitArrival"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog: Confirm Pickup/Dropoff -->
    <v-dialog v-model="dialog_point" max-width="1200">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          {{ selectedPoint.type === 'pickup' ? `รับสินค้าจุดที่ ${selectedPointIndex + 1}` : `ส่งสินค้าจุดที่ ${selectedPointIndex - pickupCount + 1}` }}
          <v-btn aria-label="ปิดหน้าต่างยืนยันรับหรือส่งสินค้า" icon variant="text" @click="dialog_point = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pl-4 pt-0">
          <strong class="text-h6">{{ selectedPoint.address }}</strong>
          <p>รายละเอียดสถานที่:</p>
          <p>{{ selectedPoint.detail || 'ไม่มีรายละเอียดเพิ่มเติม' }}</p>
          <p>{{ selectedPoint.type === 'pickup' ? 'รับสินค้า' : 'ส่งสินค้า' }}: {{ selectedPoint.date }}</p>
          <strong class="text-h6">สินค้าที่ต้อง{{ selectedPoint.type === 'pickup' ? 'รับ' : 'ส่ง' }}</strong>
          <p>{{ job.productType }}</p>
          <v-divider class="mt-2 mb-2" />
          <p>ยืนยัน{{ selectedPoint.type === 'pickup' ? 'รับ' : 'ส่ง' }}สินค้าจุดที่ {{ selectedPointIndex + 1 }}</p>
          <v-text-field
            v-model="formattedDate"
            density="compact"
            hide-details
            prepend-inner-icon="mdi-calendar-month-outline"
            readonly
            variant="outlined"
          />
          <v-file-input
            v-model="uploadedFiles"
            accept="image/*"
            class="mt-4"
            density="comfortable"
            label="เลือกภาพสินค้า (ขนาดไม่เกิน 20MB)"
            multiple
            prepend-icon="mdi-camera"
            :rules="fileRules"
            variant="outlined"
            @change="validateFiles"
          />
          <p style="color: red; font-size: 14px;">* อัปโหลดรูปสินค้าอย่างต่ำ 1 รูป สูงสุด 4 รูป</p>
          <div class="mt-2 d-flex justify-end align-center">
            <v-btn
              :aria-label="`ยืนยัน${selectedPoint.type === 'pickup' ? 'รับ' : 'ส่ง'}สินค้า`"
              color="primary"
              :disabled="!isFileValid"
              prepend-icon="mdi-check"
              rounded="md"
              text="ยืนยัน"
              @click="submitPickupDropoff"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Swal from 'sweetalert2';
  import productImage from '@/assets/img/Product.png';
  import locationMap from '@/components/Track.vue';

  export default {
    components: {
      locationMap,
    },
    data () {
      return {
        dialog: false,
        dialog_point: false,
        selectedPoint: {},
        selectedPointIndex: 0,
        uploadedFiles: [],
        isFileValid: false,
        job: {
          jobId: this.$route.params.id || 'BH3ca75',
          status: 'รอเริ่มงาน',
          startDate: '6 มีนาคม 2568 10:00 น.',
          vehicleType: 'รถ 4 ล้อ (ตู้ทึบปกติ)',
          productType: 'สินค้าทั่วไป, เครื่องใช้ไฟฟ้า',
          distance: '892 กิโลเมตร',
          locations: [
            {
              type: 'pickup',
              label: 'รับสินค้า',
              address: '2171 ถ. ช้างคลาน ตำบลช้างคลาน อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50100',
              detail: 'โกดังต้นทาง',
              date: '6 มีนาคม 2568 10:00 น. - 12:00 น.',
              note: '',
            },
            {
              type: 'dropoff',
              label: 'ส่งสินค้า',
              address: '123 ถนนสุขุมวิท เขตคลองเตย กรุงเทพฯ 10110',
              detail: 'โกดังปลายทาง',
              date: '7 มีนาคม 2568 08:00 น. - 10:00 น.',
              note: 'ขอคนขับช่วยขนลง',
            },
            {
              type: 'dropoff',
              label: 'ส่งสินค้า 2',
              address: '456 ถนนพระราม 2 เขตบางขุนเทียน กรุงเทพฯ 10150',
              detail: 'หน้าร้าน',
              date: '7 มีนาคม 2568 10:00 น. - 12:00 น.',
              note: 'ระวังสินค้าแตกหัก',
            },
          ],
          products: [
            { image: productImage, name: 'เครื่องใช้ไฟฟ้า 1' },
            { image: productImage, name: 'เครื่องใช้ไฟฟ้า 2' },
            { image: productImage, name: 'สินค้าทั่วไป' },
          ],
        },
        fileRules: [
          value => !value || value.length <= 4 || 'อัปโหลดได้สูงสุด 4 รูป',
          value => !value || value.every(file => file.size <= 20 * 1024 * 1024) || 'ขนาดไฟล์ต้องไม่เกิน 20MB',
        ],
      };
    },
    computed: {
      formattedDate () {
        const d = this.date instanceof Date ? this.date : new Date();
        const thaiMonths = [
          'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
          'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
        ];
        const day = d.getDate();
        const month = thaiMonths[d.getMonth()];
        const year = d.getFullYear() + 543;
        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');
        return `${day} ${month} ${year} ${hours}:${minutes} น.`;
      },
      pickupCount () {
        return this.job.locations.filter(point => point.type === 'pickup').length;
      },
      allPointsCompleted () {
        // Placeholder: Assume all points are completed for "จบงาน" button
        return true; // Replace with actual logic to check if all points are completed
      },
    },
    methods: {
      confirmBack () {
        Swal.fire({
          title: 'ยืนยันการย้อนกลับ',
          text: 'คุณต้องการย้อนกลับไปหน้างานของฉันหรือไม่?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then(result => {
          if (result.isConfirmed) {
            this.$router.go(-1);
          }
        });
      },
      confirmStartJob () {
        Swal.fire({
          title: 'ยืนยันเริ่มงาน',
          text: 'คุณต้องการเริ่มงานนี้หรือไม่?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then(result => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'เริ่มงานสำเร็จ',
              text: 'งานได้เริ่มต้นแล้ว',
              icon: 'success',
              confirmButtonText: 'ตกลง',
            });
            this.job.status = 'กำลังขนส่ง'; // Update status (placeholder)
          }
        });
      },
      confirmArrive (index) {
        this.selectedPoint = this.job.locations[index];
        this.selectedPointIndex = index;
        Swal.fire({
          title: `ยืนยันถึง${this.selectedPoint.type === 'pickup' ? 'จุดรับ' : 'จุดส่ง'}ที่ ${index + 1}`,
          text: `คุณถึง${this.selectedPoint.type === 'pickup' ? 'จุดรับ' : 'จุดส่ง'} ${this.selectedPoint.label} แล้วหรือไม่?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then(result => {
          if (result.isConfirmed) {
            this.dialog = true;
          }
        });
      },
      submitArrival () {
        Swal.fire({
          title: 'ยืนยันถึงจุดสำเร็จ',
          text: `ถึง${this.selectedPoint.type === 'pickup' ? 'จุดรับ' : 'จุดส่ง'}ที่ ${this.selectedPointIndex + 1} เรียบร้อย`,
          icon: 'success',
          confirmButtonText: 'ตกลง',
        });
        this.dialog = false;
      },
      confirmPickupDropoff (index) {
        this.selectedPoint = this.job.locations[index];
        this.selectedPointIndex = index;
        this.uploadedFiles = [];
        this.isFileValid = false;
        Swal.fire({
          title: `ยืนยัน${this.selectedPoint.type === 'pickup' ? 'รับ' : 'ส่ง'}สินค้า`,
          text: `คุณต้องการยืนยัน${this.selectedPoint.type === 'pickup' ? 'รับ' : 'ส่ง'}สินค้าที่ ${this.selectedPoint.label} หรือไม่?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then(result => {
          if (result.isConfirmed) {
            this.dialog_point = true;
          }
        });
      },
      validateFiles (files) {
        this.isFileValid = files && files.length >= 1 && files.length <= 4 && files.every(file => file.size <= 20 * 1024 * 1024);
      },
      submitPickupDropoff () {
        if (!this.isFileValid) {
          Swal.fire({
            title: 'ข้อผิดพลาด',
            text: 'กรุณาอัปโหลดรูปภาพอย่างน้อย 1 รูปและไม่เกิน 4 รูป (ขนาดไม่เกิน 20MB)',
            icon: 'error',
            confirmButtonText: 'ตกลง',
          });
          return;
        }
        Swal.fire({
          title: `${this.selectedPoint.type === 'pickup' ? 'รับ' : 'ส่ง'}สินค้าสำเร็จ`,
          text: `${this.selectedPoint.type === 'pickup' ? 'รับ' : 'ส่ง'}สินค้าที่ ${this.selectedPoint.label} เรียบร้อย`,
          icon: 'success',
          confirmButtonText: 'ตกลง',
        });
        this.dialog_point = false;
        this.uploadedFiles = [];
        this.isFileValid = false;
      },
      confirmCompleteJob () {
        Swal.fire({
          title: 'ยืนยันจบงาน',
          text: 'คุณต้องการยืนยันว่าจบงานนี้แล้วหรือไม่?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then(result => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'จบงานสำเร็จ',
              text: 'งานนี้จบเรียบร้อยแล้ว',
              icon: 'success',
              confirmButtonText: 'ตกลง',
            });
            this.job.status = 'ขนส่งสำเร็จ'; // Update status (placeholder)
          }
        });
      },
      getChipColor (status) {
        switch (status) {
          case 'รอยืนยัน': return '#FBBA52';
          case 'รอเริ่มงาน': return '#FBBA52';
          case 'กำลังขนส่ง': return '#36B7D4';
          case 'ขนส่งสำเร็จ': return '#4CAF50';
          default: return 'grey';
        }
      },
    },
  };
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}
/* .v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
} */
.opacity-50 {
  opacity: 0.5;
}
</style>
