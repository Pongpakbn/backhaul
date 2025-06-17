<template>
  <v-container>
    <v-row class="align-center mb-4">
      <v-col class="d-flex align-center" cols="12">
        <div class="me-4">
          <h2 class="mb-1">ค้นหางาน</h2>
          <p class="text-grey-darken-1 mb-0">ค้นหาและรับงานได้ทันที</p>
        </div>
      </v-col>
    </v-row>
    <v-card class="mb-6" flat rounded="lg">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <p class="text-body-1">ต้นทาง</p>
            <v-select
              density="comfortable"
              hide-details
              item-title="name"
              item-value="id"
              :items="provinces"
              placeholder="จังหวัดต้นทาง"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p class="text-body-1">ปลายทาง</p>
            <v-select
              density="comfortable"
              hide-details
              item-title="name"
              item-value="id"
              :items="provinces"
              placeholder="ปลายทาง"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p class="text-body-1">ระบุประเภทรถ</p>
            <v-select
              density="comfortable"
              hide-details
              item-title="name"
              item-value="id"
              :items="vehicleTypes"
              placeholder="ระบุประเภทรถ"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col class="mt-4" cols="12">
            <v-btn
              aria-label="ค้นหางาน"
              block
              color="primary"
              rounded="lg"
              size="large"
              text="ค้นหางาน"
              @click="searchJobs"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card
      v-for="(job, index) in jobs"
      :key="index"
      class="mt-4"
      elevation="2"
      flat
      rounded="lg"
    >
      <v-card-title class="text-h6">
        หมายเลขงาน: {{ job.jobId }}
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">งานเริ่ม</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.startDate }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">ประเภทรถบรรทุก</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.vehicleType }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">ประเภทการจอง</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.bookingType }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">ประเภทสินค้า</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.productType }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">รายละเอียดสินค้า</p>
              </v-col>
              <v-col cols="6">
                <p
                  aria-label="ดูรายละเอียดสินค้า"
                  style="text-decoration: underline; color: #000080; cursor: pointer;"
                  @click="openProductDialog(index)"
                >
                  ดูรายละเอียดสินค้า
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">แผนการเดินรถ</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.route }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">ระยะทาง</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.distance }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">จุดรับส่งสินค้า</p>
              </v-col>
              <v-col cols="6">
                <v-btn
                  aria-label="รายละเอียดจุดรับ-ส่ง"
                  color="primary"
                  density="compact"
                  text="รายละเอียดจุดรับ-ส่ง"
                  @click="openImage(index)"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <p class="text-body-1">รายละเอียดเพิ่มเติม</p>
                <p>{{ job.additionalDetails }}</p>
              </v-col>
              <v-col cols="12">
                <v-card
                  class="rounded-lg border-dashed"
                  color="primary"
                  variant="outlined"
                >
                  <v-card-text class="d-flex justify-space-between">
                    <h3>ข้อเสนอที่ผู้จองต้องการ:</h3>
                    <h3>ราคา {{ job.offerPrice }} บาท</h3>
                  </v-card-text>
                </v-card>
                <v-card
                  class="rounded-lg border-dashed mt-2"
                  color="secondary"
                  variant="outlined"
                >
                  <v-card-text class="d-flex justify-space-between">
                    <h3>ข้อเสนอที่ผู้จองต้องการ:</h3>
                    <h3>ราคา {{ job.offerPrice }} บาท</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="mt-4 mb-4" />
        <p class="text-body-1">ค่าสำหรับงานนี้</p>
        <div class="d-flex justify-space-between">
          <p class="text-grey-darken-1">ค่าขนส่ง (ต่อคัน)</p>
          <p>{{ job.transportCost }} บาท/คัน</p>
        </div>
        <v-divider class="mt-4 mb-4" />
        <v-card flat style="background-color: #f2f2f9;">
          <v-card-text class="d-flex justify-space-between ma-2" style="color: #000080;">
            <h2>ยอดที่คุณจะได้รับ</h2>
            <h2>{{ job.finalPrice }} บาท</h2>
          </v-card-text>
        </v-card>
        <v-divider class="mt-4 mb-4" />
        <v-row>
          <v-col cols="12" md="6">
            <v-btn
              aria-label="ปฏิเสธงาน"
              block
              color="#009688"
              rounded="lg"
              size="large"
              text="ปฏิเสธ"
              variant="outlined"
              @click="rejectJob(index)"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              aria-label="สนใจงานนี้"
              block
              color="primary"
              rounded="lg"
              size="large"
              text="สนใจงานนี้"
              @click="openOfferDialog(index)"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Location Dialog -->
    <v-dialog v-model="dialog_location" max-width="600px">
      <v-card>
        <v-card-title
          class="bg-primary text-white text-h6 d-flex align-center justify-space-between"
        >
          <p>รายละเอียดจุดรับ - ส่ง</p>
          <v-btn
            aria-label="ปิดหน้าต่างจุดรับ-ส่ง"
            icon
            variant="text"
            @click="dialog_location = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-timeline align="start" density="compact" side="end" truncate-line="both">
            <v-timeline-item
              v-for="(location, index) in selectedJobLocations"
              :key="index"
              :color="getTimelineColor(location.type)"
              size="small"
              width="100%"
            >
              <template #icon>
                <v-avatar :color="getTimelineColor(location.type)" size="27">
                  <span class="text-white">{{ index + 1 }}</span>
                </v-avatar>
              </template>
              <div>
                <div class="font-weight-medium">{{ location.label }}</div>
                <div class="text-subtitle-1 text-grey-darken-1">{{ location.address }}</div>
                <div style="color: #005eb8">{{ location.date }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Product Dialog -->
    <v-dialog v-model="dialog_product" max-width="600px">
      <v-card>
        <v-card-title
          class="bg-primary text-white text-h6 d-flex align-center justify-space-between"
        >
          <p>ข้อมูลสินค้า</p>
          <v-btn
            aria-label="ปิดหน้าต่างข้อมูลสินค้า"
            icon
            variant="text"
            @click="dialog_product = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <p>ประเภทสินค้า: {{ selectedJob.productType }}</p>
          <p>รายละเอียดสินค้า: {{ selectedJob.productDetails }}</p>
          <p>บรรจุภัณฑ์: {{ selectedJob.packaging }}</p>
          <p>น้ำหนัก: {{ selectedJob.weight }} กิโลกรัม</p>
          <p>มูลค่าสินค้า: {{ selectedJob.value }} บาท</p>
          <p>รูปสินค้า</p>
          <v-row>
            <v-col
              v-for="(product, index) in selectedJob.products"
              :key="index"
              class="text-center"
              cols="12"
              lg="4"
              md="4"
              sm="6"
            >
              <v-img
                :alt="product.name"
                cover
                height="180"
                :src="product.image"
                width="180"
              />
              <p class="mt-2">{{ product.name }}</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Offer Dialog -->
    <v-dialog v-model="offer" max-width="800">
      <v-card>
        <v-card-title class="text-h6 d-flex align-center">
          <p class="flex-grow-1 text-center">หมายเลขงาน: {{ selectedJob.jobId }}</p>
          <v-btn
            aria-label="ปิดหน้าต่างเสนอราคา"
            icon
            variant="text"
            @click="offer = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-card border="thin" rounded="lg" variant="outlined">
            <v-card-text>
              <p>เริ่มงาน: {{ selectedJob.startDate }}</p>
              <p>ประเภทรถ: {{ selectedJob.vehicleType }}</p>
              <p>ระยะทาง: {{ selectedJob.distance }}</p>
            </v-card-text>
          </v-card>
          <v-card
            class="rounded-lg border-dashed mt-4 mb-4"
            color="primary"
            variant="outlined"
          >
            <v-card-text class="d-flex justify-space-between">
              <h3>ข้อเสนอที่ผู้จองต้องการ:</h3>
              <h3>ราคา {{ selectedJob.offerPrice }} บาท</h3>
            </v-card-text>
          </v-card>
          <p>เสนอราคาที่คุณต้องการ</p>
          <v-card border="thin" rounded="lg" variant="outlined">
            <v-card-text>
              <p>ราคาค่าขนส่ง</p>
              <v-text-field
                v-model="offerPrice"
                density="comfortable"
                hide-details
                placeholder="1,200"
                rounded="lg"
                type="number"
                variant="outlined"
              />
            </v-card-text>
          </v-card>
          <div class="mt-4">
            <v-btn
              aria-label="ยืนยันเสนอราคา"
              block
              class="mb-4"
              color="primary"
              density="comfortable"
              size="large"
              text="ยืนยันเสนอราคา"
              @click="submitOffer"
            />
            <v-btn
              aria-label="ยกเลิกการเสนอราคา"
              block
              color="#FF0004"
              density="comfortable"
              size="large"
              text="ยกเลิก"
              variant="outlined"
              @click="offer = false"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import productImage from '@/assets/img/Product.png';

  export default {
    data () {
      return {
        dialog_location: false,
        dialog_product: false,
        offer: false,
        offerPrice: '',
        selectedJob: {},
        jobs: [
          {
            jobId: 'BH3ca75',
            startDate: '6 มีนาคม 2568 10:00 น.',
            vehicleType: 'รถ 4 ล้อ (ตู้ทึบปกติ)',
            bookingType: 'เหมาคัน',
            productType: 'สินค้าทั่วไป',
            productDetails: 'เครื่องแต่งกาย เสื้อผ้า แว่น กระเป๋า',
            packaging: 'กล่องกระดาษ',
            weight: '3.00',
            value: '245',
            products: [
              { image: productImage, name: 'สินค้า 1' },
              { image: productImage, name: 'สินค้า 2' },
              { image: productImage, name: 'สินค้า 3' },
              { image: productImage, name: 'สินค้า 4' },
              { image: productImage, name: 'สินค้า 5' },
              { image: productImage, name: 'สินค้า 6' },
            ],
            route: 'ภูเก็ต -> กรุงเทพ',
            distance: '892 กิโลเมตร',
            additionalDetails:
              'ต้องการรถกระบะพื้นเรียบ หรือ รถกระบะตอนเดียว (ที่ไม่มีแคป) ขอรถที่มีสายรัดสินค้า และ ขอคนขับรถที่มีความระมัดระวังในการขับขี่ ไม่ขับเร็ว เนื่องจากเคยมีคนขับทำสินค้าล่วงจากพาเลท ทำให้ของเสียหาย',
            offerPrice: '1,200',
            transportCost: '1,452',
            finalPrice: '1,200',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '123 ถนนสุขุมวิท เขตคลองเตย กรุงเทพฯ 10110',
                date: '6 มีนาคม 2568 10:00 น. - 12:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '456 ถนนพระราม 2 เขตบางขุนเทียน กรุงเทพฯ 10150',
                date: '6 มีนาคม 2568 14:00 น. - 16:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า 2',
                address: '789 ถนนแจ้งวัฒนะ เขตหลักสี่ กรุงเทพฯ 10210',
                date: '6 มีนาคม 2568 16:00 น. - 18:00 น.',
              },
            ],
          },
        // Add more job objects as needed
        ],
        provinces: [
          { id: 1, name: 'กรุงเทพมหานคร' },
          { id: 2, name: 'ภูเก็ต' },
        // Add more provinces as needed
        ],
        vehicleTypes: [
          { id: 1, name: 'รถ 4 ล้อ (ตู้ทึบปกติ)' },
          { id: 2, name: 'รถกระบะพื้นเรียบ' },
        // Add more vehicle types as needed
        ],
      };
    },
    computed: {
      selectedJobLocations () {
        return this.selectedJob.locations || [];
      },
    },
    methods: {
      openImage (index) {
        this.selectedJob = this.jobs[index];
        this.dialog_location = true;
      },
      openProductDialog (index) {
        this.selectedJob = this.jobs[index];
        this.dialog_product = true;
      },
      openOfferDialog (index) {
        this.selectedJob = this.jobs[index];
        this.offerPrice = this.selectedJob.offerPrice;
        this.offer = true;
      },
      rejectJob (index) {
        // Implement reject job logic
        console.log(`Rejected job: ${this.jobs[index].jobId}`);
      },
      submitOffer () {
        // Implement offer submission logic
        console.log(`Submitted offer for job ${this.selectedJob.jobId}: ${this.offerPrice} บาท`);
        this.offer = false;
      },
      searchJobs () {
        // Implement search logic
        console.log('Searching jobs...');
      },
      getTimelineColor (type) {
        if (type === 'pickup') return 'primary';
        if (type === 'dropoff') return 'secondary';
        return 'grey';
      },
    },
  };
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}
.v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
